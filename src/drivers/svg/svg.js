// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

'use strict';

import Exception from '../../imagemarker/exception.js'
import { isHTMLElement, filterDefault } from '../../imagemarker/common.js'
import { drawPath, drawLine, drawRect, drawEllipse } from '../../imagemarker/stage.js'
import { HandlerResult } from '../../imagemarker/userctl.js'
import { PathInserter, PathComposer } from './composer_path.js'
import { LineInserter, LineComposer } from './composer_line.js'
import { RectInserter, RectComposer } from './composer_rect.js'
import { EllipseInserter, EllipseComposer } from './composer_ellipse.js'

export const Feature = 'http://www.w3.org/TR/SVG11/feature#Image'
export const Version = '1.1'
export const XMLNG = 'http://www.w3.org/2000/svg'
export const XMLNS = 'http://www.w3.org/2000/xmlns/'
export const XMLNGLink = 'http://www.w3.org/1999/xlink'
export const UnsupportMessage = 'This image is unsupported by your browser'

function isSupported() {
    return window.document.implementation.hasFeature(Feature, Version)
}

export class UnsupportedException extends Exception {
    constructor() {
        super('SVG is unsupported in current context')
    }
}

export class ParentElementNotFoundException extends Exception {
    constructor(id) {
        super('Parent Element "' + id + '" was not found in the context')
    }
}

export class ParentElementMustBeAHTMLElement extends Exception {
    constructor(id, el) {
        super('Parent Element "' + id + '" is a "' + typeof el + '" rather ' +
            'than expected HTMLDOMElement')
    }
}

export class MissingSVGRootElementException extends Exception {
    constructor(id) {
        super('Missing SVG Root element in current context')
    }
}

export class ElementCreationFailedException extends Exception {
    constructor(tagname) {
        super('Failed to create "' + tagname + '" SVG element')
    }
}

export class CannotStartNewDrawWhileDrawing extends Exception {
    constructor() {
        super('Cannot start a new draw while drawing')
    }
}

export class UnsupportedComposeTypeException extends Exception {
    constructor(t) {
        super('Unsupported Compose Type: ' + t)
    }
}

class Background {
    constructor(svg, background, resolve, reject, waitLoad) {
        this.element = svg.newElement('image', {
            'xlink:href': background.URL(),
            'x': 0,
            'y': 0,
            'height': background.height() + 'px',
            'width': background.width() + 'px',
            'pointer-events': 'none'
        })

        if (waitLoad) {
            this.element.addEventListener('load', e => {
                resolve(this)
            })

            this.element.addEventListener('error', e => {
                reject(e)
            })
        } else {
            resolve(this)
        }

        this.background = background
        this.svg = svg

        this.reset()
    }

    reset() {
        let sRect = this.svg.rect(),
            z = this.background.zoom(sRect.width, sRect.height).fit

        if (z < 1 || !this.background.zoomable(sRect.width, sRect.height)) {
            z = 1
        }

        let x = (-((sRect.width - (this.background.width() / z)) / 2)) * z,
            y = (-((sRect.height - (this.background.height() / z)) / 2)) * z

        let widthDiff = sRect.width - (this.background.width() * z),
            heightDiff = sRect.height - (this.background.height() * z)

        this.svg.panTo(x, y, z)
    }

    width() {
        return this.background.width()
    }

    height() {
        return this.background.height()
    }

    zoom(width, height) {
        return this.background.zoom(width, height)
    }

    zoomable(toWidth, toHeight) {
        return this.background.zoomable(toWidth, toHeight)
    }

    remove() {
        this.element.parentNode.removeChild(this.element)
        this.svg.resetZoom(true)
    }
}

export function defaultDrawingControl() {
    function getMousePosition(e, compose) {
        let rect = compose.svg.rect()

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    return {
        'mousedown': (e, d, n) => {
            let pt = getMousePosition(e, n)

            n.start(pt.x, pt.y)

            return new HandlerResult(d, true)
        },
        'mouseup': (e, d, n) => {
            let pt = getMousePosition(e, n)

            n.done(pt.x, pt.y)

            return new HandlerResult(d, true)
        },
        'mousemove': (e, d, n) => {
            let pt = getMousePosition(e, n)

            n.draw(pt.x, pt.y)

            return new HandlerResult(d, true)
        }
    }
}

// Here is the test about why preserveAspectRatio == none
// https://codepen.io/pen/pBNmdx
// In short: We would like to zoom in and out the svg as a normal image
//           instead of using it's own zoom methods.
//           Also because of this, we need to manually maintain the aspect
//           ratio when the SVG element is resized.
const containerProperties = {
    'xmlns:xlink': XMLNGLink,
    'version': Version,
    'width': 0,                 // main width
    'height': 0,                // main height
    'viewBox': '0 0 0 0',       // zoom control
    'style': 'margin: 0; padding: 0; display: block',
    'preserveAspectRatio': 'none'
}

function buildPathElementProperties(initialData, config) {
    let ppt = filterDefault({
        'stroke': 'black',
        'stroke-width': 3,
        'fill': 'none',
        'd': initialData
    }, config)

    ppt['d'] = initialData

    return ppt
}

export class SVG {
    constructor(el) {
        if (!isSupported()) {
            throw new UnsupportedException()
        }

        if (isHTMLElement(el)) {
            this.parent = el
        } else {
            // this.parent must be a HTML DOM object
            this.parent = document.getElementById(el)

            if (!this.parent) {
                throw new ParentElementNotFoundException(el)
            }

            if (!isHTMLElement(this.parent)) {
                throw new ParentElementMustBeAHTMLElement(el, this.parent)
            }
        }

        this.zoomLevel = 1
        this.panX = 0
        this.panY = 0
        this.parentRect = {}

        this.container = this.newElement('svg', containerProperties)
        this.message = document.createTextNode(UnsupportMessage)
        this.target = this.newElement('g', {})

        this.container.appendChild(this.target)
        this.container.appendChild(this.message)
        this.parent.appendChild(this.container)

        this.picture = null
        this.drawings = []

        this.fitResync(parentRect => {
            return true
        })
    }

    teardown() {
        this.clear()

        this.target.parentNode.removeChild(this.target)
        this.message.parentNode.removeChild(this.message)

        this.container.parentNode.removeChild(this.container)

        this.picture = null
        this.target = null
        this.message = null
        this.container = null
        this.parent = null
    }

    element() {
        return this.container
    }

    clear() {
        if (this.picture) {
            this.picture.remove()
            this.picture = null
        }

        for (let e in this.drawings) {
            this.target.removeChild(this.drawings[e])
        }

        this.drawings = []
    }

    panTo(panX, panY, zoomLevel) {
        if (this.zoomLevel <= 0) {
            return
        }

        this.panX = panX
        this.panY = panY
        this.zoomLevel = zoomLevel
        this.fitResync(parentRect => {
            return true
        })
    }

    zoom(screenCenterX, screenCenterY, panXOffset, panYOffset, zoomShift) {
        if (!this.picture) {
            return
        }

        let ctrRect = this.rect()

        if (ctrRect.width <= 0 || ctrRect.height <= 0) {
            return
        }

        if (!zoomShift) {
            this.panX += panXOffset * this.zoomLevel
            this.panY += panYOffset * this.zoomLevel
            this.fitResync(parentRect => {
                return true
            })

            return
        }

        let newPictureWidth =
            (this.picture.width() / this.zoomLevel) + zoomShift,
            newPictureHeight =
                (this.picture.height() / this.zoomLevel) + zoomShift

        if (newPictureWidth <= 0 ||
            newPictureHeight <= 0 ||
            !this.picture.zoomable(newPictureWidth, newPictureHeight)) {
            this.panX += panXOffset * this.zoomLevel
            this.panY += panYOffset * this.zoomLevel
            this.fitResync(parentRect => {
                return true
            })

            return
        }

        let fitZoom = this.picture.zoom(newPictureWidth, newPictureHeight).fill

        if (fitZoom == this.zoomLevel) {
            this.panX += panXOffset * this.zoomLevel
            this.panY += panYOffset * this.zoomLevel
            this.fitResync(parentRect => {
                return true
            })

            return
        }

        let zoomWidthMiddle = (screenCenterX - ctrRect.left) / ctrRect.width,
            zoomHeightMiddle = (screenCenterY - ctrRect.top) / ctrRect.height,
            actualZoomedWidth =
                (ctrRect.width * this.zoomLevel) - (ctrRect.width * fitZoom),
            actualZoomedHeight =
                (ctrRect.height * this.zoomLevel) - (ctrRect.height * fitZoom),
            xShiftDistance = actualZoomedWidth * zoomWidthMiddle,
            yShiftDistance = actualZoomedHeight * zoomHeightMiddle

        this.zoomLevel = fitZoom

        this.panX += xShiftDistance
        this.panY += yShiftDistance
        this.fitResync(parentRect => {
            return true
        })
    }

    resetZoom(refit) {
        this.zoomLevel = 1
        this.panX = 0
        this.panY = 0
        this.fitResync(parentRect => {
            return refit
        })
    }

    reset() {
        if (!this.picture) {
            return this.resetZoom(true)
        }

        this.resetZoom(false)

        return this.picture.reset()
    }

    refit() {
        this.fitResync(parentRect => {
            this.zoom(
                0,
                0,
                ((this.parentRect.width - parentRect.width) / 2),
                ((this.parentRect.height - parentRect.height) / 2),
                0)

            return true
        })
    }

    fitResync(onNewRect) {
        let parentRect = this.parent.getBoundingClientRect()

        if (!onNewRect(parentRect)) {
            this.parentRect = parentRect

            return
        }

        this.parentRect = parentRect

        let zoomWidth = this.parentRect.width * this.zoomLevel,
            zoomHeight = this.parentRect.height * this.zoomLevel

        this.setElement(this.container, {
            'width': this.parentRect.width + 'px',
            'height': this.parentRect.height + 'px',
            'viewBox': [this.panX, this.panY, zoomWidth, zoomHeight].join(' ')
        })
    }

    rect() {
        return this.container.getBoundingClientRect()
    }

    setElement(el, properities) {
        for (let p in properities) {
            if (p.indexOf('xlink:') === 0) {
                el.setAttributeNS(XMLNGLink, p, properities[p])
            } else if (p.indexOf('xmlns:') === 0) {
                el.setAttributeNS(XMLNS, p, properities[p])
            } else {
                el.setAttribute(p, properities[p])
            }
        }
    }

    newElement(tag, properities) {
        let el = document.createElementNS(XMLNG, tag)

        if (!el) {
            throw new ElementCreationFailedException(tag)
        }

        this.setElement(el, properities)

        return el
    }

    background(background, onSuccess, onFail, waitLoad) {
        if (this.picture) {
            this.picture.remove()
            this.picture = null
        }

        let newBackground = new Background(
            this, background, onSuccess, onFail, waitLoad)

        this.picture = newBackground
        this.target.appendChild(newBackground.element)
    }

    insertDrawing(initialData, properties) {
        if (!this.target) {
            throw new MissingSVGRootElementException()
        }

        let el = this.newElement('path', buildPathElementProperties(
            initialData, properties))

        this.target.appendChild(el)

        this.drawings.push(el)

        return el
    }

    removeDrawing(el) {
        for (let i in this.drawings) {
            if (this.drawings[i] != el) {
                continue
            }

            this.target.removeChild(el)
            this.drawings.splice(i, 1)

            return
        }
    }

    insert(composeType, properties, data) {
        switch (composeType) {
            case drawPath:
                return new PathInserter(this, data, properties)

            case drawLine:
                return new LineInserter(this, data, properties)

            case drawRect:
                return new RectInserter(this, data, properties)

            case drawEllipse:
                return new EllipseInserter(this, data, properties)

            default:
                throw new UnsupportedComposeTypeException(composeType)
        }
    }

    compose(resolve, reject, userctl, properties, drawingControl, composeType) {
        switch (composeType) {
            case drawPath:
                return new PathComposer(
                    this, resolve, reject, userctl, properties, drawingControl)

            case drawLine:
                return new LineComposer(
                    this, resolve, reject, userctl, properties, drawingControl)

            case drawRect:
                return new RectComposer(
                    this, resolve, reject, userctl, properties, drawingControl)

            case drawEllipse:
                return new EllipseComposer(
                    this, resolve, reject, userctl, properties, drawingControl)

            default:
                throw new UnsupportedComposeTypeException(composeType)
        }
    }
}

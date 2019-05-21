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

import Exception from './exception.js'
import { assertType } from './common.js'
import { UserCtl, HandlerResult } from './userctl.js'

export class StageAlreadyComposing extends Exception {
    constructor() {
        super('Cannot start new compose before current one is finished')
    }
}

export class StageAlreadyOpened extends Exception {
    constructor() {
        super('Stage already been opened, cannot open another one')
    }
}

const maxZoomRate = 3.0
const minZoomRate = 0.3

export const drawPath = 1
export const drawLine = 2
export const drawRect = 3
export const drawEllipse = 4

/**
 * Background object
 *
 */
export class Background {
    /**
     * constructor
     *
     * @param {string}      url         URL address of the background image
     * @param {number}      width       Width of the image in px
     * @param {number}      height      Height of the image in px
     *
     */
    constructor(url, width, height) {
        assertType(url, 'string')
        assertType(width, 'number')
        assertType(height, 'number')

        this.url = url
        this.w = width
        this.h = height
    }

    /**
     * Return the URL
     *
     * @returns {string}
     *
     */
    URL() {
        return this.url
    }

    /**
     * Return the width of the background image
     *
     * @returns {number}
     *
     */
    width() {
        return this.w
    }

    /**
     * Return the height of the background image
     *
     * @returns {number}
     *
     */
    height() {
        return this.h
    }

    /**
     * Return the ratio of the background image
     *
     * @returns {number}
     *
     */
    ratio() {
        return this.w / this.h
    }

    /**
     * Return the zoom level according to the given target width and height
     *
     * @param {number} targetWidth Target width
     * @param {number} targetHeight Target height
     * @returns {number} The zoom level
     *
     */
    zoom(targetWidth, targetHeight) {
        let zoomWidth = this.width() / targetWidth,
            zoomHeight = this.height() / targetHeight

        return zoomWidth < zoomHeight ? {
            fit:  zoomHeight,
            fill: zoomWidth
        } : {
            fit:  zoomWidth,
            fill: zoomHeight
        }
    }

    /**
     * Return whether or not given target width and height can be zoomed to
     *
     * @param {number} toWidth Target width
     * @param {number} toHeight Target height
     * @returns {boolean} Whether or not zoomable
     *
     */
    zoomable(toWidth, toHeight) {
        if (toWidth > (this.width() * maxZoomRate) ||
            toWidth < (this.width() * minZoomRate)) {
            return false
        }

        if (toHeight > (this.height() * maxZoomRate) ||
            toHeight < (this.height() * minZoomRate)) {
            return false
        }

        return true
    }
}

/**
 * Creating a default user controls of the stage
 *
 * @returns {Object} User controls
 *
 */
export function defaultStageControl() {
    let initialX = 0, initialY = 0
    let controlKeyEnabled = false

    return {
        'mousedown': (e, d, n) => {
            if (!e.ctrlKey) {
                return new HandlerResult(null, true)
            }

            e.preventDefault()
            initialX = e.clientX
            initialY = e.clientY
            controlKeyEnabled = true

            return new HandlerResult(null, false)
        },
        'mouseup': (e, d, n) => {
            if (!controlKeyEnabled) {
                return new HandlerResult(null, true)
            }

            e.preventDefault()

            controlKeyEnabled = false

            return new HandlerResult(null, false)
        },
        'mousemove': (e, d, n) => {
            if (!controlKeyEnabled) {
                return new HandlerResult(null, true)
            }

            if (!e.ctrlKey) {
                initialX = e.clientX
                initialY = e.clientY
                controlKeyEnabled = false
                e.preventDefault()

                return new HandlerResult(null, true)
            }

            e.preventDefault()
            n.zoom(
                initialX, initialY,
                initialX - e.clientX, initialY - e.clientY,
                0)

            initialX = e.clientX
            initialY = e.clientY

            return new HandlerResult(null, false)
        },
        'wheel': (e, d, n) => {
            if (!e.ctrlKey) {
                return new HandlerResult(null, true)
            }

            e.preventDefault()
            let zoomDistance = 0

            if (e.deltaY < 0) {
                zoomDistance = 50
            } else if (e.deltaY > 0) {
                zoomDistance = -50
            }

            n.zoom(e.clientX, e.clientY, 0, 0, zoomDistance)

            return new HandlerResult(null, false)
        }
    }
}

/**
 * Drawn element on the stage
 *
 */
export class Drawn {
    /**
     * constructor
     *
     * @param {Object} drawn Drawn object
     *
     */
    constructor(drawn) {
        this.drawn = drawn
    }

    /**
     * Return the raw element of current drawn object
     *
     * @returns {Object}
     *
     */
    element() {
        return this.drawn.element()
    }

    /**
     * Remove current element from the stage
     *
     */
    remove() {
        this.drawn.remove()
    }

    /**
     * Set the properties of current drawn object. Actual effect depends on
     * the stage driver
     *
     * @param {Object} properties New properties
     *
     */
    set(properties) {
        this.drawn.set(properties)
    }

    /**
     * Return the dimension of current drawn object
     *
     * @returns {Object}
     *
     */
    dimension() {
        let dim = this.drawn.dimension()

        return {
            x: dim.x,
            y: dim.y,
            width: dim.width,
            height: dim.height
        }
    }

    /**
     * Export the data of current drawn object
     *
     * @returns {Object}
     *
     */
    data() {
        return {
            type: this.drawn.type(),
            data: this.drawn.data()
        }
    }
}

/**
 * Represents an opened stage
 *
 */
export class Opened {
    /**
     * constructor
     *
     * @param {Stage} stage Stage object
     * @param {Object} controls User control builder
     * @param {Events} events Events manager
     *
     */
    constructor(stage, controls, events) {
        this.stage = stage
        this.ctl = new UserCtl(this.stage.element(), events)
        this.controls = controls
        this.drawing = false
        this.events = events

        this.ctl.listens(this.controls, this)
    }

    /**
     * Reset current opened stage to it's initial configuation
     *
     */
    reset() {
        this.stage.driver.reset()
    }

    /**
     * Zoom the stage
     *
     * @param {number} screenCenterX X coordinate of the center view point
     * @param {number} screenCenterY Y coordinate of the center view point
     * @param {number} panXOffset X pan offset
     * @param {number} panYOffset Y pan offset
     * @param {number} zoomShift Zoom offset
     *
     */
    zoom(screenCenterX, screenCenterY, panXOffset, panYOffset, zoomShift) {
        this.stage.driver.zoom(
            screenCenterX, screenCenterY, panXOffset, panYOffset, zoomShift)
    }

    /**
     * Insert a drawing
     *
     * @param {string} composeType Drawing type
     * @param {Object} properties Properties
     * @param {Object} data Drawing data
     * @return {Drawn} Drawn object
     *
     */
    insert(composeType, properties, data) {
        return new Drawn(
            this.stage.driver.insert(composeType, properties, data))
    }

    /**
     * Compose a drawing
     *
     * @param {Object} properties Properties
     * @param {Object} drawingControl User drawning control
     * @param {string} composeType Drawing type
     * @return {Promise<Drawn>} Drawn object
     * @throws {StageAlreadyComposing} When the stage already at composing
     *                                 status
     *
     */
    compose(properties, drawingControl, composeType) {
        let self = this

        if (this.drawing) {
            throw new StageAlreadyComposing()
        }

        assertType(properties, 'object')
        assertType(drawingControl, 'function')

        this.drawing = true

        return new Promise((resolve, reject) => {
            let promised = false,
                isPromised = () => {
                    if (promised) {
                        return true
                    }

                    promised = true

                    return false
                },
                myResolve = d => {
                    if (isPromised()) {
                        return
                    }

                    if (!this.drawing) {
                        d.remove()
                    }

                    this.drawing = false

                    let dd = new Drawn(d)

                    this.events.fire('stage.compose.completed', dd)

                    return resolve(dd)
                },
                myReject = e => {
                    if (isPromised()) {
                        return
                    }

                    this.drawing = false

                    this.events.fire('stage.compose.failed', e)

                    return reject(e)
                }

            try {
                this.events.fire('stage.compose', null)

                this.stage.driver.compose(
                    myResolve, myReject, this.ctl,
                    properties, drawingControl, composeType)
            } catch(e) {
                myReject(e)
            }
        })
    }

    /**
     * Close current stage
     *
     */
    close() {
        this.ctl.removes(this.controls)
        this.drawing = false

        this.stage.opened = null
        this.stage.clear()

        this.events.fire('stage.closed', this.opened)
    }
}

/**
 * Stage control
 *
 */
export class Stage {
    /**
     * constructor
     *
     * @param {Object} driver Stage driver
     * @param {Events} events Event manager
     *
     */
    constructor(driver, events) {
        this.driver = driver
        this.events = events
        this.opened = null
    }

    /**
     * Return current stage element
     *
     * @returns {Object}
     *
     */
    element() {
        return this.driver.element()
    }

    /**
     * Open a new stage
     *
     * @param {Background} background Stage background
     * @param {function} onSuccess Successful callback
     * @param {function} onFail Failure callback
     * @param {Object} controls User controls
     * @param {boolean} waitLoad Whether or not to wait until the background is
     *                           loaded
     * @throws {StageAlreadyOpened} When the stage already been opened
     *
     */
    open(background, onSuccess, onFail, controls, waitLoad) {
        if (this.opened) {
            throw new StageAlreadyOpened()
        }

        this.opened = new Opened(this, controls, this.events)

        this.driver.background(background, () => {
            onSuccess(this.opened)

            this.events.fire('stage.open.successful', this.opened)
        }, e => {
            this.opened = null

            onFail(e)

            this.events.fire('stage.open.failed', e)
        }, waitLoad)
    }

    /**
     * Clear current stage
     *
     */
    clear() {
        if (this.opened) {
            this.opened.close()
            this.opened = null
        }

        this.driver.clear()
    }

    /**
     * Destroy current stage
     *
     */
    teardown() {
        this.clear()
        this.driver.teardown()
    }

    /**
     * Re-adjust current stage
     *
     */
    refit() {
        this.driver.refit()
    }
}

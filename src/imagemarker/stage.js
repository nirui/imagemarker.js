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

export class Background {
    constructor(url, width, height) {
        assertType(url, 'string')
        assertType(width, 'number')
        assertType(height, 'number')

        this.url = url
        this.w = width
        this.h = height
    }

    URL() {
        return this.url
    }

    width() {
        return this.w
    }

    height() {
        return this.h
    }

    ratio() {
        return this.w / this.h
    }

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

export class Drawn {
    constructor(drawn) {
        this.drawn = drawn
    }

    element() {
        return this.drawn.element()
    }

    remove() {
        return this.drawn.remove()
    }

    set(properties) {
        return this.drawn.set(properties)
    }

    dimension() {
        let dim = this.drawn.dimension()

        return {
            x: dim.x,
            y: dim.y,
            width: dim.width,
            height: dim.height
        }
    }

    data() {
        return {
            type: this.drawn.type(),
            data: this.drawn.data()
        }
    }
}

export class Opened {
    constructor(stage, controls, events) {
        this.stage = stage
        this.ctl = new UserCtl(this.stage.element(), events)
        this.controls = controls
        this.drawing = false
        this.events = events

        this.ctl.listens(this.controls, this)
    }

    reset() {
        return this.stage.driver.reset()
    }

    zoom(screenCenterX, screenCenterY, panXOffset, panYOffset, zoomShift) {
         return this.stage.driver.zoom(
            screenCenterX, screenCenterY, panXOffset, panYOffset, zoomShift)
    }

    insert(composeType, properties, data) {
        return this.stage.driver.insert(composeType, properties, data)
    }

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

    close() {
        this.ctl.removes(this.controls)
        this.drawing = false

        this.stage.opened = null
        this.stage.clear()

        this.events.fire('stage.closed', this.opened)
    }
}

export class Stage {
    constructor(driver, events) {
        this.driver = driver
        this.events = events
        this.opened = null
    }

    element() {
        return this.driver.element()
    }

    open(background, onSuccess, onFail, controls, waitLoad) {
        if (this.opened) {
            throw new StageAlreadyOpened()
        }

        this.opened = new Opened(this, controls, this.events)

        return this.driver.background(background, () => {
            onSuccess(this.opened)

            this.events.fire('stage.open.successful', this.opened)
        }, e => {
            this.opened = null

            onFail(e)

            this.events.fire('stage.open.failed', e)
        }, waitLoad)
    }

    clear() {
        if (this.opened) {
            this.opened.close()
            this.opened = null
        }

        return this.driver.clear()
    }

    teardown() {
        this.clear()

        return this.driver.teardown()
    }

    refit() {
        return this.driver.refit()
    }
}

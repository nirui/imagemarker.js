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

import { test as compatibilityTest } from './compatibility.js'
import { assertType, assertObjectType } from './common.js'
import { Events } from './events.js'
import { defaultStageControl, Stage, Background } from './stage.js'
import { drawPath, drawLine, drawRect, drawEllipse } from './stage.js'
import { HandlerResult } from './userctl.js'

export { defaultStageControl, Background, HandlerResult }
export { drawPath, drawLine, drawRect, drawEllipse }

/**
 * Creating a new ImageMarker instance
 *
 * @param {Object} driver stage driver
 * @returns {ImageMarker} a new Image Marker instance
 * @example
 * import imageMarker from '~ImageMarker/imagemarker.js'
 * let marker = imageMarker(driver)
 *
 */
export default function(driver) {
    return new ImageMarker(driver)
}

/**
 * The main class, manages the status (from creation to destroy) of the
 * ImageMarker
 *
 */
export class ImageMarker {
    /**
     * constructor
     *
     * @param {Object}      stageDriver     Instance of the stage driver
     *
     */
    constructor(stageDriver) {
        compatibilityTest()

        assertType(stageDriver, 'object')

        this.events = new Events()
        this.stage = new Stage(stageDriver, this.events)
    }

    /**
     * Tears down current instance, unrecoverablely
     *
     */
    teardown() {
        this.clear()
        this.events.teardown()
        this.stage.teardown()
    }

    /**
     * Clear current stage without destroying it
     *
     */
    clear() {
        this.stage.clear()
    }

    /**
     * Open a new stage
     *
     * @param {Background}  background      Background object
     * @param {boolean}     waitLoad        Whether or not to wait until the
     *                                      background is loaded
     * @param {Object}      controlBuilder  Builder of user controls
     * @return {Promise<Opened>}            An opened stage
     *
     */
    open(background, waitLoad, controlBuilder) {
        assertObjectType(background, Background)
        assertType(waitLoad, 'boolean')
        assertType(controlBuilder, 'function')

        let controls = controlBuilder()

        assertType(controls, 'object')

        return new Promise((resolve, reject) => {
            return this.stage.open(background, opened => {
                resolve(opened)
            }, reject, controls, waitLoad)
        })
    }

    /**
     * Re-adjecting current stage
     *
     */
    refit() {
        this.stage.refit()
    }

    /**
     * Insert new event listener to an internal event
     *
     * @param {string}      type        Type of the target event
     * @param {function}    listener    listener
     *
     */
    addEventListener(type, listener) {
        this.events.add(type, listener)
    }

    /**
     * Remove a listener from listening an internal event
     *
     * @param {string}      type        Type of the target event
     * @param {function}    listener    listener
     *
     */
    removeEventListener(type, listener) {
        this.events.remove(type, listener)
    }
}

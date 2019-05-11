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

import { test as compatibilityTest } from './compatibility.js'
import { assertType, assertObjectType } from './common.js'
import { Events } from './events.js'
import { defaultStageControl, Stage, Background } from './stage.js'
import { drawPath, drawLine, drawRect, drawEllipse } from './stage.js'
import { HandlerResult } from './userctl.js'

export { defaultStageControl, Background, HandlerResult }
export { drawPath, drawLine, drawRect, drawEllipse }

export default function(drawer) {
    return new ImageMarker(drawer)
}

export class ImageMarker {
    constructor(stageDriver) {
        compatibilityTest()

        assertType(stageDriver, 'object')

        this.events = new Events()
        this.stage = new Stage(stageDriver, this.events)
    }

    teardown() {
        this.clear()
        this.stage.teardown()
    }

    clear() {
        this.events.clear()
        this.stage.clear()
    }

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

    refit() {
        return this.stage.refit()
    }

    addEventListener(type, listener) {
        this.events.add(type, listener)
    }

    removeEventListener(type, listener) {
        this.events.remove(type, listener)
    }
}

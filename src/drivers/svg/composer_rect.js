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

import { assertType } from '../../imagemarker/common.js'
import { drawRect } from '../../imagemarker/stage.js'
import { Composer as ParentComposer } from './composer.js'

const rectStartIndex = 0
const rectEndIndex = 1

class Composer extends ParentComposer {
    constructor(svg, properties) {
        super(svg)

        this.properties = properties
        this.path = null
        this.plots = [
            {x: 0, y: 0},
            {x: 0, y: 0}
        ]
    }

    type() {
        return drawRect
    }

    setStartPoint(x, y) {
        this.plots[rectStartIndex] = {x, y}
    }

    setEndPoint(x, y) {
        this.plots[rectEndIndex] = {x, y}
    }

    buildRectPath() {
        let data = ''

        if (this.plots.length !== 2) {
            return data
        }

        data += 'M' + this.plots[rectStartIndex].x + ','
                + this.plots[rectStartIndex].y

        data += ' L' + this.plots[rectEndIndex].x + ','
                + this.plots[rectStartIndex].y

        data += ' L' + this.plots[rectEndIndex].x + ','
                + this.plots[rectEndIndex].y

        data += ' L' + this.plots[rectStartIndex].x + ','
                + this.plots[rectEndIndex].y

        data += ' L' + this.plots[rectStartIndex].x + ','
                + this.plots[rectStartIndex].y

        data += ' Z'

        return data
    }
}

export class RectInserter extends Composer {
    constructor(svg, data, properties) {
        super(svg, properties)

        this.plots = data

        this.setPathElement(this.svg.insertDrawing(
            this.buildRectPath(), this.properties))
    }
}

export class RectComposer extends Composer {
    constructor(svg, resolve, reject, userctl, properties, drawingControl) {
        super(svg, properties)

        this.drawing = false
        this.resolve = resolve
        this.reject = reject

        this.userctl = userctl
        this.controls = drawingControl()

        assertType(this.controls, 'object')

        this.userctl.listens(this.controls, this)
    }

    start(x, y) {
        if (this.drawing) {
            return
        }

        this.drawing = true

        let pt = this.convertPos(x, y)

        this.setStartPoint(pt.x, pt.y)
        this.setEndPoint(pt.x, pt.y)
        this.setPathElement(this.svg.insertDrawing(
            this.buildRectPath(), this.properties))
    }

    draw(x, y) {
        if (!this.drawing) {
            return
        }

        let pt = this.convertPos(x, y)

        this.setEndPoint(pt.x, pt.y)
        this.set({
            'd': this.buildRectPath()
        })
    }

    done(x, y) {
        if (!this.drawing) {
            return
        }

        let pt = this.convertPos(x, y)

        this.setEndPoint(pt.x, pt.y)
        this.set({
            'd': this.buildRectPath()
        })

        this.clear()
    }

    clear() {
        this.drawing = false
        this.userctl.removes(this.controls)
        this.resolve(this)
    }
}

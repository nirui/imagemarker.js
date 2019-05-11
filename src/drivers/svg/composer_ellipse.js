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

import { assertType } from '../../imagemarker/common.js'
import { drawEllipse } from '../../imagemarker/stage.js'
import { Composer as ParentComposer } from './composer.js'

const ellipseStartIndex = 0
const ellipseEndIndex = 1

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
        return drawEllipse
    }

    setStartPoint(x, y) {
        this.plots[ellipseStartIndex] = {x, y}
    }

    setEndPoint(x, y) {
        this.plots[ellipseEndIndex] = {x, y}
    }

    getStartPoint() {
        let x = 0.0, y = 0.0

        if (this.plots[ellipseEndIndex].x > this.plots[ellipseStartIndex].x) {
            x = this.plots[ellipseStartIndex].x
        } else {
            x = this.plots[ellipseEndIndex].x
        }

        if (this.plots[ellipseEndIndex].y > this.plots[ellipseStartIndex].y) {
            y = this.plots[ellipseStartIndex].y
        } else {
            y = this.plots[ellipseEndIndex].y
        }

        return {x, y}
    }

    getEndPoint() {
        let x = 0.0, y = 0.0

        if (this.plots[ellipseEndIndex].x <= this.plots[ellipseStartIndex].x) {
            x = this.plots[ellipseStartIndex].x
        } else {
            x = this.plots[ellipseEndIndex].x
        }

        if (this.plots[ellipseEndIndex].y <= this.plots[ellipseStartIndex].y) {
            y = this.plots[ellipseStartIndex].y
        } else {
            y = this.plots[ellipseEndIndex].y
        }

        return {x, y}
    }

    getRadius(start, end) {
        return {
            x: end.x - start.x,
            y: end.y - start.y
        }
    }

    buildEllipsePath() {
        let data = ''

        if (this.plots.length !== 2) {
            return data
        }

        let startPos = this.getStartPoint(),
            endPos = this.getEndPoint(),
            rad = this.getRadius(startPos, endPos),
            differX = endPos.x - startPos.x,
            differY = endPos.y - startPos.y,
            middleX = differX / 2,
            middleY = differY / 2,
            cx = startPos.x + middleX,
            cy = startPos.y + middleY,
            radX = rad.x / 2,
            radY = rad.y / 2

        data += 'M' + (cx - radX) + ',' + cy + ' '
        data += 'a' + radX + ',' + radY + ' 0 1,0 ' + (radX * 2) + ',0 '
        data += 'a' + radX + ',' + radY + ' 0 1,0 -' + (radX * 2) + ',0'

        return data
    }
}

export class EllipseInserter extends Composer {
    constructor(svg, data, properties) {
        super(svg, properties)

        this.plots = data

        this.setPathElement(this.svg.insertDrawing(
            this.buildEllipsePath(), this.properties))
    }
}

export class EllipseComposer extends Composer {
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
            this.buildEllipsePath(), this.properties))
    }

    draw(x, y) {
        if (!this.drawing) {
            return
        }

        let pt = this.convertPos(x, y)

        this.setEndPoint(pt.x, pt.y)
        this.set({
            'd': this.buildEllipsePath()
        })
    }

    done(x, y) {
        if (!this.drawing) {
            return
        }

        let pt = this.convertPos(x, y)

        this.setEndPoint(pt.x, pt.y)
        this.set({
            'd': this.buildEllipsePath()
        })

        this.clear()
    }

    clear() {
        this.drawing = false
        this.userctl.removes(this.controls)
        this.resolve(this)
    }
}

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
import { drawPath } from '../../imagemarker/stage.js'
import { Composer as ParentComposer } from './composer.js'

class Composer extends ParentComposer {
    constructor(svg, properties) {
        super(svg)

        this.properties = properties
    }

    type() {
        return drawPath
    }

    savePathPoint(x, y) {
        this.plots.push({x, y})
    }

    buildDotPath() {
        let data = ''

        if (this.plots.length <= 0) {
            return data
        }

        data += 'M' + this.plots[0].x + ',' + this.plots[0].y

        for (let d = 1; d < this.plots.length; d++) {
            data += ' L' + this.plots[d].x + ',' + this.plots[d].y
        }

        return data
    }

    buildCurvePath() {
        let data = ''

        if (this.plots.length <= 0) {
            return data
        }

        data += 'M' + this.plots[0].x + ',' + this.plots[0].y + ' Q'

        let lastPoints = null,
            remained = (this.plots.length - 1) % 2

        for (let d = 1; d < this.plots.length; d++) {
            lastPoints = this.plots[d]

            data += this.plots[d].x + ',' + this.plots[d].y + ' '
        }

        for (let d = 0; d < remained; d++) {
            data += lastPoints.x + ',' + lastPoints.y + ' '
        }

        return data.trim()
    }

    pointDistance(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
    }

    angleOfCornerA(abDistance, a, b, c) {
        let bcDistance = this.pointDistance(b, c),
            caDistance = this.pointDistance(c, a),
            rad = (
                Math.pow(caDistance, 2) +
                Math.pow(abDistance, 2) -
                Math.pow(bcDistance, 2)
            ) / (2 * caDistance * abDistance)

        if (rad >= 1) {
            return 0
        }

        return Math.acos(rad)
    }

    compressPath() {
        if (this.plots.length < 3) {
            return
        }

        const maxMergeAngle = 0.08

        let i = 0,
            pointA = null,
            pointB = null,
            pointBIndex = 1,
            abDistance = 0

        while (i < this.plots.length) {
            if (!pointA) {
                pointA = this.plots[i]
                i++

                continue
            }

            if (!pointB) {
                pointB = this.plots[i]
                pointBIndex = i
                abDistance = this.pointDistance(pointA, pointB)
                i++

                continue
            }

            let angle = this.angleOfCornerA(
                abDistance, pointA, pointB, this.plots[i])

            if (angle < maxMergeAngle) {
                this.plots.splice(pointBIndex, 1)

                continue
            }

            pointA = null
            pointB = null
        }
    }
}

export class PathInserter extends Composer {
    constructor(svg, data, properties) {
        super(svg, properties)

        this.plots = data

        this.setPathElement(this.svg.insertDrawing(
            this.buildDotPath(), this.properties))
    }
}

export class PathComposer extends Composer {
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

        this.savePathPoint(pt.x, pt.y)
        this.setPathElement(this.svg.insertDrawing(
            this.buildDotPath(), this.properties))
    }

    draw(x, y) {
        if (!this.drawing) {
            return
        }

        let pt = this.convertPos(x, y)

        this.savePathPoint(pt.x, pt.y)
        this.set({
            'd': this.buildDotPath()
        })
    }

    done(x, y) {
        if (!this.drawing) {
            return
        }

        let pt = this.convertPos(x, y)

        this.savePathPoint(pt.x, pt.y)
        this.compressPath()
        this.set({
            'd': this.buildCurvePath()
        })

        this.clear()
    }

    clear() {
        this.drawing = false
        this.userctl.removes(this.controls)
        this.resolve(this)
    }
}

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

export class Composer {
    constructor(svg) {
        this.svg = svg
        this.plots = []
        this.path = null
    }

    element() {
        return this.path
    }

    set(properities) {
        if (!this.path) {
            return
        }

        return this.svg.setElement(this.path, properities)
    }

    setPathElement(el) {
        this.path = el
    }

    hasPathElement() {
        return !!this.path
    }

    convertPos(x, y) {
        x *= this.svg.zoomLevel
        y *= this.svg.zoomLevel
        x += this.svg.panX
        y += this.svg.panY

        return {x, y}
    }

    dimension() {
        if (this.plots.length <= 0) {
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }

        let rect = this.svg.rect(),
            maxX = this.plots[0].x,
            maxY = this.plots[0].y,
            minX = this.plots[0].x,
            minY = this.plots[0].y

        for (let p = 1; p < this.plots.length; p++) {
            if (this.plots[p].x > maxX) {
                maxX = this.plots[p].x
            }

            if (this.plots[p].y > maxY) {
                maxY = this.plots[p].y
            }

            if (this.plots[p].x < minX) {
                minX = this.plots[p].x
            }

            if (this.plots[p].y < minY) {
                minY = this.plots[p].y
            }
        }

        return {
            x: rect.x + ((minX - this.svg.panX) / this.svg.zoomLevel),
            y: rect.y + ((minY - this.svg.panY) / this.svg.zoomLevel),
            width: (maxX - minX) / this.svg.zoomLevel,
            height: (maxY - minY) / this.svg.zoomLevel
        }
    }

    data() {
        return this.plots
    }

    remove() {
        if (!this.path) {
            return
        }

        return this.svg.removeDrawing(this.path)
    }
}

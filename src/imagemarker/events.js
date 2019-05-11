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

export class Events {
    constructor() {
        this.events = {}
    }

    add(type, listener) {
        if (typeof this.events[type] !== 'object') {
            this.events[type] = []
        }

        this.events[type].push(listener)
    }

    remove(type, listener) {
        if (typeof this.events[type] !== 'object') {
            return
        }

        for (let e in this.events[type]) {
            if (this.events[type][e] !== listener) {
                continue
            }

            this.events[type].splice(e, 1)
            return
        }
    }

    fire(type, data) {
        if (typeof this.events[type] !== 'object') {
            return
        }

        for (let e in this.events[type]) {
            this.events[type][e](data)
        }
    }

    clear() {
        this.events = {}
    }
}

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

/**
 * Event manager
 *
 */
export class Events {
    /**
     * constructor
     *
     */
    constructor() {
        this.events = {}
    }

    /**
     * Insert new event listener into a type
     *
     * @param {string} type Type of the target event
     * @param {function} listener The listener that will be called when event
     *                            fired
     *
     */
    add(type, listener) {
        if (typeof this.events[type] !== 'object') {
            this.events[type] = []
        }

        this.events[type].push(listener)
    }

    /**
     * Remove the given event listener from a type
     *
     * @param {string} type Type of the target event
     * @param {function} listener The listener which was going to be called when
     *                            event fired
     *
     */
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

    /**
     * Fire a event
     *
     * @param {string} type Event type
     * @param data Event data
     *
     */
    fire(type, data) {
        if (typeof this.events[type] !== 'object') {
            return
        }

        for (let e in this.events[type]) {
            this.events[type][e](data)
        }
    }

    /**
     * Remove all event listeners
     *
     */
    teardown() {
        this.events = {}
    }
}

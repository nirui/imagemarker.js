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
 * Base Exception
 *
 */
export default class Exception {
    /**
     * constructor
     *
     * @param {string} message The error message
     *
     */
    constructor(message) {
        this.message = message
    }

    /**
     * Return the error message into a string
     *
     * @returns {string} The error message
     *
     */
    toString() {
        return '[ImageMarker] ' + this.message
    }
}

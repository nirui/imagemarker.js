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

export class IncompatibilityContextException extends Exception {
    constructor(msg) {
        super(msg + ", the web browser maybe incompatible")
    }
}

export function test() {
    try {
        if (typeof window !== 'object') {
            throw 'ImageMarker must running inside a web browser'
        }

        if (typeof window.Image !== 'function') {
            throw '`Image` object is undefined'
        }

        if (typeof window.document !== 'object') {
            throw '`document` object is undefined'
        }

        if (typeof window.document.implementation !== 'object') {
            throw '`window.document.implementation` is not an object'
        }

        if (typeof window.document.implementation.hasFeature !== 'function') {
            throw '`window.document.implementation` is not a function'
        }
    } catch(e) {
        throw new IncompatibilityContextException(e)
    }
}

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

export class UnexpectedTypeException extends Exception {
    constructor(givenType, expectedType) {
        super('Expecting the type to be "' + expectedType
            + '", got "' + givenType + '" instead')
    }
}

export function assertType(given, expected) {
    if (typeof given === expected) {
        return
    }

    throw new UnexpectedTypeException(typeof given, expected)
}

export function assertObjectType(given, expected) {
    if (given instanceof expected) {
        return
    }

    throw new UnexpectedTypeException(typeof given, expected)
}

export function isHTMLElement(el) {
    return el &&
        (el instanceof HTMLDocument ||
            (typeof el === 'object' && el.nodeType === 1))
}

export function filterDefault(def, val) {
    let obj = {}

    for (let i in def) {
        obj[i] = def[i]
    }

    for (let i in val) {
        if (typeof obj[i] !== 'undefined' && typeof obj[i] !== typeof val[i]) {
            throw new UnexpectedTypeException(
                typeof val[i], typeof obj[i])
        }

        if (typeof obj[i] === 'object' &&!(obj[i] instanceof Array)) {
            obj[i] = filterDefault(obj[i], val[i])

            continue
        }

        obj[i] = val[i]
    }

    return obj
}

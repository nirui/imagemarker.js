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

import { assertObjectType } from './common.js'

export class HandlerResult {
    constructor(context, continueNext) {
        this.context = context
        this.continue = continueNext
    }
}

export class UserCtl {
    constructor(rootElement, events) {
        this.el = rootElement
        this.events = events
        this.listeners = {}
    }

    listens(listeners, data) {
        let self = this

        for (let k in listeners) {
            if (typeof listeners[k] !== 'function') {
                continue
            }

            if (k.indexOf('_') === 0) {
                continue
            }

            if (typeof this.listeners[k] !== 'object') {
                this.listeners[k] = {
                    handler: e => {
                        this.events.fire('control.firing', k)

                        let lastContext = undefined

                        for (let i in self.listeners[k].listeners) {
                            let r = self.listeners[k].listeners[i].handler(
                                e,
                                lastContext,
                                self.listeners[k].listeners[i].data)

                            assertObjectType(r, HandlerResult)

                            if (!r.continue) {
                                this.events.fire('control.fired', k)
                                
                                return
                            }

                            lastContext = r.context
                        }

                        this.events.fire('control.fired', k)
                    },
                    listeners: []
                }

                this.el.addEventListener(k, this.listeners[k].handler)
            }

            this.listeners[k].listeners.push({
                handler: listeners[k],
                data: data
            })
        }
    }

    removes(listeners) {
        let self = this

        for (let k in listeners) {
            if (typeof listeners[k] !== 'function') {
                continue
            }

            if (k.indexOf('_') === 0) {
                continue
            }

            if (typeof this.listeners[k] !== 'object') {
                continue
            }

            for (let i in this.listeners[k].listeners) {
                if (this.listeners[k].listeners[i].handler !== listeners[k]) {
                    continue
                }

                this.listeners[k].listeners.splice(i, 1)
                break
            }

            if (this.listeners[k].listeners.length > 0) {
                continue
            }

            this.el.removeEventListener(k, this.listeners[k].handler)
            delete this.listeners[k]
        }
    }

    teardown() {
        for (let k in this.listeners) {
            this.el.removeEventListener(k, this.listeners[k].handler)
        }

        this.listeners = {}
    }
}

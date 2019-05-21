'use strict';

import './demo.css'

import {
    default as notation,
    Drawer,
    Background,
    drawPath,
    drawLine,
    drawRect,
    drawEllipse,
    defaultStageControl
} from '../src/imagemarker/imagemarker.js'
import { SVG, defaultDrawingControl } from '../src/drivers/svg/svg.js'

let images = [
    {
        url: 'https://drscdn.500px.org/photo/306011113/m%3D900/v2?user_id=72492805&webp=true&sig=91edca9cb5056c4890a3169c1ec6ec9d2dc8fce2701cfefa983e95b8932a73fd',
        width: 900,
        height: 556
    },
    {
        url: 'https://drscdn.500px.org/photo/306011111/m%3D900/v2?webp=true&sig=67b62ca9e45c6bab5680a1400e8d0b02abe347c022d462d31d0880ad08ca840c',
        width: 640,
        height: 900
    },
    {
        url: 'https://drscdn.500px.org/photo/304414039/m%3D900/v2?webp=true&sig=a2d335a2d42467bf6051bbb988a60aa01ab148727e5a648db261327faa992690',
        width: 601,
        height: 900
    },
    {
        url: 'https://drscdn.500px.org/photo/304414061/m%3D900/v2?user_id=72492805&webp=true&sig=2d1c3db38c0087315cc373831ef46364e5563e4f7cdd97593fb6bb801b3f6eb7',
        width: 900,
        height: 600
    },
    {
        url: 'https://drscdn.500px.org/photo/304414029/m%3D900/v2?user_id=72492805&webp=true&sig=e9b567ebef556434520e7eb7d0fba6e4162bd03f3550f24e6472d4e27b2d9543',
        width: 900,
        height: 601
    },
    {
        url: 'https://drscdn.500px.org/photo/304414021/m%3D900/v2?user_id=72492805&webp=true&sig=d498628f236e397595704bb6e44e88be5833c208918a8a8ef60a06b93a5dddee',
        width: 900,
        height: 576
    }
]
let img = notation(new SVG('preview-content'))
let imageSelection = document.getElementById('selector'),
    defaultImageSelect = null,
    openedStage = null,
    lastDrawn = null

async function setNewBackgroundImage(e) {
    try {
        if (openedStage !== null) {
            openedStage.close()
        }

        let url = e.getAttribute('data-url'),
            width = parseInt(e.getAttribute('data-width'), 10),
            height = parseInt(e.getAttribute('data-height'), 10)
        let opened = await img.open(
            new Background(url, width, height), true, defaultStageControl)

        openedStage = opened
    } catch(ee) {
        alert('Failed to load image: ' + ee)
    }
}

function addSeletorItem(item) {
    let el = document.createElement('li'),
        im = document.createElement('a')

    im.setAttribute('class', 'image')
    im.setAttribute('href', 'javascript:;')
    im.setAttribute('style', 'background-image: url(' + item.url + ')')
    im.setAttribute('data-url', item.url)
    im.setAttribute('data-width', item.width)
    im.setAttribute('data-height', item.height)

    el.appendChild(im)
    imageSelection.appendChild(el)

    im.addEventListener('click', e => {
        setNewBackgroundImage(im)
    })

    if (defaultImageSelect == null) {
        defaultImageSelect = im
    }
}

function renewLastDim() {
    if (!lastDrawn) {
        document.getElementById('floater').style.left = '0px'
        document.getElementById('floater').style.top = '0px'
        document.getElementById('floater').style.width = '0px'
        document.getElementById('floater').style.height = '0px'

        return
    }

    let dim = lastDrawn.dimension()

    document.getElementById('floater').style.left = dim.x + 'px'
    document.getElementById('floater').style.top = dim.y + 'px'
    document.getElementById('floater').style.width = dim.width + 'px'
    document.getElementById('floater').style.height = dim.height + 'px'
}

window.addEventListener('resize', e => {
    img.refit()
    renewLastDim()
})

for (let i in images) {
    addSeletorItem(images[i])
}

img.addEventListener('control.fired', d => {
    renewLastDim()
})

defaultImageSelect.click()

document.getElementById('ctl-reset').addEventListener('click', e => {
    try {
        if (!openedStage) {
            alert('Image not loaded')

            return
        }

        openedStage.reset()
    } catch(e) {
        alert('Cannot reset view due to error: ' + e)
    }
})

function drawer(composeType) {
    return async e => {
        try {
            if (!openedStage) {
                alert('Image not loaded')

                return
            }

            e.target.className = 'disabled'

            let drawn = await openedStage.compose(
                {}, defaultDrawingControl, composeType)

            lastDrawn = drawn
            renewLastDim()

            console.log(lastDrawn.data())

            setTimeout(() => {
                drawn.remove()

                if (lastDrawn !== drawn) {
                    return
                }

                lastDrawn = null
                renewLastDim()
            }, 10000)
        } catch(e) {
            alert('Failed to starting drawing due to error: ' + e)
        }

        e.target.className = ''
    }
}

document.getElementById('ctl-draw-path').
    addEventListener('click', drawer(drawPath))
document.getElementById('ctl-draw-line').
    addEventListener('click', drawer(drawLine))
document.getElementById('ctl-draw-rectangle').
    addEventListener('click', drawer(drawRect))
document.getElementById('ctl-draw-ellipse').
    addEventListener('click', drawer(drawEllipse))

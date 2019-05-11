import { default as assert } from 'assert'
import { Drawing } from '../svg.js'


describe('Drawing.pointDistance', function() {
    describe('Test #1', function() {
        const expected = 7.81
        let d = new Drawing(null, []),
            r = d.pointDistance({x: 3, y: 2}, {x: 9, y: 7})

        assert.equal(r.toFixed(2), expected)
    })

    describe('Test #2', function() {
        const expected = 11.66
        let d = new Drawing(null, []),
            r = d.pointDistance({x: -3, y: 5}, {x: 7, y: -1})

        assert.equal(r.toFixed(2), expected)
    })
})

describe('Drawing.pointDistance', function() {
    describe('Test #1', function() {
        const a = {x: 10, y: 20}, b = {x: 50, y: 40}, c = {x: 70, y: 30}
        const expected = 0.298
        let d = new Drawing(null, []),
            abDistance = d.pointDistance(a, b),
            r = d.angleOfCornerA(abDistance, a, b, c)

        assert.equal(r.toFixed(3), expected)
    })

    describe('Test #2', function() {
        const a = {x: 0, y: 0}, b = {x: 0, y: 40}, c = {x: 40, y: 40}
        const expected = 0.785
        let d = new Drawing(null, []),
            abDistance = d.pointDistance(a, b),
            r = d.angleOfCornerA(abDistance, a, b, c)

        assert.equal(r.toFixed(3), expected)
    })
})

describe('Drawing.compressPath', function() {
    // //   Y
    // // 6 |                 .
    // // 5 |               .
    // // 4 |             .
    // // 3 |           .
    // // 2 |   . . . .
    // // 1 | .
    // // 0 +-------------------- X
    // //     1 2 3 4 5 6 7 8 9
    // const plots1 = [
    //     {x: 1, y: 1},
    //     {x: 2, y: 2},
    //     {x: 2, y: 3},
    //     {x: 2, y: 4},
    //     {x: 2, y: 5},
    //     {x: 3, y: 6},
    //     {x: 4, y: 7},
    //     {x: 5, y: 8},
    //     {x: 6, y: 9}
    // ]
    //
    // describe('Test #1', function() {
    //     let d = new Drawing({
    //         insertDrawing(data) {}
    //     }, plots1)
    //
    //     console.log(d.compressPath(), d.plots)
    // })

    // //   Y
    // // 2 | . . . . . . . . .
    // // 1 |
    // // 0 +-------------------- X
    // //     1 2 3 4 5 6 7 8 9
    // const plots2 = [
    //     {x: 1, y: 2},
    //     {x: 2, y: 2},
    //     {x: 3, y: 2},
    //     {x: 4, y: 2},
    //     {x: 5, y: 2},
    //     {x: 6, y: 2},
    //     {x: 7, y: 2},
    //     {x: 8, y: 2},
    //     {x: 9, y: 2}
    // ]
    //
    // describe('Test #2', function() {
    //     let d = new Drawing({
    //         insertDrawing(data) {}
    //     }, plots2)
    //
    //     d.compressPath()
    //
    //     assert.deepEqual(d.plots, [{x: 1, y: 2}, {x: 9, y: 2}])
    // })

    //   Y
    // 9 |                 .
    // 8 |               .
    // 7 |             .
    // 6 |           .
    // 5 |         .
    // 4 |       .
    // 3 |     .
    // 2 |   .
    // 1 | .
    // 0 +-------------------- X
    //     1 2 3 4 5 6 7 8 9
    const plots3 = [
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 4},
        {x: 5, y: 5},
        {x: 6, y: 6},
        {x: 7, y: 7},
        {x: 8, y: 8},
        {x: 9, y: 9}
    ]

    describe('Test #3', function() {
        let d = new Drawing({
            insertDrawing(data) {}
        }, plots3)

        d.compressPath()

        assert.deepEqual(d.plots, [{x: 1, y: 1}, {x: 9, y: 9}])
    })
})

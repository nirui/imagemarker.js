imagemarker.js
================================================================================
An intuitive tool for adding annotates to the image

Install
--------------------------------------------------------------------------------
You can install this library by:

    npm install imagemarker.js

Usage
--------------------------------------------------------------------------------
You can find the usage in the Demo folder. Here is a simple summary:

### 1. Prepare the stage

Add a container element inside of your HTML file, for example

    <main id="preview-content"></main>
    <script src="demo.js"></script>

The `id` will be used to locate the container element.

### 2. Import the ImageMarker

Inside `demo.js`, write:

    import imagenotation from 'imagemarker.js'
    import { Background, drawPath, drawLine, drawRect, drawEllipse, defaultStageControl } from 'imagemarker.js'
    import { SVG, defaultDrawingControl } from 'imagemarker.js/dist/svg.js'

to import `ImageMarker` and `SVG` stage driver

### 3. Initialize the ImageMarker

    var marker = imagenotation(new SVG('preview-content'))

    window.addEventListener('resize', e => {
        marker.refit()
    })

### 4. Load a background image by opening a new stage

    let background = new Background('https://drscdn.500px.org/photo/306011113/m%3D900/v2', 900, 556)

    marker.open(background, true, defaultStageControl).then(function(opened) {
        // Want to draw a path?
        return opened.compose({}, defaultDrawingControl, drawPath)
    }).then(function(drawn)) {
        console.log(drawn) // Collect the drawn
    })

API reference
--------------------------------------------------------------------------------
See [API.md](API.md) file.

Contribute
--------------------------------------------------------------------------------
Please fork it away if you see this project useful or send an issue when you
encountered any problem.

Pull request to this repository maybe not be responded due to lack of freetime.

If you want to contact me through other means, please do so by sending email.

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

const
    webpack = require('webpack'),
    path = require('path')

module.exports = {
    entry: {
        imagemarker: path.join(__dirname, 'src', 'imagemarker', 'imagemarker.js'),
        svg: path.join(__dirname, 'src', 'drivers', 'svg', 'svg.js')
    },
    output: {
        library: '[name]',
        libraryTarget: 'umd',
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    optimization: {},
    plugins: [
        new webpack.BannerPlugin({
            banner: 'imagemarker.js '+
                'Copyright (C) 2019 Rui NI <ranqus@gmail.com>'
        })
    ]
}

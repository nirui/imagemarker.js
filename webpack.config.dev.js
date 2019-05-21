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
    path = require('path'),
    htmlWebpackPlugin = require('html-webpack-plugin'),
    miniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        demo: path.join(__dirname, 'demo', 'demo.js'),
    },
    devServer: {
        contentBase: path.join(__dirname, 'demo'),
        compress: true,
        host: '0.0.0.0',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.htm/,
                use: ['html-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, 'demo', 'demo.htm'),
            filename: path.join(__dirname, 'dist', 'demo.htm'),
        }),
        new miniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        })
    ]
}

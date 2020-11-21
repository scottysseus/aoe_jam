const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require("path");

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: 'docs',
        port: 3000
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'docs')
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'build/assets',
                    to: 'assets'

                },
                {
                    from: 'build/styles',
                    to: 'styles'

                }
            ]
        }),
        new HTMLWebpackPlugin({
            template: 'build/index.html',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.scss?$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.css?$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
        ]
    }
}
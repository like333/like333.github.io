const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var APP_PATH = path.resolve(ROOT_PATH, 'app');

module.exports = {
    entry: path.resolve(APP_PATH, 'index.js'),
    output: {
        filename: 'bundle.js',
        path: BUILD_PATH,
    },
    devServer: {
        // contentBase: path.join(__dirname, "main"),
        compress: true,
        port: 9000
    },
    module: {
        rules: [{
            test:/\.css$/,
            use:[{
                loader:"style-loader",
                loader:"css-loader"
            }]
        },
           {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings 
            }, {
                loader: "css-loader" // translates CSS into CommonJS 
            }, {
                loader: "sass-loader" // compiles Sass to CSS 
            }]
        },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    
                }
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/i,
                use:[
                    'url-loader?limit = 10000',
                    'img-loader'
                ]
            }

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({title:'fullpage'})
    ]
}
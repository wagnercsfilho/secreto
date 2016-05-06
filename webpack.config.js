var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve('./www/dist/'),
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [{
            test: /.(js|jsx)?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'stage-2']
            }
        }, 
        { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader") },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader!autoprefixer-loader") },
    //    { test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=100000" },
        { test: /\.(png|jpg|gif)$/, loader: "file-loader?name=../img/img-[hash:6].[ext]" }]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin('./css/bundle.css', {
            allChunks: true
        })
    ]
};

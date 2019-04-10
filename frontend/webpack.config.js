const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        //where webpack will serve the files
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

//L1 to include a build-in module called path
//L5 where webpack will start looking for all the dependencies which it will bundle together
//L6 where webpack will save bundle file
//L7 needs to be an absolute path
//L7 __dirname is the current absolute path of project - joining it with dist/js
//can specify mode here (dev/production mode) OR create npm scripts in package.json
//L10 webpack allow you to view source- code (bundled code) in dev tools
//L16 HtmlWebpackPlugin is from L2
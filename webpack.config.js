const path = require('path');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/main/js/index.tsx'),
    cache: true,
    mode: 'production',
    output: {
        path: path.join(__dirname, 'target/classes/static/built/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js", ".jsx"],
    },
    plugins: [
        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
        })
    ]
};
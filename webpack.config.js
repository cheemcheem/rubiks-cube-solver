const path = require('path');

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
    }
};
const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/main/js/index.tsx'),
    devtool: 'inline-source-map',
    cache: false,
    mode: 'development',
    output: {
        path: path.join(__dirname, 'target/classes/static/built/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    plugins: ["babel-plugin-transform-class-properties"]
                }
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
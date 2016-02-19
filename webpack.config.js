var path = require('path'),
    basePath = path.join(__dirname, 'public/javascripts/dev-tools-with-flux/src/');

module.exports = {
    entry: path.join(basePath, 'index.js'),
    output: {
        path: path.join(basePath, '../dist'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    // presets: ['react', 'es2015']
                    presets: ['react']
                }
            }
        ]
    }
};
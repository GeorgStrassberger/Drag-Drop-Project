const path = require('path');

module.exports = {
    entry: './src/app.ts', // einstiegspunkt angeben.
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // erstellt einen absoluten pfad zum dist Ordner
    }
};

let path = require('path');
let rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://wpaulk:multivision@ds235418.mlab.com:35418/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}
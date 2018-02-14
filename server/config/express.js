let express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {
    // compile function for our stylus middleware.
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    // configure our express app.
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'pug');
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));
    app.use(express.static(config.rootPath + '/public'));
}
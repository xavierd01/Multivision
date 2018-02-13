let express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ** Express Configuration **//
let app = express();

// compile function for our stylus middleware.
function compile(str, path) {
    return stylus(str).set('filename', path);
}

// configure our express app.
app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

// ** Database **//
// set up database connection
if(env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');
}
else {
    mongoose.connect('mongodb://wpaulk:multivision@ds235418.mlab.com:35418/multivision');
}
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('multivision db opened');
});

// ** Routing  **//
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

// catch all route
app.get('*', function(req, res) {
    res.render('index');
});

// ** Startup **//
let port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
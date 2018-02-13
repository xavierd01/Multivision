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
mongoose.connect('mongodb://localhost/multivision');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('multivision db opened');
});
// set up our schemas
let messageSchema = mongoose.Schema( { message: String } );
let Message = mongoose.model('Message', messageSchema);
let mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});

// ** Routing  **//
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

// catch all route
app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

// ** Startup **//
let port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
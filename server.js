let express = require('express');

let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ** Express Configuration **//
let app = express();

let config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

// ** Database **//
require('./server/config/mongoose')(config);

// ** Routing  **//
require('./server/config/routes')(app);

// ** Startup **//
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
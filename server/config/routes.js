let auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {
    
    app.get('/api/users', 
        auth.requiresApiLogin, 
        auth.requiresRole('admin'), 
        function(req, res) {
            User.find({}).exec(function(err, collection) {
                res.send(collection);
            });
    });
    
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', auth.logoutUser);
    
    // catch all route
    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}
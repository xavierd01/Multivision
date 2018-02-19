let auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses');

module.exports = function(app) {
    
    app.get('/api/users', 
        auth.requiresApiLogin, 
        auth.requiresRole('admin'), 
        users.getUsers);

    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);
    app.get('/api/courses/:id', courses.getCourseById);
    
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', auth.logoutUser);
    
    app.all('/api/*', function(req, res) {
        res.send(404);
    });
    
    // catch all route
    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}


module.exports = function(app) {
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });
    
    // catch all route
    app.get('*', function(req, res) {
        res.render('index');
    });
}
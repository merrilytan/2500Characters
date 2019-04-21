/*can add this module to any route needs to be protected 
module ensures authenticated */
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }
}
/*can add this module to any route needs to be protected 
module ensures authenticated */
module.exports = {
    ensureAuthenticatedWithRedirect: function(req, res, next) {
        console.log(req.user)
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    ensureAuthenticatedRest: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.sendStatus(401)
    }
}
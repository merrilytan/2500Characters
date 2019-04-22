const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

// Login Handle -- implements our Login strategy
router.post('/',
function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            res.status(401)
            return res.send(info)
        }
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            res.status(200);
            return res.send(user);
        });
    })(req, res, next);
  });

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if(user){
                //User exists
                const error = { message: 'Email is already registered'}; 
                res.status(401);
                res.send(error);
            } else {
                //Create new user (but only creates instance, not yet saved to db)
                const newUser = new User({
                    name,
                    email,
                    password
                });

                // Hash Password -- to turn our plain text password to hash
                // need to generate a salt in order to create a hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        //save user 
                        newUser.save()
                            .then(res.sendStatus(200))
                            .catch(err => console.log(err));
                })});
            }
        });
});

module.exports = router;
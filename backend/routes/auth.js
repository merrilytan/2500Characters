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
        if (err) { return next(err); }
        return res.sendStatus(200);
      });
    })(req, res, next);
  });

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    //let errors = [];
/*
    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords match
    if(password != password2){
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if(password.length < 6 ){
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if(errors.length > 0){
        //setTimeout(() => res.send(errors), 10000);
        res.send(errors);
    } else { */
        // Validation passed
        //check if at least one user exists
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
    //}
});

module.exports = router;
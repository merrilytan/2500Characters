const express = require('express');
const router = express.Router();
const passport = require('passport');

// User model
const User = require('../models/User');

// Login Handle -- implements our Login strategy
router.post('/', (req, res, next) => {
    passport.authenticate( 'local', { 
        successRedirect: '/',
        failureRedirect: '/login'
        //failureFlash: true
    })(req, res, next);
});

// Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

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
        res.send(errors);
    } else {
        // Validation passed
        //check if at least one user exists
        User.findOne({ email: email })
            .then(user => {
                if(user){
                    //User exists
                    errors.push({ msg: 'Email is already registered' });
                    res.send(errors);
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
                                .then(user => {
                                   // req.flash('success_msg', 'You are now registered and can log in');
                                    res.send();
                                })
                                .catch(err => console.log(err));
                    })});
                }
            });
    }
});

module.exports = router;
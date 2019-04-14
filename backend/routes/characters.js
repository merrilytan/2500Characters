const express = require('express');
const router = express.Router();

// Character model
const Character = require('../models/Character');

// Get character data
router.get('/get', (req, res, next) => {
    Character.find()
        .then((doc) => {
            console.log('hey', doc);
            res.render('characters');
        });
});

// Get character data
//router.get('/get', (req, res) => res.render('characters'));

// // Register Handle
// router.post('/register', (req, res) => {
//     const { name, email, password, password2 } = req.body;
//     let errors = [];

//     // Check required fields
//     if(!name || !email || !password || !password2) {
//         errors.push({ msg: 'Please fill in all fields' });
//     }

//     // Check passwords match
//     if(password != password2){
//         errors.push({ msg: 'Passwords do not match' });
//     }

//     // Check password length
//     if(password.length < 6 ){
//         errors.push({ msg: 'Password should be at least 6 characters' });
//     }

//     if(errors.length > 0){
//         res.render('register', {
//             errors,
//             name, 
//             email, 
//             password, 
//             password2
//         });
//     } else {
//         // Validation passed
//         //check if at least one user exists
//         User.findOne({ email: email })
//             .then(user => {
//                 if(user){
//                     //User exists
//                     errors.push({ msg: 'Email is already registered' });
//                     res.render('register', {
//                         errors,
//                         name, 
//                         email, 
//                         password, 
//                         password2
//                     });
//                 } else {
//                     //Create new user (but only creates instance, not yet saved to db)
//                     const newUser = new User({
//                         name,
//                         email,
//                         password
//                     });

//                     // Hash Password -- to turn our plain text password to hash
//                     // need to generate a salt in order to create a hash
//                     bcrypt.genSalt(10, (err, salt) => {
//                         bcrypt.hash(newUser.password, salt, (err, hash) => {
//                             if(err) throw err;
//                             // Set password to hashed
//                             newUser.password = hash;
//                             //save user 
//                             newUser.save()
//                                 .then(user => {
//                                     req.flash('success_msg', 'You are now registered and can log in');
//                                     res.redirect('/users/login');
//                                 })
//                                 .catch(err => console.log(err));
//                     })});
//                 }
//             });
//     }
// });

// // Login Handle -- implements our Login strategy
// router.post('/login', (req, res, next) => {
//     passport.authenticate( 'local', { 
//         successRedirect: '/dashboard',
//         failureRedirect: '/users/login',
//         failureFlash: true
//     })(req, res, next);
// });

// // Logout Handle
// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/users/login');
// });

module.exports = router;
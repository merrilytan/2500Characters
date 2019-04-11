const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Creates express server (listening to automatically assigned port/port 5000)
const app = express();

// Passport config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
// mongoose.connect(db, { useNewUrlParser: true })
//     .then(() => console.log('MongoDB Connected...'))
//     .catch(err => console.log(err));

// EJS -- app.use is to bind middleware to your application
app.use(expressLayouts);
app.set('view engine', 'ejs');
// view Engine is responsible for rendering the view into html form to the browser

// Bodyparser (included with Express) -- extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash -- use flash message which stores in a session and displays it after redirect
app.use(flash());

// Global Vars - custom middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); //can set global variables using res.locals
    res.locals.error_msg = req.flash('error_msg');   
    res.locals.error = req.flash('error');   
    next();
});

// Routes 
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const {ensureAuthenticated} = require('./config/auth');



// Load our app server using Express-------------------------------------------------------------
const app = express();


// Passport config-------------------------------------------------------------------------------
require('./config/passport')(passport);

// DB Config-------------------------------------------------------------------------------------
const db = require('./config/keys').MongoURI;

// Connect to Mongo------------------------------------------------------------------------------
mongoose.connect(db, { useNewUrlParser: true })
     .then(() => console.log('MongoDB Connected...'))
     .catch(err => console.log(err)); 

// View engine setup-----------------------------------------------------------------------------
//app.set('views', path.join(__dirname, 'views'));


// EJS -- app.use is to bind middleware to your application
//app.use(expressLayouts);
//app.set('view engine', 'ejs');
// view Engine is responsible for rendering the view into html form to the browser

// Bodyparser (included with Express)------------------------------------------------------------- 
// extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(express.urlencoded({ extended: false }));

// Express Session--------------------------------------------------------------------------------
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware----------------------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

// Connect flash----------------------------------------------------------------------------------
//use flash message which stores in a session and displays it after redirect
//app.use(flash());

// Global Vars - custom middleware----------------------------------------------------------------
/* app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); //can set global variables using res.locals
    res.locals.error_msg = req.flash('error_msg');   
    res.locals.error = req.flash('error');   
    next();
}); */




// Routes---------------------------------------------------------------------------------------
app.use('/login', express.static('public'));
app.use('/auth', require('./routes/auth'));
//app.use('/users', require('./routes/users'));

//1. entry (static file)
app.use('/',ensureAuthenticated, express.static('../frontend/dist'));
//2. API requests
app.use('/characters', ensureAuthenticated, require('./routes/characters'));
//app.use('/users', require('./routes/users'));

//practice
// app.get('/', (req, res) => {
//     console.log('Respomding to root route');
//     res.send('hello from root"');
// })

// app.get('/users', (req, res) => {
//     console.log('Respomding to users route');
//     res.send('hello from users"');
// })

// Listen for HTTP requests on localhost:27017----------------------------------------------------------
const PORT = process.env.PORT || 27017;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
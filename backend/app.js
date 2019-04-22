const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const {ensureAuthenticatedWithRedirect, ensureAuthenticatedRest} = require('./config/auth');
const MongoStore = require('connect-mongo')(session);

// Load our app server using Express-------------------------------------------------------------
const app = express();

// DB Config-------------------------------------------------------------------------------------
const db = require('./config/keys').MongoURI;

// Connect to Mongo------------------------------------------------------------------------------
mongoose.connect(db, { useNewUrlParser: true })
     .then(() => console.log('MongoDB Connected...'))
     .catch(err => console.log(err)); 

// Bodyparser (included with Express)------------------------------------------------------------- 
// extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(express.json())

// Express Session--------------------------------------------------------------------------------
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    // cookie: {secure: true,
    //     httpOnly: true,
    //     maxAge: 1000 * 60 * 60 * 24
    // }
}));

// Passport middleware----------------------------------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

// Passport config-------------------------------------------------------------------------------
require('./config/passport')(passport);

// Routes---------------------------------------------------------------------------------------

//1. Authentication
app.use('/login', express.static('public'));
app.use('/users', require('./routes/users'));

//2. Application
app.get('/profile/me', ensureAuthenticatedRest, (req,res,next)=> {
    const userData = {
        name: req.user.name
    }
   res.send(userData)
});

app.use('/characters', ensureAuthenticatedRest, require('./routes/characters'));
app.use('/', ensureAuthenticatedWithRedirect, express.static('../frontend/dist'));

// Listen for HTTP requests on localhost:27017----------------------------------------------------------
const PORT = process.env.PORT || 27017;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
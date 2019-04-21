const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var path = require('path');


// Dashboard
//router.get('/', ensureAuthenticated, (req, res) => 

// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '../../../frontend/dist/index.html'));
//     res.sendFile(path.join(__dirname + '../../public/index.html'));
// });


//module.exports = router;
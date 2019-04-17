const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


// Dashboard
router.get('/', ensureAuthenticated, (req, res) => 
    res.send('hello you are logged in'));

module.exports = router;
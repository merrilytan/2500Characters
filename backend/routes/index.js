const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
var path = require('path');


// Dashboard
router.get('/', ensureAuthenticated, (req, res) => 
res.send({t1: req.session.t1});
     res.sendFile(path.join(__dirname + '../../../frontend/dist/index.html'));
});


module.exports = router;
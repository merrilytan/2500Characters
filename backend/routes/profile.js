const express = require('express');
const router = express.Router();

// Dashboard
router.get('/', (req, res) => {
     const userData = {
          name: req.user.name
     }
     res.send(userData);
});


module.exports = router;
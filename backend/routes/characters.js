const express = require('express');
const router = express.Router();

// Character model-----------------------------------------------------------------------------
const Character = require('../models/Character');

// Get character data--------------------------------------------------------------------------
router.get('/get-set/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);
/*     const lessThan = (id * 100) + 1;
    const greaterThan = (id * 100) - 100; */
    const lessThan = 11;
    const greaterThan = 0;

    Character.find({
        characterID: {$gt: greaterThan, $lt: lessThan}
        }).sort({characterID: 1})    //better to sort first and get greaterThan or sort after?
            .then((doc) => {
                res.send(doc);
            });
});

module.exports = router;
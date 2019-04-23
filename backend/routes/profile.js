const express = require('express');
const router = express.Router();

// App model-----------------------------------------------------------------------------
const App = require('../models/App');

// Get User info-------------------------------------------------------------------------
router.get('/info', (req, res) => {
     const userData = {
          name: req.user.name
     }
     res.send(userData);
});

// Get User App data----------------------------------------------------------------------
router.get('/app', (req, res) => {
     const userID = req.user.id;
     
     App.find({userID: userID})
          .then(doc => res.send(doc));
});

// Save User App data----------------------------------------------------------------------
router.post('/app', (req, res) => {
     const { setStates, setStatus, characterStates } = req.body;
     const userID = req.user.id;

     App.findOne({userID: userID})
          .then(app => {
               if(app){
                    App.findOne({userID: userID}, function (err, doc){
                         console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeee');
                         doc.setStates = setStates;
                         doc.setStatus = setStatus; 
                         doc.characterStates = characterStates;
                         doc.save();
                    });
               } else {
                    const newApp = new App({
                         userID,
                         setStates,
                         setStatus,
                         characterStates
                    });
                    newApp.save()
                    .then(res.sendStatus(200))
                    .catch(err => console.log(err)); 
               }
          });
     
});

module.exports = router;
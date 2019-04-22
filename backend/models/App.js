const mongoose = require('mongoose');

const AppDataSchema = new mongoose.Schema({
    
    setStates: {
        type: [],
        required: true
    },
    setStatus: {
        type: [],
        required: true
    },
    characterStates: {
        type: [],
        required: true
    }
}, {collection: 'appdata'});

const AppData = mongoose.model('AppData', AppDataSchema);

module.exports = AppData;
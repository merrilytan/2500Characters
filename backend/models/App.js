const mongoose = require('mongoose');

const AppDataSchema = new mongoose.Schema({
    
    userID: {
        type: Number,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    pinYin: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    }
}, {collection: 'appdata'});

const AppData = mongoose.model('AppData', AppDataSchema);

module.exports = AppData;
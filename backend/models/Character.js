const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    
    characterID: {
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
}, {collection: 'characterbank'});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;
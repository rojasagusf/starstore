const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const constellationSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Constellation', constellationSchema);
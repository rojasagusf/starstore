const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const starSchema = new Schema({
    name: {
        type: String
    },
    constellation: {
        ref: 'Constellation',
        type: Schema.Types.ObjectId
    },
    magnitude: {
        type: String
    },
    distance: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Star', starSchema);
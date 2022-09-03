const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone: {    
        type: Number
    }
}, {
    timestamps: true
});

userSchema.statics.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};  

userSchema.statics.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};  

module.exports = mongoose.model('User', userSchema);
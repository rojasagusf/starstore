const mongoose = require('mongoose');

function connectToDB() {
    return mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`, {useNewUrlParser: true});
}

function connectMongoose() {
    return connectToDB()
        .then(() => {
            console.log('Connected to DB');
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = {
    connectMongoose
};
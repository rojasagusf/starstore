require('module-alias/register');
const path = require('path');
const envPath = path.join(__dirname, '/../../.env.test');
require('dotenv').config({path: envPath});
const {initialize} = require('@root/app');
const mongoose = require('mongoose');

function connectMongoose() {
    return mongoose.connect(
        `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}-tests`,
        {useNewUrlParser: true}
    )
        .then(() => {
            console.log('DB Connected');
        })
        .catch((error) => {
            console.log(error);
        });
}

function start() {
    return connectMongoose()
        .then(() => {
            return initialize();
        });
}

function finish() {
    return mongoose.connection.close();
}

module.exports = {
    start,
    finish
};
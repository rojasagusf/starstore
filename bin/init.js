require('dotenv').config();
require('module-alias/register');
const {initialize} = require('../app.js');
const {connectMongoose} = require('@root/db');
let application;

return connectMongoose()
    .then(() => {
        application = initialize();
        application.listen(process.env.PORT || 3000, () => {
            console.log('Server listening on port:', process.env.PORT || 3000);
        });
    })
    .catch((error) => {
        console.log('Error on connectMongoose:', error);
        return process.exit(1);
    });
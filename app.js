const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('@routes');

function initialize() {
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cors());
    app.use(cookieParser());
    app.use(helmet());
    app.use(morgan('dev'));

    Object.keys(routes).forEach((routeName) => {
        app.use('/api', routes[routeName]);
    });

    return app;
}

module.exports = {
    initialize
};
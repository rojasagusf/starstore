const express = require('express');
const router = express.Router();
const verifyIfUserExists = require('@middlewares');
const { signUp, logIn } = require('../controllers/auth');

router
    .post('/signup', verifyIfUserExists, signUp)
    .post('/login', logIn);

module.exports = router;    
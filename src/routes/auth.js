const express = require('express');
const router = express.Router();
const verifyIfUserExists = require('@middlewares');
const { signUp, signIn } = require('../controllers/auth');

router
    .post('/signup', verifyIfUserExists, signUp)
    .post('/signin', signIn);

module.exports = router;    
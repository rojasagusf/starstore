const express = require('express');
const router = express.Router();
const getConstellations = require('../controllers/constellation');

router
    .get('/constellations', getConstellations);

module.exports = router;
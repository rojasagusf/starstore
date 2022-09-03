const express = require('express');
const router = express.Router();
const {getStars, getStarById, createStar, updateStar, deleteStar} = require('../controllers/star');

router
    .get('/stars', getStars)
    .get('/stars/:starId', getStarById)
    .post('/stars', createStar)
    .put('/stars/:starId', updateStar)
    .delete('/stars/:starId', deleteStar);

module.exports = router;
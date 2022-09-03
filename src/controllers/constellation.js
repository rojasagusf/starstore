const Constellation = require('@models/constellation');

const getConstellations = (req, res) => {
    Constellation.find()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = getConstellations;
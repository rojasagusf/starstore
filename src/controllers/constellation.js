const Constellation = require('@models/constellation');

const getConstellations = (req, res) => {
    Constellation.find()
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
};

module.exports = getConstellations;
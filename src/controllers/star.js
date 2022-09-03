const Star = require('@models/star');

const getStars = (req, res) => {
    Star.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Error'
            });
            console.log(error);
        });
};

const getStarById = (req, res) => {
    Star.findOne({
        _id: req.params.starId
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

const createStar = (req, res) => {
    const {name, constellation, magnitude, distance, description, price} = req.body;
    let newStar = new Star({
        name,
        constellation,
        magnitude,
        distance,
        description,
        price
    });

    newStar.save()
        .then((response) => {
            res.status(200).send({response});
        })
        .catch((error) => {
            console.log(error);
        });
};

const updateStar = (req, res) => {
    const {name, constellation, magnitude, distance, description, price} = req.body;
    Star.findByIdAndUpdate(
        {_id: req.params.starId},
        {$set: {
            name,
            constellation,
            magnitude,
            distance,
            description,
            price
        }} 
    )
        .then(() => {
            res.status(200).send('Star Updated');
        })
        .catch((error) => {
            console.log(error);
        });
};

const deleteStar = (req, res) => {
    Star.deleteOne({
        _id: req.params.starId
    })
        .then(() => {
            res.status(200).send('Star Deleted');
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    getStarById,
    getStars,
    createStar,
    updateStar,
    deleteStar
};
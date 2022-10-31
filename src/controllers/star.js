const Star = require('@models/star');

const getStars = (req, res) => {
    Star.find()
        .then((data) => {
            return res.status(200).json({
                error: null,
                data,
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
};

const getStarById = (req, res) => {
    Star.findOne({
        _id: req.params.starId
    })
        .then((data) => {
            return res.status(200).json({
                error: null,
                data,
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error
            });
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
            return res.status(200).json({
                error: null,
                data: response,
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error
            });
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
            return res.status(200).json({
                error: null,
                data: 'Star Updated Successfully',
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
};

const deleteStar = (req, res) => {
    Star.deleteOne({
        _id: req.params.starId
    })
        .then(() => {
            return res.status(200).json({
                error: null,
                data: 'Star Deleted Successfully',
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
};

module.exports = {
    getStarById,
    getStars,
    createStar,
    updateStar,
    deleteStar
};
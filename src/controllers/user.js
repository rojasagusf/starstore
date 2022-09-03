const User = require('@models/user');

const getUsers = (req, res) => {
    return User.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            console.log('error:', error);
        });
};

module.exports = getUsers;
const User = require('@models/user');

const getUsers = (req, res) => {
    return User.find()
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

module.exports = getUsers;
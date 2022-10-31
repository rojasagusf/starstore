const User = require('@models/user');

const verifyIfUserExists = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then((userFound) => {
            if(userFound) {
                res.status(401).json({
                    error: 'User already exists',
                    data: null,
                });
            }

            next();
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
};

module.exports = verifyIfUserExists;


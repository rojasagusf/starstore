const User = require('@models/user');

const verifyIfUserExists = (req, res, next) => {
    User.find({email: req.body.email})
        .then((userFound) => {
            if(userFound) {
                res.status(401).json({messae: 'User already exists'});
            }

            next();
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = verifyIfUserExists;


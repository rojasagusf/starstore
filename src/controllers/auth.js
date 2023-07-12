const {User} = require('@models/index');
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
    const {name, lastName, email, password, phone} = req.body;
    const hashPassword = await User.hashPassword(password);

    let newUser = new User({
        name,
        lastName,
        email,
        password: hashPassword,
        phone
    });

    newUser.save()
        .then((data) => {
            const token = jwt.sign({id: data._id}, process.env.JWT_SECRET, {
                expiresIn: 86400
            });

            return res.header('auth-token', token).json({
                error: null,
                data: token,
            });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error
            });
        });
};

const logIn = (req, res) => {
    const email = req.body.email.toLowerCase();
    User.findOne({email})
        .then(async (userFound) => {
            if(!userFound) {
                return res.status(400).json({
                    error: 'User not found',
                    data: null,
                });
            }
            const matchPassword = await User.comparePassword(req.body.password, userFound.password);
            if(!matchPassword) {
                return res.status(400).json({
                    error: 'Incorrect password',
                    data: null,
                });
            }

            const token = jwt.sign({name: userFound.name, id: userFound._id}, process.env.JWT_SECRET, {
                expiresIn: 86400
            });

            return res.header('auth-token', token).json({
                error: null,
                data: token,
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
    signUp,
    logIn
};
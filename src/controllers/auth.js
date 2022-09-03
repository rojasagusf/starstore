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

            res.status(200).json({token});
        })
        .catch((error) => {
            console.log(error);
        });
};

const signIn = (req, res) => {
    const email = req.body.email.toLowerCase();
    User.findOne({email})
        .then(async (userFound) => {
            if(!userFound) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            const matchPassword = await User.comparePassword(req.body.password, userFound.password);
            if(!matchPassword) {
                return res.send('nope');
            }

            const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET, {
                expiresIn: 86400
            });

            res.status(200).json({token});
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    signUp,
    signIn
};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../db/postgresql/models/user');

const { registerValidation, loginValidation } = require('../validation');

const register = async (req, res) => {
    console.log(req.body);
    
    // Validate user input
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Check if email is already taken
    const emailExists = await User.findOne({ where: { email: req.body.email } });

    if (emailExists) {
        return res.status(400).json({ error: 'Email is already taken!' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user object and save it in the database
    const userObject = ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await User.create(userObject);
        res.json({ error: null, data: savedUser });
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = {
    register
};
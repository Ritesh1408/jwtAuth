const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register Endpoint
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send('User already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({ first_name, last_name, email, password_hash });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong');

    // Validate password
    const validPass = await bcrypt.compare(password, user.password_hash);
    if (!validPass) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).send({ token });
});

// Protected Endpoint
router.post('/protected', require('../middlewares/auth'), (req, res) => {
    res.send('This is a protected route');
});

module.exports = router;

const express = require('express');
const User = require('../models/user');
const Candidate = require('../models/candidate');

const router = express.Router();

// Middleware for API Key Authentication
const apiKeyAuth = (req, res, next) => {
    const apiKey = req.header('x-api-key');
    if (apiKey === process.env.API_KEY) {
        return next();
    } else {
        return res.status(401).send('Unauthorized API Key');
    }
};

// Get User Profile by API Key
router.post('/profile', apiKeyAuth, async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');
        res.send(user);
        
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get Candidates by API Key
router.get('/candidate', apiKeyAuth, async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        const candidates = await Candidate.find({ user_id: user._id });
        res.send(candidates);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

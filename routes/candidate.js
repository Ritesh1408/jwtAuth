const express = require('express');
const auth = require('../middlewares/auth');
const Candidate = require('../models/candidate');

const router = express.Router();

// Add Candidate
router.post('/candidate', auth, async (req, res) => {
    const { first_name, last_name, email } = req.body;
    const candidate = new Candidate({
        first_name,
        last_name,
        email,
        user_id: req.user._id
    });

    try {
        const savedCandidate = await candidate.save();
        res.send(savedCandidate);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get Candidates for Current User
router.get('/candidate', auth, async (req, res) => {
    try {
        const candidates = await Candidate.find({ user_id: req.user._id });
        res.send(candidates);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;

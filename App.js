const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const candidateRoutes = require('./routes/candidate');
const publicApiRoutes = require('./routes/publicApi');

const app = express();

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// Routes
app.use('/api', authRoutes);
app.use('/api', candidateRoutes);
app.use('/api/public', publicApiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

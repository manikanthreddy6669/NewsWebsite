const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const newsRoutes = require('./routes/news');
const path = require('path');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', newsRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

module.exports = app; // Ensure the app is exported correctly

console.log('Mongo URI:', process.env.MONGO_URI);

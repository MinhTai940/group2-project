const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'server.env') });

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URI) {
  console.error('❌ MISSING MONGO_URI in .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

const userRoutes = require('./routes/user');
app.use('/', userRoutes);

module.exports = app;


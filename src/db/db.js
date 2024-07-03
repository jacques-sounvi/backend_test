const mongoose = require('mongoose');
require('dotenv').config(); // Chargez les variables d'environnement depuis .env

const mongoURI = process.env.DB_HOST;
const options = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
};

mongoose.connect(mongoURI, options)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
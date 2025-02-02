const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(`DB connection error: ${err}`);
  }
};

module.exports = connectToDb;
const mongoose = require("mongoose");

// Database configuration
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;

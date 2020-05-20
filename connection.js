const mongoose = require("mongoose");
require("dotenv/config");

const connection = mongoose.connect(
  process.env.DB_Connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (req, res) => {
    console.log("Connected to the database");
  }
);

module.exports = connection;

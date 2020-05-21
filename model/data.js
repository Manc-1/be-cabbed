const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

const Data = new mongoose.Schema({
  points: [{}],
  time: String,
  type: String
});

Data.plugin(timestamps);


module.exports = mongoose.model("data", Data);
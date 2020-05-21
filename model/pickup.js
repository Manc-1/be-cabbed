const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

const Pickup = new mongoose.Schema({
  lat: Number,
  long: Number,
  date: Date
});

Pickup.plugin(timestamps);


module.exports = mongoose.model("pickup", Pickup);
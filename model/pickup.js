const mongoose = require("mongoose");

var moment = require("moment");

const Pickup = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  date: { type: String, default: () => moment().format("dddd, MMMM Do YYYY") },
  time: { type: String, default: () => moment().format("h:mm:ss") },
});

module.exports = mongoose.model("pickup", Pickup);

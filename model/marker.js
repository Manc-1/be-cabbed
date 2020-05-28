const mongoose = require("mongoose");
var moment = require("moment");

const Marker = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  type: { type: String, required: true },
  date: { type: String, default: () => moment().format("dddd, MMMM Do YYYY") },
  time: { type: String, default: () => moment().format("h:mm:ss") },
  user: { type: String, required: true }
});

module.exports = mongoose.model("marker", Marker);

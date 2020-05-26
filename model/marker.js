const mongoose = require("mongoose");
var moment = require('moment');

const Marker = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  type: String,
  date: {type: String, default: () => moment().format("dddd, MMMM Do YYYY")},
  time: {type: String, default: () => moment().format("h:mm:ss a")}
});



module.exports = mongoose.model("marker", Marker);
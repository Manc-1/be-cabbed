const mongoose = require("mongoose");
var moment = require('moment');

const Pickup = new mongoose.Schema({
  lat: Number,
  long: Number,
  date: {type: String, default: () => moment().format("dddd, MMMM Do YYYY")},
  time: {type: String, default: () => moment().format("h:mm:ss a")}
});



module.exports = mongoose.model("pickup", Pickup);
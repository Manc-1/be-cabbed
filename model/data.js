const mongoose = require("mongoose");

const Data = new mongoose.Schema({
  points: [{}],
  time: String,
  type: String
});

//need to install mongoose-timestamp and require timestamp for the schema but leave as string for now


module.exports = mongoose.model("data", Data);
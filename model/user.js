const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  postCode: { type: String, required: true },
  userAvatar: { type: String, required: false },
});

module.exports = mongoose.model("user", User);

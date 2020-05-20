const connection = require("../connection");
const User = require("../model/user");

exports.getUserById = async ({ _id }) => {
  await User.findOne({ _id: _id }, function (err, user) {
    console.log(user, "First user");
    try {
      if (err) {
        console.log("Double check");
        return res.status(500).send("500");
      }
      if (!_id) {
        return res.status(404).send("404");
      }
      console.log("Hello Twice");
      return user;
    } catch (err) {
      res.status(404).send("EVERYTHING IS IN FLAMES");
    }
  });
};

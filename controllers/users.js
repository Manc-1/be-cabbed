const User = require("../model/user.js");

exports.sendUserById = (req, res, next) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .then(({ name, _id }) => {
      res.status(200).send({
        user: {
          name,
          _id,
        },
      });
    })
    .catch((err) => {
      console.log("Are we here?");
    });
};

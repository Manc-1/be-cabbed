const User = require("../model/user.js");
const argon2 = require("argon2");
require("dotenv/config");

exports.sendUserById = (req, res) => {
  const { _id } = req.params;
  User.findOne({ _id }, (err, user) => {
    if (err) res.status(404).send({ msg: "Id not found" });
    else
      res.status(200).send({
        user: { ...user._doc, password: null },
      });
  });
};

exports.createNewUser = async (req, res, next) => {
  const { name, password, email, phoneNumber, postCode, userAvatar } = req.body;
  let hash;
  let emailtest = await User.findOne({ email }).then((result) => {
    return result;
  });
  if (emailtest != null) {
    res.status(400).send({ msg: "E-mail adress is already in the Database" });
  } else {
    try {
      hash = await argon2.hash(password, process.env.hashSalt);
      const myuser = new User({
        name,
        password: hash,
        email,
        phoneNumber,
        postCode,
        userAvatar,
      });
      await myuser.save();
      res.status(201).send({ user: { ...myuser._doc, password: null } });
    } catch (err) {
      res
        .status(400)
        .send({ msg: "Error while processing user entry to database" });
    }
  }
};

exports.loginUser = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(400).send({ msg: "Bad request" });
  }
  User.findOne({ email }, async function (err, user) {
    try {
      if (!user) {
        return res.status(404).send({ msg: "E-mail not found" });
      }
      encodedHash = user.password;
      if (await argon2.verify(encodedHash, password)) {
        return res.status(201).send({ user: { ...user._doc, password: null } });
      } else {
        return res.status(404).send({ msg: "Password incorrect" });
      }
    } catch (err) {
      res.status(500).send({ msg: "Something went wrong" });
    }
  });
};

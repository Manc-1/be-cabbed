const User = require("../model/user.js");
const argon2 = require("argon2");
require("dotenv/config");

exports.sendUserById = (req, res) => {
  const { _id } = req.params;
  User.findOne({ _id }, (err, user) => {
    if (err) res.status(404).send("Id not found");
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
    res.status(400).send("E-mail adress is already taken");
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
      res.status(200).send({ user: { ...myuser._doc, password: null } });
    } catch (err) {
      console.log(err);
      res.send("message: err");
    }
  }
};

exports.loginUser = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email }, async function (err, user) {
    try {
      if (err) {
        console.log(err);
        return res.status(500).send("500");
      }
      if (!user) {
        return res.status(404).send("404");
      }
      encodedHash = user.password;
      if (await argon2.verify(encodedHash, password)) {
        return res.status(200).send({ user: { ...user._doc, password: null } });
      }
    } catch (err) {
      res.status(404).send("All goes up");
    }
  });
};

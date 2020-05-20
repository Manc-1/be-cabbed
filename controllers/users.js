const User = require("../model/user.js");
const argon2 = require("argon2");
require("dotenv/config");

exports.sendUserById = (req, res, next) => {
  const { _id } = req.params;
  User.findOne({ _id }, (err, user) => {
    if (err) res.status(404).send("Id not found");
    else
      res.status(200).send({
        user: { ...user._doc, password: null },
      });
  }).catch(next);
};

exports.createNewUser = async (req, res, next) => {
  const username = req.body.name;
  const password = req.body.password;
  let hash;
  try {
    hash = await argon2.hash(password, process.env.hashSalt);
    const myuser = new User({ name: username, password: hash });
    await myuser.save();
    const { name, _id } = myuser;
    res.status(200).send({ user: { ...myuser._doc, password: null } });
  } catch (err) {
    console.log(err);
    res.send("message: err");
  }
};

exports.loginUser = async (req, res, next) => {
  let username = req.body.name;
  let password = req.body.password;
  User.findOne({ name: username }, async function (err, user) {
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

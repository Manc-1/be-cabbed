const express = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");
const User = require("./model/user");

require("dotenv/config");

const app = express();
const port = 9090;

app.use(express.json());

mongoose.connect(
  process.env.DB_Connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (req, res) => {
    console.log("Connected to the database");
  }
);
app.get("/", (req, res) => res.send("Hello World!"));

app.post("/login", function (req, res) {
  let username = req.body.name;
  let password = req.body.password;
  console.log(username, password);

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
        console.log(encodedHash);
        return res.status(200).send("200");
      }
    } catch (err) {
      res.status(404).send("All goes up");
    }
  });
});

app.post("/create_user", async (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  let hash;

  try {
    hash = await argon2.hash(password, process.env.hashSalt);
    const myuser = new User({ name: username, password: hash });
    await myuser.save();
    res.send(myuser);
  } catch (err) {
    console.log(err);
    res.send("message: err");
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;

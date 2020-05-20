const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD

const apiRouter = require('./routes/apiRouter')


const argon2 = require("argon2");

const User = require("./model/user");
=======
>>>>>>> parent of 0e5978d... Merge pull request #3 from Manc-1/mongooseconnection

const User = require("./model/user");
require("dotenv/config");

const app = express();
const port = 9090;

mongoose.Promise = global.Promise;
 
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/create_user", async (req, res) => {
  try {
    const myuser = new User(req.body);
    await myuser.save();
    res.send(myuser);
  } catch (err) {
    res.send("message: err");
  }
});

<<<<<<< HEAD

app.use('api', apiRouter);

before((done) => {
  mongoose.connect(
    process.env.DB_Connection,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (req, res) => {
      console.log("Connected to the database");
      done();
    }
  );
})
// mongoose.connect(
//   process.env.DB_Connection,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   (req, res) => {
//     console.log("Connected to the database");
//   }
// );

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done()
    })
})



=======
mongoose.connect(
  process.env.DB_Connection,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (req, res) => {
    console.log("Connected to the database");
  }
);
>>>>>>> parent of 0e5978d... Merge pull request #3 from Manc-1/mongooseconnection

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;

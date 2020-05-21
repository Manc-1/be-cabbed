const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./routes/apiRouter");

const connection = require("./connection");

const { handleCustomErrors, handle500s } = require("./errors");

const User = require("./model/user");

const app = express();

mongoose.Promise = global.Promise;

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handle500s);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;

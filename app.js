const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./routes/apiRouter");

const connection = require("./connection");

const {
  handleCustomErrors,
  handle500s,
  handleInvalidPaths,
} = require("./errors");

const User = require("./model/user");

const app = express();

mongoose.Promise = global.Promise;

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", handleInvalidPaths);

app.use(handleCustomErrors);
app.use(handle500s);

app.listen(process.env.PORT || 3000, () =>
  console.log(`App listening at http://localhost:${process.env.PORT}`)
);

module.exports = app;

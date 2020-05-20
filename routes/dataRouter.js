const dataRouter = require("express").Router();

dataRouter.route("/").get(function () {
  console.log("Does this work?");
});

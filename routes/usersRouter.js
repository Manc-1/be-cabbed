const usersRouter = require("express").Router();
const { sendUserById } = require("../controllers/users");

usersRouter.route("/:_id").get(sendUserById);

module.exports = usersRouter;

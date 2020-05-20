const usersRouter = require("express").Router();
const {
  sendUserById,
  createNewUser,
  loginUser,
} = require("../controllers/users");

usersRouter.route("/:_id").get(sendUserById);

usersRouter.route("/create_user").post(createNewUser);

usersRouter.route("/login").post(loginUser);

module.exports = usersRouter;

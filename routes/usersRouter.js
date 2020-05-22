const usersRouter = require("express").Router();
const {
  sendUserById,
  createNewUser,
  loginUser,
} = require("../controllers/users");

const { send405Error } = require("../errors/index");

usersRouter.route("/user_id/:_id").get(sendUserById).all(send405Error);

usersRouter.route("/create_user").post(createNewUser).all(send405Error);

usersRouter.route("/login").post(loginUser).all(send405Error);

module.exports = usersRouter;

const apiRouter = require("express").Router();

const usersRouter = require("./usersRouter");
const dataRouter = require("./dataRouter");

apiRouter.use("/users", usersRouter);
apiRouter.use("/data", dataRouter);

module.exports = apiRouter;

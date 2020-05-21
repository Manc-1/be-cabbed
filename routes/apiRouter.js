const apiRouter = require("express").Router();

const usersRouter = require("./usersRouter");
const pickupRouter = require("./pickupRouter");

apiRouter.use("/users", usersRouter);
apiRouter.use("/pickup", pickupRouter);

module.exports = apiRouter;

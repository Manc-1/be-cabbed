const apiRouter = require("express").Router();

const usersRouter = require("./usersRouter");
const pickupRouter = require("./pickupRouter");
const markerRouter = require('./markerRouter');

apiRouter.use("/users", usersRouter);
apiRouter.use("/pickup", pickupRouter);
apiRouter.use('/marker', markerRouter)

module.exports = apiRouter;

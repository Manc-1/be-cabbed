const apiRouter = require("express").Router();

const usersRouter = require("./usersRouter");
const pickupRouter = require("./pickupRouter");
const markerRouter = require("./markerRouter");
const { send405Error } = require("../errors/");
const { sendEndpoints } = require("../controllers/api");

apiRouter.route("/").get(sendEndpoints).all(send405Error);

apiRouter.use("/users", usersRouter);
apiRouter.use("/pickup", pickupRouter);
apiRouter.use("/marker", markerRouter);

module.exports = apiRouter;

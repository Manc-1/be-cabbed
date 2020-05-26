const pickupRouter = require("express").Router();
const {
  sendPickup,
  postPickup,
  sendPickupFromHour,
  sendPickupFromPastHours
} = require("../controllers/pickup");

const { send405Error } = require("../errors/index");

pickupRouter.route("").get(sendPickup).post(postPickup).all(send405Error);

pickupRouter.route("/hour").get(sendPickupFromHour).all(send405Error);

pickupRouter.route('/pasthour').get(sendPickupFromPastHours).all(send405Error);


module.exports = pickupRouter;

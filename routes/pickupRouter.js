const pickupRouter = require("express").Router();
const {sendPickup, postPickup, sendPickupFromHour} = require('../controllers/pickup')

pickupRouter.route('')
.get(sendPickup)
.post(postPickup);

pickupRouter.route('/hour')
.get(sendPickupFromHour);

module.exports = pickupRouter;

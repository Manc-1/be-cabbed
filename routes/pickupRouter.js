const pickupRouter = require("express").Router();
const {sendPickup, postPickup} = require('../controllers/pickup')

pickupRouter.route('')
.get(sendPickup)
.post(postPickup);

module.exports = pickupRouter;

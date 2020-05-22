const markerRouter = require("express").Router();
const {
  postMarker,
  sendMarker,
  sendMarkerFromHour,
} = require("../controllers/marker");

const { send405Error } = require("../errors/index");

markerRouter.route("").get(sendMarker).post(postMarker).all(send405Error);

markerRouter.route("/hour").get(sendMarkerFromHour).all(send405Error);

module.exports = markerRouter;

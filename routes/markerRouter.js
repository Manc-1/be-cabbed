const markerRouter = require("express").Router();
const {postMarker, sendMarker, sendMarkerFromHour} = require('../controllers/marker')

markerRouter.route('')
.get(sendMarker)
.post(postMarker);

markerRouter.route('/hour')
.get(sendMarkerFromHour)

module.exports = markerRouter;


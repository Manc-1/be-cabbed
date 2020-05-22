const markerRouter = require("express").Router();
const {postMarker, sendMarker} = require('../controllers/marker')

markerRouter.route('')
.get(sendMarker)
.post(postMarker);

module.exports = markerRouter;

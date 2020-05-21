const dataRouter = require("express").Router();
const {sendData} = require('../controllers/data')

dataRouter.route('/').get(sendData);

module.exports = dataRouter;

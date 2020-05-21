const dataRouter = require("express").Router();
const {sendData, postData} = require('../controllers/data')

dataRouter.route('/')
.get(sendData)
.post(postData);

module.exports = dataRouter;

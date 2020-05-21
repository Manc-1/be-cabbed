const dataRouter = require("express").Router();
const {sendData} = require('../controllers/data')

dataRouter.route('/').get(() => {
  console.log('in router')
});

module.exports = dataRouter;

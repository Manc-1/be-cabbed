const Pickup = require("../model/pickup.js");
require("dotenv/config");
const moment = require('moment');

exports.sendPickup = (req, res, next) => {
    Pickup.find({}, function(err, pickup) {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send({pickup});
        }
      })
}

exports.sendPickupFromHour = (req, res, next) => {
  const myDate = new Date(Date.now())
  const myDateStart = new Date(Date.now() - 1 * 60 * 60 * 1000)
  const myTime = moment(myDate).format("h:mm:ss a")
  const myTimeStart = moment(myDateStart).format("h:mm:ss a")
  Pickup.find({time: { $gte : myTimeStart, $lte :  myTime }}, function(err, pickup) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({pickup});
      }
    })
}

exports.postPickup = async (req, res, next) => {
    const { lat, long } = req.body;
    try {
        const newPickup = new Pickup({
            lat, 
            long,
        })
        await newPickup.save();
        res.status(200).send({pickup: {...newPickup}})
    } catch(err){
        res.send('error')
    }
}

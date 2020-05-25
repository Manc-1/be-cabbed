const Pickup = require("../model/pickup.js");
require("dotenv/config");
const moment = require("moment");

exports.sendPickup = (req, res, next) => {
  Pickup.find({}, function (err, pickup) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ pickup });
    }
  });
};

exports.sendPickupFromHour = (req, res, next) => {
  const myDate = new Date(Date.now());
  const myDateStart = new Date(Date.now() - 1 * 60 * 60 * 1000);
  const myTime = moment(myDate).format("h:mm:ss a");
  const myTimeStart = moment(myDateStart).format("h:mm:ss a");
  Pickup.find({ time: { $gte: myTimeStart, $lte: myTime } }, function (
    err,
    pickup
  ) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ pickup });
    }
  });
};

exports.sendPickupFromPastHours = (req, res, next) => {
  let myDate = new Date(Date.now());
  let myDateStart = new Date(Date.now() - 1 * 60 * 60 * 1000);
  const myTime = moment(myDate).format("h:mm:ss a");
  const myTimeStart = moment(myDateStart).format("h:mm:ss a");
  const orArray = [];
  for (let i = 1; i++; i < 5) {
    myDate += 7 * 24 * 60 * 60 * 1000;
    orArray.push({ day: moment(myDate).format("dddd, MMMM Do YYYY") });
  }
  Pickup.find(
    { time: { $gte: myTimeStart, $lte: myTime }, $or: orArray },
    function (err, marker) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({ marker });
      }
    }
  );
};

exports.postPickup = async (req, res, next) => {
  const { lat, long } = req.body;
  try {
    const newPickup = new Pickup({
      lat,
      long,
    });
    await newPickup.save();
    res.status(200).send({ pickup: { ...newPickup._doc } });
  } catch (err) {
    res.status(400).send({ msg: "Bad Request" });
  }
};

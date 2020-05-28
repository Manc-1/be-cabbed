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
  const formattedDate = moment(myDate).format("dddd, MMMM Do YYYY")
  const myDateStart = new Date(Date.now() - 1 * 60 * 60 * 1000);
  const myTime = moment(myDate).format("h:mm:ss");
  const myTimeStart = moment(myDateStart).format("h:mm:ss");
  Pickup.find({$and: [{ time: { $gte: myTimeStart, $lte: myTime } }, {date: formattedDate}]  }, function (
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
  const myTimeStart = moment(myDateStart).format("h:mm:ss");
  const orArray = [];
  for (let i = 1; i < 5; i++) {
    myDate = new Date(myDate.getTime() - 7*24*60 * 60 * 1000);
    orArray.push({ date: moment(myDate).format("dddd, MMMM Do YYYY") });
  }
  Pickup.find( 
    {$and:[{ time: { $gte: myTimeStart, $lte: myTime } }, {$or: orArray}]},
    function (err, pickup) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({ pickup });
      }
    }
  );
};

exports.postPickup = async (req, res, next) => {
  const { latitude, longitude, user } = req.body;
  try {
    const newPickup = new Pickup({
      latitude,
      longitude,
      user,
    });
    await newPickup.save();
    res.status(200).send({ pickup: { ...newPickup._doc } });
  } catch (err) {
    res.status(400).send({ msg: "Bad Request" });
  }
};


exports.sendPickupById = (req, res, next) => {
  const { user } = req.params;
  Pickup.find({ user: user}, function (err, pickup) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ pickup });
    }
  });
};


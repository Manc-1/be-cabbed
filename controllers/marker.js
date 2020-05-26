const Marker = require("../model/marker.js");
require("dotenv/config");
const moment = require("moment");

exports.sendMarker = (req, res, next) => {
  Marker.find({}, function (err, marker) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ marker });
    }
  });
};

exports.sendMarkerFromHour = (req, res, next) => {
  const myDate = new Date(Date.now());
  const myDateStart = new Date(Date.now() - 1 * 60 * 60 * 1000);
  const formattedDate = moment(myDate).format("dddd, MMMM Do YYYY")
  const myTime = moment(myDate).format("h:mm:ss");
  const myTimeStart = moment(myDateStart).format("h:mm:ss");
  Marker.find({$and: [{ time: { $gte: myTimeStart, $lte: myTime } }, {date: formattedDate}]}, function (
    err,
    marker
  ) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send({ marker });
    }
  });
};


exports.postMarker = async (req, res, next) => {
  const { latitude, longitude, type, date, time } = req.body;
  try {
    const newMarker = new Marker({
      latitude,
      longitude,
      type,
      date,
      time,
    });
    await newMarker.save();
    res.status(200).send({ marker: { ...newMarker._doc } });
  } catch (err) {
    res.status(400).send({ msg: "Bad request" });
  }
};


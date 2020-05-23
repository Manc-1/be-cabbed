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
  const myTime = moment(myDate).format("h:mm:ss a");
  const myTimeStart = moment(myDateStart).format("h:mm:ss a");
  Marker.find({ time: { $gte: myTimeStart, $lte: myTime } }, function (
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

// exports.sendMarkerFromPastHour = (req, res, next) => {
//   const myDate = new Date(Date.now())
//   const myDateStart = new Date(Date.now() - 1 * 60 * 60 * 1000)
//   const myTime = moment(myDate).format("h:mm:ss a")
//   const myTimeStart = moment(myDateStart).format("h:mm:ss a")
//   Marker.find({ $or: [{ time: { $gte: myTimeStart, $lte: myTime } }, { time: { $gte: myTimeStart - 1week, $lte: myTime - 1week } }] }, function(err, marker) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.status(200).send({marker});
//       }
//     })
// }

exports.postMarker = async (req, res, next) => {
  const { lat, long, type, date, time } = req.body;
  try {
    const newMarker = new Marker({
      lat,
      long,
      type,
      date,
      time,
    });
    await newMarker.save();
    res.status(200).send({ marker: { ...newMarker } });
  } catch (err) {
    res.send("error");
  }
};

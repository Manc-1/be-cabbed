const Marker = require("../model/marker.js");
require("dotenv/config");

exports.sendMarker = (req, res, next) => {

    Marker.find({}, function(err, marker) {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send({marker});
        }
      })
}

exports.postMarker = async (req, res, next) => {
    const { lat, long, type } = req.body;
    try {
        const newMarker = new Marker({
            lat, 
            long,
            type,
        })
        await newMarker.save();
        res.status(200).send({marker: {...newMarker}})
    } catch(err){
        res.send('error')
    }
}
const Pickup = require("../model/pickup.js");
require("dotenv/config");

exports.sendPickup = (req, res, next) => {

    Pickup.find({}, function(err, pickup) {
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

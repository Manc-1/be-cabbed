const Data = require("../model/data.js");
require("dotenv/config");

exports.sendData = (req, res, next) => {
    Data.find({}, function(err, data) {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send({data});
        }
      })
}

exports.postData = async (req, res, next) => {
    const { points, type } = req.body;
    try {
        const newData = new Data({
            points,
            type,
        })
        await newData.save();
        res.status(200).send({data: {...newData}})
    } catch(err){
        res.send('error')
    }
}

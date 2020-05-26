const endpoints = require("../utils/endpoints.json");

exports.sendEndpoints = (req, res, next) => {
  res.status(200).json(endpoints);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send("TOTAL");
  } else {
    next(err);
  }
};

exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed" });
};

exports.handle500s = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send({ msg: "Server Error" });
};

exports.handleInvalidPaths = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

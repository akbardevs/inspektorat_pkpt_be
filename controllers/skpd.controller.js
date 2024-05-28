const db = require("../models");
const Skpd = db.skpd;
const Pejabat = db.pejabat;

// Retrieve all Skpds
exports.findAll = (req, res) => {
  Skpd.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findAllPejabat = (req, res) => {
  Pejabat.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

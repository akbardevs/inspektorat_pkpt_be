const express = require("express");
const router = express.Router();
const SkpdController = require("../controllers/skpd.controller");

// Retrieve all Buses
router.get("/", SkpdController.findAll);
router.get("/pejabat", SkpdController.findAllPejabat);

module.exports = router;

const express = require("express");
const router = express.Router();
const PendaftarController = require("../controllers/pendaftar.controller");

router.post("/", PendaftarController.create);
router.post("/pejabat", PendaftarController.createPejabat);

router.post("/logger", PendaftarController.logger);
router.post("/logmasuk", PendaftarController.logmasuk);
router.post("/logkeluar", PendaftarController.logkeluar);

router.get("/logger", PendaftarController.findAllLog);

router.get("/absen", PendaftarController.findAllAbsen);

router.get("/countlog", PendaftarController.countLog);

router.get("/countopd", PendaftarController.countOPD);

router.get("/", PendaftarController.findAll);

router.get("/:id", PendaftarController.findOne);

router.get("/qr/:no_hp", PendaftarController.findQR);

router.put("/:id", PendaftarController.update);

router.delete("/:id", PendaftarController.delete);

module.exports = router;

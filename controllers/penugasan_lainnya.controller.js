const db = require("../models");
const MasterPenugasanLainnya = db.penugasan_lainnya;

// Create a new MasterPenugasanLainnya
exports.createMasterPenugasanLainnya = async (req, res) => {
  const { tugas, tgl_mulai, tgl_berakhir, tim, status } = req.body;
  try {
    const penugasan = await MasterPenugasanLainnya.create({
      tugas,
      tgl_mulai,
      tgl_berakhir,
      tim,
      status,
    });
    res.status(201).json(penugasan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all MasterPenugasanLainnya
exports.findAllMasterPenugasanLainnya = (req, res) => {
  MasterPenugasanLainnya.findAll()
    .then((penugasans) => {
      res.status(200).json(penugasans);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single MasterPenugasanLainnya by ID
exports.findMasterPenugasanLainnyaById = (req, res) => {
  const id = req.params.id;
  MasterPenugasanLainnya.findByPk(id)
    .then((penugasan) => {
      if (!penugasan) {
        res.status(404).json({ message: "Penugasan not found" });
        return;
      }
      res.status(200).json(penugasan);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a MasterPenugasanLainnya by ID
exports.updateMasterPenugasanLainnya = async (req, res) => {
  const id = req.params.id;
  MasterPenugasanLainnya.findByPk(id)
    .then((penugasan) => {
      if (!penugasan) {
        res.status(404).json({ message: "Penugasan not found", code: 404 });
        return;
      }
      penugasan
        .update(req.body)
        .then(() => {
          res.status(200).json({ message: "Penugasan updated successfully" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a MasterPenugasanLainnya by ID
exports.deleteMasterPenugasanLainnya = (req, res) => {
  const id = req.params.id;
  MasterPenugasanLainnya.findByPk(id)
    .then((penugasan) => {
      if (!penugasan) {
        res.status(404).json({ message: "Penugasan not found" });
        return;
      }
      penugasan
        .destroy()
        .then(() => res.status(204).send())
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

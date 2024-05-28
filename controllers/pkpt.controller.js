const db = require("../models");
const MasterPkpt = db.pkpt;

// Create a new MasterPkpt
exports.createMasterPkpt = async (req, res) => {
  const {
    area,
    jenis,
    tujuan,
    ruanglingkup,
    jadwal_rmd,
    jadwal_rpl,
    hp,
    jumlah_laporan,
  } = req.body;
  try {
    const pkpt = await MasterPkpt.create({
      area,
      jenis,
      tujuan,
      ruanglingkup,
      jadwal_rmd,
      jadwal_rpl,
      hp,
      jumlah_laporan,
    });
    res.status(201).json(pkpt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all MasterPkpt
exports.findAllMasterPkpt = (req, res) => {
  MasterPkpt.findAll()
    .then((pkpts) => {
      res.status(200).json(pkpts);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single MasterPkpt by ID
exports.findMasterPkptById = (req, res) => {
  const id = req.params.id;
  MasterPkpt.findByPk(id)
    .then((pkpt) => {
      if (!pkpt) {
        res.status(404).json({ message: "Pkpt not found" });
        return;
      }
      res.status(200).json(pkpt);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a MasterPkpt by ID
exports.updateMasterPkpt = async (req, res) => {
  const id = req.params.id;
  MasterPkpt.findByPk(id)
    .then((pkpt) => {
      if (!pkpt) {
        res.status(404).json({ message: "Pkpt not found", code: 404 });
        return;
      }
      pkpt
        .update(req.body)
        .then(() => {
          res.status(200).json({ message: "Pkpt updated successfully" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a MasterPkpt by ID
exports.deleteMasterPkpt = (req, res) => {
  const id = req.params.id;
  MasterPkpt.findByPk(id)
    .then((pkpt) => {
      if (!pkpt) {
        res.status(404).json({ message: "Pkpt not found" });
        return;
      }
      pkpt
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

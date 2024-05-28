const db = require("../models");
const MasterHariLibur = db.hari_libur;

// Create a new MasterHariLibur
exports.createMasterHariLibur = async (req, res) => {
  const { bulan, hari } = req.body;
  try {
    const hariLibur = await MasterHariLibur.create({
      bulan,
      hari,
    });
    res.status(201).json(hariLibur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all MasterHariLibur
exports.findAllMasterHariLibur = (req, res) => {
  MasterHariLibur.findAll()
    .then((hariLiburs) => {
      res.status(200).json(hariLiburs);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single MasterHariLibur by ID
exports.findMasterHariLiburById = (req, res) => {
  const id = req.params.id;
  MasterHariLibur.findByPk(id)
    .then((hariLibur) => {
      if (!hariLibur) {
        res.status(404).json({ message: "Hari Libur not found" });
        return;
      }
      res.status(200).json(hariLibur);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a MasterHariLibur by ID
exports.updateMasterHariLibur = async (req, res) => {
  const id = req.params.id;
  MasterHariLibur.findByPk(id)
    .then((hariLibur) => {
      if (!hariLibur) {
        res.status(404).json({ message: "Hari Libur not found", code: 404 });
        return;
      }
      hariLibur
        .update(req.body)
        .then(() => {
          res.status(200).json({ message: "Hari Libur updated successfully" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a MasterHariLibur by ID
exports.deleteMasterHariLibur = (req, res) => {
  const id = req.params.id;
  MasterHariLibur.findByPk(id)
    .then((hariLibur) => {
      if (!hariLibur) {
        res.status(404).json({ message: "Hari Libur not found" });
        return;
      }
      hariLibur
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

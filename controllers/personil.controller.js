const db = require("../models");
const MasterPersonil = db.personil;

// Create a new MasterPersonil
exports.createMasterPersonil = async (req, res) => {
  const { nama, nip, jkel, golongan, jabatan, wilayah, tugas } = req.body;
  try {
    const personil = await MasterPersonil.create({
      nama,
      nip,
      jkel,
      golongan,
      jabatan,
      wilayah,
      tugas,
    });
    res.status(201).json(personil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all MasterPersonil
exports.findAllMasterPersonil = (req, res) => {
  MasterPersonil.findAll()
    .then((personils) => {
      res.status(200).json(personils);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single MasterPersonil by ID
exports.findMasterPersonilById = (req, res) => {
  const id = req.params.id;
  MasterPersonil.findByPk(id)
    .then((personil) => {
      if (!personil) {
        res.status(404).json({ message: "Personil not found" });
        return;
      }
      res.status(200).json(personil);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a MasterPersonil by ID
exports.updateMasterPersonil = async (req, res) => {
  const id = req.params.id;
  MasterPersonil.findByPk(id)
    .then((personil) => {
      if (!personil) {
        res.status(404).json({ message: "Personil not found", code: 404 });
        return;
      }
      personil
        .update(req.body)
        .then(() => {
          res.status(200).json({ message: "Personil updated successfully" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a MasterPersonil by ID
exports.deleteMasterPersonil = (req, res) => {
  const id = req.params.id;
  MasterPersonil.findByPk(id)
    .then((personil) => {
      if (!personil) {
        res.status(404).json({ message: "Personil not found" });
        return;
      }
      personil
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

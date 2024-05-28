const db = require("../models");
const Pendaftar = db.pendaftar;
const DFPejabat = db.pendaftar_pejabat;
const Logger = db.log;

// Create a new pendaftar
exports.create = async (req, res) => {
  const { nama, no_hp, opd, jabatan, qr } = req.body;
  try {
    let check = await Pendaftar.findOne({ where: { no_hp: no_hp } });
    if (!check) {
      Pendaftar.create({
        nama,
        no_hp,
        opd,
        jabatan,
        qr,
      })
        .then((pendaftar) => {
          res.status(201).json(pendaftar);
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(500).json({ message: "Nomor HP telah Terdaftar", code: 500 });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create a new pejabat
exports.createPejabat = async (req, res) => {
  const { nama, no_hp, jabatan } = req.body;
  try {
    let check = await DFPejabat.findOne({ where: { no_hp: no_hp } });
    if (!check) {
      DFPejabat.create({
        nama,
        no_hp,
        jabatan,
      })
        .then((pendaftar) => {
          res.status(201).json(pendaftar);
        })
        .catch((err) => {
          console.log("error pendaftar pejabat");
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(500).json({ message: "Nomor HP telah Terdaftar", code: 500 });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Retrieve all pendaftars
exports.findAll = (req, res) => {
  Pendaftar.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findAllLog = (req, res) => {
  Logger.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findAllAbsen = (req, res) => {
  Logger.findAll({
    attributes: ["qr", "nama", "opd", "jabatan", "no_hp"],
    group: ["qr", "nama", "opd", "jabatan", "no_hp"],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.countOPD = async (req, res) => {
  await Logger.findAll({
    attributes: ["qr", "nama", "opd"],
    group: ["qr", "nama", "opd"],
  })
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.countLog = async (req, res) => {
  await Logger.findAll({
    attributes: ["nama", "qr"],
    group: ["qr", "nama"],
  })
    .then((result) => {
      res.status(200).json({ data: result.length });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.logger = async (req, res) => {
  const qr = req.body.qr;
  var count = 0;
  await Logger.count({ where: { qr: qr } }).then((result) => {
    count = result;
  });
  Pendaftar.findOne({ where: { qr: qr } })
    .then((pendaftar) => {
      if (!pendaftar) {
        res.status(404).json({
          message: "Silahkan cek kembali QR Anda Menggunakan Nomor Handphone",
        });
        return;
      }
      var data = {};
      data.nama = pendaftar.nama;
      data.no_hp = pendaftar.no_hp;
      data.opd = pendaftar.opd;
      data.jabatan = pendaftar.jabatan;
      data.qr = pendaftar.qr;
      data.scan = count + 1;
      Logger.create(data)
        .then((data) => {
          res.status(200).json({ data: data, message: "Penginputan Sukses" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.logmasuk = async (req, res) => {
  const qr = req.body.qr;
  Pendaftar.findOne({ where: { qr: qr } })
    .then((pendaftar) => {
      if (!pendaftar) {
        res.status(404).json({
          message: "Silahkan cek kembali QR Anda Menggunakan Nomor Handphone",
        });
        return;
      }
      let data = {};
      data.nama = pendaftar.nama;
      data.no_hp = pendaftar.no_hp;
      data.opd = pendaftar.opd;
      data.jabatan = pendaftar.jabatan;
      data.qr = pendaftar.qr;
      data.scan = 1;
      Logger.create(data)
        .then((data) => {
          res.status(200).json({ data: data, message: "Penginputan Sukses" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.logkeluar = async (req, res) => {
  const qr = req.body.qr;
  Pendaftar.findOne({ where: { qr: qr } })
    .then((pendaftar) => {
      if (!pendaftar) {
        res.status(404).json({
          message: "Silahkan cek kembali QR Anda Menggunakan Nomor Handphone",
        });
        return;
      }
      let data = {};
      data.nama = pendaftar.nama;
      data.no_hp = pendaftar.no_hp;
      data.opd = pendaftar.opd;
      data.jabatan = pendaftar.jabatan;
      data.qr = pendaftar.qr;
      data.scan = 2;
      Logger.create(data)
        .then((data) => {
          res.status(200).json({ data: data, message: "Penginputan Sukses" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findQR = (req, res) => {
  const no_hp = req.params.no_hp;
  Pendaftar.findOne({ where: { no_hp: no_hp } })
    .then((pendaftar) => {
      if (!pendaftar) {
        res.status(404).json({ message: "Nomor Hp tidak terdaftar" });
        return;
      }
      res.status(200).json(pendaftar);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single pendaftar by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Pendaftar.findByPk(id)
    .then((pendaftar) => {
      if (!pendaftar) {
        res.status(404).json({ message: "Pendaftar not found" });
        return;
      }
      res.status(200).json(pendaftar);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a pendaftar by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  const { nama, no_hp, opd, jabatan, qr } = req.body;
  try {
    Pendaftar.findByPk(id)
      .then((pendaftar) => {
        if (!pendaftar) {
          res.status(404).json({ message: "Pendaftar not found", code: 404 });
          return;
        }
        pendaftar.nama = nama;
        pendaftar.no_hp = no_hp;
        pendaftar.opd = opd;
        pendaftar.jabatan = jabatan;
        pendaftar.qr = qr;
        return pendaftar.save();
      })
      .then((updatedpendaftar) => {
        res.status(200).json({
          message: "Pendaftar " + updatedpendaftar.nama + " telah diubah",
          code: 200,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadimage = async (req, res) => {
  const id = req.params.id;
  console.log("error");

  if (!req.file) {
    console.log("error");
    return res.status(500).send("No file uploaded.");
  }
  try {
  } catch (error) {
    console.log(error);
  }

  // You can access the uploaded file's information in req.file
  const filePath = req.file.path;

  Pendaftar.findByPk(id)
    .then((pendaftar) => {
      if (!pendaftar) {
        res.status(404).json({ message: "Pendaftar not found" });
        return;
      }

      pendaftar.profile_image = filePath;

      return pendaftar.save();
    })
    .then((updatedpendaftar) => {
      res.status(200).json(updatedpendaftar);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a pendaftar by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Pendaftar.findByPk(id)
    .then((pendaftar) => {
      if (!pendaftar) {
        res.status(404).json({ message: "Pendaftar not found" });
        return;
      }
      return pendaftar.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

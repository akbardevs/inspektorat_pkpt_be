const db = require("../models");
const User = db.user;
const SesiAbsen = db.sesi_absen;
const Pejabat = db.pendaftar_pejabat;
const Areas = db.area;
const MSesi = db.msesi;
const jwt = require("jsonwebtoken");

//login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.validatePassword(password) == true) {
      const token = jwt.sign({ name: user.username }, "mysecretkey123", {
        expiresIn: "1h", // Token expiration time (adjust as needed)
      });

      res.status(200).json({ token, user: user });
      console.log("Password is valid. User authenticated.");
    } else return res.status(401).json({ message: "Invalid password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
exports.create = async (req, res) => {
  const { username, password, type } = req.body;

  try {
    let check = await User.findOne({ where: { username: username } });
    if (check != null) {
      res.status(201).json({ message: "Username Telah terdaftar", code: 500 });
    } else {
      User.create({
        username,
        type,
      })
        .then((user) => {
          user.setPassword(password); // Set the password
          user.save().then(() => {
            console.log("User created with hashed password.");
            res
              .status(201)
              .json({ message: "User telah ditambahkan", code: 201 });
          });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Retrieve all users
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single user by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a user by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  const { username, password, type } = req.body;
  try {
    let check = await User.findOne({ where: { username: username } });
    if (check != null && check.id != id) {
      res.status(500).json({
        message: "Username telah terdaftar, silahkan gunakan username lainnya",
        code: 500,
      });
    } else {
      User.findByPk(id)
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "User not found", code: 404 });
            return;
          }

          user.username = username;
          if (password != "") {
            user.setPassword(password);
          }
          user.type = type;
          console.log("[+] pass: " + user.password);
          return user.save();
        })
        .then((updatedUser) => {
          res.status(200).json({
            message: "User " + updatedUser.username + " telah diubah",
            code: 200,
          });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
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

  User.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      user.profile_image = filePath;

      return user.save();
    })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a user by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      return user.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Directional Distance User
function getDirectionalDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
  // var NSDistance = Math.abs(lat2 - lat1) * 111; // Approximate distance per degree latitude
  // var latMid = (lat1 + lat2) / 2.0;
  // var EWDegreeDistance = Math.cos(deg2rad(latMid)) * 111; // Approximate distance per degree longitude at midpoint latitude
  // var EWDistance = Math.abs(lon2 - lon1) * EWDegreeDistance;

  // return {
  //   NSDistance: NSDistance,
  //   EWDistance: EWDistance,
  //   directionNS: lat2 > lat1 ? "North" : "South",
  //   directionEW: lon2 > lon1 ? "East" : "West",
  // };
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
exports.distance = (req, res) => {
  const { long, lat } = req.body;
  const latLocationCenter = -5.168324563225344;
  const longLocationCenter = 119.42886948020947;
  // const { NSDistance, EWDistance, directionNS, directionEW } =
  //   getDirectionalDistance(latLocationCenter, longLocationCenter, lat, long);
  const distancess = getDirectionalDistance(
    latLocationCenter,
    longLocationCenter,
    lat,
    long
  );
  res.status(200).json({
    jarak: distancess,
    // NSDistance: `${NSDistance} km ${directionNS}`,
    // EWDistance: `${EWDistance} km ${directionEW}`,
  });
};

exports.checkdaftarpejabat = async (req, res) => {
  const no_hp = req.params.no_hp;

  try {
    const user = await Pejabat.findOne({ where: { no_hp: no_hp } });
    if (user) return res.status(200).json({ data: user, message: "Sukses" });
    else return res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem Server" });
  }
};

exports.checksyarat = async (req, res) => {
  const no_hp = req.params.no_hp;
  const { lat, long } = req.body;

  try {
    const areaa = await Areas.findAll();
    var listDistance = [];
    for (const data of areaa) {
      listDistance.push({
        nama: data.nama,
        id: data.id,
        distance: getDirectionalDistance(data.lat, data.long, lat, long),
      });
    }
    listDistance.sort((a, b) => a.distance - b.distance);
    // Kode 1 = berhasil
    // Kode 2 = berada diluar area
    if (listDistance[0].nama == "Pusat") {
      return res.status(200).json({
        data: listDistance,
        message: "Sukses silahkan lanjutkan absen",
        kode: 1,
      });
    } else {
      return res.status(200).json({
        data: listDistance,
        message: "Anda berada dekat ruangan " + listDistance[0].nama,
        kode: 2,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem Server" });
  }
};

// Update a user by ID
exports.uploadGambarSesi = async (req, res) => {
  const { no_hp, user_id, sesi, id_area } = req.body;
  if (!req.file) {
    console.log("error");
    return res.status(500).send("No file uploaded.");
  }
  try {
  } catch (error) {
    console.log(error);
  }
  const filePath = req.file.path;
  const checkSesi = await SesiAbsen.findOne({
    where: { no_hp: no_hp, sesi: sesi },
  });
  const area = await Areas.findOne({
    where: { id: id_area },
  });
  console.log(area);
  // console.log(checkSesi);
  if (!checkSesi) {
    console.log("is here");
    SesiAbsen.create({
      no_hp: no_hp,
      pendaftar_pejabat_id: user_id,
      sesi,
      lokasi: area.nama,
      image: filePath,
    })
      .then((data) => {
        res.status(200).json({ message: "success" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(200).json({ message: "success" });
  }
};

exports.getusersesi = async (req, res) => {
  const no_hp = req.params.no_hp;

  try {
    const user = await SesiAbsen.findAll({ where: { no_hp: no_hp } });
    if (user) return res.status(200).json({ data: user, message: "Sukses" });
    else return res.status(404).json({ message: "Sesi not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem Server" });
  }
};
exports.getmastersesi = async (req, res) => {
  try {
    const user = await MSesi.findAll();
    if (user) return res.status(200).json({ data: user, message: "Sukses" });
    else return res.status(404).json({ message: "Sesi not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem Server" });
  }
};

exports.getallsesi = async (req, res) => {
  try {
    const users = await SesiAbsen.findAll({
      limit: 6,
      order: [
        ["id", "DESC"], // Replace 'columnName' with the actual column name you want to sort by
      ],
    });
    const dataPesertaObj = users.map((instance) => instance.toJSON());

    for (let i = 0; i < dataPesertaObj.length; i++) {
      const dataUser = await Pejabat.findOne({
        where: { no_hp: dataPesertaObj[i].no_hp },
      });
      if (dataUser) {
        dataPesertaObj[i].nama = dataUser.nama;
        dataPesertaObj[i].skpd = dataUser.jabatan;
      }
    }

    if (dataPesertaObj.length > 0)
      return res.status(200).json({ data: dataPesertaObj, message: "Sukses" });
    else return res.status(404).json({ message: "Sesi not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem Server" });
  }
};

exports.getallsesiTable = async (req, res) => {
  try {
    const users = await SesiAbsen.findAll({
      order: [["id", "DESC"]],
    });

    const usersJson = users.map((user) => user.toJSON());
    const groupedUsers = {};

    // Group users by no_hp and collect sesi values
    usersJson.forEach((user) => {
      if (!groupedUsers[user.no_hp]) {
        groupedUsers[user.no_hp] = {
          id: user.id,
          nama: user.nama,
          jabatan: user.jabatan,
          sesi: [user.sesi],
        };
      } else {
        groupedUsers[user.no_hp].sesi.push(user.sesi);
      }
    });

    // Optionally, fetch additional user details from Pejabat table and update groupedUsers
    for (const no_hp in groupedUsers) {
      const dataUser = await Pejabat.findOne({ where: { no_hp } });
      if (dataUser) {
        groupedUsers[no_hp].id = dataUser.id; // Update name from Pejabat, if needed
        groupedUsers[no_hp].nama = dataUser.nama; // Update name from Pejabat, if needed
        groupedUsers[no_hp].jabatan = dataUser.jabatan; // Update name from Pejabat, if needed
        // Update other details as required
      }
    }

    const result = Object.values(groupedUsers); // Convert grouped users object back into an array

    if (result.length > 0)
      return res.status(200).json({ data: result, message: "Sukses" });
    else return res.status(404).json({ message: "Sesi not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem Server" });
  }
};

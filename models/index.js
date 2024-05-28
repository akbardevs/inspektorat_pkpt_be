const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.pendaftar = require("./pendaftar.js")(sequelize, Sequelize);
db.skpd = require("./skpd.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.personil = require("./personil.js")(sequelize, Sequelize);
db.pkpt = require("./pkpt.js")(sequelize, Sequelize);
db.hari_libur = require("./hari_libur.js")(sequelize, Sequelize);
db.penugasan_lainnya = require("./penugasan_lainnya.js")(sequelize, Sequelize);
// db.log = require("./log.js")(sequelize, Sequelize);
// db.pejabat = require("./pejabat.js")(sequelize, Sequelize);
// db.pendaftar_pejabat = require("./pendaftar_pejabat.js")(sequelize, Sequelize);
// db.sesi_absen = require("./sesi_absen.js")(sequelize, Sequelize);
// db.area = require("./area.js")(sequelize, Sequelize);
// db.msesi = require("./master_sesi.js")(sequelize, Sequelize);

// db.user.belongsTo(db.sekolah, { foreignKey: "sekolah_id" });
// db.mintervensi.hasOne(db.interstunting, { foreignKey: "id" });

module.exports = db;

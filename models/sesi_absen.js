"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SesiAbsen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SesiAbsen.init(
    {
      pendaftar_pejabat_id: DataTypes.INTEGER,
      no_hp: DataTypes.STRING,
      sesi: DataTypes.STRING,
      image: DataTypes.STRING,
      lokasi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "sesi_absen",
    }
  );
  return SesiAbsen;
};

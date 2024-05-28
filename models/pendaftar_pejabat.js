"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PendaftarPejabat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PendaftarPejabat.init(
    {
      nama: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      jabatan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "pendaftar_pejabat",
    }
  );
  return PendaftarPejabat;
};

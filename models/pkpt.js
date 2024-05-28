"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MasterPkpt extends Model {
    static associate(models) {
      // define association here
    }
  }
  MasterPkpt.init(
    {
      area: DataTypes.STRING,
      jenis: DataTypes.STRING,
      tujuan: DataTypes.STRING,
      ruanglingkup: DataTypes.STRING,
      jadwal_rmd: DataTypes.DATE,
      jadwal_rpl: DataTypes.DATE,
      hp: DataTypes.STRING,
      jumlah_laporan: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "pkpt",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return MasterPkpt;
};

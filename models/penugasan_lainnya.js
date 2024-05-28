"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MasterPenugasanLainnya extends Model {
    static associate(models) {
      // define association here
    }
  }
  MasterPenugasanLainnya.init(
    {
      tugas: DataTypes.STRING,
      tgl_mulai: DataTypes.DATE,
      tgl_berakhir: DataTypes.DATE,
      tim: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "penugasan_lainnya",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return MasterPenugasanLainnya;
};

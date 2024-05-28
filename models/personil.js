"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Personil extends Model {
    static associate(models) {
      // define association here
    }
  }
  Personil.init(
    {
      nama: DataTypes.STRING,
      nip: DataTypes.STRING,
      jkel: DataTypes.STRING,
      golongan: DataTypes.STRING,
      jabatan: DataTypes.STRING,
      wilayah: DataTypes.STRING,
      tugas: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "master_personil",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Personil;
};

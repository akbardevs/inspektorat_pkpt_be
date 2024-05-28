"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MasterHariLibur extends Model {
    static associate(models) {
      // define association here
    }
  }
  MasterHariLibur.init(
    {
      bulan: DataTypes.STRING,
      hari: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "hari_libur",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return MasterHariLibur;
};

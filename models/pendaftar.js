'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pendaftar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pendaftar.init({
    nama: DataTypes.STRING,
    no_hp: DataTypes.STRING,
    opd: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    qr: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pendaftar',
  });
  return Pendaftar;
};
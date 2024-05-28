"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pkpts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      area: {
        type: Sequelize.STRING,
      },
      jenis: {
        type: Sequelize.STRING,
      },
      tujuan: {
        type: Sequelize.STRING,
      },
      ruanglingkup: {
        type: Sequelize.STRING,
      },
      jadwal_rmd: {
        type: Sequelize.DATE,
      },
      jadwal_rpl: {
        type: Sequelize.DATE,
      },
      hp: {
        type: Sequelize.STRING,
      },
      jumlah_laporan: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pkpts");
  },
};

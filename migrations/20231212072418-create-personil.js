"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("personils", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      nip: {
        type: Sequelize.STRING,
      },
      jkel: {
        type: Sequelize.STRING,
      },
      golongan: {
        type: Sequelize.STRING,
      },
      jabatan: {
        type: Sequelize.STRING,
      },
      wilayah: {
        type: Sequelize.STRING,
      },
      tugas: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("personils");
  },
};

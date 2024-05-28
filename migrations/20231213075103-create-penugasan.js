"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("penugasan_lainnyas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tugas: {
        type: Sequelize.STRING,
      },
      tgl_mulai: {
        type: Sequelize.DATE,
      },
      tgl_berakhir: {
        type: Sequelize.DATE,
      },
      tim: {
        type: Sequelize.STRING,
      },
      status: {
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
    await queryInterface.dropTable("penugasan_lainnyas");
  },
};

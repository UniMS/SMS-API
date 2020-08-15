"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("status", {
      statusId: {
        allowNull: false,
        autoIncrement: true,
        field: "status_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("status");
  },
};

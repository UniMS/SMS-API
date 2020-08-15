"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("regions", {
      regionId: {
        allowNull: false,
        autoIncrement: true,
        field: "region_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("regions");
  },
};

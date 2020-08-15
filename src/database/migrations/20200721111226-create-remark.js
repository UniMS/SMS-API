"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("remarks", {
      remarkId: {
        allowNull: false,
        autoIncrement: true,
        field: "remark_id",
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
    await queryInterface.dropTable("remarks");
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("degrees", {
      degreeId: {
        allowNull: false,
        autoIncrement: true,
        field: "degree_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      majorId: {
        allowNull: false,
        field: "major_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "majors",
          key: "major_id",
        },
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("degrees");
  },
};

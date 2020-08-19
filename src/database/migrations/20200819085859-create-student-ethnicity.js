"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("student_ethnicities", {
      studentEthnicityId: {
        allowNull: false,
        autoIncrement: true,
        field: "student_ethnicity_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        allowNull: false,
        field: "student_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "students",
          key: "student_id",
        },
        type: Sequelize.INTEGER,
      },
      ethnicityId: {
        allowNull: false,
        field: "ethnicity_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "ethnicities",
          key: "ethnicity_id",
        },
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("student_ethnicities");
  },
};

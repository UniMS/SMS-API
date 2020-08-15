"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("academic_years", {
      academicYearId: {
        allowNull: false,
        autoIncrement: true,
        field: "academic_year_id",
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
    await queryInterface.dropTable("academic_years");
  },
};

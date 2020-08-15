"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("attendance_years", {
      attendanceYearId: {
        allowNull: false,
        autoIncrement: true,
        field: "attendance_year_id",
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
    await queryInterface.dropTable("attendance_years");
  },
};

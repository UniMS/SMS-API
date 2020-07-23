"use strict";

const attendanceYears = require("../data/attendanceYears");

const rows = attendanceYears.map((year) => {
  return {
    name: year,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE attendance_years AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("attendance_years", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attendance_years", null);
  },
};

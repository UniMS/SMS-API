"use strict";

const years = ["1st", "2nd", "3rd", "4th", "5th", "6th", "master", "PhD"].map(
  (year) => {
    return {
      name: year,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE attendance_years AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("attendance_years", years);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("attendance_years", null);
  },
};

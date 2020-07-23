"use strict";

const _ = require("lodash");

const openedYear = 2011;
const currentYear = new Date().getFullYear();
const academicYears = _.range(openedYear, currentYear + 1).map(
  (openedYear) => `${openedYear - 1}-${openedYear}`
);

const rows = academicYears.map((academicYear) => {
  return {
    name: academicYear,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE academic_years AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("academic_years", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("academic_years", null);
  },
};

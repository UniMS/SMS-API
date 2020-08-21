"use strict";

const _ = require("lodash");

const rows = _.range(1, 7).map((index) => {
  return {
    major_id: index,
    attendance_year_id: index,
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE majors_attendance_years AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("majors_attendance_years", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("majors_attendance_years", null);
  },
};

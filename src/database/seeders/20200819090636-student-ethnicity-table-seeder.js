"use strict";

const _ = require("lodash");

const rows = _.range(1, 11).map((index) => {
  return {
    student_id: index,
    ethnicity_id: index,
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE student_ethnicities AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("student_ethnicities", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("student_ethnicities", null);
  },
};

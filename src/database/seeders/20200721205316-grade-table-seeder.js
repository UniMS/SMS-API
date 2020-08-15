"use strict";

const grades = require("../../data/grades");

const rows = grades.map((grade) => {
  return {
    name: grade.name,
    min_mark: grade.minMark,
    max_mark: grade.maxMark,
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE grades AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("grades", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("grades", null);
  },
};

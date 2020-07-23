"use strict";

const grades = require("../../data/grades");

const rows = grades.map((grade) => {
  return {
    name: grade,
    created_at: new Date(),
    updated_at: new Date(),
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

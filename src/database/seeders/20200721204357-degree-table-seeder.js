"use strict";

const degrees = require("../../data/degrees");

const rows = degrees.map((degree) => {
  return {
    name: degree.name,
    major_id: degree.majorId,
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE degrees AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("degrees", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("degrees", null);
  },
};

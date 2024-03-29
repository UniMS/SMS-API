"use strict";

const religions = require("../../data/religions");

const rows = religions.map((religion) => {
  return {
    name: religion,
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE religions AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("religions", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("religions", null);
  },
};

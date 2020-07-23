"use strict";

const ethnicities = require("../../data/ethnicities");

const rows = ethnicities.map((ethnicity) => {
  return {
    name: ethnicity,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE ethnicities AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("ethnicities", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ethnicities", null);
  },
};

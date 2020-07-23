"use strict";

const regions = require("../../data/regions");

const rows = regions.map((region) => {
  return {
    name: region,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE regions AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("regions", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null);
  },
};

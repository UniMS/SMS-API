"use strict";

const status = require("../../data/status");

const rows = status.map((status) => {
  return {
    name: status,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE status AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("status", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("status", null);
  },
};

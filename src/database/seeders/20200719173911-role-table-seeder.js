"use strict";

const roles = require("../../data/roles");

const rows = roles.map((role) => {
  return {
    name: role,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE roles AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("roles", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};

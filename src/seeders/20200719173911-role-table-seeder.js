"use strict";

const roles = [
  "official",
  "office",
  "ict_hod",
  "ce_hod",
  "ece_hod",
  "pre_hod",
  "ame_hod",
].map((role) => {
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
    await queryInterface.bulkInsert("roles", roles);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};

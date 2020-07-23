"use strict";

const majors = require("../data/majors");

const rows = majors.map((major) => {
  return {
    name: major.name,
    description: major.description,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE majors AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("majors", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("majors", null);
  },
};

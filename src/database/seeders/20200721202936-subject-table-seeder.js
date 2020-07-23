"use strict";

const _ = require("lodash");
const faker = require("faker");

const rows = _.range(1, 31).map(() => {
  return {
    name: faker.name.jobArea(),
    code: faker.finance.bic(),
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE subjects AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("subjects", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subjects", null);
  },
};

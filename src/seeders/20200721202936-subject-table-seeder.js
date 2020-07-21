"use strict";
const _ = require("lodash");
const faker = require("faker");
const subjects = _.range(1, 121).map((index) => {
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
    await queryInterface.bulkInsert("subjects", subjects, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subjects", null, {});
  },
};

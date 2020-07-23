"use strict";

const _ = require("lodash");
const faker = require("faker");

const rows = _.range(1, 11).map((index) => {
  return {
    name: faker.address.city(),
    region_id: index,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE townships AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("townships", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("townships", null);
  },
};

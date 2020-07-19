"use strict";

const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let regions = [];
    for (let id = 1; id <= 20; id++) {
      regions.push({
        name: faker.address.state(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("regions", regions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null, {});
  },
};

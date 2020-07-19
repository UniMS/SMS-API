"use strict";
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let townships = [];
    for (let id = 1; id <= 20; id++) {
      townships.push({
        name: faker.address.city(),
        createdAt: new Date(),
        updatedAt: new Date(),
        region_id: id,
      });
    }
    await queryInterface.bulkInsert("townships", townships, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("townships", null, {});
  },
};

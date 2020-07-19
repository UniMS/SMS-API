"use strict";
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = [];
    for (var id = 1; id <= 7; id++) {
      users.push({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        role_id: id,
      });
    }
    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};

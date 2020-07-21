"use strict";

const _ = require("lodash");
const faker = require("faker");

const users = _.range(1, 8).map((index) => {
  return {
    username: faker.internet.email(),
    password: faker.internet.password(),
    role_id: index,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};

"use strict";

const _ = require("lodash");
const faker = require("faker");

const users = _.range(1, 21).map((index) => {
  return {
    username: faker.internet.email(),
    password: faker.internet.password(),
    role_id: Math.floor(Math.random() * 7) + 1,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE users AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("users", users);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null);
  },
};

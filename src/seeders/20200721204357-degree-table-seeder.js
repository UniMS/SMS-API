"use strict";
const faker = require("faker");
const degrees = [
  "B.E(IST)",
  "B.E(EcE)",
  "B.E(Ame)",
  "B.E(Pre)",
  "M.A(IST)",
  "M.E(EcE)",
  "M.E(Ame)",
  "M.E(Pre)",
  "Ph.D(IST)",
  "Ph.D(EcE)",
  "Ph.D(Ame)",
  "Ph.D(Pre)",
].map((degree) => {
  return {
    name: degree,
    description: faker.name.title(),
    created_at: new Date(),
    updated_at: new Date(),
  };
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE degrees AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("degrees", degrees, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("degrees", null, {});
  },
};

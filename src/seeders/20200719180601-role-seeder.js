"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [
      {
        name: "official",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "office-admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ict-hod",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ce-hod",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ece-hod",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ame-hod",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "pre-hod",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};

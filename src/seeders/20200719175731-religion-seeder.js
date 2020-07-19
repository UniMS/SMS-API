"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("religions", [
      {
        name: "Buddhism",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Christianity",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Islam", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "Hinduism",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Non-religional",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Others", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("religions", null, {});
  },
};

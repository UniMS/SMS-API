"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("ethnicities", [
      {
        name: "Kachin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kayar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "Kayin", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "Chin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bamar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Yakhine",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Danu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Paloung",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kayan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ethnicities", null, {});
  },
};

"use strict";
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("exams", [
      { 
        semester: "first semester", 
        held_in: faker.Date.past(),
        createdAt: new Date(), 
        updatedAt: new Date(),
        degree_id: id,
        academic_year_id: id,
      },
      {
        semester: "second semester", 
        held_in: faker.Date.past(),
        createdAt: new Date(), 
        updatedAt: new Date(),
        degree_id: id,
        academic_year_id: id,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("exams", null, {});
  },
};

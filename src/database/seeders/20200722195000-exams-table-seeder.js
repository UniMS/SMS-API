"use strict";

const _ = require("lodash");
const faker = require("faker");

const exams = _.range(1, 11).map((index) => {
  return {
    degree_id: _.random(1, 15),
    academic_year_id: index,
    attendance_year_id: index,
    major_id: _.random(1, 5),
    semester: _.random(1, 2),
    held_in: faker.date.past(),
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE exams AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("exams", exams);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("exams", null);
  },
};

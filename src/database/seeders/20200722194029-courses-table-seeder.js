"use strict";

const _ = require("lodash");

const courses = _.range(1, 31).map((index) => {
  return {
    semester: Math.floor(Math.random() * 2),
    periods_in_weeks: 3,
    lectures_in_hours_per_week: 3,
    labs_fields_drawings_in_hours_per_week: 3,
    distinction_mark: 80,
    full_mark: 100,
    major_id: _.random(1, 6),
    subject_id: index,
    academic_year_id: _.random(1, 10),
    attendance_year_id: _.random(1, 6),
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE courses AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("courses", courses);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("courses", null);
  },
};

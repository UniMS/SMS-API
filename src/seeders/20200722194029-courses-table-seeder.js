'use strict';
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
   let courses = [];
   for (var id = 1; id <= 10; id++) {
    courses.push({
      semester: Math.floor(Math.random() * 2),
      periods_in_weeks: faker.random.number,
      lectures_in_hours_per_week: faker.random.number,
      labs_fields_drawings_in_hours_per_week: faker.random.number,
      distinction_mark: faker.random.number,
      full_mark: faker.random.number,
      createdAt: new Date(),
      updatedAt: new Date(),
      major_id: id,
      subject_id: id,
      academic_year_id: id,
      attendance_year_id: id,
    });
  }
  await queryInterface.bulkInsert("courses", courses, {});
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('courses', null, {});
  }
};

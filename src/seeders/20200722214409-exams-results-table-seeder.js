'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let exams_results = [];
    for (var id = 1; id <= 10; id++) {
      exams_results.push({
        get_distinction: Math.floor(Math.random()*15),
        createdAt: new Date(),
        updatedAt: new Date(),
        exam_id: id,
        course_id: id,
        enrollment_id: id,
        grade_id: id,
     });
    }
    await queryInterface.bulkInsert("exams_results", exams_results, {});
   },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exams_results', null, {});
  }
};

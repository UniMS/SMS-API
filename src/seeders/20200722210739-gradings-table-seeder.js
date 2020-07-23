'use strict';
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let gradings = [];
    for (var id = 1; id <= 10; id++) {
      gradings.push({
        mark: Math.floor(Math.random()*100),
        get_distinction: faker.random.boolean,
        createdAt: new Date(),
        updatedAt: new Date(),
        exam_id: id,
        course_id: id,
        enrollment_id: id,
        grade_id: id,
     });
    }
    await queryInterface.bulkInsert("gradings", gradings, {});
   },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('gradings', null, {});
  }
};

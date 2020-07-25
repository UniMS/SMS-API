"use strict";

const _ = require("lodash");

const gradings = _.range(1, 21).map((index) => {
  const mark = _.random(1, 100);

  return {
    mark: mark,
    get_distinction: mark > 80,
    exam_id: _.random(1, 10),
    course_id: index,
    enrollment_id: index,
    grade_id: _.random(1, 10),
    remark_id: _.random(1, 3),
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE gradings AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("gradings", gradings);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("gradings", null);
  },
};

"use strict";

const _ = require("lodash");
const majors = require("../data/majors");

const enrollments = _.range(1, 21).map((index) => {
  const attendanceYear = _.random(1, 6);
  const major = _.sample(majors).name;
  const majorId = _.findIndex(majors, { name: major }) + 1;
  const repeater = _.random(0, 1) ? "R" : "";

  return {
    degree_id: _.random(1, 5),
    major_id: majorId,
    student_id: index,
    academic_year_id: _.random(1, 10),
    attendance_year_id: attendanceYear,
    roll_no: `${attendanceYear}${major}-${_.random(0, 150)}${repeater}`,
    remark_id: _.random(1, 3),
    created_at: new Date(),
    updated_at: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE enrollments AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("enrollments", enrollments);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("enrollments", null);
  },
};

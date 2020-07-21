"use strict";
const academicYears = [
  "2008-2009",
  "2009-2010",
  "2010-2011",
  "2011-2012",
  "2013-2014",
  "2014-2015",
  "2015-2016",
  "2016-2017",
  "2017-2018",
  "2018-2019",
  "2019-2020",
].map((academicYear) => {
  return {
    name: academicYear,
    created_at: new Date(),
    updated_at: new Date(),
  };
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE academic_years AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("academic_years", academicYears, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("academic_years", null, {});
  },
};

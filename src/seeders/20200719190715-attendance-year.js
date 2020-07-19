"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("academic_years", [
      { name: "2009-2010", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "2010-2011",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "2011-2012",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "2012-2013", createdAt: new Date(), updatedAt: new Date() },
      {
        name: "2013-2014",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "2014-2015",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { name: "2015-2016", createdAt: new Date(), updatedAt: new Date() },
      { name: "2016-2017", createdAt: new Date(), updatedAt: new Date() },
      { name: "2017-2018", createdAt: new Date(), updatedAt: new Date() },
      { name: "2018-2019", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("academic_years", null, {});
  },
};

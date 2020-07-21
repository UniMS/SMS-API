"use strict";
const grades = ["E", "D", "C-", "C", "B", "B+", "A-", "A", "A+"].map(
  (grade) => {
    return {
      name: grade,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE grades AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("grades", grades, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("grades", null, {});
  },
};

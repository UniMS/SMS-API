"use strict";

const majors = ["ICT", "IST", "CE", "EcE", "Ame", "Pre"].map((major) => {
  return {
    name: major,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE majors AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("majors", majors);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("majors", null);
  },
};

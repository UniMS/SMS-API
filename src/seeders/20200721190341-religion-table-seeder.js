"use strict";

const religions = ["Buddha", "Christian", "Hindu", "Islam"].map((religion) => {
  return {
    name: religion,
    created_at: new Date(),
    updated_at: new Date(),
  };
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE religions AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("religions", religions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("religions", null);
  },
};

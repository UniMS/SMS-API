"use strict";

const regions = ["Ayeyarwady", "Yangon", "Mon", "Mandalay", "Shan"].map(
  (region) => {
    return {
      name: region,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("regions", regions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("regions", null, {});
  },
};

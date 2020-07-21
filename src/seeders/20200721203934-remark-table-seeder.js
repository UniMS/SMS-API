"use strict";
const remarks = ["Passed", "Failed", "Credit"].map((remark) => {
  return {
    name: remark,
    created_at: new Date(),
    updated_at: new Date(),
  };
});
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE remarks AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("remarks", remarks, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("remarks", null, {});
  },
};

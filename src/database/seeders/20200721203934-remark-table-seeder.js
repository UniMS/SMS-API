"use strict";

const remarks = require("../../data/remarks");

const rows = remarks.map((remark) => {
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
    await queryInterface.bulkInsert("remarks", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("remarks", null);
  },
};

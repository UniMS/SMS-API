"use strict";

const townships = require("../../data/townships");

let rows = townships.map((township, index) => {
  return {
    name: township.name,
    region_id: township.regionId,
  };
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(
      "ALTER TABLE townships AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert("townships", rows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("townships", null);
  },
};

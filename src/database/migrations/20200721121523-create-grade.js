"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("grades", {
      gradeId: {
        allowNull: false,
        autoIncrement: true,
        field: "grade_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      minMark: {
        allowNull: false,
        field: "min_mark",
        type: Sequelize.TINYINT,
      },
      maxMark: {
        allowNull: false,
        field: "max_mark",
        type: Sequelize.TINYINT,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("grades");
  },
};

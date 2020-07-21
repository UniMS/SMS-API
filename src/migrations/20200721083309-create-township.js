"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("townships", {
      townshipId: {
        allowNull: false,
        autoIncrement: true,
        field: "township_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      regionId: {
        allowNull: false,
        field: "region_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "regions",
          key: "region_id",
        },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("townships");
  },
};

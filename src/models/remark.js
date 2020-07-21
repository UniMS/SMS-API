"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Remark extends Model {
    static associate(models) {
      // define association here
    }
  }

  Remark.init(
    {
      remarkId: {
        allowNull: false,
        autoIncrement: true,
        field: "remark_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(20),
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
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
    },
    {
      sequelize,
      modelName: "Remark",
      tableName: "remarks",
    }
  );

  return Remark;
};

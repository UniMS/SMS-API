"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    static associate(models) {
      // define association here
    }
  }

  Major.init(
    {
      majorId: {
        allowNull: false,
        autoIncrement: true,
        field: "major_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        fidld: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        fidld: "updated_at",
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Major",
      tableName: "majors",
    }
  );

  return Major;
};
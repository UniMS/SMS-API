"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Degree extends Model {
    static associate(models) {
      // define association here
    }
  }

  Degree.init(
    {
      degreeId: {
        allowNull: false,
        autoIncrement: true,
        field: "degree_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(20),
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
      modelName: "degree",
    }
  );

  return Degree;
};

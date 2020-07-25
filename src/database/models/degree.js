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
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Degree",
      tableName: "degrees",
    }
  );

  return Degree;
};

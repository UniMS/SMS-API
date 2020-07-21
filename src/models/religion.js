"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Religion extends Model {
    static associate(models) {
      // define association here
    }
  }

  Religion.init(
    {
      religionId: {
        allowNull: false,
        autoIncrement: true,
        field: "religion_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
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
      modelName: "Religion",
      tableName: "religions",
    }
  );

  return Religion;
};
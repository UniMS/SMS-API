"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    static associate(models) {
      Grade.hasMany(models.Grading, {
        foreignKey: "gradeId",
        as: "grade",
      });
    }
  }

  Grade.init(
    {
      gradeId: {
        allowNull: false,
        autoIncrement: true,
        field: "grade_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      mark: {
        allowNull: true,
        type: DataTypes.TINYINT,
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
      modelName: "Grade",
      tableName: "grades",
    }
  );

  return Grade;
};

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
      minMark: {
        allowNull: true,
        field: "min_mark",
        type: DataTypes.TINYINT,
      },
      maxMark: {
        allowNull: true,
        field: "max_mark",
        type: DataTypes.TINYINT,
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

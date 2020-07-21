"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    static associate(models) {
      // define association here
    }
  }

  Grade.init(
    {
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
      mark: {
        allowNull: true,
        type: Sequelize.TINYINT,
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
      modelName: "Grade",
      tableName: "grades",
    }
  );

  return Grade;
};

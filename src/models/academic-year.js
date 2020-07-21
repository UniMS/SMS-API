"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AcademicYear extends Model {
    static associate(models) {
      // define association here
    }
  }

  AcademicYear.init(
    {
      academicYearId: {
        allowNull: false,
        autoIncrement: true,
        field: "academic_year_id",
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
      modelName: "AcademicYear",
      tableName: "academic_years",
    }
  );

  return AcademicYear;
};

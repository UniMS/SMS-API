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
    },
    {
      sequelize,
      modelName: "AcademicYear",
      tableName: "academic_years",
      getterMethods: {
        academicYearId: function () {
          return this.academicYearId;
        },
      },
    }
  );

  return AcademicYear;
};

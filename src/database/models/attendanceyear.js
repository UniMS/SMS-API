"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AttendanceYear extends Model {
    static associate(models) {
      AttendanceYear.belongsToMany(models.Major, {
        through: "majors_attendance_years",
        as: "majors",
        foreignKey: "attendance_year_id",
      });

      AttendanceYear.hasMany(models.Enrollment, {
        as: "enrollments",
        foreignKey: "attendance_year_id",
      });
    }
  }

  AttendanceYear.init(
    {
      attendanceYearId: {
        allowNull: false,
        autoIncrement: true,
        field: "attendance_year_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
    },
    {
      sequelize,
      modelName: "AttendanceYear",
      tableName: "attendance_years",
    }
  );

  return AttendanceYear;
};

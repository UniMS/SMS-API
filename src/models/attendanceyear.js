"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AttendanceYear extends Model {
    static associate(models) {
      // define association here
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
      modelName: "AttendanceYear",
      tableName: "attendance_years",
    }
  );

  return AttendanceYear;
};

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Major extends Model {
    static associate(models) {
      Major.hasMany(models.Enrollment, {
        foreignKey: 'majorId',
        as: 'major',
      });

      Major.belongsToMany(models.AttendanceYear, {
        through: 'majors_attendance_years',
        as: 'attendanceYears',
        foreignKey: 'major_id',
      });

      Major.hasMany(models.AttendanceYear, {
        foreignKey: 'majorId',
        as: 'attendanceYear',
      });

      // Major.belongsToMany(models.Religion, {
      //   foreignKey: 'religionId',
      //   as: 'religion',
      // });

      // Student.belongsToMany(models.Ethnicity, {
      //   through: "student_ethnicities",
      //   as: "ethnicities",
      //   foreignKey: "student_id",
      // });
    }
  }

  Major.init(
    {
      majorId: {
        allowNull: false,
        autoIncrement: true,
        field: 'major_id',
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Major',
      tableName: 'majors',
    }
  );

  return Major;
};

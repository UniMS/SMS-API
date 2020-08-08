"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      Enrollment.belongsTo(models.Degree, {
        foreignKey: "degreeId",
        as: "degree",
      });

      Enrollment.belongsTo(models.Major, {
        foreignKey: "majorId",
        as: "major",
      });

      Enrollment.belongsTo(models.Student, {
        foreignKey: "studentId",
        as: "student",
      });

      Enrollment.belongsTo(models.AcademicYear, {
        foreignKey: "academicYearId",
        as: "academicYear",
      });

      Enrollment.belongsTo(models.AttendanceYear, {
        foreignKey: "attendanceYearId",
        as: "attendanceYear",
      });

      Enrollment.belongsTo(models.Status, {
        foreignKey: "statusId",
        as: "status",
      });

      Enrollment.hasOne(models.Grading, {
        foreignKey: "enrollmentId",
        as: "grading",
      });
    }
  }

  Enrollment.init(
    {
      enrollmentId: {
        allowNull: false,
        autoIncrement: true,
        field: "enrollment_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      degreeId: {
        allowNull: false,
        field: "degree_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "degrees",
          key: "degree_id",
        },
        type: DataTypes.INTEGER,
      },
      majorId: {
        allowNull: false,
        field: "major_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "majors",
          key: "major_id",
        },
        type: DataTypes.INTEGER,
      },
      studentId: {
        allowNull: false,
        field: "student_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "students",
          key: "student_id",
        },
        type: DataTypes.INTEGER,
      },
      academicYearId: {
        allowNull: false,
        field: "academic_year_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "academic_years",
          key: "academic_year_id",
        },
        type: DataTypes.INTEGER,
      },
      attendanceYearId: {
        allowNull: false,
        field: "attendance_year_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "attendance_years",
          key: "attendance_year_id",
        },
        type: DataTypes.INTEGER,
      },
      rollNo: {
        allowNull: false,
        field: "roll_no",
        type: DataTypes.STRING,
      },
      statusId: {
        allowNull: false,
        field: "status_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "status",
          key: "status_id",
        },
        type: DataTypes.INTEGER,
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
      modelName: "Enrollment",
      tableName: "enrollments",
    }
  );

  return Enrollment;
};

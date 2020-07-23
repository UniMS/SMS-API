"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      // Enrollment.belongsTo(models.Degree, {
      //   foreignKey: "degreeId",
      // });

      Enrollment.belongsTo(models.Major, {
        foreignKey: "majorId",
      });

      Enrollment.belongsTo(models.Student, {
        foreignKey: "studentId",
      });

      Enrollment.belongsTo(models.AcademicYear, {
        foreignKey: "academicYearId",
      });

      Enrollment.belongsTo(models.AttendanceYear, {
        foreignKey: "attendanceYearId",
      });

      Enrollment.belongsTo(models.Remark, {
        foreignKey: "remarkId",
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
        type: DataTypes.STRING,
      },
      remarkId: {
        allowNull: false,
        field: "remark_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "remarks",
          key: "remark_id",
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

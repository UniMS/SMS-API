"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Major, {
        foreignKey: "majorId",
        as: "major",
      });

      Course.belongsTo(models.Subject, {
        foreignKey: "subjectId",
        as: "subject",
      });

      Course.belongsTo(models.AcademicYear, {
        foreignKey: "academicYearId",
        as: "academicYear",
      });

      Course.belongsTo(models.AttendanceYear, {
        foreignKey: "attendanceYearId",
        as: "attendanceYear",
      });
    }
  }

  Course.init(
    {
      courseId: {
        allowNull: false,
        autoIncrement: true,
        field: "course_id",
        primaryKey: true,
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
      subjectId: {
        allowNull: false,
        field: "subject_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "subjects",
          key: "subject_id",
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
      semester: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      peroidsInWeeks: {
        allowNull: false,
        field: "periods_in_weeks",
        type: DataTypes.TINYINT,
      },
      lecturesInHoursPerWeek: {
        allowNull: false,
        field: "lectures_in_hours_per_week",
        type: DataTypes.TINYINT,
      },
      labsFieldsDrawingsInHoursPerWeek: {
        allowNull: false,
        field: "labs_fields_drawings_in_hours_per_week",
        type: DataTypes.TINYINT,
      },
      distinctionMark: {
        allowNull: false,
        field: "distinction_mark",
        type: DataTypes.TINYINT,
      },
      fullMark: {
        allowNull: false,
        field: "full_mark",
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
      modelName: "Course",
      tableName: "courses",
    }
  );

  return Course;
};

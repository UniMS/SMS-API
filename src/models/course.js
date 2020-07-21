"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Enrollment.belongsTo(models.Major, {
        foreignKey: "majorId",
      });

      Enrollment.belongsTo(models.Subject, {
        foreignKey: "subjectId",
      });

      Enrollment.belongsTo(models.AcademicYear, {
        foreignKey: "academicYearId",
      });

      Enrollment.belongsTo(models.AttendanceYear, {
        foreignKey: "attendanceYearId",
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
      },
      semester: {
        allowNull: false,
        type: Sequelize.TINYINT,
      },
      peroidsInWeeks: {
        allowNull: false,
        field: "periods_in_weeks",
        type: Sequelize.TINYINT,
      },
      lecturesInHoursPerWeek: {
        allowNull: false,
        field: "lectures_in_hours_per_week",
        type: Sequelize.TINYINT,
      },
      labsFieldsDrawingsInHoursPerWeek: {
        allowNull: false,
        field: "labs_fields_drawings_in_hours_per_week",
        type: Sequelize.TINYINT,
      },
      distinctionMark: {
        allowNull: false,
        field: "distinction_mark",
        type: Sequelize.TINYINT,
      },
      fullMark: {
        allowNull: false,
        field: "full_mark",
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
      modelName: "Course",
      tableName: "courses",
    }
  );

  return Course;
};

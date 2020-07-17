const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Course = sequelize.define(
  "Course",
  {
    courseId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "course_id",
      type: DataTypes.INTEGER,
    },
    majorId: {
      allowNull: false,
      field: "major_id",
      references: {
        model: "majors",
        key: "major_id",
      },
      type: DataTypes.INTEGER,
    },
    subjectId: {
      allowNull: false,
      field: "subject_id",
      references: {
        model: "subjects",
        key: "subject_id",
      },
      type: DataTypes.INTEGER,
    },
    academicYearId: {
      allowNull: false,
      field: "academic_year_id",
      references: {
        model: "academic_years",
        key: "academic_year_id",
      },
      type: DataTypes.INTEGER,
    },
    attendanceYear: {
      allowNull: false,
      field: "attendance_year",
      type: DataTypes.INTEGER,
    },
    semester: {
      allowNull: false,
      field: "semester",
      type: DataTypes.INTEGER,
    },
    periodsInWeeks: {
      allowNull: false,
      defaultValue: "0",
      field: "periods_in_weeks",
      type: DataTypes.INTEGER,
    },
    lecturesInHoursPerWeek: {
      allowNull: false,
      defaultValue: "0",
      field: "lectures_in_hours_per_week",
      type: DataTypes.INTEGER,
    },
    labsFieldsDrawingsInHoursPerWeek: {
      allowNull: false,
      defaultValue: "0",
      field: "labs_fields_drawings_in_hours_per_week",
      type: DataTypes.INTEGER,
    },
    distinctionMark: {
      allowNull: false,
      field: "distinction_mark",
      type: DataTypes.INTEGER,
    },
    fullMark: {
      allowNull: false,
      field: "full_mark",
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "courses",
  }
);

module.export = Course;

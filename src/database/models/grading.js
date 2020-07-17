const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Grading = sequelize.define(
  "Grading",
  {
    gradingId: {
      allowNull: false,
      autoIncrement: true,
      field: "grading_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    examId: {
      allowNull: false,
      field: "exam_id",
      references: {
        model: "exams",
        key: "exam_id",
      },
      type: DataTypes.INTEGER,
    },
    courseId: {
      allowNull: false,
      field: "course_id",
      references: {
        model: "courses",
        key: "course_id",
      },
      type: DataTypes.INTEGER,
    },
    enrollmentId: {
      allowNull: false,
      field: "enrollment_id",
      references: {
        model: "enrollments",
        key: "enrollment_id",
      },
      type: DataTypes.INTEGER,
    },
    gradeId: {
      allowNull: false,
      field: "grade_id",
      references: {
        model: "grades",
        key: "grade_id",
      },
      type: DataTypes.INTEGER,
    },
    mark: {
      allowNull: false,
      field: "mark",
      type: DataTypes.INTEGER,
    },
    getDistinction: {
      allowNull: false,
      field: "get_distinction",
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "gradings",
  }
);

module.exports = Grading;

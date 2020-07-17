const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Exam = sequelize.define(
  "exam",
  {
    examId: {
      allowNull: false,
      autoIncrement: true,
      field: "exam_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    degreeId: {
      allowNull: false,
      field: "degree_id",
      references: {
        model: "degrees",
        key: "degree_id",
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
    semester: {
      allowNull: false,
      field: "semester",
      type: DataTypes.INTEGER,
    },
    heldIn: {
      allowNull: false,
      field: "held_in",
      type: DataTypes.DATEONLY,
    },
  },
  {
    tableName: "exams",
  }
);

module.exports = Exam;

const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Enrollment = sequelize.define(
  "Enrollment",
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
      references: {
        model: "degrees",
        key: "degree_id",
      },
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
    studentId: {
      allowNull: false,
      field: "student_id",
      references: {
        model: "students",
        key: "student_id",
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
    rollNo: {
      allowNull: false,
      field: "roll_no",
      type: DataTypes.STRING(30),
    },
    attendanceYear: {
      allowNull: false,
      field: "attendance_year",
      type: DataTypes.INTEGER,
    },
    remark: {
      allowNull: false,
      field: "remark",
      type: DataTypes.STRING(10),
    },
    remarkId: {
      allowNull: false,
      field: "remark_id",
      references: {
        model: "remarks",
        key: "remark_id",
      },
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "enrollments",
  }
);

module.exports = Enrollment;

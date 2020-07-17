const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Grade = sequelize.define(
  "Grade",
  {
    gradeId: {
      allowNull: false,
      autoIncrement: true,
      field: "grade_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      field: "name",
      type: DataTypes.STRING(10),
    },
  },
  {
    tableName: "grades",
  }
);

module.exports = Grade;

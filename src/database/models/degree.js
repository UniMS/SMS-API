const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Degree = sequelize.define(
  "Degree",
  {
    degreeId: {
      allowNull: false,
      autoIncrement: true,
      field: "degree_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      field: "name",
      type: DataTypes.STRING(30),
    },
    description: {
      allowNull: false,
      field: "description",
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "degrees",
  }
);

module.exports = Degree;

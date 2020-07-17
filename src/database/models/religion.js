const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Religion = sequelize.define(
  "Religion",
  {
    religionId: {
      allowNull: false,
      autoIncrement: true,
      field: "religion_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      field: "name",
      type: DataTypes.STRING(30),
    },
  },
  {
    tableName: "religions",
  }
);

module.exports = Religion;

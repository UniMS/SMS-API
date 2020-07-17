const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Remark = sequelize.define(
  "Remark",
  {
    remarkId: {
      allowNull: false,
      autoIncrement: true,
      field: "remark_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      field: "name",
      type: DataTypes.STRING(10),
    },
    description: {
      allowNull: true,
      field: "description",
      type: DataTypes.STRING(30),
    },
  },
  {
    tableName: "remarks",
  }
);

module.exports = Remark;

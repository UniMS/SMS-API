const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Role = sequelize.define(
  "Role",
  {
    roleId: {
      allowNull: false,
      autoIncrement: true,
      field: "role_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      field: "name",
      type: DataTypes.STRING(30),
    },
    description: {
      allowNull: true,
      field: "description",
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: "roles",
  }
);

module.exports = Role;

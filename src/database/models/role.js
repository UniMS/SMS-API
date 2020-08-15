"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: "roleId",
        as: "user",
      });
    }
  }

  Role.init(
    {
      roleId: {
        allowNull: false,
        autoIncrement: true,
        field: "role_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "roles",
      modelName: "Role",
    }
  );

  return Role;
};

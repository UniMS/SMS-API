"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      // define association here
    }
  }

  Status.init(
    {
      statusId: {
        allowNull: false,
        autoIncrement: true,
        field: "status_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
    },
    {
      sequelize,
      modelName: "Status",
      tableName: "status",
    }
  );

  return Status;
};

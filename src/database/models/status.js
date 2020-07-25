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
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: DataTypes.DATE,
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

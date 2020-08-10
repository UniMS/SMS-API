"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Remark extends Model {
    static associate(models) {
      // Remark.hasMany(models.Enrollment, {
      //   foreignKey: "remarkId",
      //   as: "remark",
      // });
    }
  }

  Remark.init(
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
        type: DataTypes.STRING(20),
      },
      description: {
        allowNull: true,
        type: DataTypes.STRING,
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
      modelName: "Remark",
      tableName: "remarks",
    }
  );

  return Remark;
};

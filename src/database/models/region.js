"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Region extends Model {
    static associate(models) {
      Region.hasMany(models.Township, {
        foreignKey: "townshipId",
        as: "township",
      });
    }
  }

  Region.init(
    {
      regionId: {
        allowNull: false,
        autoIncrement: true,
        field: "region_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "regions",
      modelName: "Region",
    }
  );

  return Region;
};

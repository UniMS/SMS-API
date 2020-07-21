"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Township extends Model {
    static associate(models) {
      Township.belongsTo(models.Region, {
        foreignKey: "regionId",
      });
    }
  }

  Township.init(
    {
      townshipId: {
        allowNull: false,
        autoIncrement: true,
        field: "township_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      regionId: {
        allowNull: false,
        field: "region_id",
        references: {
          model: "regions",
          key: "region_id",
        },
        type: DataTypes.INTEGER,
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
      modelName: "Township",
      tableName: "townships",
    }
  );
  return Township;
};

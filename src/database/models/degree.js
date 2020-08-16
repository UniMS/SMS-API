"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Degree extends Model {
    static associate(models) {
      // define association here
    }
  }

  Degree.init(
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
        type: DataTypes.STRING(50),
      },
      majorId: {
        allowNull: false,
        field: "major_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "major",
          key: "major_id",
        },
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Degree",
      tableName: "degrees",
    }
  );

  return Degree;
};

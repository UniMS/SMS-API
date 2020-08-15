"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ethnicity extends Model {
    static associate(models) {
      // define association here
    }
  }

  Ethnicity.init(
    {
      ethnicityId: {
        allowNull: false,
        autoIncrement: true,
        field: "ethnicity_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
    },
    {
      sequelize,
      modelName: "Ethnicity",
      tableName: "ethnicities",
    }
  );
  return Ethnicity;
};

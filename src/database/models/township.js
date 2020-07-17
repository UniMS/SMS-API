const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Township = sequelize.define(
  "Township",
  {
    townshipId: {
      allowNull: false,
      autoIncrement: true,
      field: "township_id",
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    name: {
      allowNull: false,
      field: "name",
      type: DataTypes.STRING(30),
    },
  },
  {
    tableName: "townships",
  }
);

module.exports = Township;

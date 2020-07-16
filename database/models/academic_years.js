const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./node_modules");

Sequelize.define("academicYears", {
  academicYearId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    field: "academic_year_id",
    primaryKey: true,
  },
});

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "academicYears",
    {
      academicYearId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "academic_year_id",
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        field: "name",
      },
    },
    {
      tableName: "academic_years",
    }
  );
};

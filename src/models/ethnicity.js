module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Ethnicity",
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
        field: "name",
        type: DataTypes.STRING(30),
      },
    },
    {
      tableName: "ethnicities",
    }
  );
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Region",
    {
      regionId: {
        allowNull: false,
        autoIncrement: true,
        field: "region_id",
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
      tableName: "regions",
    }
  );
};

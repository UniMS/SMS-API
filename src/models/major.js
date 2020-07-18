module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Major",
    {
      majorId: {
        allowNull: false,
        autoIncrement: true,
        field: "major_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        field: "name",
        type: DataTypes.STRING(10),
      },
      description: {
        allowNull: false,
        field: "description",
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: "majors",
    }
  );
};

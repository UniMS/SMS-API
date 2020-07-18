module.exports = (sequelize, DataTypes) => {
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

  Township.associate = (models) => {
    Township.belongsTo(models.Region, {
      foreignKey: {
        allowNull: false,
        name: "region_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return Township;
};

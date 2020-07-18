module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "users",
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        field: "user_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        field: "username",
        type: DataTypes.STRING(50),
      },
      password: {
        allowNull: false,
        field: "password",
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "users",
    }
  );

  User.associate = (models) => {
    User.belongsTo(models.Role, {
      foreignKey: {
        allowNull: false,
        name: "role_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return User;
};

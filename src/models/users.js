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
        isEmail: true,
        type: DataTypes.STRING(50),
        unique: true,
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
        type: DataTypes.INTEGER,
        name: "role_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return User;
};

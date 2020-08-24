'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      });
    }
  }

  User.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        field: 'user_id',
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      roleId: {
        allowNull: false,
        field: 'role_id',
        references: {
          model: 'roles',
          key: 'role_id',
        },
        type: DataTypes.INTEGER,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );

  User.beforeCreate((user) => {
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });

  User.beforeUpdate((user) => {
    user.updatedAt = new Date();
  });

  User.prototype.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.generateAuthToken = function () {
    const token = jwt.sign({ userId: this.userId, username: this.username, roleId: this.roleId }, process.env.JWT_PRIVATE_KEY);
    return token;
  };

  return User;
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    username: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(8).max(255).required(),
    roleId: Joi.number().required(),
  });

  return schema.validate(user);
}

module.exports.validate = validateUser;

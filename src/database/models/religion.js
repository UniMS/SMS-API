'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Religion extends Model {
    static associate(models) {
      Religion.hasMany(models.Student, {
        foreignKey: 'religionId',
        as: 'student',
      });

      Religion.hasMany(models.Major, {
        foreignKey: 'religionId',
        as: 'major',
      });
    }
  }

  Religion.init(
    {
      religionId: {
        allowNull: false,
        autoIncrement: true,
        field: 'religion_id',
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Religion',
      tableName: 'religions',
    }
  );

  return Religion;
};

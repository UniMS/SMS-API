'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  parent.init({
    fatherNameMm: DataTypes.STRING,
    fatherNameEn: DataTypes.STRING,
    fatherNrc: DataTypes.STRING,
    fatherNrcFront: DataTypes.STRING,
    fatherNrcBack: DataTypes.STRING,
    fatherJob: DataTypes.STRING,
    fatherPhone: DataTypes.STRING,
    motherNameMm: DataTypes.STRING,
    motherNameEn: DataTypes.STRING,
    motherNrc: DataTypes.STRING,
    motherNrcFront: DataTypes.STRING,
    motherNrcBack: DataTypes.STRING,
    motherJob: DataTypes.STRING,
    motherPhone: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'parent',
  });
  return parent;
};
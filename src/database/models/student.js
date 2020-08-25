'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Township, {
        foreignKey: 'townshipId',
        as: 'township',
        targetKey: 'townshipId',
      });

      Student.belongsToMany(models.Ethnicity, {
        through: 'student_ethnicities',
        as: 'ethnicities',
        foreignKey: 'student_id',
      });

      Student.belongsTo(models.Religion, {
        foreignKey: 'religionId',
        as: 'religion',
        targetKey: 'religionId',
      });

      Student.hasOne(models.Parent, {
        foreignKey: 'studentId',
        as: 'parent',
        sourceKey: 'studentId',
      });

      Student.belongsTo(models.Enrollment, {
        foreignKey: 'studentId',
        as: 'enrollment',
      });
    }
  }

  Student.init(
    {
      studentId: {
        allowNull: false,
        autoIncrement: true,
        field: 'student_id',
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nameEn: {
        allowNull: false,
        field: 'name_en',
        type: DataTypes.STRING(50),
      },
      nameMm: {
        allowNull: false,
        field: 'name_mm',
        type: DataTypes.STRING(50),
      },
      nrc: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      nrcFront: {
        allowNull: true,
        field: 'nrc_front',
        type: DataTypes.STRING(50),
      },
      nrcBack: {
        allowNull: true,
        field: 'nrc_back',
        type: DataTypes.STRING(50),
      },
      gender: {
        allowNull: false,
        type: DataTypes.TINYINT(1),
      },
      birthday: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      entranceDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      hostelName: {
        allowNull: true,
        field: 'hostel_name',
        type: DataTypes.STRING(50),
      },
      hostelAddress: {
        allowNull: true,
        field: 'hostel_address',
        type: DataTypes.STRING(255),
      },
      townshipId: {
        allowNull: false,
        field: 'township_id',
        references: {
          model: 'townships',
          key: 'township_id',
        },
        type: DataTypes.INTEGER,
      },
      religionId: {
        allowNull: false,
        field: 'religion_id',
        references: {
          model: 'religons',
          key: 'religion_id',
        },
        type: DataTypes.INTEGER,
      },
      photo: {
        allowNull: true,
        type: DataTypes.STRING(50),
      },
      wardRecommendationLetter: {
        allowNull: true,
        field: 'ward_recommendation_letter',
        type: DataTypes.STRING(50),
      },
      policeRecommendationLetter: {
        allowNull: true,
        field: 'police_recommendation_letter',
        type: DataTypes.STRING(50),
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'students',
    }
  );
  return Student;
};

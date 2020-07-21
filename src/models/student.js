"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Township, {
        foreignKey: "townshipId",
      });
    }
  }

  Student.init(
    {
      studentId: {
        allowNull: false,
        autoIncrement: true,
        field: "student_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameEn: {
        allowNull: false,
        field: "name_en",
        type: Sequelize.STRING(50),
      },
      nameMm: {
        allowNull: false,
        field: "name_mm",
        type: Sequelize.STRING(50),
      },
      nrc: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      nrcFront: {
        allowNull: true,
        field: "nrc_front",
        type: Sequelize.STRING(50),
      },
      nrcBack: {
        allowNull: true,
        field: "nrc_back",
        type: Sequelize.STRING(50),
      },
      gender: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      hostelAddress: {
        allowNull: true,
        field: "hostel_address",
        type: Sequelize.STRING(255),
      },
      townshipId: {
        allowNull: false,
        field: "township_id",
        references: {
          model: "townships",
          key: "township_id",
        },
        type: DataTypes.INTEGER,
      },
      ethnicityId: {
        allowNull: false,
        field: "ethnicity_id",
        references: {
          model: "ethnicities",
          key: "ethnicity_id",
        },
        type: DataTypes.INTEGER,
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING(30),
      },
      wardRecommendationLetter: {
        allowNull: true,
        field: "ward_recommendation_letter",
        type: Sequelize.STRING(30),
      },
      policeRecommendationRetter: {
        allowNull: true,
        field: "police_recommendation_letter",
        type: Sequelize.STRING(30),
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: "Student",
      tableName: "students",
    }
  );
  return Student;
};

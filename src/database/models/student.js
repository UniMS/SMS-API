"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.Township, {
        foreignKey: "townshipId",
      });

      Student.belongsTo(models.Ethnicity, {
        foreignKey: "ethnicityId",
      });

      Student.belongsTo(models.Religion, {
        foreignKey: "religionId",
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
        type: DataTypes.INTEGER,
      },
      entranceNo: {
        allowNull: false,
        field: "entrance_no",
        type: DataTypes.STRING(30),
      },
      nameEn: {
        allowNull: false,
        field: "name_en",
        type: DataTypes.STRING(50),
      },
      nameMm: {
        allowNull: false,
        field: "name_mm",
        type: DataTypes.STRING(50),
      },
      nrc: {
        allowNull: false,
        type: DataTypes.STRING(30),
      },
      nrcFront: {
        allowNull: true,
        field: "nrc_front",
        type: DataTypes.STRING(50),
      },
      nrcBack: {
        allowNull: true,
        field: "nrc_back",
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
      address: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      hostelAddress: {
        allowNull: true,
        field: "hostel_address",
        type: DataTypes.STRING(255),
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
      religionId: {
        allowNull: false,
        field: "religion_id",
        references: {
          model: "religons",
          key: "religion_id",
        },
        type: DataTypes.INTEGER,
      },
      photo: {
        allowNull: true,
        type: DataTypes.STRING(30),
      },
      wardRecommendationLetter: {
        allowNull: true,
        field: "ward_recommendation_letter",
        type: DataTypes.STRING(30),
      },
      policeRecommendationRetter: {
        allowNull: true,
        field: "police_recommendation_letter",
        type: DataTypes.STRING(30),
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: DataTypes.DATE,
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

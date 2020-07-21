"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    static associate(models) {
      Parent.belongsTo(models.Student, {
        foreignKey: "studentId",
      });

      Parent.belongsTo(models.Township, {
        foreignKey: "townshipId",
      });
    }
  }

  Parent.init(
    {
      parentId: {
        allowNull: false,
        autoIncrement: true,
        field: "parent_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      studentId: {
        allowNull: false,
        field: "student_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "students",
          key: "student_id",
        },
        type: Sequelize.INTEGER,
      },
      fatherNameMm: {
        allowNull: false,
        field: "father_name_mm",
        type: Sequelize.STRING(50),
      },
      fatherNameEn: {
        allowNull: false,
        field: "father_name_en",
        type: Sequelize.STRING(50),
      },
      fatherNrc: {
        allowNull: false,
        field: "father_nrc",
        type: Sequelize.STRING(30),
      },
      fatherNrcFront: {
        allowNull: true,
        field: "father_nrc_front",
        type: Sequelize.STRING(50),
      },
      fatherNrcBack: {
        allowNull: true,
        field: "father_nrc_back",
        type: Sequelize.STRING(50),
      },
      fatherJob: {
        allowNull: false,
        field: "father_job",
        type: Sequelize.STRING(30),
      },
      fatherPhone: {
        allowNull: false,
        field: "father_phone",
        type: Sequelize.STRING(30),
      },
      motherNameMm: {
        allowNull: false,
        field: "mother_name_mm",
        type: Sequelize.STRING(50),
      },
      motherNameEn: {
        allowNull: false,
        field: "mother_name_en",
        type: Sequelize.STRING(50),
      },
      motherNrc: {
        allowNull: false,
        field: "mother_nrc",
        type: Sequelize.STRING(30),
      },
      motherNrcFront: {
        allowNull: true,
        field: "mother_nrc_front",
        type: Sequelize.STRING(50),
      },
      motherNrcBack: {
        allowNull: true,
        field: "mother_nrc_back",
        type: Sequelize.STRING(50),
      },
      motherJob: {
        allowNull: false,
        field: "mother_job",
        type: Sequelize.STRING(30),
      },
      motherPhone: {
        allowNull: false,
        field: "mother_phone",
        type: Sequelize.STRING(30),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      townshipId: {
        allowNull: false,
        field: "township_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "townships",
          key: "township_id",
        },
        type: Sequelize.INTEGER,
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
      modelName: "Parent",
      tableName: "parents",
    }
  );
  return Parent;
};

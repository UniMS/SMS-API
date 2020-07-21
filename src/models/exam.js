"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    static associate(models) {
      Exam.belongsTo(models.Degree, {
        foreignKey: "examId",
      });

      Exam.belongsTo(models.AcademicYear, {
        foreignKey: "academicYearId",
      });
    }
  }

  Exam.init(
    {
      examId: {
        allowNull: false,
        autoIncrement: true,
        field: "exam_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      degreeId: {
        allowNull: false,
        field: "degree_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "degrees",
          key: "degree_id",
        },
        type: Sequelize.INTEGER,
      },
      academicYearId: {
        allowNull: false,
        field: "academic_year_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "academic_years",
          key: "academic_year_id",
        },
        type: Sequelize.INTEGER,
      },
      semester: {
        allowNull: false,
        type: Sequelize.TINYINT,
      },
      heldIn: {
        allowNull: false,
        type: Sequelize.DATE,
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
      modelName: "Exam",
      tableName: "exams",
    }
  );

  return Exam;
};

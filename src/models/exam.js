"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    static associate(models) {
      // Exam.belongsTo(models.Degree, {
      //   foreignKey: "examId",
      // });

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
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
      },
      semester: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      heldIn: {
        allowNull: false,
        type: DataTypes.DATE,
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
      modelName: "Exam",
      tableName: "exams",
    }
  );

  return Exam;
};

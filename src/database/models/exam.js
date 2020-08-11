"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    static associate(models) {
      Exam.belongsTo(models.Degree, {
        foreignKey: "examId",
        as: "degree",
      });

      Exam.belongsTo(models.AcademicYear, {
        foreignKey: "academicYearId",
        as: "academicYear",
      });

      Exam.hasMany(models.Grading, {
        foreignKey: "examId",
        as: "exam",
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
      attendanceYearId: {
        allowNull: false,
        field: "attendance_year_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "attendance_years",
          key: "attendance_year_id",
        },
        type: DataTypes.INTEGER,
      },
      majorId: {
        allowNull: false,
        field: "major_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "majors",
          key: "major_id",
        },
        type: DataTypes.INTEGER,
      },
      semester: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      heldIn: {
        allowNull: false,
        field: "held_in",
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
      // defaultScope: {
      //   attributes: { exclude: ["createdAt", "updatedAt"] },
      // },
    }
  );

  return Exam;
};

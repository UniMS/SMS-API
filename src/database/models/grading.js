"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Grading extends Model {
    static associate(models) {
      Grading.belongsTo(models.Exam, {
        foreignKey: "examId",
        as: "exam",
      });

      Grading.belongsTo(models.Course, {
        foreignKey: "courseId",
        as: "course",
      });

      Grading.belongsTo(models.Enrollment, {
        foreignKey: "enrollmentId",
        as: "enrollment",
      });

      Grading.belongsTo(models.Grade, {
        foreignKey: "gradeId",
        as: "grade",
      });

      Grading.belongsTo(models.Remark, {
        foreignKey: "remarkId",
        as: "remark",
      });
    }
  }

  Grading.init(
    {
      gradingId: {
        allowNull: false,
        autoIncrement: true,
        field: "grading_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      examId: {
        allowNull: false,
        field: "exam_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "exams",
          key: "exam_id",
        },
        type: DataTypes.INTEGER,
      },
      courseId: {
        allowNull: false,
        field: "course_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "courses",
          key: "course_id",
        },
        type: DataTypes.INTEGER,
      },
      enrollmentId: {
        allowNull: false,
        field: "enrollment_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "enrollments",
          key: "enrollment_id",
        },
        type: DataTypes.INTEGER,
      },
      gradeId: {
        allowNull: false,
        field: "grade_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "grades",
          key: "grade_id",
        },
        type: DataTypes.INTEGER,
      },
      remarkId: {
        allowNull: false,
        field: "remark_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "remarks",
          key: "remark_id",
        },
        type: DataTypes.INTEGER,
      },
      mark: {
        allowNull: false,
        type: DataTypes.TINYINT,
      },
      getDistinction: {
        allowNull: false,
        field: "get_distinction",
        type: DataTypes.TINYINT(1),
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
      modelName: "Grading",
      tableName: "gradings",
    }
  );

  return Grading;
};

"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ExamResult extends Model {
    static associate(models) {
      // ExamResult.belongsTo(models.Exam, {
      //   foreignKey: "examId",
      // });

      ExamResult.belongsTo(models.Course, {
        foreignKey: "courseId",
      });

      ExamResult.belongsTo(models.Enrollment, {
        foreignKey: "enrollmentId",
      });

      ExamResult.belongsTo(models.Grade, {
        foreignKey: "gradeId",
      });
    }
  }

  ExamResult.init(
    {
      examResultId: {
        allowNull: false,
        autoIncrement: true,
        field: "exam_result_id",
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
      getDistinction: {
        allowNull: false,
        field: "get_distinction",
        type: DataTypes.TINYINT,
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
      modelName: "ExamResult",
      tableName: "exam_results",
    }
  );

  return ExamResult;
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("exam_results", {
      examResultId: {
        allowNull: false,
        autoIncrement: true,
        field: "exam_result_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
      },
      enrollmentId: {
        allowNull: false,
        field: "enrollment_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "enrollments",
          key: "enrollment_id",
        },
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
      },
      getDistinction: {
        allowNull: false,
        field: "get_distinction",
        type: Sequelize.TINYINT(1),
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("exam_results");
  },
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("enrollments", {
      enrollmentId: {
        allowNull: false,
        autoIncrement: true,
        field: "enrollment_id",
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
      majorId: {
        allowNull: false,
        field: "major_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "majors",
          key: "major_id",
        },
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
      attendanceYearId: {
        allowNull: false,
        field: "attendance_year_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "attendance_years",
          key: "attendance_year_id",
        },
        type: Sequelize.INTEGER,
      },
      rollNo: {
        allowNull: false,
        field: "roll_no",
        type: Sequelize.STRING,
      },
      statusId: {
        allowNull: false,
        field: "status_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "status",
          key: "status_id",
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
    await queryInterface.dropTable("enrollments");
  },
};

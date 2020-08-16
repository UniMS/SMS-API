"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("courses", {
      courseId: {
        allowNull: false,
        autoIncrement: true,
        field: "course_id",
        primaryKey: true,
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
      subjectId: {
        allowNull: false,
        field: "subject_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "subjects",
          key: "subject_id",
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
      semester: {
        allowNull: false,
        type: Sequelize.TINYINT,
      },
      lecturesInHoursPerWeek: {
        allowNull: false,
        field: "lectures_in_hours_per_week",
        type: Sequelize.TINYINT,
      },
      labsFieldsDrawingsInHoursPerWeek: {
        allowNull: false,
        field: "labs_fields_drawings_in_hours_per_week",
        type: Sequelize.TINYINT,
      },
      passMark: {
        allowNull: false,
        field: "pass_mark",
        type: Sequelize.TINYINT,
      },
      distinctionMark: {
        allowNull: false,
        field: "distinction_mark",
        type: Sequelize.TINYINT,
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
    await queryInterface.dropTable("courses");
  },
};

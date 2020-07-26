"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("students", {
      studentId: {
        allowNull: false,
        autoIncrement: true,
        field: "student_id",
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      entranceNo: {
        allowNull: false,
        field: "entrance_no",
        type: Sequelize.STRING(30),
      },
      nameEn: {
        allowNull: false,
        field: "name_en",
        type: Sequelize.STRING(50),
      },
      nameMm: {
        allowNull: false,
        field: "name_mm",
        type: Sequelize.STRING(50),
      },
      nrc: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      nrcFront: {
        allowNull: true,
        field: "nrc_front",
        type: Sequelize.STRING(50),
      },
      nrcBack: {
        allowNull: true,
        field: "nrc_back",
        type: Sequelize.STRING(50),
      },
      gender: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
      },
      birthday: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      hostelAddress: {
        allowNull: true,
        field: "hostel_address",
        type: Sequelize.STRING(255),
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
      ethnicityId: {
        allowNull: false,
        field: "ethnicity_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "ethnicities",
          key: "ethnicity_id",
        },
        type: Sequelize.INTEGER,
      },
      religionId: {
        allowNull: false,
        field: "religion_id",
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
        references: {
          model: "religions",
          key: "religion_id",
        },
        type: Sequelize.INTEGER,
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      wardRecommendationLetter: {
        allowNull: true,
        field: "ward_recommendation_letter",
        type: Sequelize.STRING(50),
      },
      policeRecommendationRetter: {
        allowNull: true,
        field: "police_recommendation_letter",
        type: Sequelize.STRING(50),
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
    await queryInterface.dropTable("students");
  },
};

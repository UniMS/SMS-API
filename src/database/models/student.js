const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Student = sequelize.define(
  "Student",
  {
    studentId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      field: "student_id",
      type: DataTypes.INTEGER,
    },
    nameEn: {
      allowNull: false,
      field: "name_en",
      type: DataTypes.STRING(50),
    },
    nameMm: {
      allowNull: false,
      field: "name_mm",
      type: DataTypes.STRING(50),
    },
    nrc: {
      allowNull: false,
      field: "nrc",
      type: DataTypes.STRING(30),
    },
    nrcFront: {
      allowNull: true,
      field: "nrc_front",
      type: DataTypes.STRING(50),
    },
    nrcBack: {
      allowNull: true,
      field: "nrc_back",
      type: DataTypes.STRING(50),
    },
    gender: {
      allowNull: false,
      field: "gender",
      type: DataTypes.BOOLEAN,
    },
    birthday: {
      allowNull: false,
      field: "birthday",
      type: DataTypes.DATEONLY,
    },
    phone: {
      allowNull: false,
      field: "phone",
      type: DataTypes.STRING(30),
    },
    address: {
      allowNull: false,
      field: "address",
      type: DataTypes.STRING(255),
    },
    hostelAddress: {
      allowNull: true,
      field: "hostel_address",
      type: DataTypes.STRING(255),
    },
    townshipId: {
      allowNull: false,
      field: "township_id",
      references: {
        model: "townships",
        key: "township_id",
      },
      type: DataTypes.INTEGER,
    },
    religionId: {
      allowNull: false,
      field: "religion_id",
      references: {
        model: "religions",
        key: "religion_id",
      },
      type: DataTypes.INTEGER,
    },
    ethnicityId: {
      allowNull: false,
      field: "ethnicity_id",
      references: {
        model: "ethnicities",
        key: "ethnicity_id",
      },
      type: DataTypes.INTEGER,
    },
    photo: {
      allowNull: true,
      field: "photo",
      type: DataTypes.STRING(50),
    },
    wardRecommendationLetter: {
      allowNull: true,
      field: "ward_recommendation_letter",
      type: DataTypes.STRING(50),
    },
    policeRecommendationLetter: {
      allowNull: true,
      field: "police_recommendation_letter",
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "students",
  }
);

module.exports = Student;

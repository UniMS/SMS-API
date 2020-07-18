module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define(
    "Enrollment",
    {
      enrollmentId: {
        allowNull: false,
        autoIncrement: true,
        field: "enrollment_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      rollNo: {
        allowNull: false,
        field: "roll_no",
        type: DataTypes.STRING(30),
      },
      attendanceYear: {
        allowNull: false,
        field: "attendance_year",
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "enrollments",
    }
  );

  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.Degree, {
      foreignKey: {
        allowNull: false,
        name: "degree_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Enrollment.belongsTo(models.Major, {
      foreignKey: {
        allowNull: false,
        name: "major_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Enrollment.belongsTo(models.Student, {
      foreignKey: {
        allowNull: false,
        name: "student_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Enrollment.belongsTo(models.AcademicYear, {
      foreignKey: {
        allowNull: false,
        name: "academic_year_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Enrollment.belongsTo(models.Remark, {
      foreignKey: {
        allowNull: false,
        name: "remark_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return Enrollment;
};

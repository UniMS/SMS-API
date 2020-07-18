module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define(
    "exam",
    {
      examId: {
        allowNull: false,
        autoIncrement: true,
        field: "exam_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      semester: {
        allowNull: false,
        field: "semester",
        type: DataTypes.INTEGER,
      },
      heldIn: {
        allowNull: false,
        field: "held_in",
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: "exams",
    }
  );

  Exam.associate = (models) => {
    Exam.belongsTo(models.Degree, {
      foreignKey: {
        allowNull: false,
        name: "degree_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Exam.belongsTo(models.AcademicYear, {
      foreignKey: {
        allowNull: false,
        name: "academic_year_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return Exam;
};

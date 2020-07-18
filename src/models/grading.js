module.exports = (sequelize, DataTypes) => {
  const Grading = sequelize.define(
    "Grading",
    {
      gradingId: {
        allowNull: false,
        autoIncrement: true,
        field: "grading_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      mark: {
        allowNull: false,
        field: "mark",
        type: DataTypes.INTEGER,
      },
      getDistinction: {
        allowNull: false,
        field: "get_distinction",
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "gradings",
    }
  );

  Grading.associate = (models) => {
    // Grading.belongsTo(models.Exam, {
    //   foreignKey: {
    //     allowNull: false,
    //     name: "exam_id",
    //   },
    //   onDelete: "NO ACTION",
    //   onUpdate: "CASCADE",
    // });

    Grading.belongsTo(models.Course, {
      foreignKey: {
        allowNull: false,
        name: "course_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Grading.belongsTo(models.Enrollment, {
      foreignKey: {
        allowNull: false,
        name: "enrollment_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Grading.belongsTo(models.Grade, {
      foreignKey: {
        allowNull: false,
        name: "grade_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return Grading;
};

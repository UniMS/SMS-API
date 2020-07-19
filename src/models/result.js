module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define(
    "Result",
    {
      resultId: {
        allowNull: false,
        autoIncrement: true,
        field: "result_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      getDistinction: {
        allowNull: false,
        field: "get_distinction",
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "results",
    }
  );

  Result.associate = (models) => {
    Result.belongsTo(models.Course, {
      foreignKey: {
        allowNull: false,
        name: "course_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Result.belongsTo(models.Enrollment, {
      foreignKey: {
        allowNull: false,
        name: "enrollment_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Result.belongsTo(models.Grade, {
      foreignKey: {
        allowNull: false,
        name: "grade_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return Result;
};

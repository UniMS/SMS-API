module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Grade",
    {
      gradeId: {
        allowNull: false,
        autoIncrement: true,
        field: "grade_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        field: "name",
        type: DataTypes.STRING(10),
      },
    },
    {
      tableName: "grades",
    }
  );
};

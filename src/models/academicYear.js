module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "AcademicYear",
    {
      academicYearId: {
        allowNull: false,
        autoIncrement: true,
        field: "academic_year_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        field: "name",
        type: DataTypes.STRING(30),
      },
    },
    {
      tableName: "academic_years",
    }
  );
};

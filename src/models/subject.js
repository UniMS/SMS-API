module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Subject",
    {
      subjectId: {
        allowNull: false,
        autoIncrement: true,
        field: "subject_id",
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      code: {
        allowNull: false,
        field: "code",
        type: DataTypes.STRING(30),
      },
      name: {
        allowNull: false,
        field: "name",
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: "subjects",
    }
  );
};

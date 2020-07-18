module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    "Course",
    {
      courseId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "course_id",
        type: DataTypes.INTEGER,
      },
      attendanceYear: {
        allowNull: false,
        field: "attendance_year",
        type: DataTypes.INTEGER,
      },
      semester: {
        allowNull: false,
        field: "semester",
        type: DataTypes.INTEGER,
      },
      periodsInWeeks: {
        allowNull: false,
        defaultValue: "0",
        field: "periods_in_weeks",
        type: DataTypes.INTEGER,
      },
      lecturesInHoursPerWeek: {
        allowNull: false,
        defaultValue: "0",
        field: "lectures_in_hours_per_week",
        type: DataTypes.INTEGER,
      },
      labsFieldsDrawingsInHoursPerWeek: {
        allowNull: false,
        defaultValue: "0",
        field: "labs_fields_drawings_in_hours_per_week",
        type: DataTypes.INTEGER,
      },
      distinctionMark: {
        allowNull: false,
        field: "distinction_mark",
        type: DataTypes.INTEGER,
      },
      fullMark: {
        allowNull: false,
        field: "full_mark",
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "courses",
    }
  );

  Course.associate = (models) => {
    Course.belongsTo(models.Major, {
      foreignKey: {
        allowNull: false,
        name: "major_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Course.belongsTo(models.Subject, {
      foreignKey: {
        allowNull: false,
        name: "subject_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });

    Course.belongsTo(models.AcademicYear, {
      foreignKey: {
        allowNull: false,
        name: "academic_year_id",
      },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
    });
  };

  return Course;
};

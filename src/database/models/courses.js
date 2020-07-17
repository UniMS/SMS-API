/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "courses",
    {
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "course_id",
      },
      majorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "majors",
          key: "major_id",
        },
        field: "major_id",
      },
      subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "subjects",
          key: "subject_id",
        },
        field: "subject_id",
      },
      academicYearId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "academic_years",
          key: "academic_year_id",
        },
        field: "academic_year_id",
      },
      attendanceYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "attendance_year",
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "semester",
      },
      periodsInWeeks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
        field: "periods_in_weeks",
      },
      lecturesInHoursPerWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
        field: "lectures_in_hours_per_week",
      },
      labsFieldsDrawingsInHoursPerWeek: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "0",
        field: "labs_fields_drawings_in_hours_per_week",
      },
      distinctionMark: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "distinction_mark",
      },
      fullMark: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "full_mark",
      },
    },
    {
      tableName: "courses",
    }
  );
};

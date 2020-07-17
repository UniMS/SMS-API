/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('enrollments', {
		enrollmentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'enrollment_id'
		},
		degreeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'degrees',
				key: 'degree_id'
			},
			field: 'degree_id'
		},
		majorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'majors',
				key: 'major_id'
			},
			field: 'major_id'
		},
		studentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'students',
				key: 'student_id'
			},
			field: 'student_id'
		},
		academicYearId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'academic_years',
				key: 'academic_year_id'
			},
			field: 'academic_year_id'
		},
		rollNo: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'roll_no'
		},
		attendanceYear: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'attendance_year'
		},
		remark: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'remark'
		},
		remarkId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'remarks',
				key: 'remark_id'
			},
			field: 'remark_id'
		}
	}, {
		tableName: 'enrollments'
	});
};

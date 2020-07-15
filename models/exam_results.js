/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('examResults', {
		examResultId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'exam_result_id'
		},
		examId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'exams',
				key: 'exam_id'
			},
			field: 'exam_id'
		},
		courseId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'courses',
				key: 'course_id'
			},
			field: 'course_id'
		},
		enrollmentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'enrollments',
				key: 'enrollment_id'
			},
			field: 'enrollment_id'
		},
		gradeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'grades',
				key: 'grade_id'
			},
			field: 'grade_id'
		},
		getDistinction: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'get_distinction'
		}
	}, {
		tableName: 'exam_results'
	});
};

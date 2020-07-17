/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('exams', {
		examId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'exam_id'
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
		academicYearId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'academic_years',
				key: 'academic_year_id'
			},
			field: 'academic_year_id'
		},
		semester: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'semester'
		},
		heldIn: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'held_in'
		}
	}, {
		tableName: 'exams'
	});
};

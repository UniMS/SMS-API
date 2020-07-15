/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('academicYears', {
		academicYearId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'academic_year_id'
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'name'
		}
	}, {
		tableName: 'academic_years'
	});
};

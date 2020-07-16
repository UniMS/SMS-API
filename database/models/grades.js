/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('grades', {
		gradeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'grade_id'
		},
		name: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'name'
		},
		mark: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'mark'
		}
	}, {
		tableName: 'grades'
	});
};

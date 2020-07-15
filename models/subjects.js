/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('subjects', {
		subjectId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'subject_id'
		},
		code: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'code'
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'name'
		}
	}, {
		tableName: 'subjects'
	});
};

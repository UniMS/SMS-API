/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('majors', {
		majorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'major_id'
		},
		name: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'name'
		},
		description: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'description'
		}
	}, {
		tableName: 'majors'
	});
};

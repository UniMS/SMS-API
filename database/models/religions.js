/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('religions', {
		religionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'religion_id'
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'name'
		}
	}, {
		tableName: 'religions'
	});
};

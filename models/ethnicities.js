/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ethnicities', {
		ethnicityId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'ethnicity_id'
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'name'
		}
	}, {
		tableName: 'ethnicities'
	});
};

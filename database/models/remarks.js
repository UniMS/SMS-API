/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('remarks', {
		remarkId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'remark_id'
		},
		name: {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'name'
		},
		description: {
			type: DataTypes.STRING(30),
			allowNull: true,
			field: 'description'
		}
	}, {
		tableName: 'remarks'
	});
};

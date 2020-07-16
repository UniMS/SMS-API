/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('roles', {
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'role_id'
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'name'
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'description'
		}
	}, {
		tableName: 'roles'
	});
};

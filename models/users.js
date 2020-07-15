/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'user_id'
		},
		roleId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'roles',
				key: 'role_id'
			},
			field: 'role_id'
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'username'
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'password'
		}
	}, {
		tableName: 'users'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('degrees', {
		degreeId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'degree_id'
		},
		name: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'name'
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'description'
		}
	}, {
		tableName: 'degrees'
	});
};

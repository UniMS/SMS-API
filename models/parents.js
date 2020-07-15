/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('parents', {
		parentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'parent_id'
		},
		studentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'students',
				key: 'student_id'
			},
			field: 'student_id'
		},
		fatherNameMm: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'father_name_mm'
		},
		fatherNameEn: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'father_name_en'
		},
		fatherNrc: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'father_nrc'
		},
		fatherNrcFront: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'father_nrc_front'
		},
		fatherNrcBack: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'father_nrc_back'
		},
		fatherJob: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'father_job'
		},
		fatherPhone: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'father_phone'
		},
		motherNameMm: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'mother_name_mm'
		},
		motherNameEn: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'mother_name_en'
		},
		motherNrc: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'mother_nrc'
		},
		motherNrcFront: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'mother_nrc_front'
		},
		motherNrcBack: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'mother_nrc_back'
		},
		motherJob: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'mother_job'
		},
		motherPhone: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'mother_phone'
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'address'
		},
		townshipId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'townships',
				key: 'township_id'
			},
			field: 'township_id'
		}
	}, {
		tableName: 'parents'
	});
};

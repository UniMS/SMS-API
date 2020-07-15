/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('students', {
		studentId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'student_id'
		},
		nameEn: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'name_en'
		},
		nameMm: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'name_mm'
		},
		nrc: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'nrc'
		},
		nrcFront: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'nrc_front'
		},
		nrcBack: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'nrc_back'
		},
		gender: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'gender'
		},
		birthday: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'birthday'
		},
		phone: {
			type: DataTypes.STRING(30),
			allowNull: false,
			field: 'phone'
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'address'
		},
		hostelAddress: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'hostel_address'
		},
		townshipId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'townships',
				key: 'township_id'
			},
			field: 'township_id'
		},
		religionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'religions',
				key: 'religion_id'
			},
			field: 'religion_id'
		},
		ethnicityId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'ethnicities',
				key: 'ethnicity_id'
			},
			field: 'ethnicity_id'
		},
		photo: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'photo'
		},
		wardRecommendationLetter: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'ward_recommendation_letter'
		},
		policeRecommendationLetter: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'police_recommendation_letter'
		}
	}, {
		tableName: 'students'
	});
};

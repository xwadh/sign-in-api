/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		age: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		sex: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		platform: {
			type: DataTypes.INTEGER(255),
			allowNull: true
		}
	}, {
		tableName: 'user',
		timestamps: false
	});
};

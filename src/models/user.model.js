const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Token = require('./token.model');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
}, { tableName: 'users', timestamps: true });

User.hasMany(Token, { foreignKey: 'userId' });

module.exports = User;

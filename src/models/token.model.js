const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Token = sequelize.define('Token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false, unique: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    expires_at: { type: DataTypes.DATE, allowNull: false },
    revoked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, { tableName: 'refresh_tokens', timestamps: true });

module.exports = Token;

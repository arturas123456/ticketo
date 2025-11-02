const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    starts_at: { type: DataTypes.DATE, allowNull: false },
    ends_at: DataTypes.DATE
}, { tableName: 'events', timestamps: true });

module.exports = Event;

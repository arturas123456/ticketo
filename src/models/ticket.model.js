const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    seat: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: 'available' }
}, { tableName: 'tickets', timestamps: true });

module.exports = Ticket;

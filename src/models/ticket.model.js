const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event.model');
const User = require('./user.model');

const Ticket = sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    seat: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: 'available' }
}, { tableName: 'tickets', timestamps: true });

// Relationships
Ticket.belongsTo(Event, { foreignKey: 'event_id' });
Event.hasMany(Ticket, { foreignKey: 'event_id' });

Ticket.belongsTo(User, { foreignKey: 'owner_id' });
User.hasMany(Ticket, { foreignKey: 'owner_id' });

module.exports = Ticket;

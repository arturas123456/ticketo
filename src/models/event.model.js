const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Venue = require('./venue.model');

const Event = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    starts_at: { type: DataTypes.DATE, allowNull: false },
    ends_at: DataTypes.DATE
}, { tableName: 'events', timestamps: true });

// Relationships
Event.belongsTo(Venue, { foreignKey: 'venue_id' });
Venue.hasMany(Event, { foreignKey: 'venue_id' });

module.exports = Event;

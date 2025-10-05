const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    name: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'user' }
});

const Event = sequelize.define('Event', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    venue: DataTypes.STRING,
    starts_at: DataTypes.DATE,
    ends_at: DataTypes.DATE
});

User.hasMany(Event, { foreignKey: 'organizer_id' });
Event.belongsTo(User, { foreignKey: 'organizer_id' });

module.exports = { sequelize, User, Event };

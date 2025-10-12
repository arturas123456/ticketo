const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venue = sequelize.define('Venue', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    address: DataTypes.STRING,
    capacity: DataTypes.INTEGER
}, { tableName: 'venues', timestamps: true });

module.exports = Venue;

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Event = require('./event.model');
const Ticket = require('./ticket.model');
const Token = require('./token.model');
const User = require('./user.model');
const Venue = require('./venue.model');

const db = {
    sequelize,
    Sequelize,
    Event,
    Ticket,
    Token,
    User,
    Venue
};

// Event <-> Venue
Event.belongsTo(Venue, { foreignKey: 'venue_id' });
Venue.hasMany(Event, { foreignKey: 'venue_id' });

// Event <-> User (organizer)
Event.belongsTo(User, { foreignKey: 'organizer_id' });
User.hasMany(Event, { foreignKey: 'organizer_id' });

// Event <-> Ticket
Event.hasMany(Ticket, { foreignKey: 'event_id' });
Ticket.belongsTo(Event, { foreignKey: 'event_id' });

// Ticket <-> User (owner)
Ticket.belongsTo(User, { foreignKey: 'owner_id' });
User.hasMany(Ticket, { foreignKey: 'owner_id' });

// Token <-> User
Token.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Token, { foreignKey: 'user_id' });

module.exports = db;

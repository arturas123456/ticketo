const sequelize = require('./config/database');
const User = require('./models/user.model');
const Venue = require('./models/venue.model');
const Event = require('./models/event.model');
const Ticket = require('./models/ticket.model');

async function setup() {
    try {
        await sequelize.sync({ force: true });
        console.log('Duomenų bazės lentelės sėkmingai sukurtos.');
        process.exit(0);
    } catch (err) {
        console.error('Klaida kuriant lenteles:', err);
        process.exit(1);
    }
}

setup();

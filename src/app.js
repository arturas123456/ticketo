const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/events.routes');
const userRoutes = require('./routes/users.routes');
const venueRoutes = require('./routes/venues.routes');
const ticketRoutes = require('./routes/tickets.routes');

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Ticketo API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/tickets', ticketRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;

const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/events.routes');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;

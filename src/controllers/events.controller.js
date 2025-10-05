const { Event } = require('../models');

exports.listEvents = async (req, res) => {
    const events = await Event.findAll();
    res.json(events);
};

exports.createEvent = async (req, res) => {
    const { title, description, venue, starts_at, ends_at } = req.body;
    const event = await Event.create({
        title, description, venue, starts_at, ends_at, organizer_id: req.user.id
    });
    res.status(201).json(event);
};

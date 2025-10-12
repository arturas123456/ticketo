const { Event } = require('../models');

exports.createEvent = async (req, res) => {
    const { title, description, starts_at, ends_at, venue_id } = req.body;
    const event = await Event.create({
        title, description, starts_at, ends_at, venue_id, organizer_id: req.user.id
    });
    res.status(201).json(event);
};

exports.readEvent = async (req, res) => {
    const event = await Event.findByPk(req.body.event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
};

exports.updateEvent = async (req, res) => {
    const { title, description, venue, starts_at, ends_at } = req.body;
    const event = await Event.findByPk(req.body.event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    await event.update({ title, description, venue, starts_at, ends_at });
    res.status(204).json({ message: 'Event updated' });
};

exports.deleteEvent = async (req, res) => {
    const event = await Event.findByPk(req.body.event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    await event.destroy();
    res.status(204).json({ message: 'Event deleted' });
};
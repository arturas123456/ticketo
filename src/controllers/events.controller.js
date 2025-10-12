const { Event } = require('../models');

exports.createEvent = async (req, res) => {
    const { title, description, starts_at, ends_at, venue_id } = req.body;
    if (!title || !description || !starts_at || !ends_at || !venue_id) return res.status(400).json({ message: 'Missing required fields' });

    const event = await Event.create({
        title, description, starts_at, ends_at, venue_id, organizer_id: req.user.id
    });
    res.status(201).json(event);
};

exports.readEvent = async (req, res) => {
    const { event_id } = req.body;
    if (!event_id) return res.status(400).json({ message: 'Missing required fields' });

    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json(event);
};

exports.updateEvent = async (req, res) => {
    const { title, description, venue, starts_at, ends_at, event_id } = req.body;
    if (!title || !description || !starts_at || !ends_at || !venue_id || !event_id) return res.status(400).json({ message: 'Missing required fields' });

    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.update({ title, description, venue, starts_at, ends_at });
    res.status(204).json({ message: 'Event updated' });
};

exports.deleteEvent = async (req, res) => {
    const { event_id } = req.body;
    if (!event_id) return res.status(400).json({ message: 'Missing required fields' });

    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.destroy();
    res.status(204).json({ message: 'Event deleted' });
};

exports.listEvents = async (req, res) => {
    const events = await Event.findAll();
    res.status(200).json(events);
};
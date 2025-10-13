const Event = require('../models/event.model');
const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const Venue = require('../models/venue.model');

exports.createEvent = async (req, res) => {
    const { title, description, starts_at, ends_at, venue_id, organizer_id } = req.body;
    if (!title || !description || !starts_at || !ends_at || !venue_id || !organizer_id) return res.status(400).json({ message: 'Missing required fields' });

    const user = await User.findByPk(organizer_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const venue = await Venue.findByPk(venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    
    if (new Date(ends_at) < new Date(starts_at)) return res.status(400).json({ message: 'End date must be after start date' });
    
    const event = await Event.create({
        title, description, starts_at, ends_at, venue_id, organizer_id
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
    const { title, description, starts_at, ends_at, venue_id, event_id } = req.body;
    if (!title || !description || !starts_at || !ends_at || !venue_id || !event_id) return res.status(400).json({ message: 'Missing required fields' });

    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (new Date(ends_at) < new Date(starts_at)) return res.status(400).json({ message: 'End date must be after start date' });

    const venue = await Venue.findByPk(venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    await event.update({ title, description, starts_at, ends_at, venue_id });
    res.status(204).json({ message: 'Event updated' });
};

exports.deleteEvent = async (req, res) => {
    const { event_id } = req.body;
    if (!event_id) return res.status(400).json({ message: 'Missing required fields' });

    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const tickets = await Ticket.findAll({ where: { event_id } });
    for (const ticket of tickets) {
        await ticket.destroy();
    }

    await event.destroy();
    res.status(204).json({ message: 'Event deleted' });
};

exports.listEvents = async (req, res) => {
    const events = await Event.findAll();
    res.status(200).json(events);
};
const Venue = require('../models/venue.model');
const Event = require('../models/event.model');

exports.createVenue = async (req, res) => {
    const { name, city, address, capacity } = req.body;
    if (!name || !city || !address || !capacity) return res.status(400).json({ message: 'Missing required fields' });

    if (capacity <= 0) return res.status(400).json({ message: 'Capacity must be greater than 0' });

    const venue = await Venue.create({ name, city, address, capacity });
    res.status(201).json(venue);
};

exports.readVenue = async (req, res) => {
    const { venue_id } = req.body;
    if (!venue_id) return res.status(400).json({ message: 'Missing required fields' });

    const venue = await Venue.findByPk(venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
};

exports.updateVenue = async (req, res) => {
    const { name, address, capacity, venue_id } = req.body;
    if (!name || !address || !capacity || !venue_id) return res.status(400).json({ message: 'Missing required fields' });

    const venue = await Venue.findByPk(venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    if (capacity <= 0) return res.status(400).json({ message: 'Capacity must be greater than 0' });

    await venue.update({ name, address, capacity });
    res.status(204).json({ message: 'Venue updated' });
};

exports.deleteVenue = async (req, res) => {
    const { venue_id } = req.body;
    if (!venue_id) return res.status(400).json({ message: 'Missing required fields' });

    const venue = await Venue.findByPk(venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    const events = await Event.findAll({ where: { venue_id } });
    if (events.length > 0) return res.status(400).json({ message: 'Cannot delete venue with events' });
    
    await venue.destroy();
    res.status(204).json({ message: 'Venue deleted' });
};

exports.listVenues = async (req, res) => {
    const venues = await Venue.findAll();
    res.status(200).json(venues);
};
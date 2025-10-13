const Venue = require('../models/venue.model');

exports.createVenue = async (req, res) => {
    const { name, city, address, capacity } = req.body;
    if (!name || !city || !address || !capacity) return res.status(400).json({ message: 'Missing required fields' });

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

    await venue.update({ name, address, capacity });
    res.status(204).json({ message: 'Venue updated' });
};

exports.deleteVenue = async (req, res) => {
    const { venue_id } = req.body;
    if (!venue_id) return res.status(400).json({ message: 'Missing required fields' });

    const venue = await Venue.findByPk(venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });

    await venue.destroy();
    res.status(204).json({ message: 'Venue deleted' });
};

exports.listVenues = async (req, res) => {
    const venues = await Venue.findAll();
    res.status(200).json(venues);
};
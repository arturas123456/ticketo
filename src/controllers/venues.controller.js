const { Venue } = require('../models');

exports.createVenue = async (req, res) => {
    const venue = await Venue.create({ name: req.body.name, address: req.body.address, capacity: req.body.capacity });
    res.status(201).json(venue);
};

exports.readVenue = async (req, res) => {
    const venue = await Venue.findByPk(req.body.venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    res.json(venue);
};

exports.updateVenue = async (req, res) => {
    const venue = await Venue.findByPk(req.body.venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    await venue.update({ name: req.body.name, address: req.body.address, capacity: req.body.capacity });
    res.status(204).json({ message: 'Venue updated' });
};

exports.deleteVenue = async (req, res) => {
    const venue = await Venue.findByPk(req.body.venue_id);
    if (!venue) return res.status(404).json({ message: 'Venue not found' });
    await venue.destroy();
    res.status(204).json({ message: 'Venue deleted' });
};

exports.listVenues = async (req, res) => {
    const venues = await Venue.findAll();
    res.json(venues);
};
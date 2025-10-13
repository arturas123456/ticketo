const Ticket = require('../models/ticket.model');
const Event = require('../models/event.model');
const User = require('../models/user.model');

exports.createTicket = async (req, res) => {
    const { seat, event_id } = req.body;
    if (!seat || !event_id) return res.status(400).json({ message: 'Missing required fields' });

    const event = await Event.findByPk(event_id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const ticket = await Ticket.create({ seat, event_id });
    res.status(201).json(ticket);
};

exports.readTicket = async (req, res) => {
    const { ticket_id } = req.body;
    if (!ticket_id) return res.status(400).json({ message: 'Missing required fields' });

    const ticket = await Ticket.findByPk(ticket_id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
};

exports.updateTicket = async (req, res) => {
    const { user_id, ticket_id } = req.body;
    if (!user_id || !ticket_id) return res.status(400).json({ message: 'Missing required fields' });

    const ticket = await Ticket.findByPk(ticket_id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await ticket.update({ owner_id: user_id, status: 'taken' });
    res.status(204).json({ message: 'Ticket updated' });
};

exports.deleteTicket = async (req, res) => {
    const { ticket_id } = req.body;
    if (!ticket_id) return res.status(400).json({ message: 'Missing required fields' });

    const ticket = await Ticket.findByPk(ticket_id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    await ticket.destroy();
    res.status(204).json({ message: 'Ticket deleted' });
};

exports.listTickets = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ message: 'Missing required fields' });

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const tickets = await Ticket.findAll({ where: { owner_id: user_id } });
    res.status(200).json(tickets);
};

exports.listAllTickets = async (req, res) => {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
};
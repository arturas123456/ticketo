const { Ticket } = require('../models');

exports.createTicket = async (req, res) => {
    const ticket = await Ticket.create({ seat: req.body.seat, event_id: req.body.event_id });
    res.status(201).json(ticket);
};

exports.readTicket = async (req, res) => {
    const ticket = await Ticket.findByPk(req.body.ticket_id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
};

exports.updateTicket = async (req, res) => {
    const ticket = await Ticket.findByPk(req.body.ticket_id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    await ticket.update({ seat: req.body.seat, owner_id: req.body.user_id });
    res.status(204).json({ message: 'Ticket updated' });
};

exports.deleteTicket = async (req, res) => {
    const ticket = await Ticket.findByPk(req.body.ticket_id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    await ticket.destroy();
    res.status(204).json({ message: 'Ticket deleted' });
};

exports.listTickets = async (req, res) => {
    const tickets = await Ticket.findAll();
    res.json(tickets);
};
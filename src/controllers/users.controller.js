const { User } = require('../models');

exports.createUser = async (req, res) => { };

exports.readUser = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ message: 'Missing required fields' });

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
    const { name, user_id } = req.body;
    if (!name || !user_id) return res.status(400).json({ message: 'Missing required fields' });

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update({ name });
    res.status(204).json({ message: 'User updated' });
};

exports.deleteUser = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json({ message: 'Missing required fields' });

    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.status(204).json({ message: 'User deleted' });
};

exports.listTickets = async (req, res) => {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
};
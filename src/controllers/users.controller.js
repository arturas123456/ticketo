const { User } = require('../models');

exports.createUser = async (req, res) => { };

exports.readUser = async (req, res) => {
    const user = await User.findByPk(req.body.user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

exports.updateUser = async (req, res) => {
    const user = await User.findByPk(req.body.user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update({ name: req.body.name });
    res.status(204).json({ message: 'User updated' });
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByPk(req.body.user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.destroy();
    res.status(204).json({ message: 'User deleted' });
};

exports.listUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};
const bcrypt = require('bcrypt');
const { User } = require('../models');
const generateToken = require('../utils/jwt');

exports.register = async (req, res) => {
    const { email, password, name } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash, name });

    res.status(201).json({ id: user.id, email: user.email });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({ token });
};

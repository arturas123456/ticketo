const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Token = require('../models/token.model');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');

exports.register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
        return res.status(400).json({ message: 'Missing required fields' });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password_hash, name });

    res.status(201).json({ id: user.id, email: user.email });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Missing required fields' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await Token.create({ token: refreshToken, userId: user.id, expiresAt });

    res.status(200).json({ accessToken, refreshToken });
};

exports.refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(400).json({ message: 'Missing refresh token' });
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const stored = await Token.findOne({ where: { token: refreshToken, userId: decoded.id } });
        if (!stored || stored.revoked) return res.status(403).json({ message: 'Invalid refresh token' });
        if (new Date(stored.expiresAt) < new Date()) return res.status(403).json({ message: 'Refresh token expired' });

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        stored.revoked = true;
        await stored.save();

        const newRefreshToken = generateRefreshToken(user);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await Token.create({ token: newRefreshToken, userId: user.id, expiresAt });

        const newAccessToken = generateAccessToken(user);
        res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

exports.logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Missing refresh token' });

    const stored = await Token.findOne({ where: { token: refreshToken } });
    if (stored) {
        stored.revoked = true;
        await stored.save();
    }

    res.status(200).json({ message: 'Logged out successfully' });
};

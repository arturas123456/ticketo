const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

function auth(allowedRoles = []) {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(payload.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = user;

            if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
}

module.exports = { auth };

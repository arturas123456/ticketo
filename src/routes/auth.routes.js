const express = require('express');
const router = express.Router();
const { register, login, refresh, logout } = require('../controllers/auth.controller');
const { auth } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', auth(), refresh);
router.post('/logout', auth(), logout);

module.exports = router;
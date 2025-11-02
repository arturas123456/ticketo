const express = require('express');
const router = express.Router();
const { createUser, readUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { listTickets } = require('../controllers/tickets.controller');
const { auth } = require('../middleware/auth');

router.post('/', createUser);
router.get('/', auth(), readUser);
router.put('/', auth(), updateUser);
router.delete('/', auth(), deleteUser);
router.get('/tickets', auth(['user', 'organizer', 'admin']), listTickets);

module.exports = router;

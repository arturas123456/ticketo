const express = require('express');
const router = express.Router();
const { createUser, readUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { listTickets } = require('../controllers/tickets.controller');
const { authenticate } = require('../middleware/auth');

router.post('/', createUser);
router.get('/', authenticate, readUser);
router.put('/', authenticate, updateUser);
router.delete('/', authenticate, deleteUser);
router.get('/tickets', authenticate, listTickets);

module.exports = router;

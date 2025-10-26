const express = require('express');
const router = express.Router();
const { createTicket, readTicket, updateTicket, deleteTicket, listAllTickets } = require('../controllers/tickets.controller');
const { auth, authenticate } = require('../middleware/auth');

router.post('/', auth(['organizer', 'admin']), createTicket);
router.get('/', auth(['user']), readTicket);
router.put('/', authenticate, updateTicket);
router.delete('/', auth(['organizer', 'admin']), deleteTicket);
router.get('/list', auth(['user']), listAllTickets);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createTicket, readTicket, updateTicket, deleteTicket, listAllTickets } = require('../controllers/tickets.controller');
const { auth } = require('../middleware/auth');

router.post('/', auth(['organizer', 'admin']), createTicket);
router.get('/', auth(['user', 'organizer', 'admin']), readTicket);
router.put('/', auth(), updateTicket);
router.delete('/', auth(['organizer', 'admin']), deleteTicket);
router.get('/list', auth(['user', 'organizer', 'admin']), listAllTickets);

module.exports = router;

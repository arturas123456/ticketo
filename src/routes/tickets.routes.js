const express = require('express');
const router = express.Router();
const { createTicket, readTicket, updateTicket, deleteTicket, listAllTickets } = require('../controllers/tickets.controller');

router.post('/', createTicket);
router.get('/', readTicket);
router.put('/', updateTicket);
router.delete('/', deleteTicket);
router.get('/list', listAllTickets);

module.exports = router;

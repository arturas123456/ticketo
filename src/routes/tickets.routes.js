const express = require('express');
const router = express.Router();
const { createTicket, readTicket, updateTicket, deleteTicket, listTickets } = require('../controllers/tickets.controller');

router.post('/:event_id', createTicket);
router.get('/:ticket_id', readTicket);
router.put('/:ticket_id', updateTicket);
router.delete('/:ticket_id', deleteTicket);
router.get('/:user_id', listTickets);

module.exports = router;

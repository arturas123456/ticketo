const express = require('express');
const router = express.Router();
const { listTickets, createTicket, getTicket, deleteTicket } = require('../controllers/tickets.controller');

router.get('/:uId', listTickets);
router.post('/:uId', createTicket);
router.get('/:tId', getTicket);
router.delete('/:tId', deleteTicket);


module.exports = router;

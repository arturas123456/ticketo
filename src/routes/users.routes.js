const express = require('express');
const router = express.Router();
const { createUser, readUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { listTickets } = require('../controllers/tickets.controller');

router.post('/', createUser);
router.get('/:user_id', readUser);
router.put('/:user_id', updateUser);
router.delete('/:user_id', deleteUser);
router.get('/tickets', listTickets)

module.exports = router;

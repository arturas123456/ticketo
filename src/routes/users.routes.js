const express = require('express');
const router = express.Router();
const { createUser, readUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { listTickets } = require('../controllers/tickets.controller');

router.post('/', createUser);
router.get('/', readUser);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.get('/tickets', listTickets)

module.exports = router;

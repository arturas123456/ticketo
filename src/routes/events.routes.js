const express = require('express');
const router = express.Router();
const { createEvent, readEvent, updateEvent, deleteEvent, listEvents } = require('../controllers/events.controller');
const { auth } = require('../middleware/auth');

router.post('/', auth(['organizer', 'admin']), createEvent);
router.get('/', readEvent);
router.put('/', auth(['organizer', 'admin']), updateEvent);
router.delete('/', auth(['admin']), deleteEvent);
router.get('/list', listEvents);

module.exports = router;

const express = require('express');
const router = express.Router();
const { createEvent, readEvent, updateEvent, deleteEvent, listEvents } = require('../controllers/events.controller');

router.post('/', createEvent);
router.get('/:event_id', readEvent);
router.put('/:event_id', updateEvent);
router.delete('/:event_id', deleteEvent);
router.get('/', listEvents);

module.exports = router;

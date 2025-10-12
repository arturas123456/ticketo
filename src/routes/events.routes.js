const express = require('express');
const router = express.Router();
const { listEvents, createEvent, getEvent, updateEvent, deleteEvent } = require('../controllers/events.controller');

router.get('/', listEvents);
router.post('/', createEvent);
router.get('/:id', getEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;

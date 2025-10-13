const express = require('express');
const router = express.Router();
const { createEvent, readEvent, updateEvent, deleteEvent, listEvents } = require('../controllers/events.controller');

router.post('/', createEvent);
router.get('/', readEvent);
router.put('/', updateEvent);
router.delete('/', deleteEvent);
router.get('/list', listEvents);

module.exports = router;

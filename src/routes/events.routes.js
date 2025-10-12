const express = require('express');
const router = express.Router();
const { listEvents } = require('../controllers/events.controller');

router.get('/', listEvents);
router.post('/', listEvents);
router.get('/:id', listEvents);
router.put('/:id', listEvents);
router.delete('/:id', listEvents);

module.exports = router;

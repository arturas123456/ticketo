const express = require('express');
const router = express.Router();
const { listEvents } = require('../controllers/events.controller');

router.get('/', listEvents);

module.exports = router;

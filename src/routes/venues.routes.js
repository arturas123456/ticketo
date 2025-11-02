const express = require('express');
const router = express.Router();
const { createVenue, readVenue, updateVenue, deleteVenue, listVenues } = require('../controllers/venues.controller');
const { auth } = require('../middleware/auth');

router.post('/', auth(['admin']), createVenue);
router.get('/', readVenue);
router.put('/', auth(['admin']), updateVenue);
router.delete('/', auth(['admin']), deleteVenue);
router.get('/list', listVenues);

module.exports = router;

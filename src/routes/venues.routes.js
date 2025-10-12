const express = require('express');
const router = express.Router();
const { createVenue, readVenue, updateVenue, deleteVenue } = require('../controllers/venues.controller');

router.post('/', createVenue);
router.get('/:venue_id', readVenue);
router.put('/:venue_id', updateVenue);
router.delete('/:venue_id', deleteVenue);


module.exports = router;

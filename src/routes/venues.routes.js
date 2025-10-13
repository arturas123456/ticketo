const express = require('express');
const router = express.Router();
const { createVenue, readVenue, updateVenue, deleteVenue, listVenues } = require('../controllers/venues.controller');

router.post('/', createVenue);
router.get('/', readVenue);
router.put('/', updateVenue);
router.delete('/', deleteVenue);
router.get('/list', listVenues);


module.exports = router;

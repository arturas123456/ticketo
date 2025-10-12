const express = require('express');
const router = express.Router();
const { listVenues, getVenue, updateVenue, deleteVenue } = require('../controllers/venues.controller');

router.get('/', listVenues);
router.get('/:id', getVenue);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);


module.exports = router;

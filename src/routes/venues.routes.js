const express = require('express');
const router = express.Router();
const { createVenue, readVenue, updateVenue, deleteVenue, listVenues } = require('../controllers/venues.controller');
const { authorize } = require('../middleware/auth');

router.post('/', authorize(['admin']), createVenue);
router.get('/', readVenue);
router.put('/', authorize(['admin']), updateVenue);
router.delete('/', authorize(['admin']), deleteVenue);
router.get('/list', listVenues);


module.exports = router;

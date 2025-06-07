const express = require('express');
const router = express.Router();
const locationsController = require('../controllers/locations');

// GET all locations
router.get('/', locationsController.getAllLocations);

// GET a single location by ID
router.get('/:id', locationsController.getLocationById);

// POST a new location
router.post('/', locationsController.createLocation);

// PUT (update) a location
router.put('/:id', locationsController.updateLocation);

// DELETE a location
router.delete('/:id', locationsController.deleteLocation);


module.exports = router;
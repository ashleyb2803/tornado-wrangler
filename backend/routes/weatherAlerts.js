const express = require('express');
const router = express.Router();
const weatherAlertsController = require('../controllers/weatherAlerts');

// GET all weather alerts
router.get('/', weatherAlertsController.getAllAlerts);

// GET a single weather alert by ID
router.get('/:id', weatherAlertsController.getAlertById);

// POST a new weather alert
router.post('/', weatherAlertsController.createAlert);

// PUT (update) a weather alert
router.put('/:id', weatherAlertsController.updateAlert);

// DELETE a weather alert
router.delete('/:id', weatherAlertsController.deleteAlert);

module.exports = router;
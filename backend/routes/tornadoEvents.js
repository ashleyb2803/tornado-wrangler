const express = require('express');
const router = express.Router();
const tornadoEventsController = require('../controllers/tornadoEvents');

router.get('/', tornadoEventsController.getAllTornadoEvents);
router.get('/:id', tornadoEventsController.getTornadoEventById);
router.post('/', tornadoEventsController.createTornadoEvent);
router.put('/:id', tornadoEventsController.updateTornadoEvent);
router.delete('/:id', tornadoEventsController.deleteTornadoEvent);

module.exports = router;
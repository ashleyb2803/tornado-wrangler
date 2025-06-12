const express = require('express');
const router = express.Router();
const userReportsController = require('../controllers/userReports');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
// GET all user reports
router.get('/', userReportsController.getAllUserReports);

// GET a single user report by ID
router.get('/:id', userReportsController.getUserReportById);
//router.use(ensureLoggedIn); // Ensure user is logged in for the following routes
// POST a new user report
router.post('/', userReportsController.createUserReport);

// PUT (update) a user report
router.put('/:id', userReportsController.updateUserReport);

// DELETE a user report
router.delete('/:id', userReportsController.deleteUserReport);

module.exports = router;
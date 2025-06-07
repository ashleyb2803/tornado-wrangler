const express = require('express');
const router = express.Router();
const userReportsController = require('../controllers/userReports');

// GET all user reports
router.get('/', userReportsController.getAllUserReports);

// GET a single user report by ID
router.get('/:id', userReportsController.getUserReportById);

// POST a new user report
router.post('/', userReportsController.createUserReport);

// PUT (update) a user report
router.put('/:id', userReportsController.updateUserReport);

// DELETE a user report
router.delete('/:id', userReportsController.deleteUserReport);

module.exports = router;
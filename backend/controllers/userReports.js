const UserReport = require('../models/userReport');

// Get all user reports
exports.getAllUserReports = async (req, res) => {
  try {
    const reports = await UserReport.find().populate('user').populate('tornadoEvent');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single user report by ID
exports.getUserReportById = async (req, res) => {
  try {
    const report = await UserReport.findById(req.params.id).populate('user').populate('tornadoEvent');
    if (!report) return res.status(404).json({ error: 'User report not found' });
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new user report
exports.createUserReport = async (req, res) => {
  try {
    console.log(req.body); // Log the request body to see if it's being set correctly
    //console.log(req.user); // Log the user object to see if it's being set correctly
    req.body.date =  new Date(); 
   req.body.user = req.user._id; // Assuming req.user is set by authentication middleware
   // req.body.user = req.user._id; 
    console.log(typeof req.body.date);
    console.log(req.body); 
    const report = await UserReport.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: err.message });
  }
};

// Update a user report
exports.updateUserReport = async (req, res) => {
  try {
    const report = await UserReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) return res.status(404).json({ error: 'User report not found' });
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a user report
exports.deleteUserReport = async (req, res) => {
  try {
    const report = await UserReport.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ error: 'User report not found' });
    res.json({ message: 'User report deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
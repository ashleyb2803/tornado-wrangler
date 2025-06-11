const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.weather.gov/alerts/active');
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NOAA alerts' });
  }
});

module.exports = router;
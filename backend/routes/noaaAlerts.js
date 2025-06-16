const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Get query params from frontend
    const { event, status, start } = req.query;

    // Build NOAA API URL
    let url = 'https://api.weather.gov/alerts';
    let params = [];
    if (event) params.push(`event=${encodeURIComponent(event)}`);
    if (status) params.push(`status=${encodeURIComponent(status)}`);
    if (start) params.push(`start=${encodeURIComponent(start)}`);
    if (params.length) url += '?' + params.join('&');
    console.log(params);
    console.log(url);
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'TornadoWranglerApp (your@email.com)' }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch NOAA alerts', details: err.message });
  }
});

//current tornadoes endpoint
router.get('/current-tornadoes', async (req, res) => {
  try {
    // NOAA API for currently active tornado alerts
    const url = 'https://api.weather.gov/alerts/active?event=Tornado%20Warning&status=actual';

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'TornadoWranglerApp (your@email.com)' }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch current tornado alerts', details: err.message });
  }
});

//current severe thunderstorm warnings endpoint
router.get('/current-thunderstorms', async (req, res) => {
  try {
    // NOAA API for currently active severe thunderstorm warnings
    const url = 'https://api.weather.gov/alerts/active?event=Severe%20Thunderstorm%20Warning&status=actual';

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'TornadoWranglerApp (your@email.com)' }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch current thunderstorm alerts', details: err.message });
  }
});

module.exports = router;
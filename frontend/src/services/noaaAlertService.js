import axios from 'axios';

// Fetch tornadoes from the past week (already present)
export async function getPastWeekTornadoes() {
    try{
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const res = await axios.get(
    `/api/noaa-alerts?event=Tornado&status=actual&start=${oneWeekAgo}`
  );
  return res.data;
} catch (err) {
    console.error('Failed to fetch past week tornadoes:', err);
    throw err;
  }
}

// Fetch currently active tornadoes
export async function getCurrentTornadoes() {
  const res = await axios.get('/api/noaa-alerts/current-tornadoes');
  return res.data;
}
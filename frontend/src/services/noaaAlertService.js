import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


// Fetch tornadoes from the past week (already present)
// This endpoint should return tornadoes that occurred in the past week
// Left Side
export async function getPastWeekTornadoes() {
    try{
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const res = await axios.get(
    `/api/noaa-alerts?event=Tornado%20Warning&status=actual&start=${oneWeekAgo}`
  );
  console.log('Fetched past week tornadoes:', res);
  return res.data;
} catch (err) {
    console.error('Failed to fetch past week tornadoes:', err);
    throw err;
  }
}



// Fetch currently active tornadoes
// This endpoint should return tornadoes that are currently active
// and not just those that occurred in the past week.
// Right Side
export async function getCurrentTornadoes() {
  const res = await axios.get('/api/noaa-alerts/current-tornadoes');
  console.log('Fetched current tornadoes:', res);
  return res.data;
}
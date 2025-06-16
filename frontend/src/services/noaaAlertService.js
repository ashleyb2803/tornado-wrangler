import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};



// Fetch tornadoes from the past week (already present)
// This endpoint should return tornadoes that occurred in the past week
// Left Side
export async function getPastWeekTornadoes() {
  try {
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
// Right Side
export async function getCurrentTornadoes() {
  try {
    const res = await axios.get('/api/noaa-alerts/current-tornadoes');
    console.log('Fetched current tornadoes:', res.data);
    console.log('Number of current tornado features:', res.data.features?.length || 0);
    
    // Log some details about what we got back
    if (res.data.features && res.data.features.length > 0) {
      console.log('Current tornado events found:', res.data.features.map(f => f.properties.event));
    } else {
      console.log('No active tornado warnings currently - this is normal!');
    }
    
    return res.data;
  } catch (err) {
    console.error('Failed to fetch current tornadoes:', err);
    throw err;
  }
}

// Fetch currently active severe thunderstorm warnings
export async function getCurrentThunderstorms() {
  try {
    const res = await axios.get('/api/noaa-alerts/current-thunderstorms');
    console.log('Fetched current thunderstorms:', res.data);
    console.log('Number of current thunderstorm features:', res.data.features?.length || 0);
    
    if (res.data.features && res.data.features.length > 0) {
      console.log('Current thunderstorm events found:', res.data.features.map(f => f.properties.event));
    } else {
      console.log('No active severe thunderstorm warnings currently');
    }
    
    return res.data;
  } catch (err) {
    console.error('Failed to fetch current thunderstorms:', err);
    throw err;
  }
}
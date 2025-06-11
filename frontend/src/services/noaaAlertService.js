import axios from 'axios';

export async function getAll() {
  const res = await axios.get('/api/noaa-alerts');
  return res.data;
}
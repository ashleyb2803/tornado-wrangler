import axios from 'axios';

const API_URL = '/api/weather-alerts';

// Get all weather alerts
export const getAllWeatherAlerts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Get a single weather alert by ID
export const getWeatherAlertById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create a new weather alert
export const createWeatherAlert = async (alertData) => {
  const res = await axios.post(API_URL, alertData);
  return res.data;
};

// Update a weather alert
export const updateWeatherAlert = async (id, alertData) => {
  const res = await axios.put(`${API_URL}/${id}`, alertData);
  return res.data;
};

// Delete a weather alert
export const deleteWeatherAlert = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
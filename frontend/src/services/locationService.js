import axios from 'axios';

const API_URL = '/api/locations';


// Get all locations
export const getAllLocations = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Get a single location by ID
export const getLocationById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create a new location
export const createLocation = async (locationData) => {
  const res = await axios.post(API_URL, locationData);
  return res.data;
};

// Update a location
export const updateLocation = async (id, locationData) => {
  const res = await axios.put(`${API_URL}/${id}`, locationData);
  return res.data;
};

// Delete a location
export const deleteLocation = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
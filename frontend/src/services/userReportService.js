import axios from 'axios';

const API_URL = '/api/user-reports';

// Get all user reports
export const getAllUserReports = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Get a single user report by ID
export const getUserReportById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create a new user report
export const createUserReport = async (reportData) => {
  const res = await axios.post(API_URL, reportData);
  return res.data;
};

// Update a user report
export const updateUserReport = async (id, reportData) => {
  const res = await axios.put(`${API_URL}/${id}`, reportData);
  return res.data;
};

// Delete a user report
export const deleteUserReport = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
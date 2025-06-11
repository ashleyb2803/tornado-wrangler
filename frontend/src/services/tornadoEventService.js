import axios from 'axios';

const API_URL = '/api/tornadoEvents';

// Get all tornado events
export const getAllTornadoEvents = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Get a single tornado event by ID
export const getTornadoEventById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Create a new tornado event
export const createTornadoEvent = async (eventData) => {
  const res = await axios.post(API_URL, eventData);
  return res.data;
};


// Delete a tornado event
export const deleteTornadoEvent = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

// Export the service as an object
const tornadoEventService = {
  getAll: getAllTornadoEvents,
  getById: getTornadoEventById,
  create: createTornadoEvent,
  delete: deleteTornadoEvent,
};    

export default tornadoEventService;
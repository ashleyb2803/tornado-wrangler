import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Service for handling tornado event-related API calls
const tornadoEventService = {
  // Get all tornado events
  getAllEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/tornado-events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tornado events:', error);
      throw error;
    }
  },

  // Get a single tornado event by ID
  getEventById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/tornado-events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tornado event with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new tornado event
  createEvent: async (eventData) => {
    try {
      const response = await axios.post(`${API_URL}/tornado-events`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating tornado event:', error);
      throw error;
    }
  },

  // Update an existing tornado event
  updateEvent: async (id, eventData) => {
    try {
      const response = await axios.put(`${API_URL}/tornado-events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating tornado event with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a tornado event
  deleteEvent: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/tornado-events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting tornado event with ID ${id}:`, error);
      throw error;
    }
  },

  // Search tornado events with filters
  searchEvents: async (searchParams) => {
    try {
      const response = await axios.get(`${API_URL}/tornado-events/search`, { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Error searching tornado events:', error);
      throw error;
    }
  }
};

export default tornadoEventService;
import axios from 'axios';

const API = '/api/events'; // adjust this if your backend route is different
const COMMENTS_API = '/api/comments';

const getAllEvents = async () => {
  const res = await axios.get(API);
  return res.data;
};

const createEvent = async (data) => {
  const res = await axios.post(API, data, { withCredentials: true });
  return res.data;
};

const createComment = async (eventId, text) => {
  const res = await axios.post(`${COMMENTS_API}/${eventId}`, { text }, { withCredentials: true });
  return res.data;
};

const updateComment = async (commentId, text) => {
  const res = await axios.put(`${COMMENTS_API}/${commentId}`, { text }, { withCredentials: true });
  return res.data;
};

const deleteComment = async (commentId) => {
  const res = await axios.delete(`${COMMENTS_API}/${commentId}`, { withCredentials: true });
  return res.data;
};

const getCommentsByEvent = async (eventId) => {
  const res = await axios.get(`${COMMENTS_API}/event/${eventId}`);
  return res.data;
};

export default {
  getAllEvents,
  createEvent,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByEvent,
};

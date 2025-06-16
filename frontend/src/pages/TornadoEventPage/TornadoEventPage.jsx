import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TornadoEventForm() {
  const [form, setForm] = useState({ title: '', description: '', date: '', username: '' });
  const [tornadoEvents, setTornadoEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', date: '' });
  const [comments, setComments] = useState({});
  const [commentForms, setCommentForms] = useState({});
  const [showComments, setShowComments] = useState({});

  useEffect(() => {
    fetchTornadoEvents();
    // Set up interval to check for expired events every minute
    const interval = setInterval(() => {
      checkAndRemoveExpiredEvents();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const fetchTornadoEvents = async () => {
    try {
      const res = await axios.get('/api/tornadoEvents', { withCredentials: true });
      const events = res.data || [];
      // Filter out expired events (older than 24 hours)
      const activeEvents = events.filter(event => {
        const eventTime = new Date(event.createdAt || event.date);
        const now = new Date();
        const hoursDiff = (now - eventTime) / (1000 * 60 * 60);
        return hoursDiff < 24;
      });
      setTornadoEvents(activeEvents);
    } catch (error) {
      console.error('Error fetching tornado events:', error);
      setTornadoEvents([]);
    }
  };

  const checkAndRemoveExpiredEvents = () => {
    setTornadoEvents(prevEvents => 
      prevEvents.filter(event => {
        const eventTime = new Date(event.createdAt || event.date);
        const now = new Date();
        const hoursDiff = (now - eventTime) / (1000 * 60 * 60);
        return hoursDiff < 24;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await axios.post('/api/tornadoEvents', {
          ...form,
          coordinates: [longitude, latitude],
          createdAt: new Date() // Ensure we have a creation timestamp
        }, { withCredentials: true });
        
        console.log('Event Created:', res.data);
        setTornadoEvents([res.data, ...tornadoEvents]);
        setForm({ title: '', description: '', date: '', username: '' });
      } catch (error) {
        console.error('Error creating event:', error);
        alert('Error creating event. Please try again.');
      }
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event._id);
    setEditForm({
      title: event.title,
      description: event.description,
      date: event.date
    });
  };

  const handleUpdateEvent = async (eventId) => {
    try {
      const res = await axios.put(`/api/tornadoEvents/${eventId}`, editForm, { withCredentials: true });
      setTornadoEvents(tornadoEvents.map(event => 
        event._id === eventId ? { ...event, ...editForm } : event
      ));
      setEditingEvent(null);
      setEditForm({ title: '', description: '', date: '' });
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event. Please try again.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this tornado event?')) {
      try {
        await axios.delete(`/api/tornadoEvents/${eventId}`, { withCredentials: true });
        setTornadoEvents(tornadoEvents.filter(event => event._id !== eventId));
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      }
    }
  };

  const toggleComments = async (eventId) => {
    if (!showComments[eventId]) {
      // Fetch comments when showing for the first time
      try {
        const res = await axios.get(`/api/tornadoEvents/${eventId}/comments`, { withCredentials: true });
        setComments(prev => ({ ...prev, [eventId]: res.data }));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    setShowComments(prev => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  const handleCommentSubmit = async (eventId) => {
    const commentText = commentForms[eventId];
    if (!commentText?.trim()) return;

    try {
      const res = await axios.post(`/api/tornadoEvents/${eventId}/comments`, {
        author: form.username || 'Anonymous',
        text: commentText
      }, { withCredentials: true });
      
      setComments(prev => ({ ...prev, [eventId]: res.data.comments }));
      setCommentForms(prev => ({ ...prev, [eventId]: '' }));
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment. Please try again.');
    }
  };

  const handleDeleteComment = async (eventId, commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const res = await axios.delete(`/api/tornadoEvents/${eventId}/comments/${commentId}`, { withCredentials: true });
        setComments(prev => ({ ...prev, [eventId]: res.data.comments }));
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Error deleting comment. Please try again.');
      }
    }
  };

  const getLocationString = (coordinates) => {
    if (!coordinates || coordinates.length < 2) {
      return 'Location not available';
    }
    const [longitude, latitude] = coordinates;
    return `${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°W`;
  };

  const getTimeRemaining = (createdAt) => {
    const eventTime = new Date(createdAt);
    const now = new Date();
    const hoursElapsed = (now - eventTime) / (1000 * 60 * 60);
    const hoursRemaining = Math.max(0, 24 - hoursElapsed);
    
    if (hoursRemaining < 1) {
      const minutesRemaining = Math.floor(hoursRemaining * 60);
      return `${minutesRemaining} minutes remaining`;
    }
    return `${Math.floor(hoursRemaining)} hours remaining`;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ffeaa7' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#856404' }}>⚠️ Important Notice</h3>
        <p style={{ margin: 0, color: '#856404' }}>
          Tornado event reports automatically expire after 24 hours to keep the feed current and relevant.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            value={form.username} 
            onChange={(e) => setForm({ ...form, username: e.target.value })} 
            placeholder="Your Name" 
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            placeholder="Event Title" 
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
            placeholder="Description of tornado event" 
            required
            rows="4"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="datetime-local" 
            value={form.date} 
            onChange={(e) => setForm({ ...form, date: e.target.value })} 
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button 
          type="submit"
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Report Tornado Event
        </button>
      </form>

      <div>
        <h2>Recent Tornado Events ({tornadoEvents.length})</h2>
        {tornadoEvents.length === 0 ? (
          <p>No active tornado events reported in the last 24 hours.</p>
        ) : (
          tornadoEvents.map((event) => (
            <div 
              key={event._id} 
              style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                margin: '15px 0', 
                padding: '20px',
                backgroundColor: '#f9f9f9',
                position: 'relative'
              }}
            >
              {/* Expiration indicator */}
              <div style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                fontSize: '12px' 
              }}>
                {getTimeRemaining(event.createdAt || event.date)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '60px' }}>
                  {editingEvent === event._id ? (
                    <div>
                      <input 
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                      />
                      <textarea 
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows="3"
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                      />
                      <input 
                        type="datetime-local"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                      />
                      <div>
                        <button 
                          onClick={() => handleUpdateEvent(event._id)}
                          style={{ backgroundColor: '#28a745', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', marginRight: '10px', cursor: 'pointer' }}
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => setEditingEvent(null)}
                          style={{ backgroundColor: '#6c757d', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{event.title}</h3>
                      <p style={{ margin: '5px 0', color: '#666' }}>{event.description}</p>
                      
                      <div style={{ marginTop: '15px', fontSize: '14px', color: '#555' }}>
                        <p style={{ margin: '5px 0' }}>
                          <strong>📅 Date:</strong> {new Date(event.date).toLocaleString()}
                        </p>
                        <p style={{ margin: '5px 0' }}>
                          <strong>📍 Location:</strong> {getLocationString(event.coordinates)}
                        </p>
                        <p style={{ margin: '5px 0' }}>
                          <strong>👤 Reported by:</strong> {
                            event.username || 
                            (event.userId?.username) || 
                            'Anonymous'
                          }
                        </p>
                        <p style={{ margin: '5px 0', fontSize: '12px', color: '#888' }}>
                          Posted: {new Date(event.createdAt || event.date).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => handleEdit(event)}
                          style={{ backgroundColor: '#ffc107', color: '#212529', padding: '5px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteEvent(event._id)}
                          style={{ backgroundColor: '#dc3545', color: 'white', padding: '5px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          🗑️ Delete
                        </button>
                        <button 
                          onClick={() => toggleComments(event._id)}
                          style={{ backgroundColor: '#17a2b8', color: 'white', padding: '5px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        >
                          💬 Comments ({comments[event._id]?.length || 0})
                        </button>
                      </div>

                      {/* Comments section */}
                      {showComments[event._id] && (
                        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
                          <h4 style={{ margin: '0 0 15px 0', color: '#333' }}>Comments</h4>
                          
                          {/* Add comment */}
                          <div style={{ marginBottom: '15px' }}>
                            <textarea
                              value={commentForms[event._id] || ''}
                              onChange={(e) => setCommentForms(prev => ({ ...prev, [event._id]: e.target.value }))}
                              placeholder="Add a comment..."
                              rows="2"
                              style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                            />
                            <button 
                              onClick={() => handleCommentSubmit(event._id)}
                              style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              Post Comment
                            </button>
                          </div>

                          {/* Show coments */}
                          {comments[event._id]?.length === 0 ? (
                            <p style={{ fontStyle: 'italic', color: '#666' }}>No comments yet. Be the first to comment!</p>
                          ) : (
                            comments[event._id]?.map((comment) => (
                              <div 
                                key={comment._id} 
                                style={{ 
                                  backgroundColor: '#ffffff', 
                                  padding: '10px', 
                                  marginBottom: '10px', 
                                  borderRadius: '4px',
                                  border: '1px solid #e9ecef'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                  <div style={{ flex: 1 }}>
                                    <strong style={{ color: '#007bff' }}>{comment.author}</strong>
                                    <p style={{ margin: '5px 0', color: '#333' }}>{comment.text}</p>
                                    <small style={{ color: '#6c757d' }}>
                                      {new Date(comment.createdAt).toLocaleString()}
                                    </small>
                                  </div>
                                  <button 
                                    onClick={() => handleDeleteComment(event._id, comment._id)}
                                    style={{ 
                                      backgroundColor: 'transparent', 
                                      border: 'none', 
                                      color: '#dc3545', 
                                      cursor: 'pointer',
                                      fontSize: '12px',
                                      padding: '2px 5px'
                                    }}
                                    title="Delete comment"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TornadoEventForm() {
  const [form, setForm] = useState({ title: '', description: '', date: '', username: '' });
  const [tornadoEvents, setTornadoEvents] = useState([]);

  useEffect(() => {
    fetchTornadoEvents();
  }, []);

  const fetchTornadoEvents = async () => {
    try {
      const res = await axios.get('/api/tornadoEvents', { withCredentials: true });
      setTornadoEvents(res.data || []);
    } catch (error) {
      console.error('Error fetching tornado events:', error);
      setTornadoEvents([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Geolocation API to get user's current position
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await axios.post('/api/tornadoEvents', {
          ...form,
          coordinates: [longitude, latitude]
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

  // Function to format coordinates into a readable string
  const getLocationString = (coordinates) => {
    if (!coordinates || coordinates.length < 2) {
      return 'Location not available';
    }
    const [longitude, latitude] = coordinates;
    return `${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°W`;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
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
        <h2>Recent Tornado Events</h2>
        {tornadoEvents.length === 0 ? (
          <p>No tornado events reported yet.</p>
        ) : (
          tornadoEvents.map((event) => (
            <div 
              key={event._id} 
              style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px',
                margin: '15px 0', 
                padding: '20px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
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
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
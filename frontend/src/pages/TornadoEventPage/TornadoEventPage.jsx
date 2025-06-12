import { useEffect, useState } from 'react';
import * as tornadoEventService from '../../services/tornadoEventService';
import './TornadoEventPage.css';

export default function TornadoEventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ date: '', location: '', intensity: '', description: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const data = await tornadoEventService.getAll();
      setEvents(Array.isArray(data) ? data : data.events || []);
    } catch (err) {
      console.error('Failed to fetch tornado events:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    console.log(form);
    await tornadoEventService.create(form);
    setForm({ date: '', location: '', intensity: '', description: '' });
    fetchEvents();
  }

  async function handleDelete(id) {
    await tornadoEventService.remove(id);
    fetchEvents();
  }

  if (loading) return <div>Loading tornado events...</div>;

  return (
    <div className="tornado-event-page">
      <h1>Tornado Events</h1>
      <form onSubmit={handleCreate}>
        <input
          type="datetime-local"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Intensity"
          value={form.intensity}
          onChange={e => setForm({ ...form, intensity: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add Event</button>
      </form>
      <ul>
        {events.map(event => (
          <li key={event._id} style={{ marginBottom: '1.5em' }}>
            <strong>Date:</strong> {new Date(event.date).toLocaleString()}<br />
            <strong>Location:</strong> {event.location?.name || event.location || 'Unknown'}<br />
            <strong>Intensity:</strong> {event.intensity}<br />
            <strong>Description:</strong> {event.description || 'No description'}<br />
            <button onClick={() => handleDelete(event._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
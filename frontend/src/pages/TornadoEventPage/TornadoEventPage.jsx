import { useEffect, useState } from 'react';
import tornadoEventService from '../../services/tornadoEventService';

export default function TornadoEventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await tornadoEventService.getAll();
        setEvents(Array.isArray(data) ? data : data.events || []);
      } catch (err) {
        console.error('Failed to fetch tornado events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  if (loading) return <div>Loading tornado events...</div>;

  return (
    <div>
      <h1>Tornado Events</h1>
      <ul>
        {events.map(event => (
          <li key={event._id} style={{ marginBottom: '1.5em' }}>
            <strong>Date:</strong> {new Date(event.date).toLocaleString()}<br />
            <strong>Location:</strong> {event.location?.name || event.location || 'Unknown'}<br />
            <strong>Intensity:</strong> {event.intensity}<br />
            <strong>Description:</strong> {event.description || 'No description'}<br />
            <strong>Reported By:</strong> {event.reportedBy?.name || event.reportedBy || 'Unknown'}
          </li>
        ))}
      </ul>
    </div>
  );
}
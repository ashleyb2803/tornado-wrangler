import { useEffect, useState } from 'react';
import tornadoEventService from '../../services/tornadoEventService';

export default function TornadoEventPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await tornadoEventService.getAll();
        setEvents(data);
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
          <li key={event._id}>
            <strong>{event.name}</strong> - {event.date}
            <br />
            Location: {event.location?.name || 'Unknown'}
            <br />
            Severity: {event.severity}
          </li>
        ))}
      </ul>
    </div>
  );
}
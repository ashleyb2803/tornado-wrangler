import { useEffect, useState } from 'react';

export default function WeatherAlertPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch('/api/weather-alerts');
        const data = await res.json();
        setAlerts(data);
      } catch (err) {
        console.error('Failed to fetch weather alerts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  if (loading) return <div>Loading weather alerts...</div>;

  return (
    <div>
      <h1>Weather Alerts</h1>
      {alerts.length === 0 ? (
        <p>No weather alerts found.</p>
      ) : (
        <ul>
          {alerts.map(alert => (
            <li key={alert._id}>
              <strong>{alert.title}</strong> ({alert.severity})<br />
              {alert.description}<br />
              Issued: {new Date(alert.issuedAt).toLocaleString()}<br />
              Expires: {alert.expiresAt ? new Date(alert.expiresAt).toLocaleString() : 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
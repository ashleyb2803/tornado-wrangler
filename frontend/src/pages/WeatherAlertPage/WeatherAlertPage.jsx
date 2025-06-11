import { useEffect, useState } from 'react';
import * as noaaAlertService from '../../services/noaaAlertService';

export default function WeatherAlertPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      setLoading(true);
      const data = await noaaAlertService.getAll();
      setAlerts(data.features || []);
      setLoading(false);
    }
    fetchAlerts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Current NOAA Weather Alerts</h2>
      <ul>
        {alerts.map(alert => (
          <li key={alert.id}>
            <strong>{alert.properties.event}</strong> - {alert.properties.headline}
            <br />
            <small>{alert.properties.areaDesc}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useEffect, useState } from 'react';
import * as noaaAlertService from '../../services/noaaAlertService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './WeatherAlertPage.css'; // Create this CSS file

export default function WeatherAlertPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data for tornado details (replace with real data/fetch)
  const pastWeekTornadoes = [{ id: 1, name: "Tornado A", date: "2025-06-05" }];
  const currentTornadoes = [{ id: 2, name: "Tornado B", date: "2025-06-11" }];

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
    <div className="weather-alerts-layout">
      {/* Left: Past week tornadoes */}
      <aside className="sidebar">
        <h3>Past Week Tornadoes</h3>
        <ul>
          {pastWeekTornadoes.map(t => (
            <li key={t.id}>{t.name} - {t.date}</li>
          ))}
        </ul>
      </aside>

      {/* Center: Map */}
      <main className="map-section">
        <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Example marker */}
          <Marker position={[39.8283, -98.5795]}>
            <Popup>Center of USA</Popup>
          </Marker>
        </MapContainer>
      </main>

      {/* Right: Current tornadoes */}
      <aside className="sidebar">
        <h3>Current Tornadoes</h3>
        <ul>
          {currentTornadoes.map(t => (
            <li key={t.id}>{t.name} - {t.date}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
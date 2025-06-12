import { useEffect, useState } from 'react';
import * as noaaAlertService from '../../services/noaaAlertService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './WeatherAlertPage.css';

export default function WeatherAlertPage() {
  const [pastWeekTornadoes, setPastWeekTornadoes] = useState([]);
  const [currentTornadoes, setCurrentTornadoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTornadoes() {
      setLoading(true);
      const [pastWeekData, currentData] = await Promise.all([
        noaaAlertService.getPastWeekTornadoes(),
        noaaAlertService.getCurrentTornadoes()
      ]);
      setPastWeekTornadoes(
        (pastWeekData.features || []).map(alert => ({
          id: alert.id,
          name: alert.properties.event,
          date: alert.properties.onset ? alert.properties.onset.slice(0, 10) : 'N/A',
          area: alert.properties.areaDesc,
        }))
      );
      setCurrentTornadoes(
        (currentData.features || []).map(alert => ({
          id: alert.id,
          name: alert.properties.event,
          date: alert.properties.onset ? alert.properties.onset.slice(0, 10) : 'N/A',
          area: alert.properties.areaDesc,
        }))
      );
      setLoading(false);
    }
    fetchTornadoes();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="weather-alerts-layout">
      {/* Left: Past week tornadoes */}
      <aside className="sidebar">
        <h3>Past Week Tornadoes</h3>
        <ul>
          {pastWeekTornadoes.length === 0 && <li>No tornadoes reported in the past week.</li>}
          {pastWeekTornadoes.map(t => (
            <li key={t.id}>
              {t.name} - {t.date}
              <br />
              <small>{t.area}</small>
            </li>
          ))}
        </ul>
      </aside>
      {/* Center: Map */}
      <main className="map-section">
        <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: "100%", width: "100%" }}>
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
          {currentTornadoes.length === 0 && <li>No active tornadoes right now.</li>}
          {currentTornadoes.map(t => (
            <li key={t.id}>
              {t.name} - {t.date}
              <br />
              <small>{t.area}</small>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
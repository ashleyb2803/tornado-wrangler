import { useEffect, useState } from 'react';
import * as noaaAlertService from '../../services/noaaAlertService';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './WeatherAlertPage.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L, { icon } from 'leaflet';
import 'leaflet-defaulticon-compatibility';


// Create a thunderstorm icon 
const THUNDERSTORM_ICON = icon({
  iconUrl: "/images/thunderstormicon.png",
  iconSize: [28, 28],
});

//icons if custom images aren't available
const DEFAULT_TORNADO_ICON = icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const DEFAULT_THUNDERSTORM_ICON = icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function WeatherAlertPage() {
  const [pastWeekTornadoes, setPastWeekTornadoes] = useState([]);
  const [currentTornadoes, setCurrentTornadoes] = useState([]);
  const [currentThunderstorms, setCurrentThunderstorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to extract coordinates from NOAA alert geometry
  const extractCoordinates = (alert) => {
    if (!alert.geometry || !alert.geometry.coordinates) return null;
    
    // NOAA alerts can have different geometry types (Polygon, MultiPolygon, Point)
    const coords = alert.geometry.coordinates;
    
    if (alert.geometry.type === 'Polygon') {
      const firstCoord = coords[0][0];
      return [firstCoord[1], firstCoord[0]]; // [lat, lng]
    } else if (alert.geometry.type === 'MultiPolygon') {
      const firstCoord = coords[0][0][0];
      return [firstCoord[1], firstCoord[0]]; // [lat, lng]
    } else if (alert.geometry.type === 'Point') {
      // For points, coordinates are [lng, lat]
      return [coords[1], coords[0]]; // [lat, lng]
    }
    
    return null;
  };

  // Function to calculate center of polygon for better marker placement
  const getPolygonCenter = (coordinates) => {
    if (!coordinates || coordinates.length === 0) return null;
    
    let latSum = 0;
    let lngSum = 0;
    let count = 0;
    
    // For polygon, coordinates[0] is the outer ring
    const ring = coordinates[0];
    
    ring.forEach(coord => {
      lngSum += coord[0];
      latSum += coord[1];
      count++;
    });
    
    return count > 0 ? [latSum / count, lngSum / count] : null;
  };

  useEffect(() => {
    async function fetchTornadoes() {
      setLoading(true);
      const [pastWeekData, currentData, thunderstormData] = await Promise.all([
        noaaAlertService.getPastWeekTornadoes(),
        noaaAlertService.getCurrentTornadoes(),
        noaaAlertService.getCurrentThunderstorms()
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
        (currentData.features || []).map(alert => {
          let coordinates = null;
          
          if (alert.geometry && alert.geometry.coordinates) {
            if (alert.geometry.type === 'Polygon') {
              coordinates = getPolygonCenter(alert.geometry.coordinates);
            } else {
              coordinates = extractCoordinates(alert);
            }
          }
          
          return {
            id: alert.id,
            name: alert.properties.event,
            date: alert.properties.onset ? alert.properties.onset.slice(0, 10) : 'N/A',
            time: alert.properties.onset ? new Date(alert.properties.onset).toLocaleTimeString() : 'N/A',
            area: alert.properties.areaDesc,
            coordinates: coordinates,
            description: alert.properties.description || 'No additional details available',
            urgency: alert.properties.urgency || 'Unknown',
            severity: alert.properties.severity || 'Unknown'
          };
        })
      );

      setCurrentThunderstorms(
        (thunderstormData.features || []).map(alert => {
          let coordinates = null;
          
          if (alert.geometry && alert.geometry.coordinates) {
            if (alert.geometry.type === 'Polygon') {
              coordinates = getPolygonCenter(alert.geometry.coordinates);
            } else {
              coordinates = extractCoordinates(alert);
            }
          }
          
          return {
            id: alert.id,
            name: alert.properties.event,
            date: alert.properties.onset ? alert.properties.onset.slice(0, 10) : 'N/A',
            time: alert.properties.onset ? new Date(alert.properties.onset).toLocaleTimeString() : 'N/A',
            area: alert.properties.areaDesc,
            coordinates: coordinates,
            description: alert.properties.description || 'No additional details available',
            urgency: alert.properties.urgency || 'Unknown',
            severity: alert.properties.severity || 'Unknown'
          };
        })
      );

      setLastUpdated(new Date());
      setLoading(false);
    }
    fetchTornadoes();
  }, []);

  const formatLastUpdated = (date) => {
    if (!date) return '';
    return `Last updated: ${date.toLocaleTimeString()} on ${date.toLocaleDateString()}`;
  };

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
          
        

          {/* Current Tornado Warning Markers */}
          {currentTornadoes
            .filter(tornado => tornado.coordinates)
            .map(tornado => (
              <Marker
                key={`tornado-${tornado.id}`}
                position={tornado.coordinates}
                icon={DEFAULT_TORNADO_ICON}
              >
                <Popup>
                  <div className="alert-popup">
                    <h4>🌪️ {tornado.name}</h4>
                    <p><strong>Area:</strong> {tornado.area}</p>
                    <p><strong>Time:</strong> {tornado.time}</p>
                    <p><strong>Urgency:</strong> {tornado.urgency}</p>
                    <p><strong>Severity:</strong> {tornado.severity}</p>
                    <div className="popup-description">
                      <strong>Details:</strong>
                      <p>{tornado.description.substring(0, 200)}...</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Current Thunderstorm Warning Markers */}
          {currentThunderstorms
            .filter(storm => storm.coordinates)
            .map(storm => (
              <Marker
                key={`storm-${storm.id}`}
                position={storm.coordinates}
                icon={DEFAULT_THUNDERSTORM_ICON}
              >
                <Popup>
                  <div className="alert-popup">
                    <h4>⛈️ {storm.name}</h4>
                    <p><strong>Area:</strong> {storm.area}</p>
                    <p><strong>Time:</strong> {storm.time}</p>
                    <p><strong>Urgency:</strong> {storm.urgency}</p>
                    <p><strong>Severity:</strong> {storm.severity}</p>
                    <div className="popup-description">
                      <strong>Details:</strong>
                      <p>{storm.description.substring(0, 200)}...</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </main>

      {/* Right: Current alerts */}
      <aside className="sidebar">
        <div className="current-alerts-header">
          <h3>Current Alerts</h3>
          <small className="last-updated">{formatLastUpdated(lastUpdated)}</small>
        </div>

        {/* Current Tornadoes */}
        <div className="alert-section">
          <h4>🌪️ Active Tornado Warnings</h4>
          <ul>
            {currentTornadoes.length === 0 && <li>No active tornado warnings right now.</li>}
            {currentTornadoes.map(t => (
              <li key={t.id} className="tornado-alert">
                {t.name} - {t.time}
                <br />
                <small>{t.area}</small>
                {t.coordinates && <small className="coordinates-info"> • Mapped</small>}
              </li>
            ))}
          </ul>
        </div>

        {/* Current Severe Thunderstorms */}
        <div className="alert-section">
          <h4>⛈️ Severe Thunderstorm Warnings</h4>
          <ul>
            {currentThunderstorms.length === 0 && <li>No active severe thunderstorm warnings.</li>}
            {currentThunderstorms.map(t => (
              <li key={t.id} className="thunderstorm-alert">
                {t.name} - {t.time}
                <br />
                <small>{t.area}</small>
                {t.coordinates && <small className="coordinates-info"> • Mapped</small>}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
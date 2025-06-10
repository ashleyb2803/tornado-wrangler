import { useEffect, useState } from 'react';
import locationService from '../../services/locationService';

export default function LocationPage() {
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [riskLevel, setRiskLevel] = useState('Low');

  useEffect(() => {
    async function fetchLocations() {
      const data = await locationService.getAll();
      setLocations(data);
    }
    fetchLocations();
  }, []);

  async function handleAddLocation(e) {
    e.preventDefault();
    const newLocation = await locationService.create({
      city,
      state,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      riskLevel,
    });
    setLocations([...locations, newLocation]);
    setCity('');
    setState('');
    setLatitude('');
    setLongitude('');
    setRiskLevel('Low');
  }

  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map(loc => (
          <li key={loc._id}>
            {loc.city}, {loc.state} | Lat: {loc.latitude}, Lon: {loc.longitude} | Risk: {loc.riskLevel}
          </li>
        ))}
      </ul>
      <h3>Add New Location</h3>
      <form onSubmit={handleAddLocation}>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City"
          required
        />
        <input
          value={state}
          onChange={e => setState(e.target.value)}
          placeholder="State"
          required
        />
        <input
          type="number"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          placeholder="Latitude"
          step="any"
          required
        />
        <input
          type="number"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          placeholder="Longitude"
          step="any"
          required
        />
        <select
          value={riskLevel}
          onChange={e => setRiskLevel(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
          <option value="Extreme">Extreme</option>
        </select>
        <button type="submit">Add Location</button>
      </form>
    </div>
  );
}
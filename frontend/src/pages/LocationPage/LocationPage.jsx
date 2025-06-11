import { useEffect, useState } from 'react';
import locationService from '../../services/locationService';

export default function LocationPage() {
  const [locations, setLocations] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [riskLevel, setRiskLevel] = useState('Low');
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    async function fetchLocations() {
      const data = await locationService.getAll();
          console.log('Fetched locations:', data);
      setLocations(data);
    }
    fetchLocations();
  }, []);


async function fetchAddress(lat, lon) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  );
  const data = await response.json();
  return data.address;
}

function handleFindLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }
  setLocating(true);
  navigator.geolocation.getCurrentPosition(
    async position => {
      const { latitude, longitude } = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);

      // Fetch address
      try {
        const address = await fetchAddress(latitude, longitude);
        setCity(address.city || address.town || address.village || '');
        setState(address.state || '');
      } catch (err) {
        alert('Could not fetch address');
      }
      setLocating(false);
    },
    error => {
      alert('Unable to retrieve your location');
      setLocating(false);
    }
  );
}



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
 <button type="button" onClick={handleFindLocation} disabled={locating}>
    {locating ? 'Locating...' : 'Use My Location'}
  </button>

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
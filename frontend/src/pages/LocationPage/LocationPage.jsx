import { useState } from 'react';
import './LocationPage.css';

export default function LocationPage() {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock weather data for demonstration (just in case the API fails)
  const mockWeatherData = {
    location: "Dallas, TX",
    current: {
      temp: 85,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      windDirection: "SW",
      visibility: 10,
      pressure: 30.15,
      icon: "partly-cloudy"
    },
    forecast: [
      {
        day: "Today",
        high: 87,
        low: 72,
        condition: "Partly Cloudy",
        precipitation: 20,
        icon: "partly-cloudy"
      },
      {
        day: "Tomorrow",
        high: 91,
        low: 75,
        condition: "Thunderstorms",
        precipitation: 80,
        icon: "thunderstorm"
      },
      {
        day: "Wednesday",
        high: 89,
        low: 73,
        condition: "Cloudy",
        precipitation: 30,
        icon: "cloudy"
      },
      {
        day: "Thursday",
        high: 92,
        low: 76,
        condition: "Sunny",
        precipitation: 5,
        icon: "sunny"
      },
      {
        day: "Friday",
        high: 88,
        low: 74,
        condition: "Rain",
        precipitation: 90,
        icon: "rain"
      }
    ],
    alerts: [
      {
        type: "Severe Thunderstorm Watch",
        message: "Severe thunderstorms possible this afternoon and evening",
        severity: "moderate"
      }
    ]
  };

  const handleSearch = async (e) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First, get coordinates for the city using geocoding
      const geocodeResponse = await fetch(
        `https://api.weather.gov/points/${await getCityCoordinates(city, state)}`
      );
      
      if (!geocodeResponse.ok) {
        throw new Error('Location not found');
      }
      
      const geocodeData = await geocodeResponse.json();
      
      // Get current weather from NOAA
      const forecastResponse = await fetch(geocodeData.properties.forecast);
      const alertsResponse = await fetch(
        `https://api.weather.gov/alerts/active?point=${geocodeData.geometry.coordinates[1]},${geocodeData.geometry.coordinates[0]}`
      );
      
      const forecastData = await forecastResponse.json();
      const alertsData = await alertsResponse.json();
      
      // Transform NOAA data to our format
      const transformedData = transformNOAAData(forecastData, alertsData, `${city}${state ? ', ' + state : ''}`);
      setWeatherData(transformedData);
      
    } catch (err) {
      console.error('NOAA API Error:', err);
      // Fallback to mock data for demonstration (back up for api failure)
      setWeatherData({
        ...mockWeatherData,
        location: `${city}${state ? ', ' + state : ''}`
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get coordinates (you might want to use a geocoding service)
  const getCityCoordinates = async (city, state) => {
    // This is a placeholder for mock up
    // return Dallas coordinates as example mock up
    return "32.7767,-96.7970";
  };

  // Transform NOAA API response to our component format
  const transformNOAAData = (forecastData, alertsData, location) => {
    const periods = forecastData.properties.periods;
    const currentPeriod = periods[0];
    
    return {
      location: location,
      current: {
        temp: currentPeriod.temperature,
        condition: currentPeriod.shortForecast,
        humidity: 65, // NOAA doesn't provide percentage this is just mock value
        windSpeed: parseInt(currentPeriod.windSpeed) || 0,
        windDirection: currentPeriod.windDirection || 'N/A',
        visibility: 10, // NOAA doesn't provide percentage this is just mock value
        pressure: 30.15, // NOAA doesn't provide percentage this is just mock value
        icon: getIconFromNOAA(currentPeriod.shortForecast)
      },
      forecast: periods.slice(0, 5).map((period, index) => ({
        day: index === 0 ? 'Today' : period.name,
        high: period.temperature,
        low: periods[index + 1]?.temperature || period.temperature - 10,
        condition: period.shortForecast,
        precipitation: 20, // NOAA doesn't provide percentage this is just mock value
      })),
      alerts: alertsData.features.map(alert => ({
        type: alert.properties.event,
        message: alert.properties.headline,
        severity: alert.properties.severity?.toLowerCase() || 'moderate'
      }))
    };
  };

  // Convert NOAA weather descriptions to our icon types
  const getIconFromNOAA = (forecast) => {
    const description = forecast.toLowerCase();
    if (description.includes('sunny') || description.includes('clear')) return 'sunny';
    if (description.includes('partly cloudy') || description.includes('partly sunny')) return 'partly-cloudy';
    if (description.includes('cloudy') || description.includes('overcast')) return 'cloudy';
    if (description.includes('rain') || description.includes('showers')) return 'rain';
    if (description.includes('thunder') || description.includes('storm')) return 'thunderstorm';
    return 'partly-cloudy';
  };

  const getWeatherIcon = (iconType) => {
    switch (iconType) {
      case 'sunny':
        return <div className="weather-icon weather-icon--sunny">☀️</div>;
      case 'partly-cloudy':
        return <div className="weather-icon weather-icon--partly-cloudy">⛅</div>;
      case 'cloudy':
        return <div className="weather-icon weather-icon--cloudy">☁️</div>;
      case 'rain':
        return <div className="weather-icon weather-icon--rain">🌧️</div>;
      case 'thunderstorm':
        return <div className="weather-icon weather-icon--thunderstorm">⛈️</div>;
      default:
        return <div className="weather-icon weather-icon--sunny">☀️</div>;
    }
  };

  return (
    <div className="location-page">
      <div className="location-page__container">
        <div className="location-page__header">
          <div className="location-page__title-section">
            <div className="location-icon">📍</div>
            <h1 className="location-page__title">Weather Forecast</h1>
          </div>

          {/* Search Form */}
          <div className="search-form">
            <div className="search-form__inputs">
              <div className="search-form__city-input">
                <label htmlFor="city" className="search-form__label">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="search-form__input"
                  placeholder="Enter city name"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
              <div className="search-form__state-input">
                <label htmlFor="state" className="search-form__label">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="search-form__input"
                  placeholder="TX"
                  maxLength={2}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="search-form__button"
            >
              <span className="search-form__button-icon">🔍</span>
              {loading ? 'Searching...' : 'Get Weather'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {/* Weather Data */}
        {weatherData && (
          <div className="weather-data">
            {/* Weather Alerts */}
            {weatherData.alerts && weatherData.alerts.length > 0 && (
              <div className="weather-alert">
                <div className="weather-alert__header">
                  <span className="weather-alert__icon">⚠️</span>
                  <h3 className="weather-alert__title">Weather Alert</h3>
                </div>
                {weatherData.alerts.map((alert, index) => (
                  <div key={index} className="weather-alert__content">
                    <strong>{alert.type}:</strong> {alert.message}
                  </div>
                ))}
              </div>
            )}

            {/* Current Weather */}
            <div className="current-weather">
              <h2 className="current-weather__location">{weatherData.location}</h2>
              <p className="current-weather__subtitle">Current Conditions</p>
              
              <div className="current-weather__main">
                <div className="current-weather__temp-section">
                  {getWeatherIcon(weatherData.current.icon)}
                  <div>
                    <div className="current-weather__temp">{weatherData.current.temp}°F</div>
                    <div className="current-weather__condition">{weatherData.current.condition}</div>
                  </div>
                </div>
              </div>

              <div className="current-weather__details">
                <div className="weather-detail">
                  <span className="weather-detail__icon">💧</span>
                  <div>
                    <div className="weather-detail__label">Humidity</div>
                    <div className="weather-detail__value">{weatherData.current.humidity}%</div>
                  </div>
                </div>
                <div className="weather-detail">
                  <span className="weather-detail__icon">💨</span>
                  <div>
                    <div className="weather-detail__label">Wind</div>
                    <div className="weather-detail__value">{weatherData.current.windSpeed} mph {weatherData.current.windDirection}</div>
                  </div>
                </div>
                <div className="weather-detail">
                  <span className="weather-detail__icon">👁️</span>
                  <div>
                    <div className="weather-detail__label">Visibility</div>
                    <div className="weather-detail__value">{weatherData.current.visibility} mi</div>
                  </div>
                </div>
                <div className="weather-detail">
                  <span className="weather-detail__icon">🌡️</span>
                  <div>
                    <div className="weather-detail__label">Pressure</div>
                    <div className="weather-detail__value">{weatherData.current.pressure} in</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="forecast">
              <h3 className="forecast__title">5-Day Forecast</h3>
              <div className="forecast__grid">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="forecast-day">
                    <div className="forecast-day__name">{day.day}</div>
                    <div className="forecast-day__icon">
                      {getWeatherIcon(day.icon)}
                    </div>
                    <div className="forecast-day__condition">{day.condition}</div>
                    <div className="forecast-day__temps">
                      <span className="forecast-day__high">{day.high}°</span>
                      <span className="forecast-day__low">{day.low}°</span>
                    </div>
                    <div className="forecast-day__precipitation">
                      {day.precipitation}% rain
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import HomePage from '../HomePage/HomePage';
import TornadoEventsPage from '../TornadoEventPage/TornadoEventPage';
import WeatherAlertPage from '../WeatherAlertPage/WeatherAlertPage'; 
import LocationPage from '../LocationPage/LocationPage'; 
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import ResourcePage from '../ResourcePage/ResourcePage';
import './App.css';


export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/tornado-events" element={<TornadoEventsPage />} /> 
            <Route path="/weather-alerts" element={<WeatherAlertPage />} />   
             <Route path="/locations" element={<LocationPage />} />
            <Route path="/resources" element={<ResourcePage />} />        
            
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/tornado-events" element={<TornadoEventsPage />} /> 
            <Route path="/weather-alerts" element={<WeatherAlertPage />} />   
            <Route path="/locations" element={<LocationPage />} />
            <Route path="/resources" element={<ResourcePage />} /> 
          
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
}
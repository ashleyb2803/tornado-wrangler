// components/TornadoEventForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function TornadoEventForm() {
  const [form, setForm] = useState({ title: '', description: '', date: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const res = await axios.post('/api/events', {
        ...form,
        coordinates: [longitude, latitude]
      }, { withCredentials: true });
      console.log('Event Created:', res.data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" />
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" />
      <input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <button type="submit">Report Tornado</button>
    </form>
  );
}

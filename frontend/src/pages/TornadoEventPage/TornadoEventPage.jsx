import { useEffect, useState } from 'react';
import * as userReportService from '../../services/userReportService';
import './TornadoEventPage.css';

export default function TornadoEventPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoading(true);
    setError(null); // <-- Reset error
    try {
      const data = await userReportService.getAllUserReports();
      console.log('Fetched reports:', data); 
      setReports(Array.isArray(data) ? data : data?.reports || []);
    } catch (err) {
      setError('Failed to fetch user reports.');
      console.error('Failed to fetch user reports:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading tornado reports...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="tornado-event-page">
      <h1>Current Tornado Reports</h1>
      <ul>
        {reports.map(report => (
          <li key={report._id} style={{ marginBottom: '1.5em' }}>
            <strong>Date:</strong> {new Date(report.date).toLocaleString()}<br />
            <strong>Location:</strong> {report.location || 'Unknown'}<br />
            <strong>Intensity:</strong> {report.intensity || 'Unknown'}<br />
            <strong>Description:</strong> {report.description || 'No description'}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}
import { useEffect, useState } from 'react';
import * as userReportService from '../../services/userReportService'; // <-- update import
import './TornadoEventPage.css';

export default function TornadoEventPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoading(true);
    try {
      const data = await userReportService.getAll();
      setReports(Array.isArray(data) ? data : data.reports || []);
    } catch (err) {
      console.error('Failed to fetch user reports:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading tornado reports...</div>;

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
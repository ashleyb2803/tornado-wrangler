import { useEffect, useState } from 'react';
import * as userReportService from '../../services/userReportService';

export default function UserReportPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await userReportService.getAll();
        setReports(data);
      } catch (err) {
        console.error('Failed to fetch user reports:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  if (loading) return <div>Loading user reports...</div>;

  return (
    <div>
      <h1>User Reports</h1>
      <ul>
        {reports.map(report => (
          <li key={report._id}>
            <strong>{report.title}</strong> - {report.date}
            <br />
            Reported by: {report.user?.name || 'Unknown'}
            <br />
            Description: {report.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
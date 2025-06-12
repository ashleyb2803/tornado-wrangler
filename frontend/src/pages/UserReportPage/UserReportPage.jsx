import { useEffect, useState } from 'react';
import * as userReportService from '../../services/userReportService';


export default function UserReportPage() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [commentForms, setCommentForms] = useState({}); // { [reportId]: commentText }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchReports() {
    try {
      const data = await userReportService.getAllUserReports();
      setReports(data);
    } catch (err) {
      alert('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }
  fetchReports();
}, []);

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const newReport = await userReportService.createUserReport(form);
    setReports([newReport, ...reports]);
    setForm({ title: '', description: '' });
  } catch (err) {
    alert('Failed to submit report');
  }
}

  async function handleCommentSubmit(e, reportId) {
  e.preventDefault();
  const commentText = commentForms[reportId];
  if (!commentText) return;
  try {
    const updatedReport = await userReportService.addCommentToReport(reportId, { text: commentText });
    setReports(reports =>
      reports.map(r => (r._id === reportId ? updatedReport : r))
    );
    setCommentForms(forms => ({ ...forms, [reportId]: '' }));
  } catch (err) {
    alert('Failed to add comment');
  }
}

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Tornado Reports</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2em' }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">Report a Tornado Event</button>
      </form>
      <ul>
        
          {(Array.isArray(reports) ? reports : []).map(report => (
          <li key={report._id} style={{ marginBottom: '2em' }}>
            <strong>{report.title}</strong> - {report.date}
            <br />
            Reported by: {report.user?.name || 'Unknown'}
            <br />
            Description: {report.description}
            <div style={{ marginTop: '1em' }}>
              <strong>Comments:</strong>
              <ul>
                {(report.comments || []).map((c, idx) => (
                  <li key={idx}>{c.text} {c.user?.name && <em>- {c.user.name}</em>}</li>
                ))}
              </ul>
              <form onSubmit={e => handleCommentSubmit(e, report._id)}>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={commentForms[report._id] || ''}
                  onChange={e =>
                    setCommentForms(forms => ({
                      ...forms,
                      [report._id]: e.target.value,
                    }))
                  }
                  required
                />
                <button type="submit">Comment</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
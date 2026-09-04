import React, { useState } from 'react';
import { submitSurvey } from '../api/client';

const EmployerForm = () => {
  const [formData, setFormData] = useState({
    employer_name: '',
    industry: '',
    district: 'Pune',
    top_missing_skills: '',
    comments: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = formData.top_missing_skills.split(',').map(s => s.trim());
      await submitSurvey({ ...formData, top_missing_skills: skillsArray });
      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit survey. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h2 style={{ color: 'var(--success-green)' }}>Thank you!</h2>
        <p>Your feedback helps us align training with industry needs.</p>
        <button onClick={() => setSubmitted(false)} style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--primary-blue)',
          color: 'white',
          border: 'none',
          borderRadius: '2px',
          cursor: 'pointer'
        }}>Submit another response</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Employer Skill Survey</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Help us identify the real-world skill gaps in your region.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>Company Name</label>
          <input
            required
            value={formData.employer_name}
            onChange={e => setFormData({ ...formData, employer_name: e.target.value })}
            style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>Industry/Sector</label>
          <input
            required
            value={formData.industry}
            onChange={e => setFormData({ ...formData, industry: e.target.value })}
            style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>District</label>
          <select
            value={formData.district}
            onChange={e => setFormData({ ...formData, district: e.target.value })}
            style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}
          >
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Nagpur">Nagpur</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>Top Missing Skills (comma separated)</label>
          <textarea
            required
            value={formData.top_missing_skills}
            onChange={e => setFormData({ ...formData, top_missing_skills: e.target.value })}
            placeholder="e.g. TypeScript, Kubernetes, AWS"
            style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '2px', minHeight: '100px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500' }}>Additional Comments</label>
          <textarea
            value={formData.comments}
            onChange={e => setFormData({ ...formData, comments: e.target.value })}
            style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '2px', minHeight: '100px' }}
          />
        </div>

        <button type="submit" style={{
          padding: '1rem',
          backgroundColor: 'var(--primary-blue)',
          color: 'white',
          border: 'none',
          borderRadius: '2px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default EmployerForm;

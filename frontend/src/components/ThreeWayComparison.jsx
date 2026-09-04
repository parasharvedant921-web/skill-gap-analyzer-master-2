import React from 'react';

const GAP_DATA = [
  { skill: 'SQL Basics', syllabus: true, student: true, demand: '89%', status: 'Aligned' },
  { skill: 'Relational DBMS Theory', syllabus: true, student: true, demand: '74%', status: 'Aligned' },
  { skill: 'PostgreSQL / Complex Querying', syllabus: false, student: false, demand: '82%', status: 'Critical Gap' },
  { skill: 'Docker Containerization', syllabus: false, student: false, demand: '78%', status: 'Critical Gap' },
  { skill: 'Redis Caching & PubSub', syllabus: false, student: true, demand: '65%', status: 'Moderate Gap' },
  { skill: 'Cloud Deployment (AWS/GCP)', syllabus: false, student: false, demand: '71%', status: 'Critical Gap' }
];

export default function ThreeWayComparison({ district = 'Pune' }) {
  const getBadgeColor = (status) => {
    switch (status) {
      case 'Aligned': return { bg: '#dcfce7', text: '#15803d' };
      case 'Moderate Gap': return { bg: '#fef9c3', text: '#854d0e' };
      case 'Critical Gap': return { bg: '#fee2e2', text: '#b91c1c' };
      default: return { bg: '#f1f5f9', text: '#475569' };
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleRow}>
        <div>
          <h3 style={styles.heading}>3-Way Alignment Matrix</h3>
          <p style={styles.sub}>Curriculum Syllabus vs. Candidate Profiles vs. {district} Market Demand</p>
        </div>
        <button onClick={() => window.print()} style={styles.printBtn}>
          Export PDF Summary
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr style={styles.thRow}>
            <th style={styles.th}>Competency / Tool</th>
            <th style={styles.th}>Academic Syllabus</th>
            <th style={styles.th}>Student Evidence</th>
            <th style={styles.th}>Regional Demand</th>
            <th style={styles.th}>Diagnostic Status</th>
          </tr>
        </thead>
        <tbody>
          {GAP_DATA.map((row, idx) => {
            const badge = getBadgeColor(row.status);
            return (
              <tr key={idx} style={styles.tr}>
                <td style={{ ...styles.td, fontWeight: '600' }}>{row.skill}</td>
                <td style={styles.td}>{row.syllabus ? '✅ Taught' : '❌ Not in Syllabus'}</td>
                <td style={styles.td}>{row.student ? '✅ Verified' : '⚠️ Missing'}</td>
                <td style={styles.td}>
                  <span style={styles.demandText}>{row.demand}</span>
                </td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, backgroundColor: badge.bg, color: badge.text }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', margin: '20px 0' },
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  heading: { margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: '600' },
  sub: { margin: '4px 0 0 0', fontSize: '0.875rem', color: '#64748b' },
  printBtn: { padding: '8px 16px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' },
  thRow: { backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' },
  th: { padding: '12px 16px', color: '#475569', fontWeight: '600' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '14px 16px', color: '#334155' },
  demandText: { fontWeight: '700', color: '#0284c7' },
  badge: { padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }
};
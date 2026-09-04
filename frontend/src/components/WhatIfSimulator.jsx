import React, { useState } from 'react';

const INITIAL_SKILLS = [
  { id: 'docker', name: 'Docker & Containerization', weight: 14, checked: false, role: 'DevOps / Backend' },
  { id: 'aws', name: 'AWS Cloud Services', weight: 12, checked: false, role: 'Cloud Infrastructure' },
  { id: 'redis', name: 'Redis In-Memory Caching', weight: 9, checked: false, role: 'System Design' },
  { id: 'fastapi', name: 'FastAPI / Async REST APIs', weight: 8, checked: false, role: 'API Development' },
  { id: 'postgres', name: 'PostgreSQL Advanced Tuning', weight: 7, checked: false, role: 'Databases' }
];

export default function WhatIfSimulator({ baseScore = 54 }) {
  const [skills, setSkills] = useState(INITIAL_SKILLS);

  const toggleSkill = (id) => {
    setSkills(prev =>
      prev.map(s => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const addedScore = skills
    .filter(s => s.checked)
    .reduce((sum, s) => sum + s.weight, 0);

  const projectedScore = Math.min(100, baseScore + addedScore);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>What-If Career & Curriculum Simulator</h3>
          <p style={styles.subtitle}>
            Select missing skills to project alignment gain against current market demand.
          </p>
        </div>
        <div style={styles.scoreBox}>
          <span style={styles.scoreLabel}>Projected Alignment</span>
          <span style={{ ...styles.scoreValue, color: projectedScore >= 75 ? '#16a34a' : '#ea580c' }}>
            {projectedScore}%
          </span>
          <span style={styles.gainText}>
            {addedScore > 0 ? `(+${addedScore}% boost)` : 'Baseline: ' + baseScore + '%'}
          </span>
        </div>
      </div>

      <div style={styles.skillList}>
        {skills.map(s => (
          <label key={s.id} style={{ ...styles.skillItem, borderColor: s.checked ? '#2563eb' : '#e5e7eb' }}>
            <input
              type="checkbox"
              checked={s.checked}
              onChange={() => toggleSkill(s.id)}
              style={styles.checkbox}
            />
            <div style={styles.skillInfo}>
              <span style={styles.skillName}>{s.name}</span>
              <span style={styles.skillRole}>{s.role}</span>
            </div>
            <span style={styles.badge}>+{s.weight}%</span>
          </label>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    margin: '20px 0',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { margin: 0, fontSize: '1.25rem', color: '#0f172a', fontWeight: '600' },
  subtitle: { margin: '4px 0 0 0', fontSize: '0.875rem', color: '#64748b' },
  scoreBox: { textAlign: 'right', display: 'flex', flexDirection: 'column' },
  scoreLabel: { fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: '600' },
  scoreValue: { fontSize: '2rem', fontWeight: '800' },
  gainText: { fontSize: '0.75rem', fontWeight: '500', color: '#2563eb' },
  skillList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' },
  skillItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1.5px solid #e5e7eb',
    cursor: 'pointer',
    backgroundColor: '#f8fafc',
    transition: 'all 0.15s ease'
  },
  checkbox: { marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' },
  skillInfo: { flexGrow: 1, display: 'flex', flexDirection: 'column' },
  skillName: { fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' },
  skillRole: { fontSize: '0.75rem', color: '#64748b' },
  badge: { backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }
};
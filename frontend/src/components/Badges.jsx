import React from 'react';

export const SkillTag = ({ skill }) => (
  <span style={{
    backgroundColor: '#e2e8f0',
    color: '#475569',
    padding: '0.25rem 0.5rem',
    borderRadius: '2px',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginRight: '0.5rem',
    display: 'inline-block'
  }}>
    {skill}
  </span>
);

export const MatchScoreBadge = ({ score }) => {
  let color = 'var(--gap-red)';
  let label = 'Needs Update';

  if (score >= 0.7) {
    color = 'var(--success-green)';
    label = 'Aligned';
  } else if (score >= 0.3) {
    color = '#eab308';
    label = 'Partial';
  }

  return (
    <span style={{
      backgroundColor: color,
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '2px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginRight: '0.5rem'
    }}>
      {label}
    </span>
  );
};

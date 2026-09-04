import React from 'react';
import { Link } from 'react-router-dom';
import { MatchScoreBadge } from './Badges';

const CourseCard = ({ course, analysis }) => {
  const score = analysis?.match_score || 0;

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid var(--border-color)',
      borderRadius: '2px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{course.name}</h3>
        <MatchScoreBadge score={score} />
      </div>

      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        District: {course.district}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
          {Math.round(score * 100)}% Aligned
        </div>
        <Link
          to={`/course/${course.id}`}
          style={{
            color: 'var(--primary-blue)',
            fontSize: '0.85rem',
            fontWeight: '600'
          }}
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

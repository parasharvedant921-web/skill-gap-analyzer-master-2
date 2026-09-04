import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: 'var(--primary-dark)',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <Link to="/" style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>Skill Gap Analyzer</span>
      </Link>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Link to="/" style={{ color: 'white', opacity: 0.9 }}>Dashboard</Link>
        <Link to="/survey" style={{ color: 'white', opacity: 0.9 }}>Employer Survey</Link>
        <Link to="/report/pune" style={{ color: 'white', opacity: 0.9 }}>Reports</Link>
      </div>
    </nav>
  );
};

export default Navbar;

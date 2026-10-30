import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#64748b' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '8px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '24px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          borderRadius: '6px',
          fontWeight: 500,
        }}
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

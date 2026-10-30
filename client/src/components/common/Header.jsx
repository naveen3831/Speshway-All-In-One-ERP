import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>
        Overview
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {user ? `${user.name} (${user.role})` : 'Guest'}
        </span>
        {user && (
          <button
            onClick={logout}
            style={{
              padding: '6px 14px',
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              borderRadius: '6px',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

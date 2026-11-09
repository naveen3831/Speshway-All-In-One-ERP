import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, ArrowLeft } from 'lucide-react';

export const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="dashboard-header"
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          type="button"
          className="dashboard-back-btn"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate('/products');
            }
          }}
          title="Back to Catalog"
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          type="button"
          className="dashboard-menu-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>
          Overview
        </div>
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

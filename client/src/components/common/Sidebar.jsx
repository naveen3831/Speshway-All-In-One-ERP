import React from 'react';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Inventory', path: '/inventory' },
  { label: 'Sales & Orders', path: '/sales' },
  { label: 'Purchases', path: '/purchases' },
  { label: 'Human Resources', path: '/hr' },
  { label: 'Finance & Accounting', path: '/finance' },
  { label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ open, onClose }) => {
  return (
    <aside
      className={`dashboard-sidebar ${open ? 'open' : ''}`}
      style={{
        width: 'var(--sidebar-width)',
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxHeight: '100vh',
        flexShrink: 0,
        position: 'relative',
        top: 0,
        left: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div
        className="dashboard-sidebar-header"
        style={{
          padding: '24px 20px',
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '-0.025em',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>Speshway ERP</span>
        <button
          type="button"
          className="dashboard-sidebar-close"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X size={20} />
        </button>
      </div>
      <nav style={{ padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'block',
              padding: '10px 16px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: 500,
              backgroundColor: isActive ? '#3b82f6' : 'transparent',
              color: isActive ? '#ffffff' : '#cbd5e1',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

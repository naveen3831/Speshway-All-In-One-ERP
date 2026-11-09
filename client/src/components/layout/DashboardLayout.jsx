import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar';
import { Header } from '../common/Header';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        className="admin-loading-screen"
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div className="loading-spinner"></div>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading Workspace...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="dashboard-layout" style={{ display: 'flex', height: '100vh', maxHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      {sidebarOpen && (
        <div
          className="dashboard-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', minWidth: 0 }}>
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="dashboard-main-content" style={{ padding: '24px', flex: 1, overflowY: 'auto', minWidth: 0, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

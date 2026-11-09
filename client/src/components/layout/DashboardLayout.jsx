import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../common/Sidebar';
import { Header } from '../common/Header';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

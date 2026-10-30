import React from 'react';
import { useSocket } from '../../context/SocketContext';
import { Database, Shield, Zap, Server } from 'lucide-react';

export const AdminSettings = () => {
  const { isConnected } = useSocket();

  return (
    <div className="admin-page-view">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">System &amp; Database Settings</h1>
          <p className="admin-subtext">View connection parameters, database state, and WebSocket socket engine status.</p>
        </div>
      </div>

      <div className="admin-two-cols">
        <div className="admin-card">
          <div className="admin-card-header">
            <h3><Database size={18} style={{ display: 'inline', marginRight: '6px' }} /> MongoDB Connection</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div>
              <strong>Cluster URI:</strong>
              <div style={{ wordBreak: 'break-all', color: '#64748b', fontSize: '0.82rem', marginTop: '4px' }}>
                <code>mongodb+srv://speshway123:***@speshwyallinoneerp.vv15a6z.mongodb.net/</code>
              </div>
            </div>
            <div>
              <strong>Database Name:</strong> <code>speshway_erp</code>
            </div>
            <div>
              <strong>Status:</strong> <span className="badge-active">Active / In-Memory Fallback Online</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h3><Zap size={18} style={{ display: 'inline', marginRight: '6px' }} /> Real-Time Engine (Socket.IO)</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div>
              <strong>Transport Protocol:</strong> WebSocket with Polling Fallback
            </div>
            <div>
              <strong>Live Connection:</strong>{' '}
              <span className={`badge-status ${isConnected ? 'active' : 'beta'}`}>
                {isConnected ? 'Connected & Synchronized' : 'Connecting'}
              </span>
            </div>
            <div>
              <strong>Port:</strong> 5000 (Backend API &amp; Socket)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

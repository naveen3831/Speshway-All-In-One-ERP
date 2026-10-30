import React from 'react';
import { Users, Zap, Headphones } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

export const StatsBar = () => {
  const { stats } = useSocket();

  return (
    <section className="stats-bar-section">
      <div className="stats-bar-container stats-3-grid">
        {/* Item 1 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-green-subtle">
            <Users className="stat-icon text-green" size={24} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">{stats.happyBusinesses}+</h3>
            <p className="stat-label">Happy Businesses</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue-subtle">
            <Zap className="stat-icon text-blue" size={24} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">{stats.uptime || '99.9%'}</h3>
            <p className="stat-label">Uptime &amp; Security</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue-subtle">
            <Headphones className="stat-icon text-blue" size={24} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">24/7</h3>
            <p className="stat-label">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

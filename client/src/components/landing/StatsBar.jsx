import React from 'react';
import { Users, Layers, Zap, Headphones } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

export const StatsBar = () => {
  const { stats, homeContent } = useSocket();
  const homeStats = homeContent?.stats || {};

  const stat1Number = homeStats.stat1Number || (stats?.happyBusinesses ? `${stats.happyBusinesses}+` : '524+');
  const stat1Label = homeStats.stat1Label || 'Happy Businesses';

  const stat2Number = homeStats.stat2Number || '17+';
  const stat2Label = homeStats.stat2Label || 'ERP Solutions';

  const stat3Number = homeStats.stat3Number || (stats?.uptime || '99.9%');
  const stat3Label = homeStats.stat3Label || 'Uptime & Security';

  const stat4Number = homeStats.stat4Number || '24/7';
  const stat4Label = homeStats.stat4Label || 'Customer Support';

  return (
    <section className="stats-bar-section">
      <div className="stats-bar-container stats-4-grid">
        {/* Item 1 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-green-subtle">
            <Users className="stat-icon text-green" size={24} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">{stat1Number}</h3>
            <p className="stat-label">{stat1Label}</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-purple-subtle">
            <Layers className="stat-icon text-purple" size={24} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">{stat2Number}</h3>
            <p className="stat-label">{stat2Label}</p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue-subtle">
            <Zap className="stat-icon text-blue" size={24} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">{stat3Number}</h3>
            <p className="stat-label">{stat3Label}</p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue-subtle">
            <Headphones className="stat-icon text-blue" size={24} />
          </div>
          <div className="stat-info">
            <h3 className="stat-number">{stat4Number}</h3>
            <p className="stat-label">{stat4Label}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

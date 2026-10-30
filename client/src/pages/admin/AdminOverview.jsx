import React from 'react';
import { useSocket } from '../../context/SocketContext';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  CheckCircle2,
  TrendingUp,
  Globe,
  Plus,
  ArrowRight,
  Shield,
  Clock,
} from 'lucide-react';

export const AdminOverview = () => {
  const { stats, products, activities } = useSocket();

  return (
    <div className="admin-page-view">
      {/* Top Banner */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">Executive Dashboard Overview</h1>
          <p className="admin-subtext">
            Monitor real-time system performance, ERP product catalog, and incoming customer inquiries.
          </p>
        </div>
        <div className="admin-header-actions">
          <Link to="/admin/products" className="btn-hero-primary" style={{ padding: '9px 18px', fontSize: '0.88rem' }}>
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="kpi-icon-wrap bg-green-subtle">
            <Package size={22} className="text-green" />
          </div>
          <div>
            <span className="kpi-label">Active ERP Products</span>
            <span className="kpi-value">{products.length}</span>
            <span className="kpi-trend positive">&uarr; Synced in Realtime</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="kpi-icon-wrap bg-blue-subtle">
            <Users size={22} className="text-blue" />
          </div>
          <div>
            <span className="kpi-label">Team Members</span>
            <span className="kpi-value">{stats.activeEmployees || 120}</span>
            <span className="kpi-trend positive">&uarr; Active Staff</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="kpi-icon-wrap bg-purple-subtle">
            <TrendingUp size={22} className="text-purple" />
          </div>
          <div>
            <span className="kpi-label">Happy Businesses</span>
            <span className="kpi-value">{stats.happyBusinesses}+</span>
            <span className="kpi-trend positive">&uarr; Enterprise Scale</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="kpi-icon-wrap bg-orange-subtle">
            <Globe size={22} className="text-orange" />
          </div>
          <div>
            <span className="kpi-label">System Uptime</span>
            <span className="kpi-value">{stats.uptime || '99.9%'}</span>
            <span className="kpi-trend positive">Zero Incident SLA</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Quick Product List & Real-time Activity Feed */}
      <div className="admin-two-cols">
        {/* Left: Products Quick Manager */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>ERP Applications Catalog ({products.length})</h3>
            <Link to="/admin/products" className="link-more">
              Manage All &rarr;
            </Link>
          </div>
          <div className="admin-table-compact">
            {products.slice(0, 6).map((prod) => (
              <div key={prod.id || prod.slug} className="compact-prod-row">
                <div className="prod-meta-left">
                  <span className="prod-name-bold">{prod.name}</span>
                  <span className="prod-cat-small">{prod.category}</span>
                </div>
                <div className="prod-urls-right">
                  <span className="url-preview" title={prod.websiteUrl}>
                    Web: {prod.websiteUrl || 'Local'}
                  </span>
                  <Link to="/admin/products" className="btn-edit-tiny">
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Real-time Activity Feed */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>Real-Time Live Event Stream</h3>
            <span className="badge-live-stream">&bull; Streaming</span>
          </div>
          <div className="admin-activity-stream">
            {activities.length === 0 ? (
              <div className="empty-stream">Waiting for events...</div>
            ) : (
              activities.slice(0, 6).map((act) => (
                <div key={act.id} className="stream-event-item">
                  <Clock size={14} className="text-muted" />
                  <div className="event-body">
                    <p className="event-text">{act.text}</p>
                    <span className="event-time">{act.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

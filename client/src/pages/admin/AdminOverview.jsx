import React, { useMemo } from 'react';
import { useSocket } from '../../context/SocketContext';
import { Link } from 'react-router-dom';
import {
  Package,
  Users,
  CheckCircle2,
  TrendingUp,
  Globe,
  ArrowRight,
  Shield,
  Clock,
  Inbox,
} from 'lucide-react';
import { DEFAULT_ADMIN_PROJECTS } from '../../utils/adminProjects';

export const AdminOverview = () => {
  const { stats, products, activities, modulesData } = useSocket();
  const inquiries = modulesData.demoRequests || [];

  const displayProjects = useMemo(() => {
    return Array.isArray(products) && products.length > 0 ? products : DEFAULT_ADMIN_PROJECTS;
  }, [products]);

  return (
    <div className="admin-page-view">
      {/* Top Banner */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">Executive Dashboard Overview</h1>
          <p className="admin-subtext">
            Monitor real-time system performance, ERP projects catalog, and incoming customer inquiries.
          </p>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="admin-kpi-grid">
        <Link
          to="/admin/products"
          className="admin-kpi-card"
          style={{ textDecoration: 'none', cursor: 'pointer' }}
          title="Open Projects Management"
        >
          <div className="kpi-icon-wrap bg-green-subtle">
            <Package size={22} className="text-green" />
          </div>
          <div>
            <span className="kpi-label">Active ERP Projects</span>
            <span className="kpi-value">{displayProjects.length}</span>
            <span className="kpi-trend positive">&uarr; Synced in Realtime</span>
          </div>
        </Link>

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

        <Link to="/admin/inquiries" className="admin-kpi-card" style={{ textDecoration: 'none' }}>
          <div className="kpi-icon-wrap bg-purple-subtle">
            <Inbox size={22} className="text-purple" />
          </div>
          <div>
            <span className="kpi-label">Customer Leads</span>
            <span className="kpi-value">{inquiries.length}</span>
            <span className="kpi-trend positive">&rarr; Manage Leads</span>
          </div>
        </Link>

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
        {/* Left: Projects Quick Manager */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>ERP Projects Catalog ({displayProjects.length})</h3>
            <Link to="/admin/products" className="link-more">
              Manage All &rarr;
            </Link>
          </div>
          <div className="admin-table-compact">
            {displayProjects.slice(0, 8).map((prod) => (
              <div key={prod.id || prod.slug} className="compact-prod-row">
                <div className="prod-meta-left">
                  <span className="prod-name-bold">{prod.name}</span>
                  <span className="prod-cat-small">{prod.category}</span>
                </div>
                <div className="prod-urls-right">
                  <span className="url-preview" title={prod.websiteUrl}>
                    Web: {prod.websiteUrl || 'Local'}
                  </span>
                  <Link to={`/admin/products/edit/${prod.slug || prod.id}`} className="btn-edit-tiny">
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

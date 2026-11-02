import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import api from '../../services/api';
import {
  Inbox,
  Mail,
  Building,
  Calendar,
  Phone,
  Search,
  Filter,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Users,
} from 'lucide-react';

export const AdminInquiries = () => {
  const { modulesData, refreshInquiries } = useSocket();
  const inquiries = modulesData.demoRequests || [];

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'get-started' | 'demo'
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (refreshInquiries) {
      refreshInquiries();
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (refreshInquiries) {
      await refreshInquiries();
    }
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/inquiries/${id}/status`, { status: newStatus });
      if (refreshInquiries) refreshInquiries();
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer inquiry?')) {
      try {
        await api.delete(`/inquiries/${id}`);
        if (refreshInquiries) refreshInquiries();
      } catch (err) {
        console.error('Failed to delete inquiry:', err);
      }
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const term = search.toLowerCase();
    const matchesSearch =
      (inq.name && inq.name.toLowerCase().includes(term)) ||
      (inq.email && inq.email.toLowerCase().includes(term)) ||
      (inq.company && inq.company.toLowerCase().includes(term)) ||
      (inq.module && inq.module.toLowerCase().includes(term));

    if (!matchesSearch) return false;

    if (filterType === 'get-started') {
      return inq.source === 'get-started';
    }
    if (filterType === 'demo') {
      return inq.source !== 'get-started';
    }
    return true;
  });

  const getStartedCount = inquiries.filter((i) => i.source === 'get-started').length;
  const demoCount = inquiries.filter((i) => i.source !== 'get-started').length;

  return (
    <div className="admin-page-view">
      {/* Top Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">Customer Inquiries &amp; Free Trial Leads</h1>
          <p className="admin-subtext">
            Live inbound customer registrations from the Get Started full-screen page and website demos.
          </p>
        </div>
        <div className="admin-header-actions">
          <button
            onClick={handleRefresh}
            className="btn-admin-portal"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="admin-kpi-grid" style={{ marginBottom: '20px' }}>
        <div className="admin-kpi-card" onClick={() => setFilterType('all')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon-wrap bg-green-subtle">
            <Inbox size={22} className="text-green" />
          </div>
          <div>
            <span className="kpi-label">Total Inquiries</span>
            <span className="kpi-value">{inquiries.length}</span>
            <span className="kpi-trend positive">Real-Time Synced</span>
          </div>
        </div>

        <div className="admin-kpi-card" onClick={() => setFilterType('get-started')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon-wrap bg-blue-subtle">
            <Sparkles size={22} className="text-blue" />
          </div>
          <div>
            <span className="kpi-label">Free Trial Leads</span>
            <span className="kpi-value">{getStartedCount}</span>
            <span className="kpi-trend positive">From Full Screen Form</span>
          </div>
        </div>

        <div className="admin-kpi-card" onClick={() => setFilterType('demo')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon-wrap bg-purple-subtle">
            <Users size={22} className="text-purple" />
          </div>
          <div>
            <span className="kpi-label">Demo Inquiries</span>
            <span className="kpi-value">{demoCount}</span>
            <span className="kpi-trend positive">Direct Requests</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
          />
          <input
            type="text"
            placeholder="Search leads by name, email, company, or module..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="quick-input"
            style={{ width: '100%', paddingLeft: '36px', height: '40px', borderRadius: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilterType('all')}
            className={`btn-admin-portal ${filterType === 'all' ? 'active' : ''}`}
            style={{
              backgroundColor: filterType === 'all' ? '#10b981' : '#f1f5f9',
              color: filterType === 'all' ? '#fff' : '#475569',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            All ({inquiries.length})
          </button>
          <button
            onClick={() => setFilterType('get-started')}
            style={{
              backgroundColor: filterType === 'get-started' ? '#10b981' : '#f1f5f9',
              color: filterType === 'get-started' ? '#fff' : '#475569',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            Free Trials ({getStartedCount})
          </button>
          <button
            onClick={() => setFilterType('demo')}
            style={{
              backgroundColor: filterType === 'demo' ? '#10b981' : '#f1f5f9',
              color: filterType === 'demo' ? '#fff' : '#475569',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            Live Demos ({demoCount})
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="admin-card table-card">
        {filteredInquiries.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
            <Inbox size={44} style={{ margin: '0 auto 14px auto', color: '#94a3b8' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
              No Inquiries Found
            </h3>
            <p style={{ fontSize: '0.88rem' }}>
              {search ? 'Try adjusting your search terms.' : 'Submissions from the Get Started page will appear here instantly in real-time.'}
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Lead / Type</th>
                  <th>Contact Info</th>
                  <th>Organization &amp; Team</th>
                  <th>Module Focus</th>
                  <th>Status</th>
                  <th>Received</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq) => {
                  const inquiryId = inq._id || inq.id;
                  const isFreeTrial = inq.source === 'get-started';
                  const dateStr = inq.createdAt || inq.date;

                  return (
                    <tr key={inquiryId}>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>
                            {inq.name}
                          </span>
                          <span
                            style={{
                              display: 'inline-block',
                              width: 'fit-content',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '12px',
                              backgroundColor: isFreeTrial ? '#ecfdf5' : '#f5f3ff',
                              color: isFreeTrial ? '#059669' : '#7c3aed',
                              border: `1px solid ${isFreeTrial ? '#a7f3d0' : '#ddd6fe'}`,
                            }}
                          >
                            {isFreeTrial ? '★ Free Trial' : '● Demo Request'}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <a
                            href={`mailto:${inq.email}`}
                            style={{
                              color: '#2563eb',
                              fontSize: '0.86rem',
                              fontWeight: 500,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Mail size={13} /> {inq.email}
                          </a>
                          {inq.phone && (
                            <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Phone size={12} /> {inq.phone}
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <span style={{ fontWeight: 600, color: '#334155', fontSize: '0.88rem' }}>
                            {inq.company || 'Enterprise Client'}
                          </span>
                          {inq.teamSize && (
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                              Team: {inq.teamSize} members
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <span
                          className="badge-active"
                          style={{
                            backgroundColor: '#f0fdf4',
                            color: '#15803d',
                            borderColor: '#bbf7d0',
                            fontWeight: 600,
                            fontSize: '0.8rem',
                          }}
                        >
                          {inq.module || 'All-In-One Complete Suite'}
                        </span>
                      </td>

                      <td>
                        <select
                          value={inq.status || 'new'}
                          onChange={(e) => handleStatusChange(inquiryId, e.target.value)}
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            backgroundColor:
                              inq.status === 'qualified'
                                ? '#ecfdf5'
                                : inq.status === 'contacted'
                                ? '#eff6ff'
                                : inq.status === 'closed'
                                ? '#f8fafc'
                                : '#fffbeb',
                            color:
                              inq.status === 'qualified'
                                ? '#047857'
                                : inq.status === 'contacted'
                                ? '#1d4ed8'
                                : inq.status === 'closed'
                                ? '#64748b'
                                : '#b45309',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="new">● New</option>
                          <option value="contacted">● Contacted</option>
                          <option value="qualified">✔ Qualified</option>
                          <option value="closed">✕ Closed</option>
                        </select>
                      </td>

                      <td style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                        {dateStr ? new Date(dateStr).toLocaleString() : 'Just now'}
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(inquiryId)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '6px',
                          }}
                          title="Delete Lead"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;

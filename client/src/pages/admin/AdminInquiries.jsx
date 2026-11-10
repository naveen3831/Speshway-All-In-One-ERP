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
  MessageSquare,
  Radio,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const AdminInquiries = () => {
  const { modulesData, refreshInquiries } = useSocket();
  const inquiries = modulesData.demoRequests || [];

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'get-started' | 'demo' | 'contact'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initial fetch and automatic real-time sync
  useEffect(() => {
    if (refreshInquiries) {
      refreshInquiries();
    }

    // Auto-poll every 3.5s to guarantee multi-tab & multi-browser instant sync
    const interval = setInterval(() => {
      if (refreshInquiries) {
        refreshInquiries();
      }
    }, 3500);

    const onFocus = () => {
      if (refreshInquiries) refreshInquiries();
    };
    window.addEventListener('focus', onFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (refreshInquiries) {
      await refreshInquiries();
    }
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Reply via Email modal state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyAdminName, setReplyAdminName] = useState('SPESHWAY Enterprise Support');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const [replyStatusMsg, setReplyStatusMsg] = useState({ type: '', text: '' });

  const handleOpenReplyModal = (inq) => {
    setSelectedInquiry(inq);
    setReplySubject(`Update on your SPESHWAY inquiry: ${inq.module || 'All-In-One Complete Suite'}`);
    setReplyMessage(
      `Hello ${inq.name || 'Valued Client'},\n\nThank you for reaching out to SPESHWAY regarding our ${inq.module || 'ERP solutions'}.\n\nWe have reviewed your request for ${inq.company || 'your organization'} and would be delighted to assist you with system onboarding and a live product demonstration.\n\nPlease let us know if you have any specific requirements or preferred timing for a walkthrough.\n\nBest regards,\nSPESHWAY Enterprise Solutions Team`
    );
    setReplyStatusMsg({ type: '', text: '' });
  };

  const handleCloseReplyModal = () => {
    setSelectedInquiry(null);
    setReplyStatusMsg({ type: '', text: '' });
    setIsSendingReply(false);
  };

  const handleSendReply = async (e) => {
    if (e) e.preventDefault();
    if (!selectedInquiry || !replyMessage.trim()) return;

    setIsSendingReply(true);
    setReplyStatusMsg({ type: '', text: '' });

    const inquiryId = selectedInquiry._id || selectedInquiry.id;
    try {
      const res = await api.post(`/inquiries/${inquiryId}/reply`, {
        subject: replySubject,
        replyMessage: replyMessage,
        adminName: replyAdminName,
      });

      setReplyStatusMsg({
        type: 'success',
        text: res.data?.message || `Reply email dispatched successfully to ${selectedInquiry.email}!`,
      });

      if (refreshInquiries) {
        refreshInquiries();
      }

      setTimeout(() => {
        handleCloseReplyModal();
      }, 1800);
    } catch (err) {
      setReplyStatusMsg({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to dispatch email via SMTP.',
      });
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/inquiries/${id}/status`, { status: newStatus, notifyCustomer: true });
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

  // Helper to categorize inquiry by source or module
  const getInquiryType = (inq) => {
    if (
      inq.source === 'contact' ||
      (inq.module && inq.module.toLowerCase().includes('contact'))
    ) {
      return 'contact';
    }
    if (
      inq.source === 'demo' ||
      (inq.module && inq.module.toLowerCase().includes('demo'))
    ) {
      return 'demo';
    }
    return 'get-started';
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const term = search.toLowerCase();
    const matchesSearch =
      (inq.name && inq.name.toLowerCase().includes(term)) ||
      (inq.email && inq.email.toLowerCase().includes(term)) ||
      (inq.company && inq.company.toLowerCase().includes(term)) ||
      (inq.module && inq.module.toLowerCase().includes(term)) ||
      (inq.message && inq.message.toLowerCase().includes(term));

    if (!matchesSearch) return false;

    const type = getInquiryType(inq);
    if (filterType === 'get-started') {
      return type === 'get-started';
    }
    if (filterType === 'demo') {
      return type === 'demo';
    }
    if (filterType === 'contact') {
      return type === 'contact';
    }
    return true;
  });

  const getStartedCount = inquiries.filter((i) => getInquiryType(i) === 'get-started').length;
  const demoCount = inquiries.filter((i) => getInquiryType(i) === 'demo').length;
  const contactCount = inquiries.filter((i) => getInquiryType(i) === 'contact').length;

  return (
    <div className="admin-page-view">
      {/* Top Header */}
      <div className="admin-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 className="admin-heading" style={{ margin: 0 }}>Customer Inquiries &amp; Leads</h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '2px 8px',
                borderRadius: '12px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'inline-block',
                }}
              />
              Live Synced
            </span>
          </div>
          <p className="admin-subtext" style={{ margin: 0 }}>
            Real-time inbound customer submissions from Demo Bookings, Contact Messages, and Get Started Free Trials.
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

      {/* Metric Cards (4 cards covering All, Free Trials, Demos, Contact) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div
          className="admin-kpi-card"
          onClick={() => setFilterType('all')}
          style={{
            cursor: 'pointer',
            border: filterType === 'all' ? '2px solid #10b981' : '1px solid #cbd5e1',
            boxShadow: filterType === 'all' ? '0 0 0 1px #10b981' : undefined,
          }}
        >
          <div className="kpi-icon-wrap bg-green-subtle">
            <Inbox size={22} className="text-green" />
          </div>
          <div>
            <span className="kpi-label">Total Inquiries</span>
            <span className="kpi-value">{inquiries.length}</span>
            <span className="kpi-trend positive">Real-Time Synced</span>
          </div>
        </div>

        <div
          className="admin-kpi-card"
          onClick={() => setFilterType('get-started')}
          style={{
            cursor: 'pointer',
            border: filterType === 'get-started' ? '2px solid #2563eb' : '1px solid #cbd5e1',
            boxShadow: filterType === 'get-started' ? '0 0 0 1px #2563eb' : undefined,
          }}
        >
          <div className="kpi-icon-wrap bg-blue-subtle">
            <Sparkles size={22} className="text-blue" />
          </div>
          <div>
            <span className="kpi-label">Free Trial Leads</span>
            <span className="kpi-value">{getStartedCount}</span>
            <span className="kpi-trend positive">Get Started Form</span>
          </div>
        </div>

        <div
          className="admin-kpi-card"
          onClick={() => setFilterType('demo')}
          style={{
            cursor: 'pointer',
            border: filterType === 'demo' ? '2px solid #7c3aed' : '1px solid #cbd5e1',
            boxShadow: filterType === 'demo' ? '0 0 0 1px #7c3aed' : undefined,
          }}
        >
          <div className="kpi-icon-wrap bg-purple-subtle">
            <Users size={22} className="text-purple" />
          </div>
          <div>
            <span className="kpi-label">Demo Bookings</span>
            <span className="kpi-value">{demoCount}</span>
            <span className="kpi-trend positive">Live Demo Requests</span>
          </div>
        </div>

        <div
          className="admin-kpi-card"
          onClick={() => setFilterType('contact')}
          style={{
            cursor: 'pointer',
            border: filterType === 'contact' ? '2px solid #0284c7' : '1px solid #cbd5e1',
            boxShadow: filterType === 'contact' ? '0 0 0 1px #0284c7' : undefined,
          }}
        >
          <div
            className="kpi-icon-wrap"
            style={{ backgroundColor: '#e0f2fe', color: '#0284c7' }}
          >
            <Mail size={22} />
          </div>
          <div>
            <span className="kpi-label">Contact Inquiries</span>
            <span className="kpi-value">{contactCount}</span>
            <span className="kpi-trend positive">Direct Contact Us</span>
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
            placeholder="Search leads by name, email, company, module, or note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="quick-input"
            style={{ width: '100%', paddingLeft: '36px', height: '40px', borderRadius: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterType('all')}
            style={{
              backgroundColor: filterType === 'all' ? '#10b981' : '#f1f5f9',
              color: filterType === 'all' ? '#fff' : '#475569',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            All ({inquiries.length})
          </button>
          <button
            onClick={() => setFilterType('get-started')}
            style={{
              backgroundColor: filterType === 'get-started' ? '#2563eb' : '#f1f5f9',
              color: filterType === 'get-started' ? '#fff' : '#475569',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Free Trials ({getStartedCount})
          </button>
          <button
            onClick={() => setFilterType('demo')}
            style={{
              backgroundColor: filterType === 'demo' ? '#7c3aed' : '#f1f5f9',
              color: filterType === 'demo' ? '#fff' : '#475569',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Live Demos ({demoCount})
          </button>
          <button
            onClick={() => setFilterType('contact')}
            style={{
              backgroundColor: filterType === 'contact' ? '#0284c7' : '#f1f5f9',
              color: filterType === 'contact' ? '#fff' : '#475569',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Contact Messages ({contactCount})
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
              {search
                ? 'Try adjusting your search terms.'
                : 'Customer demo bookings, contact notes, and free trial signups will appear here instantly in real-time.'}
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
                  <th>Module Focus &amp; Message</th>
                  <th>Status</th>
                  <th>Received</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq) => {
                  const inquiryId = inq._id || inq.id;
                  const type = getInquiryType(inq);
                  const isFreeTrial = type === 'get-started';
                  const isDemo = type === 'demo';
                  const isContact = type === 'contact';
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
                              backgroundColor: isFreeTrial
                                ? '#ecfdf5'
                                : isDemo
                                ? '#f5f3ff'
                                : '#f0f9ff',
                              color: isFreeTrial
                                ? '#059669'
                                : isDemo
                                ? '#7c3aed'
                                : '#0284c7',
                              border: `1px solid ${
                                isFreeTrial
                                  ? '#a7f3d0'
                                  : isDemo
                                  ? '#ddd6fe'
                                  : '#bae6fd'
                              }`,
                            }}
                          >
                            {isFreeTrial
                              ? '★ Free Trial'
                              : isDemo
                              ? '● Demo Booking'
                              : '✉ Contact Msg'}
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span
                            className="badge-active"
                            style={{
                              backgroundColor: '#f0fdf4',
                              color: '#15803d',
                              borderColor: '#bbf7d0',
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              width: 'fit-content',
                            }}
                          >
                            {inq.module || 'All-In-One Complete Suite'}
                          </span>
                          {inq.message && (
                            <div
                              style={{
                                fontSize: '0.76rem',
                                color: '#475569',
                                backgroundColor: '#f8fafc',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                border: '1px solid #e2e8f0',
                                maxWidth: '300px',
                                wordBreak: 'break-word',
                              }}
                              title={inq.message}
                            >
                              "{inq.message.length > 75 ? `${inq.message.slice(0, 75)}...` : inq.message}"
                            </div>
                          )}
                        </div>
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

                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenReplyModal(inq)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            backgroundColor: '#ecfdf5',
                            color: '#047857',
                            border: '1px solid #a7f3d0',
                            borderRadius: '8px',
                            padding: '5px 11px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            marginRight: '8px',
                            transition: 'all 0.15s ease',
                          }}
                          title={`Send Email Reply to ${inq.email}`}
                        >
                          <Send size={13} />
                          <span>Reply</span>
                        </button>
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

      {/* Customer Email Reply Modal */}
      {selectedInquiry && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={handleCloseReplyModal}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '620px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#ecfdf5',
                    color: '#047857',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #a7f3d0',
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                    Reply to Customer via Email
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Dispatches directly via SMTP (naveenkumar970100@gmail.com)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseReplyModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px',
                  display: 'flex',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSendReply} style={{ padding: '24px' }}>
              {/* Recipient Details Card */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '18px',
                  fontSize: '0.84rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>Recipient:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>
                    {selectedInquiry.name} &lt;{selectedInquiry.email}&gt;
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>Organization:</span>
                  <span style={{ fontWeight: 600, color: '#334155' }}>
                    {selectedInquiry.company || 'Enterprise Client'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Interested Module:</span>
                  <span style={{ fontWeight: 600, color: '#047857' }}>
                    {selectedInquiry.module || 'All-In-One Complete Suite'}
                  </span>
                </div>
              </div>

              {/* Status Alert */}
              {replyStatusMsg.text && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    marginBottom: '18px',
                    fontSize: '0.86rem',
                    backgroundColor: replyStatusMsg.type === 'success' ? '#ecfdf5' : '#fef2f2',
                    border: `1.5px solid ${replyStatusMsg.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
                    color: replyStatusMsg.type === 'success' ? '#047857' : '#b91c1c',
                  }}
                >
                  {replyStatusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span style={{ fontWeight: 600 }}>{replyStatusMsg.text}</span>
                </div>
              )}

              {/* Email Subject */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#334155',
                    marginBottom: '6px',
                  }}
                >
                  Email Subject
                </label>
                <input
                  type="text"
                  required
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.88rem',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Sender Display Name */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#334155',
                    marginBottom: '6px',
                  }}
                >
                  Sender / Sign-off Name
                </label>
                <input
                  type="text"
                  value={replyAdminName}
                  onChange={(e) => setReplyAdminName(e.target.value)}
                  placeholder="e.g. SPESHWAY Support"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.88rem',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Message Body */}
              <div style={{ marginBottom: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#334155',
                    marginBottom: '6px',
                  }}
                >
                  Response Message
                </label>
                <textarea
                  required
                  rows={7}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.86rem',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    lineHeight: 1.5,
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Actions Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleCloseReplyModal}
                  disabled={isSendingReply}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSendingReply || !replyMessage.trim()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isSendingReply ? '#94a3b8' : '#047857',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    cursor: isSendingReply ? 'not-allowed' : 'pointer',
                    boxShadow: '0 2px 6px rgba(4, 120, 87, 0.25)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Send size={15} />
                  <span>{isSendingReply ? 'Sending via SMTP...' : 'Send Email to Customer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;

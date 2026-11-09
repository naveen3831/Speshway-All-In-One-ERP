import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Building,
  Key,
  Users,
  DollarSign,
  ArrowLeft,
  Search,
  Plus,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Phone,
  ShieldCheck,
  Wrench,
  Menu,
  X,
} from 'lucide-react';
import '../shared/IndustryDashboard.css';

const PROPERTIES = [
  { id: 'PROP-101', name: 'Skyline Heights Apt 4B', type: 'Residential 3BHK', tenant: 'Sameer Kapoor', rent: '₹45,000/mo', deposit: '₹1,50,000', leaseEnd: '2027-08-31', status: 'Occupied' },
  { id: 'PROP-102', name: 'Cyber Gateway Tower Unit 302', type: 'Commercial Office', tenant: 'TechNova Solutions', rent: '₹1,80,000/mo', deposit: '₹5,40,000', leaseEnd: '2028-03-15', status: 'Occupied' },
  { id: 'PROP-103', name: 'Greenwood Villa #12', type: 'Luxury Gated Villa', tenant: 'Vacant', rent: '₹75,000/mo', deposit: '₹2,50,000', leaseEnd: 'N/A', status: 'Available' },
  { id: 'PROP-104', name: 'Palm Grove Residency 2A', type: 'Residential 2BHK', tenant: 'Ananya Deshmukh', rent: '₹32,000/mo', deposit: '₹1,00,000', leaseEnd: '2026-12-31', status: 'Renewal Due' },
  { id: 'PROP-105', name: 'Metro Retail Square Shop 18', type: 'Retail Commercial', tenant: 'Cafe Brew & Bites', rent: '₹65,000/mo', deposit: '₹2,00,000', leaseEnd: '2027-05-30', status: 'Occupied' },
  { id: 'PROP-106', name: 'Orchid Enclave Flat 701', type: 'Residential Penthouse', tenant: 'Vacant (Under Painting)', rent: '₹95,000/mo', deposit: '₹3,00,000', leaseEnd: 'N/A', status: 'Maintenance' },
];

const TENANTS = [
  { id: 'TNT-501', name: 'Sameer Kapoor', property: 'Skyline Heights Apt 4B', phone: '+91 98200-11223', email: 'sameer.k@gmail.com', leasePeriod: 'Sep 2024 - Aug 2027', depositHeld: '₹1,50,000', kyc: 'Verified' },
  { id: 'TNT-502', name: 'TechNova Solutions (Rajiv Sen)', property: 'Cyber Gateway Tower Unit 302', phone: '+91 98450-44556', email: 'accounts@technova.io', leasePeriod: 'Apr 2023 - Mar 2028', depositHeld: '₹5,40,000', kyc: 'Verified' },
  { id: 'TNT-503', name: 'Ananya Deshmukh', property: 'Palm Grove Residency 2A', phone: '+91 97110-88990', email: 'ananya.d@outlook.com', leasePeriod: 'Jan 2024 - Dec 2026', depositHeld: '₹1,00,000', kyc: 'Verified' },
  { id: 'TNT-504', name: 'Cafe Brew & Bites (Kiran Shah)', property: 'Metro Retail Square Shop 18', phone: '+91 99000-77665', email: 'kiran@cafebrew.in', leasePeriod: 'Jun 2024 - May 2027', depositHeld: '₹2,00,000', kyc: 'Verified' },
];

const RENT_COLLECTIONS = [
  { invNo: 'INV-2026-1101', property: 'Skyline Heights Apt 4B', tenant: 'Sameer Kapoor', month: 'November 2026', due: '05 Nov 2026', amount: '₹45,000', method: 'NEFT / Auto-Debit', status: 'Paid' },
  { invNo: 'INV-2026-1102', property: 'Cyber Gateway Tower Unit 302', tenant: 'TechNova Solutions', month: 'November 2026', due: '01 Nov 2026', amount: '₹1,80,000', method: 'RTGS Transfer', status: 'Paid' },
  { invNo: 'INV-2026-1103', property: 'Palm Grove Residency 2A', tenant: 'Ananya Deshmukh', month: 'November 2026', due: '07 Nov 2026', amount: '₹32,000', method: 'UPI Payment', status: 'Pending' },
  { invNo: 'INV-2026-1104', property: 'Metro Retail Square Shop 18', tenant: 'Cafe Brew & Bites', month: 'November 2026', due: '03 Nov 2026', amount: '₹65,000', method: 'Direct Bank Wire', status: 'Paid' },
];

const MAINTENANCE_TICKETS = [
  { id: 'MNT-881', property: 'Skyline Heights Apt 4B', tenant: 'Sameer Kapoor', issue: 'Geyser heating element burnout', contractor: 'Apex Plumbing & Electricals', priority: 'Medium', status: 'In Progress' },
  { id: 'MNT-882', property: 'Orchid Enclave Flat 701', tenant: 'N/A (Turnover)', issue: 'Full wall re-plastering & Royale paint', contractor: 'Colors Décor Services', priority: 'High', status: 'Scheduled' },
  { id: 'MNT-883', property: 'Cyber Gateway Tower 302', tenant: 'TechNova Solutions', issue: 'HVAC central chill unit filter cleaning', contractor: 'Voltas Facility Care', priority: 'Low', status: 'Resolved' },
  { id: 'MNT-884', property: 'Palm Grove 2A', tenant: 'Ananya Deshmukh', issue: 'Main door smart biometric lock battery', contractor: 'SecureLock Systems', priority: 'Low', status: 'Resolved' },
];

export const RealEstateDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('properties');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filteredProperties = PROPERTIES.filter((p) => {
    const matchStatus = filterStatus === 'all' || p.status.toLowerCase().replace(/[^a-z]/g, '') === filterStatus;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tenant.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="ind-erp-root">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="ind-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}

      {/* Sidebar */}
      <aside className={`ind-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="ind-sidebar-brand">
          <div className="ind-brand-icon-box" style={{ backgroundColor: '#10b981' }}>
            <Home size={20} color="#ffffff" />
          </div>
          <div className="ind-brand-text">
            <span className="ind-brand-name">EstateFlow</span>
            <span className="ind-brand-sub" style={{ color: '#34d399' }}>Real Estate ERP</span>
          </div>
          <button
            type="button"
            className="ind-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="ind-sidebar-menu">
          <button onClick={() => { setActiveNav('dash'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'dash' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Overview
          </button>
          <button onClick={() => { setActiveNav('properties'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'properties' ? 'active' : ''}`}>
            <Building size={18} /> Properties <span className="ind-nav-badge">6</span>
          </button>
          <button onClick={() => { setActiveNav('tenants'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'tenants' ? 'active' : ''}`}>
            <Users size={18} /> Tenants &amp; Leases <span className="ind-nav-badge">4</span>
          </button>
          <button onClick={() => { setActiveNav('rent'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'rent' ? 'active' : ''}`}>
            <DollarSign size={18} /> Rent Collections
          </button>
          <button onClick={() => { setActiveNav('leases'); setSidebarOpen(false); }} className={`ind-nav-btn ${activeNav === 'leases' ? 'active' : ''}`}>
            <FileText size={18} /> Maintenance &amp; Repairs
          </button>
        </nav>

        <div className="ind-sidebar-footer">
          <button onClick={() => { setSidebarOpen(false); navigate('/'); }} className="ind-back-home-btn">
            <ArrowLeft size={16} /> Back to Speshway
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="ind-main-area">
        {/* Topbar */}
        <header className="ind-topbar">
          <div className="ind-topbar-left">
            <button
              type="button"
              className="ind-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
            <button onClick={() => navigate('/')} className="ind-back-pill">
              <ArrowLeft size={14} /> Back to Speshway ERP
            </button>
            <div className="ind-live-chip">
              <span className="ind-live-dot" /> Live Commercial &amp; Residential Real Estate
            </div>
          </div>
          <div className="ind-topbar-right">
            <div className="ind-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search property, tenant, unit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ind-user-profile">
              <div className="ind-user-avatar" style={{ backgroundColor: '#10b981' }}>PM</div>
              <div className="ind-user-meta">
                <span className="ind-user-name">Property Manager</span>
                <span className="ind-user-role">Estate Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ind-content-body">
          <div className="ind-body-header">
            <div>
              <h1 className="ind-body-title">
                {activeNav === 'dash' && 'Real Estate Portfolio & Occupancy Hub'}
                {activeNav === 'properties' && 'Property Master & Lease Units'}
                {activeNav === 'tenants' && 'Tenant Directory & Active Lease Contracts'}
                {activeNav === 'rent' && 'Monthly Rent Roll & Dues Reconciliation'}
                {activeNav === 'leases' && 'Property Maintenance Work Orders & Repairs'}
              </h1>
              <p className="ind-body-sub">Portfolio asset tracking, tenant lease agreements, security deposits, and contractor work orders.</p>
            </div>
            <button className="ind-action-primary" style={{ backgroundColor: '#10b981' }}>
              <Plus size={16} /> Add New Property
            </button>
          </div>

          {/* 4 KPIs */}
          <div className="ind-kpi-grid">
            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Portfolio Occupancy</span>
                <span className="ind-kpi-val">92.4%</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> 24 / 26 Units Leased</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <Building size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Monthly Rent Roll</span>
                <span className="ind-kpi-val">₹4.92L</span>
                <span className="ind-kpi-trend"><CheckCircle2 size={12} /> 94% Collected On Time</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <DollarSign size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Active Leases</span>
                <span className="ind-kpi-val">24 Tenants</span>
                <span className="ind-kpi-trend">1 Renewal Due This Month</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <Key size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Maintenance Work</span>
                <span className="ind-kpi-val">2 Active</span>
                <span className="ind-kpi-trend">Avg 24hr Resolution</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                <Wrench size={22} />
              </div>
            </div>
          </div>

          {/* TAB 1: PROPERTIES */}
          {(activeNav === 'dash' || activeNav === 'properties') && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button onClick={() => setFilterStatus('all')} className={`ind-tab-pill ${filterStatus === 'all' ? 'active' : ''}`}>All Units</button>
                  <button onClick={() => setFilterStatus('occupied')} className={`ind-tab-pill ${filterStatus === 'occupied' ? 'active' : ''}`}>Occupied</button>
                  <button onClick={() => setFilterStatus('available')} className={`ind-tab-pill ${filterStatus === 'available' ? 'active' : ''}`}>Available</button>
                  <button onClick={() => setFilterStatus('renewaldue')} className={`ind-tab-pill ${filterStatus === 'renewaldue' ? 'active' : ''}`}>Renewal Due</button>
                </div>
              </div>

              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Property Code</th>
                      <th>Property Name</th>
                      <th>Category</th>
                      <th>Current Tenant</th>
                      <th>Monthly Rent</th>
                      <th>Security Deposit</th>
                      <th>Lease Expiry</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.map((p) => (
                      <tr key={p.id}>
                        <td><span className="ind-code-tag">{p.id}</span></td>
                        <td><strong>{p.name}</strong></td>
                        <td>{p.type}</td>
                        <td>{p.tenant}</td>
                        <td><strong style={{ color: '#059669' }}>{p.rent}</strong></td>
                        <td>{p.deposit}</td>
                        <td>{p.leaseEnd}</td>
                        <td>
                          <span className={`ind-status-badge ${p.status === 'Occupied' ? 'badge-green' : p.status === 'Available' ? 'badge-blue' : p.status === 'Renewal Due' ? 'badge-amber' : 'badge-purple'}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TENANTS */}
          {activeNav === 'tenants' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">All Active Tenants (4)</button>
                  <button className="ind-tab-pill">Corporate Accounts</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Tenant ID</th>
                      <th>Tenant Name</th>
                      <th>Assigned Property</th>
                      <th>Phone &amp; Email</th>
                      <th>Lease Term</th>
                      <th>Security Deposit Held</th>
                      <th>KYC Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TENANTS.map((t) => (
                      <tr key={t.id}>
                        <td><span className="ind-code-tag">{t.id}</span></td>
                        <td><strong>{t.name}</strong></td>
                        <td>{t.property}</td>
                        <td>
                          <div>{t.phone}</div>
                          <small style={{ color: '#64748b' }}>{t.email}</small>
                        </td>
                        <td>{t.leasePeriod}</td>
                        <td><strong>{t.depositHeld}</strong></td>
                        <td>
                          <span className="ind-status-badge badge-green">
                            <ShieldCheck size={12} style={{ display: 'inline', marginRight: 4 }} />{t.kyc}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: RENT COLLECTIONS */}
          {activeNav === 'rent' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">November 2026 Invoices</button>
                  <button className="ind-tab-pill">Overdue Rent</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Invoice No</th>
                      <th>Property Unit</th>
                      <th>Tenant Name</th>
                      <th>Billing Month</th>
                      <th>Due Date</th>
                      <th>Rent Amount</th>
                      <th>Payment Channel</th>
                      <th>Settlement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RENT_COLLECTIONS.map((r) => (
                      <tr key={r.invNo}>
                        <td><span className="ind-code-tag">{r.invNo}</span></td>
                        <td><strong>{r.property}</strong></td>
                        <td>{r.tenant}</td>
                        <td>{r.month}</td>
                        <td>{r.due}</td>
                        <td><strong style={{ color: '#059669' }}>{r.amount}</strong></td>
                        <td>{r.method}</td>
                        <td>
                          <span className={`ind-status-badge ${r.status === 'Paid' ? 'badge-green' : 'badge-amber'}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MAINTENANCE WORK ORDERS */}
          {activeNav === 'leases' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Work Orders (4)</button>
                  <button className="ind-tab-pill">Urgent Repairs</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Property Unit</th>
                      <th>Tenant Contact</th>
                      <th>Maintenance Issue</th>
                      <th>Assigned Contractor</th>
                      <th>Priority</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MAINTENANCE_TICKETS.map((m) => (
                      <tr key={m.id}>
                        <td><span className="ind-code-tag">{m.id}</span></td>
                        <td><strong>{m.property}</strong></td>
                        <td>{m.tenant}</td>
                        <td>{m.issue}</td>
                        <td>{m.contractor}</td>
                        <td>
                          <span className={`ind-status-badge ${m.priority === 'High' ? 'badge-rose' : m.priority === 'Medium' ? 'badge-amber' : 'badge-blue'}`}>
                            {m.priority}
                          </span>
                        </td>
                        <td>
                          <span className={`ind-status-badge ${m.status === 'Resolved' ? 'badge-green' : m.status === 'In Progress' ? 'badge-amber' : 'badge-purple'}`}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RealEstateDashboard;

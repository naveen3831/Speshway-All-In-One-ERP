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

export const RealEstateDashboard = () => {
  const navigate = useNavigate();
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
      {/* Sidebar */}
      <aside className="ind-sidebar">
        <div className="ind-sidebar-brand">
          <div className="ind-brand-icon-box" style={{ backgroundColor: '#10b981' }}>
            <Home size={20} color="#ffffff" />
          </div>
          <div className="ind-brand-text">
            <span className="ind-brand-name">EstateFlow</span>
            <span className="ind-brand-sub" style={{ color: '#34d399' }}>Real Estate ERP</span>
          </div>
        </div>

        <nav className="ind-sidebar-menu">
          <button onClick={() => setActiveNav('dash')} className={`ind-nav-btn ${activeNav === 'dash' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Overview
          </button>
          <button onClick={() => setActiveNav('properties')} className={`ind-nav-btn ${activeNav === 'properties' ? 'active' : ''}`}>
            <Building size={18} /> Properties <span className="ind-nav-badge">6</span>
          </button>
          <button onClick={() => setActiveNav('tenants')} className={`ind-nav-btn ${activeNav === 'tenants' ? 'active' : ''}`}>
            <Users size={18} /> Tenants &amp; Leases
          </button>
          <button onClick={() => setActiveNav('rent')} className={`ind-nav-btn ${activeNav === 'rent' ? 'active' : ''}`}>
            <DollarSign size={18} /> Rent Collections
          </button>
          <button onClick={() => setActiveNav('leases')} className={`ind-nav-btn ${activeNav === 'leases' ? 'active' : ''}`}>
            <FileText size={18} /> Maintenance
          </button>
        </nav>

        <div className="ind-sidebar-footer">
          <button onClick={() => navigate('/')} className="ind-back-home-btn">
            <ArrowLeft size={16} /> Back to Speshway
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="ind-main-area">
        {/* Topbar */}
        <header className="ind-topbar">
          <div className="ind-topbar-left">
            <button onClick={() => navigate('/')} className="ind-back-pill">
              <ArrowLeft size={14} /> Back to Speshway ERP
            </button>
            <div className="ind-live-chip">
              <span className="ind-live-dot" /> Live Real Estate &amp; Property ERP
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
                <span className="ind-user-name">Property Director</span>
                <span className="ind-user-role">Portfolio Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ind-content-body">
          <div className="ind-body-header">
            <div>
              <h1 className="ind-body-title">Property Portfolio &amp; Lease Management</h1>
              <p className="ind-body-sub">End-to-end residential, commercial, and retail property leasing, tenant agreements, and rent schedules.</p>
            </div>
            <button className="ind-action-primary" style={{ backgroundColor: '#10b981' }}>
              <Plus size={16} /> Add Property
            </button>
          </div>

          {/* 4 KPIs */}
          <div className="ind-kpi-grid">
            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Total Properties</span>
                <span className="ind-kpi-val">42 Units</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> 91% Occupancy Rate</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
                <Building size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Monthly Rent Roll</span>
                <span className="ind-kpi-val">₹14.8L</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> 98% collected on-time</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <DollarSign size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Active Tenants</span>
                <span className="ind-kpi-val">38 Leases</span>
                <span className="ind-kpi-trend">4 renewals pending</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                <Users size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Security Deposits</span>
                <span className="ind-kpi-val">₹42.5L</span>
                <span className="ind-kpi-trend">Escrow held</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <Key size={22} />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="ind-card-container">
            <div className="ind-table-controls">
              <div className="ind-tabs-row">
                <button onClick={() => setFilterStatus('all')} className={`ind-tab-pill ${filterStatus === 'all' ? 'active' : ''}`}>All Units</button>
                <button onClick={() => setFilterStatus('occupied')} className={`ind-tab-pill ${filterStatus === 'occupied' ? 'active' : ''}`}>Occupied</button>
                <button onClick={() => setFilterStatus('available')} className={`ind-tab-pill ${filterStatus === 'available' ? 'active' : ''}`}>Available</button>
                <button onClick={() => setFilterStatus('maintenance')} className={`ind-tab-pill ${filterStatus === 'maintenance' ? 'active' : ''}`}>Maintenance</button>
              </div>
            </div>

            <div className="ind-table-wrap">
              <table className="ind-data-table">
                <thead>
                  <tr>
                    <th>Unit ID</th>
                    <th>Property Name</th>
                    <th>Type</th>
                    <th>Current Tenant</th>
                    <th>Monthly Rent</th>
                    <th>Deposit</th>
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
                      <td><strong>{p.rent}</strong></td>
                      <td>{p.deposit}</td>
                      <td>{p.leaseEnd}</td>
                      <td>
                        <span className={`ind-status-badge ${p.status === 'Occupied' ? 'badge-green' : p.status === 'Available' ? 'badge-blue' : p.status === 'Maintenance' ? 'badge-rose' : 'badge-amber'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};


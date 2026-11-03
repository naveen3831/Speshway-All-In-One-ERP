import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  LayoutDashboard,
  ClipboardList,
  Users,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Search,
  Bell,
  Plus,
  TrendingUp,
  Download,
  Filter,
} from 'lucide-react';
import '../shared/IndustryDashboard.css';

const REPAIR_JOBS = [
  { id: 'JOB-8421', customer: 'Priya Sharma', device: 'Samsung French Door Refrigerator', issue: 'Compressor Cooling Failure', tech: 'Vikram Singh', priority: 'High', date: '2026-11-02', status: 'In Progress', cost: '₹4,500' },
  { id: 'JOB-8422', customer: 'Rahul Verma', device: 'LG Front Load Washing Machine 8kg', issue: 'Drain Pump Obstruction', tech: 'Anil Kumar', priority: 'Normal', date: '2026-11-01', status: 'Completed', cost: '₹1,850' },
  { id: 'JOB-8423', customer: 'Sneha Patel', device: 'Daikin 1.5 Ton Split AC', issue: 'PCB Circuit Short & Gas Leak', tech: 'Vikram Singh', priority: 'Urgent', date: '2026-11-02', status: 'Testing', cost: '₹6,200' },
  { id: 'JOB-8424', customer: 'Mohammed Farooq', device: 'Whirlpool Microwave Oven 30L', issue: 'Magnetron Replacement Needed', tech: 'Karthik Rao', priority: 'Normal', date: '2026-10-31', status: 'Pending Parts', cost: '₹2,400' },
  { id: 'JOB-8425', customer: 'Deepika Iyer', device: 'Sony Bravia 55" 4K OLED TV', issue: 'No Display / Backlight Panel', tech: 'Ramesh Reddy', priority: 'High', date: '2026-11-01', status: 'In Progress', cost: '₹8,500' },
  { id: 'JOB-8426', customer: 'Arun Nair', device: 'Bosch Dishwasher Series 6', issue: 'E15 Error / Water Sensor Leak', tech: 'Anil Kumar', priority: 'Normal', date: '2026-10-30', status: 'Completed', cost: '₹3,200' },
];

export const ServiceCenterDashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('jobs');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filteredJobs = REPAIR_JOBS.filter((j) => {
    const matchStatus = filterStatus === 'all' || j.status.toLowerCase().replace(' ', '') === filterStatus;
    const matchSearch = j.customer.toLowerCase().includes(search.toLowerCase()) ||
      j.device.toLowerCase().includes(search.toLowerCase()) ||
      j.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="ind-erp-root">
      {/* Sidebar */}
      <aside className="ind-sidebar">
        <div className="ind-sidebar-brand">
          <div className="ind-brand-icon-box" style={{ backgroundColor: '#2563eb' }}>
            <Wrench size={20} color="#ffffff" />
          </div>
          <div className="ind-brand-text">
            <span className="ind-brand-name">ServiCenter</span>
            <span className="ind-brand-sub" style={{ color: '#60a5fa' }}>Appliance ERP</span>
          </div>
        </div>

        <nav className="ind-sidebar-menu">
          <button onClick={() => setActiveNav('dash')} className={`ind-nav-btn ${activeNav === 'dash' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Overview
          </button>
          <button onClick={() => setActiveNav('jobs')} className={`ind-nav-btn ${activeNav === 'jobs' ? 'active' : ''}`}>
            <ClipboardList size={18} /> Repair Jobs <span className="ind-nav-badge">6</span>
          </button>
          <button onClick={() => setActiveNav('techs')} className={`ind-nav-btn ${activeNav === 'techs' ? 'active' : ''}`}>
            <Users size={18} /> Technicians
          </button>
          <button onClick={() => setActiveNav('inventory')} className={`ind-nav-btn ${activeNav === 'inventory' ? 'active' : ''}`}>
            <Package size={18} /> Spare Parts Inventory
          </button>
          <button onClick={() => setActiveNav('schedule')} className={`ind-nav-btn ${activeNav === 'schedule' ? 'active' : ''}`}>
            <Calendar size={18} /> On-Site Visits
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
              <span className="ind-live-dot" /> Live Appliance Service ERP
            </div>
          </div>
          <div className="ind-topbar-right">
            <div className="ind-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search job ID, customer, device..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ind-user-profile">
              <div className="ind-user-avatar" style={{ backgroundColor: '#2563eb' }}>SC</div>
              <div className="ind-user-meta">
                <span className="ind-user-name">Chief Engineer</span>
                <span className="ind-user-role">Service Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ind-content-body">
          <div className="ind-body-header">
            <div>
              <h1 className="ind-body-title">Service Center &amp; Appliance Repair Operations</h1>
              <p className="ind-body-sub">Real-time technician job dispatching, spare inventory, warranty tickets, and repair tracking.</p>
            </div>
            <button className="ind-action-primary" style={{ backgroundColor: '#2563eb' }}>
              <Plus size={16} /> New Repair Ticket
            </button>
          </div>

          {/* 4 KPIs */}
          <div className="ind-kpi-grid">
            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Active Jobs</span>
                <span className="ind-kpi-val">28</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> +14% this week</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <ClipboardList size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Completed Today</span>
                <span className="ind-kpi-val">12</span>
                <span className="ind-kpi-trend"><CheckCircle2 size={12} /> 94% on-time</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Field Technicians</span>
                <span className="ind-kpi-val">16</span>
                <span className="ind-kpi-trend">14 on duty</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                <Users size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Repair Billing</span>
                <span className="ind-kpi-val">₹84,200</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> Today's collections</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <Wrench size={22} />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="ind-card-container">
            <div className="ind-table-controls">
              <div className="ind-tabs-row">
                <button onClick={() => setFilterStatus('all')} className={`ind-tab-pill ${filterStatus === 'all' ? 'active' : ''}`}>All Tickets</button>
                <button onClick={() => setFilterStatus('inprogress')} className={`ind-tab-pill ${filterStatus === 'inprogress' ? 'active' : ''}`}>In Progress</button>
                <button onClick={() => setFilterStatus('testing')} className={`ind-tab-pill ${filterStatus === 'testing' ? 'active' : ''}`}>Testing</button>
                <button onClick={() => setFilterStatus('completed')} className={`ind-tab-pill ${filterStatus === 'completed' ? 'active' : ''}`}>Completed</button>
              </div>
            </div>

            <div className="ind-table-wrap">
              <table className="ind-data-table">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Customer</th>
                    <th>Appliance / Device</th>
                    <th>Reported Issue</th>
                    <th>Assigned Tech</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Estimate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((j) => (
                    <tr key={j.id}>
                      <td><span className="ind-code-tag">{j.id}</span></td>
                      <td><strong>{j.customer}</strong></td>
                      <td>{j.device}</td>
                      <td>{j.issue}</td>
                      <td>{j.tech}</td>
                      <td>{j.date}</td>
                      <td>
                        <span className={`ind-status-badge ${j.status === 'Completed' ? 'badge-green' : j.status === 'In Progress' ? 'badge-blue' : j.status === 'Testing' ? 'badge-purple' : 'badge-amber'}`}>
                          {j.status}
                        </span>
                      </td>
                      <td><strong>{j.cost}</strong></td>
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


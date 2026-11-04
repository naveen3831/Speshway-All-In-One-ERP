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
  Phone,
  Truck,
  Star,
  ShieldCheck,
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

const TECHNICIANS = [
  { id: 'TCH-01', name: 'Vikram Singh', skill: 'HVAC & Refrigeration Specialist', activeJobs: 3, completedMonth: 28, rating: '4.9 ★', phone: '+91 98200-55443', status: 'On Field Visit' },
  { id: 'TCH-02', name: 'Anil Kumar', skill: 'Washing Machines & Dishwashers', activeJobs: 2, completedMonth: 34, rating: '4.8 ★', phone: '+91 98450-77889', status: 'Available' },
  { id: 'TCH-03', name: 'Karthik Rao', skill: 'Microwaves & Kitchen Small Appliances', activeJobs: 2, completedMonth: 22, rating: '4.7 ★', phone: '+91 97110-33221', status: 'In Workshop' },
  { id: 'TCH-04', name: 'Ramesh Reddy', skill: 'LED TVs & Home Electronics', activeJobs: 1, completedMonth: 26, rating: '4.9 ★', phone: '+91 99000-66554', status: 'Diagnostic Bay' },
];

const SPARE_PARTS = [
  { sku: 'PRT-DAIKIN-PCB', name: 'Inverter PCB Board (FTKM Series)', category: 'HVAC & AC', inStock: 14, minLevel: 5, unitCost: '₹3,200', supplier: 'Daikin India Spares' },
  { sku: 'PRT-LG-PUMP', name: 'Universal Direct Drive Drain Pump', category: 'Washing Machine', inStock: 22, minLevel: 8, unitCost: '₹950', supplier: 'LG Core Logistics' },
  { sku: 'PRT-SAMS-COMP', name: 'Linear Digital Inverter Compressor', category: 'Refrigerator', inStock: 6, minLevel: 4, unitCost: '₹3,800', supplier: 'Samsung Electronics' },
  { sku: 'PRT-MAG-WHIRL', name: 'Magnetron 2M218H Universal', category: 'Microwave', inStock: 12, minLevel: 6, unitCost: '₹1,250', supplier: 'Whirlpool OEM Hub' },
  { sku: 'PRT-SONY-TCON', name: 'T-Con Logic Timing Board 55"', category: 'Television', inStock: 4, minLevel: 3, unitCost: '₹2,600', supplier: 'Sony Authorized Parts' },
];

const ON_SITE_VISITS = [
  { id: 'VST-501', customer: 'Priya Sharma', address: 'Flat 402, Green Glen Layout, Bellandur', timeSlot: '11:00 AM - 01:00 PM', tech: 'Vikram Singh', appliance: 'Samsung Refrigerator', status: 'En Route' },
  { id: 'VST-502', customer: 'Sneha Patel', address: 'Villa 18, Palm Meadows, Whitefield', timeSlot: '02:30 PM - 04:30 PM', tech: 'Vikram Singh', appliance: 'Daikin Inverter AC', status: 'Scheduled' },
  { id: 'VST-503', customer: 'Nitin Gadkari', address: 'Plot 77, HSR Layout Sector 3', timeSlot: '04:00 PM - 05:30 PM', tech: 'Anil Kumar', appliance: 'Bosch Dishwasher', status: 'Confirmed' },
  { id: 'VST-504', customer: 'Meera Chawla', address: 'Tower B Apt 901, Indiranagar', timeSlot: '05:30 PM - 07:00 PM', tech: 'Karthik Rao', appliance: 'IFB Microwave Oven', status: 'Scheduled' },
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
            <Users size={18} /> Technicians <span className="ind-nav-badge">4</span>
          </button>
          <button onClick={() => setActiveNav('inventory')} className={`ind-nav-btn ${activeNav === 'inventory' ? 'active' : ''}`}>
            <Package size={18} /> Spare Parts Inventory
          </button>
          <button onClick={() => setActiveNav('schedule')} className={`ind-nav-btn ${activeNav === 'schedule' ? 'active' : ''}`}>
            <Calendar size={18} /> On-Site Visits <span className="ind-nav-badge">4</span>
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
              <span className="ind-live-dot" /> Live Multi-Brand Appliance Care
            </div>
          </div>
          <div className="ind-topbar-right">
            <div className="ind-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search job ticket, customer, appliance..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ind-user-profile">
              <div className="ind-user-avatar" style={{ backgroundColor: '#2563eb' }}>SC</div>
              <div className="ind-user-meta">
                <span className="ind-user-name">Service Desk</span>
                <span className="ind-user-role">Operations Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ind-content-body">
          <div className="ind-body-header">
            <div>
              <h1 className="ind-body-title">
                {activeNav === 'dash' && 'Appliance Service Center Command Desk'}
                {activeNav === 'jobs' && 'Repair Tickets & Diagnostic Work Orders'}
                {activeNav === 'techs' && 'Field Technicians Roster & Performance'}
                {activeNav === 'inventory' && 'Spare Parts Warehouse & Component Inventory'}
                {activeNav === 'schedule' && 'On-Site Customer Service Schedule'}
              </h1>
              <p className="ind-body-sub">Real-time technician dispatching, warranty repair tickets, inventory parts picking, and customer delivery tracking.</p>
            </div>
            <button className="ind-action-primary" style={{ backgroundColor: '#2563eb' }}>
              <Plus size={16} /> Log New Service Ticket
            </button>
          </div>

          {/* 4 KPIs */}
          <div className="ind-kpi-grid">
            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Active Job Tickets</span>
                <span className="ind-kpi-val">18 Open</span>
                <span className="ind-kpi-trend"><Clock size={12} /> 6 In Diagnostic Bay</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <ClipboardList size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">First-Time-Fix Rate</span>
                <span className="ind-kpi-val">91.2%</span>
                <span className="ind-kpi-trend"><CheckCircle2 size={12} /> Exceeds SLA Goal</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Field Technicians</span>
                <span className="ind-kpi-val">8 Active</span>
                <span className="ind-kpi-trend">4 Currently Dispatched</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <Truck size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Spare Parts In Stock</span>
                <span className="ind-kpi-val">420 Units</span>
                <span className="ind-kpi-trend">98.5% Availability</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                <Package size={22} />
              </div>
            </div>
          </div>

          {/* TAB 1: REPAIR JOBS */}
          {(activeNav === 'dash' || activeNav === 'jobs') && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button onClick={() => setFilterStatus('all')} className={`ind-tab-pill ${filterStatus === 'all' ? 'active' : ''}`}>All Jobs</button>
                  <button onClick={() => setFilterStatus('inprogress')} className={`ind-tab-pill ${filterStatus === 'inprogress' ? 'active' : ''}`}>In Progress</button>
                  <button onClick={() => setFilterStatus('completed')} className={`ind-tab-pill ${filterStatus === 'completed' ? 'active' : ''}`}>Completed</button>
                  <button onClick={() => setFilterStatus('testing')} className={`ind-tab-pill ${filterStatus === 'testing' ? 'active' : ''}`}>Testing</button>
                </div>
              </div>

              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Job ID</th>
                      <th>Customer Name</th>
                      <th>Device &amp; Brand</th>
                      <th>Reported Fault</th>
                      <th>Assigned Tech</th>
                      <th>Priority</th>
                      <th>Est. Cost</th>
                      <th>Status</th>
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
                        <td>
                          <span className={`ind-status-badge ${j.priority === 'Urgent' ? 'badge-rose' : j.priority === 'High' ? 'badge-amber' : 'badge-blue'}`}>
                            {j.priority}
                          </span>
                        </td>
                        <td><strong style={{ color: '#059669' }}>{j.cost}</strong></td>
                        <td>
                          <span className={`ind-status-badge ${j.status === 'Completed' ? 'badge-green' : j.status === 'In Progress' ? 'badge-blue' : j.status === 'Testing' ? 'badge-purple' : 'badge-amber'}`}>
                            {j.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICIANS */}
          {activeNav === 'techs' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Certified Engineers (4)</button>
                  <button className="ind-tab-pill">Field Dispatch</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Tech ID</th>
                      <th>Engineer Name</th>
                      <th>Primary Domain Expertise</th>
                      <th>Active Jobs</th>
                      <th>Completed (Month)</th>
                      <th>Customer Rating</th>
                      <th>Phone</th>
                      <th>Current Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TECHNICIANS.map((t) => (
                      <tr key={t.id}>
                        <td><span className="ind-code-tag">{t.id}</span></td>
                        <td><strong>{t.name}</strong></td>
                        <td>{t.skill}</td>
                        <td><strong>{t.activeJobs} Jobs</strong></td>
                        <td>{t.completedMonth} Units</td>
                        <td><span style={{ color: '#f59e0b', fontWeight: 600 }}>{t.rating}</span></td>
                        <td><Phone size={13} style={{ display: 'inline', marginRight: 4 }} />{t.phone}</td>
                        <td>
                          <span className={`ind-status-badge ${t.status === 'Available' ? 'badge-green' : t.status.includes('Field') ? 'badge-amber' : 'badge-blue'}`}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SPARE PARTS INVENTORY */}
          {activeNav === 'inventory' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">All Components (5)</button>
                  <button className="ind-tab-pill">Low Stock Alerts</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Part SKU</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>In Stock</th>
                      <th>Reorder Threshold</th>
                      <th>Unit Cost</th>
                      <th>Authorized Supplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SPARE_PARTS.map((sp) => (
                      <tr key={sp.sku}>
                        <td><span className="ind-code-tag">{sp.sku}</span></td>
                        <td><strong>{sp.name}</strong></td>
                        <td>{sp.category}</td>
                        <td><strong style={{ color: sp.inStock <= sp.minLevel ? '#e11d48' : '#059669' }}>{sp.inStock} Units</strong></td>
                        <td>{sp.minLevel} Units</td>
                        <td>{sp.unitCost}</td>
                        <td>{sp.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ON-SITE VISITS */}
          {activeNav === 'schedule' && (
            <div className="ind-card-container">
              <div className="ind-table-controls">
                <div className="ind-tabs-row">
                  <button className="ind-tab-pill active">Today's Route Schedule (4)</button>
                  <button className="ind-tab-pill">Completed Visits</button>
                </div>
              </div>
              <div className="ind-table-wrap">
                <table className="ind-data-table">
                  <thead>
                    <tr>
                      <th>Visit ID</th>
                      <th>Customer</th>
                      <th>Destination Address</th>
                      <th>Appointment Window</th>
                      <th>Assigned Tech</th>
                      <th>Appliance</th>
                      <th>Dispatch Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ON_SITE_VISITS.map((v) => (
                      <tr key={v.id}>
                        <td><span className="ind-code-tag">{v.id}</span></td>
                        <td><strong>{v.customer}</strong></td>
                        <td>{v.address}</td>
                        <td><Clock size={13} style={{ display: 'inline', marginRight: 4 }} />{v.timeSlot}</td>
                        <td>{v.tech}</td>
                        <td>{v.appliance}</td>
                        <td>
                          <span className={`ind-status-badge ${v.status === 'En Route' ? 'badge-amber' : 'badge-blue'}`}>
                            {v.status}
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

export default ServiceCenterDashboard;

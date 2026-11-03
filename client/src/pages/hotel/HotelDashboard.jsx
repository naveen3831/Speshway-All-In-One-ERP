import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  LayoutDashboard,
  CalendarCheck,
  Bed,
  Users,
  DollarSign,
  ArrowLeft,
  Search,
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import '../shared/IndustryDashboard.css';

const RESERVATIONS = [
  { id: 'RES-901', guest: 'Dr. Evelyn Reed', room: 'Suite 502 (Executive Lakeview)', nights: '3 Nights', checkIn: '2026-11-02', checkOut: '2026-11-05', bill: '₹36,000', status: 'Checked In' },
  { id: 'RES-902', guest: 'Kunal Singhania', room: 'Deluxe Room 304', nights: '2 Nights', checkIn: '2026-11-03', checkOut: '2026-11-05', bill: '₹14,500', status: 'Confirmed' },
  { id: 'RES-903', guest: 'Sarah Jenkins', room: 'Presidential Suite 701', nights: '5 Nights', checkIn: '2026-11-01', checkOut: '2026-11-06', bill: '₹1,25,000', status: 'Checked In' },
  { id: 'RES-904', guest: 'Rameshwar Gupta', room: 'Premium King 210', nights: '1 Night', checkIn: '2026-11-02', checkOut: '2026-11-03', bill: '₹8,200', status: 'Checked Out' },
  { id: 'RES-905', guest: 'Ananya & Rohit Deshmukh', room: 'Honeymoon Suite 604', nights: '4 Nights', checkIn: '2026-11-03', checkOut: '2026-11-07', bill: '₹52,000', status: 'Arriving Today' },
  { id: 'RES-906', guest: 'Michael Chang', room: 'Club Room 418', nights: '2 Nights', checkIn: '2026-11-04', checkOut: '2026-11-06', bill: '₹18,000', status: 'Confirmed' },
];

export const HotelDashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('bookings');
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filteredReservations = RESERVATIONS.filter((r) => {
    const matchStatus = filterStatus === 'all' || r.status.toLowerCase().replace(/[^a-z]/g, '') === filterStatus;
    const matchSearch = r.guest.toLowerCase().includes(search.toLowerCase()) ||
      r.room.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="ind-erp-root">
      {/* Sidebar */}
      <aside className="ind-sidebar">
        <div className="ind-sidebar-brand">
          <div className="ind-brand-icon-box" style={{ backgroundColor: '#f59e0b' }}>
            <Building2 size={20} color="#ffffff" />
          </div>
          <div className="ind-brand-text">
            <span className="ind-brand-name">LuxeResort</span>
            <span className="ind-brand-sub" style={{ color: '#fbbf24' }}>Hospitality ERP</span>
          </div>
        </div>

        <nav className="ind-sidebar-menu">
          <button onClick={() => setActiveNav('dash')} className={`ind-nav-btn ${activeNav === 'dash' ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Front Desk
          </button>
          <button onClick={() => setActiveNav('bookings')} className={`ind-nav-btn ${activeNav === 'bookings' ? 'active' : ''}`}>
            <CalendarCheck size={18} /> Reservations <span className="ind-nav-badge">6</span>
          </button>
          <button onClick={() => setActiveNav('rooms')} className={`ind-nav-btn ${activeNav === 'rooms' ? 'active' : ''}`}>
            <Bed size={18} /> Room Inventory
          </button>
          <button onClick={() => setActiveNav('guests')} className={`ind-nav-btn ${activeNav === 'guests' ? 'active' : ''}`}>
            <Users size={18} /> Guest Registry
          </button>
          <button onClick={() => setActiveNav('housekeeping')} className={`ind-nav-btn ${activeNav === 'housekeeping' ? 'active' : ''}`}>
            <Sparkles size={18} /> Housekeeping
          </button>
          <button onClick={() => setActiveNav('billing')} className={`ind-nav-btn ${activeNav === 'billing' ? 'active' : ''}`}>
            <DollarSign size={18} /> Folio Billing &amp; POS
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
              <span className="ind-live-dot" /> Live Hotel &amp; Resort ERP
            </div>
          </div>
          <div className="ind-topbar-right">
            <div className="ind-search-box">
              <Search size={15} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search guest, room, reservation ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ind-user-profile">
              <div className="ind-user-avatar" style={{ backgroundColor: '#f59e0b' }}>GM</div>
              <div className="ind-user-meta">
                <span className="ind-user-name">General Manager</span>
                <span className="ind-user-role">Front Office Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="ind-content-body">
          <div className="ind-body-header">
            <div>
              <h1 className="ind-body-title">Hotel &amp; Resort Hospitality Management</h1>
              <p className="ind-body-sub">Real-time room allocation, check-ins, guest folio billing, banquet orders, and housekeeping status.</p>
            </div>
            <button className="ind-action-primary" style={{ backgroundColor: '#f59e0b' }}>
              <Plus size={16} /> New Reservation
            </button>
          </div>

          {/* 4 KPIs */}
          <div className="ind-kpi-grid">
            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Occupancy Rate</span>
                <span className="ind-kpi-val">87.5%</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> 42 / 48 Rooms Booked</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
                <Bed size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Today's Check-Ins</span>
                <span className="ind-kpi-val">14 Arrivals</span>
                <span className="ind-kpi-trend"><CheckCircle2 size={12} /> 9 Checked In</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
                <CalendarCheck size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Room Revenue</span>
                <span className="ind-kpi-val">₹2.84L</span>
                <span className="ind-kpi-trend"><TrendingUp size={12} /> Today's Gross Folio</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                <DollarSign size={22} />
              </div>
            </div>

            <div className="ind-kpi-card">
              <div className="ind-kpi-info">
                <span className="ind-kpi-label">Housekeeping</span>
                <span className="ind-kpi-val">6 Cleaning</span>
                <span className="ind-kpi-trend">42 Ready &amp; Inspected</span>
              </div>
              <div className="ind-kpi-icon-circ" style={{ backgroundColor: '#faf5ff', color: '#9333ea' }}>
                <Sparkles size={22} />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="ind-card-container">
            <div className="ind-table-controls">
              <div className="ind-tabs-row">
                <button onClick={() => setFilterStatus('all')} className={`ind-tab-pill ${filterStatus === 'all' ? 'active' : ''}`}>All Bookings</button>
                <button onClick={() => setFilterStatus('checkedin')} className={`ind-tab-pill ${filterStatus === 'checkedin' ? 'active' : ''}`}>Checked In</button>
                <button onClick={() => setFilterStatus('confirmed')} className={`ind-tab-pill ${filterStatus === 'confirmed' ? 'active' : ''}`}>Confirmed</button>
                <button onClick={() => setFilterStatus('arrivingtoday')} className={`ind-tab-pill ${filterStatus === 'arrivingtoday' ? 'active' : ''}`}>Arriving Today</button>
              </div>
            </div>

            <div className="ind-table-wrap">
              <table className="ind-data-table">
                <thead>
                  <tr>
                    <th>Res ID</th>
                    <th>Guest Name</th>
                    <th>Room Type &amp; No</th>
                    <th>Stay</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Folio Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((r) => (
                    <tr key={r.id}>
                      <td><span className="ind-code-tag">{r.id}</span></td>
                      <td><strong>{r.guest}</strong></td>
                      <td>{r.room}</td>
                      <td>{r.nights}</td>
                      <td>{r.checkIn}</td>
                      <td>{r.checkOut}</td>
                      <td><strong>{r.bill}</strong></td>
                      <td>
                        <span className={`ind-status-badge ${r.status === 'Checked In' ? 'badge-green' : r.status === 'Confirmed' ? 'badge-blue' : r.status === 'Arriving Today' ? 'badge-amber' : 'badge-purple'}`}>
                          {r.status}
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


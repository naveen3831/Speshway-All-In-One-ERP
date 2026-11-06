import React, { useState } from 'react';
import {
  useNavigate,
  Link } from 'react-router-dom';
import {
  LayoutGrid,
  Car,
  FileText,
  Bed,
  Users,
  Calendar,
  Utensils,
  Receipt,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  ArrowRight,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Building2,
  Clock,
  Sparkles,
  ArrowLeft,
  DollarSign,
  Key,
  ShieldCheck,
  Coffee,
  Check,
  AlertCircle,
  Menu,
  X,
} from 'lucide-react';
import './SanaStayzDashboard.css';

// Custom Sana Stayz Hotel Icon & Monogram
const SanaHotelLogoIcon = () => (
  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sanaEmerald" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="sanaGold" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#071b15" />
    {/* Stylized Grand Hotel Portico & Monogram S */}
    <path d="M50 18L78 34V82H22V34L50 18Z" stroke="url(#sanaEmerald)" strokeWidth="3.5" fill="none" />
    <path d="M50 26L70 38V76H30V38L50 26Z" fill="#0b2e23" />
    {/* Columns */}
    <line x1="38" y1="46" x2="38" y2="76" stroke="url(#sanaGold)" strokeWidth="2.5" />
    <line x1="50" y1="46" x2="50" y2="76" stroke="url(#sanaGold)" strokeWidth="2.5" />
    <line x1="62" y1="46" x2="62" y2="76" stroke="url(#sanaGold)" strokeWidth="2.5" />
    {/* Arch */}
    <path d="M44 76V62C44 58.6863 46.6863 56 50 56C53.3137 56 56 58.6863 56 62V76" stroke="url(#sanaEmerald)" strokeWidth="2.5" />
  </svg>
);

export const SanaStayzDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'rooms', label: 'Room Grid', icon: Bed, badge: '88%' },
    { id: 'checkins', label: 'Check-Ins / Outs', icon: Key, badge: '42' },
    { id: 'reservations', label: 'Reservations', icon: Calendar, badge: '118' },
    { id: 'guest-profiles', label: 'VIP Guest Directory', icon: Users },
    { id: 'housekeeping', label: 'Housekeeping', icon: Sparkles },
    { id: 'dining', label: 'Dining & POS', icon: Utensils },
    { id: 'concierge', label: 'Concierge & Cabs', icon: Car },
    { id: 'amenities', label: 'Spa & Wellness Club', icon: Coffee },
    { id: 'banquets', label: 'Banquets & Lawns', icon: Building2 },
    { id: 'folio', label: 'Folio Invoices', icon: Receipt },
    { id: 'analytics', label: 'Hotel Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Property Settings', icon: Settings },
  ];

  const recentBookings = [
    { id: '#SAN-4091', guest: 'Dr. Vikram Malhotra', room: 'Suite 402 (Presidential)', checkIn: 'Today, 2:00 PM', nights: '3 Nights', amount: '₹48,000', status: 'checked-in' },
    { id: '#SAN-4090', guest: 'Sarah Jenkins', room: 'Room 205 (Ocean Deluxe)', checkIn: 'Today, 1:30 PM', nights: '2 Nights', amount: '₹18,500', status: 'checked-in' },
    { id: '#SAN-4089', guest: 'Rajesh & Pooja Kulkarni', room: 'Room 312 (Executive King)', checkIn: 'Today, 4:00 PM', nights: '4 Nights', amount: '₹32,000', status: 'confirmed' },
    { id: '#SAN-4088', guest: 'Kenji Takahashi', room: 'Suite 501 (Royal Penthouse)', checkIn: 'Today, 6:00 PM', nights: '5 Nights', amount: '₹95,000', status: 'confirmed' },
    { id: '#SAN-4087', guest: 'Ananya Deshpande', room: 'Room 108 (Standard Queen)', checkIn: 'Yesterday', nights: '1 Night', amount: '₹7,500', status: 'checked-out' },
  ];

  const roomGrid = [
    { number: '101', type: 'Standard Queen', floor: '1st Floor', rate: '₹6,500', status: 'Occupied', clean: 'Clean', guest: 'Manish Verma' },
    { number: '102', type: 'Standard Queen', floor: '1st Floor', rate: '₹6,500', status: 'Available', clean: 'Clean', guest: '-' },
    { number: '201', type: 'Ocean Deluxe', floor: '2nd Floor', rate: '₹9,200', status: 'Occupied', clean: 'Clean', guest: 'Sarah Jenkins' },
    { number: '204', type: 'Ocean Deluxe', floor: '2nd Floor', rate: '₹9,200', status: 'In Cleaning', clean: 'Cleaning', guest: 'Departed' },
    { number: '301', type: 'Executive King', floor: '3rd Floor', rate: '₹12,500', status: 'Occupied', clean: 'Clean', guest: 'Rajesh Kulkarni' },
    { number: '402', type: 'Presidential Suite', floor: '4th Floor', rate: '₹24,000', status: 'Occupied', clean: 'Inspecting', guest: 'Dr. Vikram Malhotra' },
    { number: '501', type: 'Royal Penthouse', floor: '5th Floor', rate: '₹38,000', status: 'Reserved', clean: 'Clean', guest: 'Kenji Takahashi (6 PM)' },
  ];

  const diningOrders = [
    { orderId: '#POS-891', room: 'Suite 402', items: 'Continental Breakfast x 2, Espresso', time: '8:45 AM', amount: '₹1,850', status: 'Delivered' },
    { orderId: '#POS-892', room: 'Room 201', items: 'Club Sandwich, Fresh Watermelon Juice', time: '11:15 AM', amount: '₹920', status: 'Delivered' },
    { orderId: '#POS-893', room: 'Room 301', items: 'Paneer Butter Masala, Garlic Naan x 3', time: '1:10 PM', amount: '₹1,450', status: 'In Kitchen' },
    { orderId: '#POS-894', room: 'Table 4 (Bistro)', items: 'Grilled Tiger Prawns, Chardonnay Glass', time: '1:45 PM', amount: '₹3,200', status: 'Served' },
  ];

  const occupancyTypes = [
    { type: 'Presidential Suites', occ: '100%', count: '6/6 Rooms', rev: '₹1,44,000', color: '#059669' },
    { type: 'Executive King', occ: '92%', count: '22/24 Rooms', rev: '₹1,32,000', color: '#10b981' },
    { type: 'Ocean Deluxe', occ: '85%', count: '34/40 Rooms', rev: '₹78,000', color: '#34d399' },
    { type: 'Standard Queen', occ: '75%', count: '15/20 Rooms', rev: '₹30,000', color: '#6ee7b7' },
  ];


  const vipGuestsList = [
    { id: 'GST-901', name: 'Dr. Vikram Malhotra', phone: '+91 98401 22890', tier: 'Diamond Member', totalStays: '18 Visits', preference: 'High Floor, Ocean View, Decaf Coffee', folioBal: '₹0 (Settled)' },
    { id: 'GST-902', name: 'Sarah Jenkins', phone: '+44 7911 123456', tier: 'Gold Elite', totalStays: '4 Visits', preference: 'Feather Pillow, Late Checkout 2 PM', folioBal: '₹18,500' },
    { id: 'GST-903', name: 'Kenji Takahashi', phone: '+81 90 1234 5678', tier: 'Platinum VIP', totalStays: '9 Visits', preference: 'Green Tea, Quiet Suite, Airport Transfer', folioBal: '₹95,000' },
    { id: 'GST-904', name: 'Rajesh & Pooja Kulkarni', phone: '+91 98200 44102', tier: 'Silver Club', totalStays: '6 Visits', preference: 'Adjoining Suite, Pool Access', folioBal: '₹32,000' },
  ];

  const conciergeBookings = [
    { id: 'TRF-101', guest: 'Dr. Vikram Malhotra', service: 'Mercedes S-Class Airport Drop', time: 'Tomorrow 09:30 AM', flight: 'AI-542 to DEL', chauffeur: 'Naveen Kumar', status: 'Scheduled' },
    { id: 'TRF-102', guest: 'Sarah Jenkins', service: 'Heritage Fort & City Sightseeing Tour', time: 'Today 02:00 PM', flight: '-', chauffeur: 'Gopal Reddy', status: 'In Transit' },
    { id: 'TRF-103', guest: 'Kenji Takahashi', service: 'Luxury Van Airport Pickup', time: 'Today 05:45 PM', flight: 'JL-753 from HND', chauffeur: 'Syed Arshad', status: 'Confirmed' },
    { id: 'TRF-104', guest: 'Pooja Kulkarni', service: 'Private Yacht Sunset Cruise', time: 'Today 05:00 PM', flight: '-', chauffeur: 'Captain D’Souza', status: 'Confirmed' },
  ];

  const spaBookings = [
    { id: 'SPA-301', guest: 'Kenji Takahashi', treatment: 'Royal Ayurvedic Abhyanga Massage (90m)', therapist: 'Dr. Archana Pillai', time: 'Today 04:00 PM', room: 'Lotus Treatment Suite 2', fee: '₹6,500', status: 'Booked' },
    { id: 'SPA-302', guest: 'Sarah Jenkins', treatment: 'Aromatherapy & Himalayan Salt Scrub (60m)', therapist: 'Maria Fernandes', time: 'Today 06:00 PM', room: 'Orchid Wellness Room', fee: '₹4,800', status: 'Confirmed' },
    { id: 'SPA-303', guest: 'Rajesh Kulkarni', treatment: 'Deep Tissue Sports Therapy (60m)', therapist: 'Sukhvinder Singh', time: 'Tomorrow 10:00 AM', room: 'Zen Pavilion', fee: '₹5,200', status: 'Confirmed' },
    { id: 'SPA-304', guest: 'Meenakshi Sundaram', treatment: 'Signature Sana Glow Facial (45m)', therapist: 'Maria Fernandes', time: 'Tomorrow 11:30 AM', room: 'Lotus Suite 1', fee: '₹3,900', status: 'Confirmed' },
  ];

  const banquetEvents = [
    { id: 'BNQ-801', hall: 'Grand Sapphire Ballroom', eventName: 'Agarwal - Singhania Sangeet & Reception', guests: '450 Guests', date: '08 Nov 2026', package: 'Platinum Royal Buffet & Mocktails', billing: '₹14,50,000', status: 'Advance Paid' },
    { id: 'BNQ-802', hall: 'Palm Lawn & Pool Deck', eventName: 'TechVision Global Annual Leadership Gala', guests: '220 Guests', date: '12 Nov 2026', package: 'Live Counters, Barbecue & DJ Stage', billing: '₹8,80,000', status: 'Confirmed' },
    { id: 'BNQ-803', hall: 'Executive Boardroom A', eventName: 'FinCorp India Board of Directors Meeting', guests: '35 Delegates', date: '06 Nov 2026', package: 'Executive High-Tea & Working Lunch', billing: '₹1,95,000', status: 'Confirmed' },
  ];

  return (
    <div className="sana-dashboard-container">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="sana-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 1. STICKY SIDEBAR */}
      <aside className={`sana-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sana-sidebar-top">
          <div className="sana-brand">
            <div className="sana-brand-logo-wrap">
              <SanaHotelLogoIcon />
            </div>
            <div>
              <div className="sana-brand-title">Sana Stayz</div>
              <div className="sana-brand-sub">LUXURY RESORT PMS</div>
            </div>
            <button
              type="button"
              className="sana-sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="sana-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`sana-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span className="sana-nav-label">{item.label}</span>
                    {item.badge && <span className="sana-nav-badge">{item.badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sana-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="sana-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="sana-user-profile">
            <div className="sana-avatar">GM</div>
            <div className="sana-user-info">
              <span className="sana-user-name">General Manager</span>
              <span className="sana-user-role">Sana Stayz &amp; Suites</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="sana-main">
        {/* Top Header */}
        <header className="sana-header">
          <div className="sana-header-left">
            <div className="sana-header-title-wrap">
              <button
                type="button"
                className="sana-menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="sana-page-title">
                  {navItems.find((n) => n.id === activeTab)?.label || 'Hotel Operations'}
                </h1>
                <p className="sana-page-sub">
                  Sana Stayz 5-Star PMS &bull; Multi-Property Reservations &amp; Guest Folio Engine
                </p>
              </div>
            </div>
          </div>

          <div className="sana-header-right">
            <div className="sana-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search guests, rooms, reservations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="sana-live-occupancy-pill">
              <span className="sana-occ-pulse"></span>
              <span>88% Occupancy &bull; 14 Rooms Available</span>
            </div>

            <button className="sana-icon-btn" title="Front Desk Alerts">
              <Bell size={18} />
              <span className="sana-bell-dot"></span>
            </button>

            
          </div>
        </header>

        {/* Content Body */}
        <div className="sana-content-body">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stat Cards Row */}
              <div className="sana-stats-grid">
                <div className="sana-stat-card">
                  <div className="sana-stat-icon-wrap">
                    <Bed size={22} />
                  </div>
                  <div className="sana-stat-info">
                    <span className="sana-stat-label">Live Occupancy</span>
                    <span className="sana-stat-val">88%</span>
                    <span className="sana-stat-trend">76 of 90 Rooms Filled</span>
                  </div>
                </div>

                <div className="sana-stat-card">
                  <div className="sana-stat-icon-wrap">
                    <Key size={22} />
                  </div>
                  <div className="sana-stat-info">
                    <span className="sana-stat-label">Today's Check-ins</span>
                    <span className="sana-stat-val">42</span>
                    <span className="sana-stat-trend">↑ 18 arrivals pending</span>
                  </div>
                </div>

                <div className="sana-stat-card">
                  <div className="sana-stat-icon-wrap">
                    <DollarSign size={22} />
                  </div>
                  <div className="sana-stat-info">
                    <span className="sana-stat-label">Today's Revenue</span>
                    <span className="sana-stat-val">₹3,84,000</span>
                    <span className="sana-stat-trend">ADR ₹8,250 &bull; RevPAR ₹7,260</span>
                  </div>
                </div>

                <div className="sana-stat-card">
                  <div className="sana-stat-icon-wrap">
                    <Utensils size={22} />
                  </div>
                  <div className="sana-stat-info">
                    <span className="sana-stat-label">Dining &amp; F&amp;B POS</span>
                    <span className="sana-stat-val">₹64,200</span>
                    <span className="sana-stat-trend">52 room service orders</span>
                  </div>
                </div>
              </div>

              {/* Charts & Grid Preview */}
              <div className="sana-charts-grid">
                {/* Recent Bookings Table */}
                <div className="sana-card">
                  <div className="sana-card-header">
                    <h3 className="sana-card-title">
                      <Calendar size={18} className="text-emerald-600" />
                      Front Desk Arrivals &amp; Stays
                    </h3>
                    <span
                      onClick={() => setActiveTab('reservations')}
                      style={{ fontSize: '13px', color: '#059669', fontWeight: '600', cursor: 'pointer' }}
                    >
                      View All Ledger &rarr;
                    </span>
                  </div>
                  <div className="sana-table-wrap">
                    <table className="sana-data-table">
                      <thead>
                        <tr>
                          <th>Folio #</th>
                          <th>Guest Name</th>
                          <th>Assigned Suite</th>
                          <th>Check-in Window</th>
                          <th>Stay Duration</th>
                          <th>Total Bill</th>
                          <th>PMS Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((b) => (
                          <tr key={b.id}>
                            <td style={{ fontWeight: 700 }}>{b.id}</td>
                            <td>{b.guest}</td>
                            <td>{b.room}</td>
                            <td>{b.checkIn}</td>
                            <td>{b.nights}</td>
                            <td style={{ fontWeight: 700 }}>{b.amount}</td>
                            <td>
                              <span className={`sana-status-badge ${b.status}`}>
                                {b.status === 'checked-in' ? 'In Room' : b.status === 'confirmed' ? 'Confirmed' : 'Checked Out'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Occupancy Tier Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="sana-card">
                    <div className="sana-card-header">
                      <h3 className="sana-card-title">
                        <Building2 size={18} />
                        Occupancy by Category
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {occupancyTypes.map((t) => (
                        <div key={t.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: t.color }} />
                            <span style={{ fontWeight: 600 }}>{t.type}</span>
                          </div>
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>{t.count} ({t.occ})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sana-card">
                    <div className="sana-card-header">
                      <h3 className="sana-card-title">
                        <Key size={18} />
                        Front Desk Shortcuts
                      </h3>
                    </div>
                    <div className="sana-actions-list">
                      <div className="sana-action-item" onClick={() => setActiveTab('checkins')}>
                        <span>+ Express Guest Check-in</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="sana-action-item" onClick={() => setActiveTab('rooms')}>
                        <span>Inspect Room Cleaning Grid</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="sana-action-item" onClick={() => setActiveTab('dining')}>
                        <span>Post Room Dining (KOT)</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ROOM GRID */}
          {activeTab === 'rooms' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <div>
                  <h3 className="sana-card-title">
                    <Bed size={18} className="text-emerald-600" />
                    Interactive Room Grid &amp; Housekeeping Status
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Live occupancy grid, turn-down maintenance, and cleaning inspection status.
                  </p>
                </div>
              </div>

              <div className="sana-table-wrap" style={{ marginTop: '16px' }}>
                <table className="sana-data-table">
                  <thead>
                    <tr>
                      <th>Room #</th>
                      <th>Category</th>
                      <th>Floor</th>
                      <th>Tariff / Night</th>
                      <th>Occupancy Status</th>
                      <th>Housekeeping Status</th>
                      <th>Current Guest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomGrid.map((r) => (
                      <tr key={r.number}>
                        <td style={{ fontWeight: 800, fontSize: '15px', color: '#047857' }}>{r.number}</td>
                        <td style={{ fontWeight: 600 }}>{r.type}</td>
                        <td>{r.floor}</td>
                        <td style={{ fontWeight: 700 }}>{r.rate}</td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', fontWeight: 700, fontSize: '12px', background: r.status === 'Occupied' ? '#ecfdf5' : r.status === 'Available' ? '#f0fdf4' : '#fffbeb', color: r.status === 'Occupied' ? '#047857' : '#15803d' }}>
                            {r.status}
                          </span>
                        </td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', fontWeight: 600, fontSize: '12px', background: r.clean === 'Clean' ? '#dcfce7' : '#fee2e2', color: r.clean === 'Clean' ? '#166534' : '#991b1b' }}>
                            {r.clean}
                          </span>
                        </td>
                        <td style={{ fontWeight: 500 }}>{r.guest}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKINS / CHECKOUTS */}
          {activeTab === 'checkins' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <div>
                  <h3 className="sana-card-title">
                    <Key size={18} className="text-emerald-600" />
                    Express Check-in &amp; Check-out Desk
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Digital keycard dispensing, government ID proof records, and advance deposit slips.
                  </p>
                </div>
              </div>

              <div className="sana-table-wrap" style={{ marginTop: '16px' }}>
                <table className="sana-data-table">
                  <thead>
                    <tr>
                      <th>Reservation ID</th>
                      <th>Guest Name</th>
                      <th>Assigned Suite</th>
                      <th>Check-in Window</th>
                      <th>Deposit Paid</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 700 }}>{b.id}</td>
                        <td style={{ fontWeight: 600 }}>{b.guest}</td>
                        <td>{b.room}</td>
                        <td>{b.checkIn}</td>
                        <td style={{ fontWeight: 700, color: '#047857' }}>₹10,000 Advance</td>
                        <td>
                          <span className={`sana-status-badge ${b.status}`}>{b.status}</span>
                        </td>
                        <td>
                          <button style={{ padding: '4px 10px', borderRadius: '6px', border: 'none', background: '#047857', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
                            {b.status === 'checked-in' ? 'Check-Out & Print Folio' : 'Issue RFID Key'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <h3 className="sana-card-title">
                  <Calendar size={18} className="text-emerald-600" />
                  Master Reservations Ledger (118 Active Bookings)
                </h3>
              </div>
              <div className="sana-table-wrap" style={{ marginTop: '16px' }}>
                <table className="sana-data-table">
                  <thead>
                    <tr>
                      <th>Booking #</th>
                      <th>Guest</th>
                      <th>Room Category</th>
                      <th>Duration</th>
                      <th>Total Tariff</th>
                      <th>Booking Channel</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 700 }}>{b.id}</td>
                        <td style={{ fontWeight: 600 }}>{b.guest}</td>
                        <td>{b.room}</td>
                        <td>{b.nights}</td>
                        <td style={{ fontWeight: 700 }}>{b.amount}</td>
                        <td>Direct Website (sana.speshway.site)</td>
                        <td><span style={{ color: '#059669', fontWeight: 700 }}>Paid Online</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: HOUSEKEEPING */}
          {activeTab === 'housekeeping' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <h3 className="sana-card-title">
                  <Sparkles size={18} className="text-emerald-600" />
                  Housekeeping &amp; Room Sanitation Logs
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ padding: '16px', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#065f46' }}>Clean &amp; Ready</h4>
                  <div style={{ fontSize: '26px', fontWeight: 800 }}>68 Rooms</div>
                  <span style={{ fontSize: '12px', color: '#047857' }}>Inspected by Head Housekeeper</span>
                </div>
                <div style={{ padding: '16px', borderRadius: '10px', background: '#fffbeb', border: '1px solid #fde68a' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#92400e' }}>Turn-Down In Progress</h4>
                  <div style={{ fontSize: '26px', fontWeight: 800 }}>8 Rooms</div>
                  <span style={{ fontSize: '12px', color: '#b45309' }}>Average turn time 24 mins</span>
                </div>
                <div style={{ padding: '16px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #cbd5e1' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#475569' }}>Maintenance / Deep Clean</h4>
                  <div style={{ fontSize: '26px', fontWeight: 800 }}>4 Rooms</div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>HVAC filter check</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DINING & POS */}
          {activeTab === 'dining' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <h3 className="sana-card-title">
                  <Utensils size={18} className="text-emerald-600" />
                  In-Room Dining &amp; Restaurant POS Settlements
                </h3>
              </div>
              <div className="sana-table-wrap" style={{ marginTop: '16px' }}>
                <table className="sana-data-table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Room / Table</th>
                      <th>Items Ordered</th>
                      <th>Time Placed</th>
                      <th>Amount</th>
                      <th>KOT Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diningOrders.map((d) => (
                      <tr key={d.orderId}>
                        <td style={{ fontWeight: 700 }}>{d.orderId}</td>
                        <td style={{ fontWeight: 600, color: '#047857' }}>{d.room}</td>
                        <td>{d.items}</td>
                        <td>{d.time}</td>
                        <td style={{ fontWeight: 700 }}>{d.amount}</td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857', fontWeight: 700, fontSize: '12px' }}>
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: FOLIO INVOICES */}
          {activeTab === 'folio' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <h3 className="sana-card-title">
                  <Receipt size={18} className="text-emerald-600" />
                  Guest Folio Billing &amp; GST Invoicing
                </h3>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', marginTop: '16px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                  All room folios, dining charges, mini-bar expenses, and luxury resort taxes are auto-settled to guest profile upon departure with instant WhatsApp &amp; Email GST PDF invoice generation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 8: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <h3 className="sana-card-title">
                  <TrendingUp size={18} className="text-emerald-600" />
                  Hotel Revenue Performance (RevPAR &amp; ADR)
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Average Daily Rate (ADR)</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#047857' }}>₹8,250</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Revenue Per Available Room</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>₹7,260</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Repeat Guest Ratio</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#d97706' }}>41.8%</div>
                </div>
              </div>
            </div>
          )}

          
          {/* TAB: VIP GUESTS */}
          {activeTab === 'guest-profiles' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <div>
                  <h3 className="sana-card-title">
                    <Users size={18} className="text-emerald-600" />
                    VIP Guest Directory & Stay History
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Centralized guest profiles with loyalty tiers, stay frequencies, and tailored preferences.
                  </p>
                </div>
                <button className="sana-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Add Guest Profile
                </button>
              </div>
              <div className="sana-table-wrap" style={{ marginTop: '16px' }}>
                <table className="sana-data-table">
                  <thead>
                    <tr>
                      <th>Guest ID</th>
                      <th>Full Name</th>
                      <th>Contact Phone</th>
                      <th>Loyalty Tier</th>
                      <th>Stay History</th>
                      <th>Room & Amenity Preferences</th>
                      <th>Folio Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vipGuestsList.map(g => (
                      <tr key={g.id}>
                        <td><strong>{g.id}</strong></td>
                        <td><span style={{ fontWeight: 600 }}>{g.name}</span></td>
                        <td>{g.phone}</td>
                        <td><span className="sana-badge-cluster">{g.tier}</span></td>
                        <td>{g.totalStays}</td>
                        <td style={{ fontSize: '12.5px', color: '#475569' }}>{g.preference}</td>
                        <td><strong style={{ color: g.folioBal.includes('Settled') ? '#059669' : '#0f172a' }}>{g.folioBal}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: CONCIERGE */}
          {activeTab === 'concierge' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <div>
                  <h3 className="sana-card-title">
                    <Car size={18} className="text-emerald-600" />
                    Concierge Transfers & Sightseeing Itineraries
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Chauffeur services, premium luxury car dispatches, and customized resort tours.
                  </p>
                </div>
                <button className="sana-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Schedule Transfer
                </button>
              </div>
              <div className="sana-table-wrap" style={{ marginTop: '16px' }}>
                <table className="sana-data-table">
                  <thead>
                    <tr>
                      <th>Booking Ref</th>
                      <th>Guest Name</th>
                      <th>Transfer / Tour Detail</th>
                      <th>Scheduled Time</th>
                      <th>Flight / Destination</th>
                      <th>Assigned Chauffeur</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conciergeBookings.map(c => (
                      <tr key={c.id}>
                        <td><strong>{c.id}</strong></td>
                        <td>{c.guest}</td>
                        <td><span style={{ fontWeight: 600 }}>{c.service}</span></td>
                        <td>{c.time}</td>
                        <td>{c.flight}</td>
                        <td>{c.chauffeur}</td>
                        <td><span className="sana-badge-cluster" style={{ background: '#ecfdf5', color: '#059669' }}>{c.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SPA & AMENITIES */}
          {activeTab === 'amenities' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <div>
                  <h3 className="sana-card-title">
                    <Coffee size={18} className="text-emerald-600" />
                    Ayurvedic Spa & Wellness Club Bookings
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Holistic therapy appointments, personal massage schedules, and infinity pool reservations.
                  </p>
                </div>
                <button className="sana-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Book Spa Session
                </button>
              </div>
              <div className="sana-table-wrap" style={{ marginTop: '16px' }}>
                <table className="sana-data-table">
                  <thead>
                    <tr>
                      <th>Appointment</th>
                      <th>Guest Name</th>
                      <th>Holistic Treatment</th>
                      <th>Therapist / Doctor</th>
                      <th>Session Slot</th>
                      <th>Treatment Suite</th>
                      <th>Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spaBookings.map(s => (
                      <tr key={s.id}>
                        <td><strong>{s.id}</strong></td>
                        <td>{s.guest}</td>
                        <td><span style={{ fontWeight: 600 }}>{s.treatment}</span></td>
                        <td>{s.therapist}</td>
                        <td>{s.time}</td>
                        <td>{s.room}</td>
                        <td><strong style={{ color: '#059669' }}>{s.fee}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: BANQUETS */}
          {activeTab === 'banquets' && (
            <div className="sana-card">
              <div className="sana-card-header">
                <div>
                  <h3 className="sana-card-title">
                    <Building2 size={18} className="text-emerald-600" />
                    Banquet Halls & Conference Lawns Management
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Corporate conferences, destination wedding banquets, and customized catering packages.
                  </p>
                </div>
                <button className="sana-btn-site" style={{ padding: '8px 16px' }}>
                  <Plus size={15} /> Reserve Hall
                </button>
              </div>
              <div className="sana-table-wrap" style={{ marginTop: '16px' }}>
                <table className="sana-data-table">
                  <thead>
                    <tr>
                      <th>Event ID</th>
                      <th>Venue / Hall</th>
                      <th>Function & Organizers</th>
                      <th>Capacity</th>
                      <th>Reserved Date</th>
                      <th>Catering Tier</th>
                      <th>Total Billing</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banquetEvents.map(b => (
                      <tr key={b.id}>
                        <td><strong>{b.id}</strong></td>
                        <td><span style={{ fontWeight: 600 }}>{b.hall}</span></td>
                        <td>{b.eventName}</td>
                        <td><span className="sana-badge-cluster">{b.guests}</span></td>
                        <td>{b.date}</td>
                        <td>{b.package}</td>
                        <td><strong style={{ color: '#059669' }}>{b.billing}</strong></td>
                        <td><span className="sana-badge-cluster" style={{ background: '#ecfdf5', color: '#059669' }}>{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="sana-card" style={{ maxWidth: '640px' }}>
              <div className="sana-card-header">
                <h3 className="sana-card-title">
                  <Settings size={18} />
                  Sana Stayz Property PMS Settings
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Resort Property Name</label>
                  <input type="text" readOnly value="Sana Stayz Luxury Resort &amp; Spa" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Check-in / Check-out Windows</label>
                  <input type="text" readOnly value="Check-in: 02:00 PM &bull; Check-out: 11:00 AM (Late checkout allowed)" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SanaStayzDashboard;

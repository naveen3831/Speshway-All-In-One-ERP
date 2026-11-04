import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutGrid,
  Bus,
  Users,
  MapPin,
  Calendar,
  DollarSign,
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
  Clock,
  Sparkles,
  ArrowLeft,
  ShieldCheck,
  Fuel,
  Wrench,
  Navigation,
} from 'lucide-react';
import './BusTravelDashboard.css';

// Custom Star Tours & Travels Bus Fleet Logo
const StarBusLogoIcon = () => (
  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="busGreen" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="busCyan" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#04151b" />
    {/* Modern Luxury Bus Silhouette */}
    <rect x="20" y="32" width="60" height="34" rx="8" fill="url(#busGreen)" />
    {/* Windshield & Windows */}
    <rect x="24" y="36" width="16" height="14" rx="3" fill="#ffffff" opacity="0.9" />
    <rect x="44" y="36" width="10" height="14" rx="2" fill="#ffffff" opacity="0.8" />
    <rect x="58" y="36" width="10" height="14" rx="2" fill="#ffffff" opacity="0.8" />
    {/* Headlight */}
    <circle cx="25" cy="58" r="3" fill="#FDE047" />
    {/* Wheels */}
    <circle cx="34" cy="66" r="8" fill="#0f172a" stroke="url(#busCyan)" strokeWidth="3" />
    <circle cx="66" cy="66" r="8" fill="#0f172a" stroke="url(#busCyan)" strokeWidth="3" />
    {/* Road Dash */}
    <line x1="14" y1="74" x2="86" y2="74" stroke="url(#busGreen)" strokeWidth="2.5" strokeDasharray="6 4" />
  </svg>
);

export const BusTravelDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'fleet', label: 'Bus Fleet', icon: Bus, badge: '24' },
    { id: 'bookings', label: 'Seat Bookings', icon: Calendar, badge: '482' },
    { id: 'routes', label: 'Routes & Trips', icon: MapPin },
    { id: 'crew', label: 'Drivers & Crew', icon: Users },
    { id: 'boarding', label: 'Boarding Points', icon: Navigation },
    { id: 'collections', label: 'Daily Collections', icon: DollarSign },
    { id: 'analytics', label: 'Trip Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Fleet Settings', icon: Settings },
  ];

  const recentBookings = [
    { id: '#PNR-8819', passenger: 'Suresh Narayanan', phone: '+91 98490 11982', seat: '12-U (Upper Sleeper)', route: 'Hyderabad → Bengaluru', bus: 'TS09-UB-4421 (Volvo B11R)', fare: '₹1,450', status: 'confirmed' },
    { id: '#PNR-8818', passenger: 'Harika Varma', phone: '+91 98840 33419', seat: '04-L (Lower Berth)', route: 'Hyderabad → Vijayawada', bus: 'AP16-SC-1002 (Scania AC)', fare: '₹850', status: 'confirmed' },
    { id: '#PNR-8817', passenger: 'Arjun Nambiar', phone: '+91 94470 55120', seat: '16-A (Window Semi-Sleeper)', route: 'Bengaluru → Chennai', bus: 'KA01-MB-8890 (BharatBenz)', fare: '₹950', status: 'boarded' },
    { id: '#PNR-8816', passenger: 'Kavita Sengupta', phone: '+91 98300 77218', seat: '08-U (Upper Sleeper)', route: 'Hyderabad → Goa', bus: 'TS07-EX-3312 (Multi-Axle)', fare: '₹2,200', status: 'confirmed' },
    { id: '#PNR-8815', passenger: 'Ravi Teja', phone: '+91 99880 44102', seat: '02-L (Lower Berth)', route: 'Vijayawada → Visakhapatnam', bus: 'AP31-TV-9901 (Volvo B9R)', fare: '₹920', status: 'boarded' },
  ];

  const busFleet = [
    { number: 'TS09-UB-4421', model: 'Volvo 9600 Multi-Axle Sleeper', seats: '36 Berths', route: 'Hyderabad ⇌ Bengaluru', driver: 'M. Venkat Rao', gps: 'On Highway (84 km/h)', status: 'On Route' },
    { number: 'AP16-SC-1002', model: 'Scania Metrolink HD AC', seats: '44 Pushback', route: 'Hyderabad ⇌ Vijayawada', driver: 'K. Satyanarayana', gps: 'At Guntur Toll', status: 'On Route' },
    { number: 'KA01-MB-8890', model: 'BharatBenz 1624 AC Sleeper', seats: '32 Berths', route: 'Bengaluru ⇌ Chennai', driver: 'S. Anthony', gps: 'Departed Majestic', status: 'On Route' },
    { number: 'TS07-EX-3312', model: 'Volvo B11R 2+1 Luxury Sleeper', seats: '30 Berths', route: 'Hyderabad ⇌ Goa Panaji', driver: 'D. Nagesh', gps: 'At Depot (Pre-trip check)', status: 'Boarding 08:30 PM' },
    { number: 'AP31-TV-9901', model: 'Volvo B9R Semi-Sleeper', seats: '40 Pushback', route: 'Vijayawada ⇌ Vizag', driver: 'P. Rambabu', gps: 'Near Rajahmundry', status: 'On Route' },
  ];

  const routesSummary = [
    { name: 'Hyderabad ⇌ Bengaluru', trips: '8 Daily Trips', occ: '96%', rev: '₹1,84,000', color: '#059669' },
    { name: 'Hyderabad ⇌ Vijayawada', trips: '10 Daily Trips', occ: '94%', rev: '₹1,10,000', color: '#10b981' },
    { name: 'Bengaluru ⇌ Chennai', trips: '6 Daily Trips', occ: '90%', rev: '₹72,000', color: '#38bdf8' },
    { name: 'Hyderabad ⇌ Goa', trips: '4 Daily Trips', occ: '98%', rev: '₹52,000', color: '#34d399' },
  ];

  return (
    <div className="bus-dashboard-container">
      {/* 1. STICKY SIDEBAR */}
      <aside className="bus-sidebar">
        <div className="bus-sidebar-top">
          <div className="bus-brand">
            <div className="bus-brand-logo-wrap">
              <StarBusLogoIcon />
            </div>
            <div>
              <div className="bus-brand-title">Star Travels</div>
              <div className="bus-brand-sub">BUS FLEET ERP</div>
            </div>
          </div>

          <ul className="bus-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`bus-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span className="bus-nav-label">{item.label}</span>
                    {item.badge && <span className="bus-nav-badge">{item.badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bus-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="bus-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="bus-user-profile">
            <div className="bus-avatar">ST</div>
            <div className="bus-user-info">
              <span className="bus-user-name">Fleet Dispatch Controller</span>
              <span className="bus-user-role">Star Tours Central Operations</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="bus-main">
        {/* Top Header */}
        <header className="bus-header">
          <div className="bus-header-left">
            <h1 className="bus-page-title">
              {navItems.find((n) => n.id === activeTab)?.label || 'Fleet Telematics'}
            </h1>
            <p className="bus-page-sub">
              Star Tours &amp; Travels Inter-City Bus Fleet Operations &bull; AIS-140 GPS Synchronized
            </p>
          </div>

          <div className="bus-header-right">
            <div className="bus-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search buses, PNRs, routes, drivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bus-gps-telematics-pill">
              <span className="bus-gps-pulse"></span>
              <span>24 Buses Live &bull; 92% Average Occupancy</span>
            </div>

            <button className="bus-icon-btn" title="Highway Alerts">
              <Bell size={18} />
              <span className="bus-bell-dot"></span>
            </button>

            <button
              onClick={() => window.open('https://bus.speshway.site', '_blank')}
              className="bus-btn-site"
            >
              <span>Passenger Booking Web</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="bus-content-body">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stat Cards Row */}
              <div className="bus-stats-grid">
                <div className="bus-stat-card">
                  <div className="bus-stat-icon-wrap">
                    <Bus size={22} />
                  </div>
                  <div className="bus-stat-info">
                    <span className="bus-stat-label">Active Buses on Highway</span>
                    <span className="bus-stat-val">24</span>
                    <span className="bus-stat-trend">AIS-140 GPS Connected</span>
                  </div>
                </div>

                <div className="bus-stat-card">
                  <div className="bus-stat-icon-wrap">
                    <Users size={22} />
                  </div>
                  <div className="bus-stat-info">
                    <span className="bus-stat-label">Today's Passengers</span>
                    <span className="bus-stat-val">482</span>
                    <span className="bus-stat-trend">↑ +18% weekend travel rush</span>
                  </div>
                </div>

                <div className="bus-stat-card">
                  <div className="bus-stat-icon-wrap">
                    <CheckCircle size={22} />
                  </div>
                  <div className="bus-stat-info">
                    <span className="bus-stat-label">Average Occupancy</span>
                    <span className="bus-stat-val">92%</span>
                    <span className="bus-stat-trend">Full sleeper coaches booked</span>
                  </div>
                </div>

                <div className="bus-stat-card">
                  <div className="bus-stat-icon-wrap">
                    <DollarSign size={22} />
                  </div>
                  <div className="bus-stat-info">
                    <span className="bus-stat-label">Today's Net Collections</span>
                    <span className="bus-stat-val">₹4,18,000</span>
                    <span className="bus-stat-trend">Online + Counter Bookings</span>
                  </div>
                </div>
              </div>

              {/* Charts & Grid */}
              <div className="bus-charts-grid">
                {/* Recent Bookings Table */}
                <div className="bus-card">
                  <div className="bus-card-header">
                    <h3 className="bus-card-title">
                      <Calendar size={18} className="text-emerald-600" />
                      Live Passenger Bookings &amp; PNR Allocation
                    </h3>
                    <span
                      onClick={() => setActiveTab('bookings')}
                      style={{ fontSize: '13px', color: '#059669', fontWeight: '600', cursor: 'pointer' }}
                    >
                      View All PNRs &rarr;
                    </span>
                  </div>
                  <div className="bus-table-wrap">
                    <table className="bus-data-table">
                      <thead>
                        <tr>
                          <th>PNR #</th>
                          <th>Passenger</th>
                          <th>Seat</th>
                          <th>Intercity Route</th>
                          <th>Assigned Coach</th>
                          <th>Fare</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((b) => (
                          <tr key={b.id}>
                            <td style={{ fontWeight: 700 }}>{b.id}</td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{b.passenger}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{b.phone}</div>
                            </td>
                            <td><span style={{ fontWeight: 700, color: '#047857' }}>{b.seat}</span></td>
                            <td>{b.route}</td>
                            <td style={{ fontSize: '12px' }}>{b.bus}</td>
                            <td style={{ fontWeight: 700 }}>{b.fare}</td>
                            <td>
                              <span className={`bus-status-badge ${b.status}`}>
                                {b.status === 'confirmed' ? 'Confirmed' : 'Boarded'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Routes & Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="bus-card">
                    <div className="bus-card-header">
                      <h3 className="bus-card-title">
                        <MapPin size={18} />
                        Route Revenue Performance
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {routesSummary.map((r) => (
                        <div key={r.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: r.color }} />
                            <div>
                              <div style={{ fontWeight: 600 }}>{r.name}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{r.trips}</div>
                            </div>
                          </div>
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>{r.rev} ({r.occ})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bus-card">
                    <div className="bus-card-header">
                      <h3 className="bus-card-title">
                        <Navigation size={18} />
                        Fleet Operations
                      </h3>
                    </div>
                    <div className="bus-actions-list">
                      <div className="bus-action-item" onClick={() => setActiveTab('fleet')}>
                        <span>Inspect Bus Telematics &amp; GPS</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="bus-action-item" onClick={() => setActiveTab('crew')}>
                        <span>Driver Roster &amp; Breathalyzer Log</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="bus-action-item" onClick={() => setActiveTab('boarding')}>
                        <span>Manage City Boarding Points</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: BUS FLEET */}
          {activeTab === 'fleet' && (
            <div className="bus-card">
              <div className="bus-card-header">
                <h3 className="bus-card-title">
                  <Bus size={18} className="text-emerald-600" />
                  Active Bus Fleet Directory &amp; Live Highway Telematics
                </h3>
              </div>
              <div className="bus-table-wrap" style={{ marginTop: '16px' }}>
                <table className="bus-data-table">
                  <thead>
                    <tr>
                      <th>Bus Plate #</th>
                      <th>Coach Model</th>
                      <th>Seating Capacity</th>
                      <th>Assigned Route</th>
                      <th>Primary Driver</th>
                      <th>GPS Telematics</th>
                      <th>Fleet Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {busFleet.map((bf) => (
                      <tr key={bf.number}>
                        <td style={{ fontWeight: 700, color: '#047857' }}>{bf.number}</td>
                        <td style={{ fontWeight: 600 }}>{bf.model}</td>
                        <td>{bf.seats}</td>
                        <td>{bf.route}</td>
                        <td>{bf.driver}</td>
                        <td><span style={{ color: '#0284c7', fontWeight: 600 }}>{bf.gps}</span></td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857', fontWeight: 700, fontSize: '12px' }}>
                            {bf.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SEAT BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="bus-card">
              <div className="bus-card-header">
                <h3 className="bus-card-title">
                  <Calendar size={18} className="text-emerald-600" />
                  Passenger Manifest &amp; Seat Bookings (482 Travelers)
                </h3>
              </div>
              <div className="bus-table-wrap" style={{ marginTop: '16px' }}>
                <table className="bus-data-table">
                  <thead>
                    <tr>
                      <th>PNR Number</th>
                      <th>Passenger Name</th>
                      <th>Contact</th>
                      <th>Seat Number</th>
                      <th>Route</th>
                      <th>Fare Paid</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id}>
                        <td style={{ fontWeight: 700 }}>{b.id}</td>
                        <td style={{ fontWeight: 600 }}>{b.passenger}</td>
                        <td>{b.phone}</td>
                        <td><span style={{ color: '#047857', fontWeight: 700 }}>{b.seat}</span></td>
                        <td>{b.route}</td>
                        <td style={{ fontWeight: 700 }}>{b.fare}</td>
                        <td><span className={`bus-status-badge ${b.status}`}>{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ROUTES & TRIPS */}
          {activeTab === 'routes' && (
            <div className="bus-card">
              <div className="bus-card-header">
                <h3 className="bus-card-title">
                  <MapPin size={18} className="text-emerald-600" />
                  Intercity Scheduled Routes &amp; Distance Waybills
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
                {routesSummary.map((r) => (
                  <div key={r.name} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8fafc' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '15px' }}>{r.name}</h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#64748b' }}>Frequency: {r.trips}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                      <span style={{ color: '#047857' }}>Occupancy: {r.occ}</span>
                      <span>Daily Rev: {r.rev}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: DRIVERS & CREW */}
          {activeTab === 'crew' && (
            <div className="bus-card">
              <div className="bus-card-header">
                <h3 className="bus-card-title">
                  <Users size={18} className="text-emerald-600" />
                  Driver Roster &amp; Breathalyzer Compliance Logs
                </h3>
              </div>
              <div style={{ padding: '16px', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #a7f3d0', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#065f46', marginBottom: '6px' }}>
                  <ShieldCheck size={22} />
                  <h4 style={{ margin: 0, fontWeight: 700 }}>100% Breathalyzer Cleared (0.00% Blood Alcohol)</h4>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#047857' }}>
                  All 48 drivers (primary &amp; secondary relief pilots) undergo mandatory biometric punch and digital breathalyzer testing prior to bus ignition.
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: BOARDING POINTS */}
          {activeTab === 'boarding' && (
            <div className="bus-card">
              <div className="bus-card-header">
                <h3 className="bus-card-title">
                  <Navigation size={18} className="text-emerald-600" />
                  City Boarding Points &amp; Rest Stop Depots
                </h3>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', marginTop: '16px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                  Pickups available across Hyderabad (Ameerpet, Miyapur, Gachibowli, LB Nagar), Bangalore (Majestic, Electronic City, Madiwala), and Chennai (Koyambedu, Tambaram).
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: COLLECTIONS */}
          {activeTab === 'collections' && (
            <div className="bus-card">
              <div className="bus-card-header">
                <h3 className="bus-card-title">
                  <DollarSign size={18} className="text-emerald-600" />
                  Trip Revenue &amp; Diesel Toll Expense Ledger
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Gross Ticket Revenue</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#047857' }}>₹4,18,000</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Diesel &amp; Toll Expenses</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>₹1,42,000</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Net Trip Margin</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#d97706' }}>₹2,76,000</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: TRIP ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="bus-card">
              <div className="bus-card-header">
                <h3 className="bus-card-title">
                  <TrendingUp size={18} className="text-emerald-600" />
                  Route Profitability &amp; Fuel Economy Analytics
                </h3>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', marginTop: '16px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                  Average fleet fuel efficiency: 4.8 km/litre across Volvo 9600 Multi-Axles. 99.4% on-time arrival index.
                </p>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bus-card" style={{ maxWidth: '640px' }}>
              <div className="bus-card-header">
                <h3 className="bus-card-title">
                  <Settings size={18} />
                  Star Tours Fleet Settings
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Operator Registered Name</label>
                  <input type="text" readOnly value="Star Tours &amp; Travels Intercity Lines Pvt Ltd" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>AIS-140 GPS Server Telematics API</label>
                  <input type="text" readOnly value="https://telematics.startours.com/v1/stream" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BusTravelDashboard;

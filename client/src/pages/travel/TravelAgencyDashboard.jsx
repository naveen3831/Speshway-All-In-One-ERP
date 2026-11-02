import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  UserCheck,
  Store,
  Box,
  BadgePercent,
  ShoppingCart,
  BookOpen,
  Ticket,
  Receipt,
  Calculator,
  Users,
  CalendarCheck,
  LogOut,
  Bell,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Plus,
  Search,
  Mail,
  Phone,
  Clock,
  Briefcase,
  FileText,
  CreditCard,
  Building,
} from 'lucide-react';
import './TravelAgencyDashboard.css';

export const TravelAgencyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeTimeframe, setActiveTimeframe] = useState('30days');
  const [searchQuery, setSearchQuery] = useState('');
  const [leadFilter, setLeadFilter] = useState('all');

  // KPI Metrics matching exact values from screenshot
  const kpiData = [
    { id: 'leads', label: 'Leads', value: '4' },
    { id: 'won', label: 'Won', value: '2' },
    { id: 'customers', label: 'Customers', value: '4' },
    { id: 'vendors', label: 'Vendors', value: '4' },
    { id: 'products', label: 'Products', value: '4' },
    { id: 'low_stock', label: 'Low Stock', value: '0' },
    { id: 'employees', label: 'Employees', value: '3' },
    { id: 'sales_mo', label: 'Sales (mo)', value: '₹0' },
    { id: 'purchase_mo', label: 'Purchase (mo)', value: '₹0' },
    { id: 'receivables', label: 'Receivables', value: '₹3,37,229' },
    { id: 'payables', label: 'Payables', value: '₹0' },
  ];

  // Recent leads list matching exact screenshot
  const leadsData = [
    {
      id: 1,
      name: 'Sneha Iyer',
      email: 'sneha.iyer@gmail.com',
      phone: '+91 98201 44321',
      destination: 'Kerala Backwaters & Munnar (5D/4N)',
      budget: '₹48,000',
      status: 'Won',
      statusType: 'won',
      agent: 'Vikram M.',
      date: 'Today, 11:20 AM',
    },
    {
      id: 2,
      name: 'Amit Traders',
      email: 'amit@traderscorp.in',
      phone: '+91 94112 88200',
      destination: 'Goa Corporate Annual Offsite (40 Pax)',
      budget: '₹1,85,000',
      status: 'Won',
      statusType: 'won',
      agent: 'Karan D.',
      date: 'Yesterday, 4:15 PM',
    },
    {
      id: 3,
      name: 'Priya Mehta',
      email: 'priya.mehta@yahoo.com',
      phone: '+91 98721 00234',
      destination: 'Dubai City Lights & Desert Safari (6D/5N)',
      budget: '₹1,25,000',
      status: 'Qualified',
      statusType: 'qualified',
      agent: 'Pooja N.',
      date: '01 Nov 2026',
    },
    {
      id: 4,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@techsol.com',
      phone: '+91 99880 12345',
      destination: 'Himachal Snow & Manali Adventure',
      budget: '₹36,000',
      status: 'New',
      statusType: 'new',
      agent: 'Vikram M.',
      date: '31 Oct 2026',
    },
  ];

  // Customers data
  const customersData = [
    { id: 'CUST-101', name: 'Sneha Iyer', type: 'Individual', email: 'sneha.iyer@gmail.com', phone: '+91 98201 44321', trips: 3, spent: '₹1,12,000', status: 'Active' },
    { id: 'CUST-102', name: 'Amit Traders Ltd.', type: 'Corporate', email: 'travel@traderscorp.in', phone: '+91 94112 88200', trips: 5, spent: '₹3,37,229', status: 'VIP Account' },
    { id: 'CUST-103', name: 'Dr. Rajesh Khanna', type: 'Individual', email: 'rkhanna@apollo.org', phone: '+91 98402 11928', trips: 2, spent: '₹78,500', status: 'Active' },
    { id: 'CUST-104', name: 'Ananya Deshpande', type: 'Family Group', email: 'ananya.d@gmail.com', phone: '+91 97654 33210', trips: 1, spent: '₹54,000', status: 'Active' },
  ];

  // Vendors data
  const vendorsData = [
    { id: 'VEND-01', name: 'Taj Hotels & Palaces', category: 'Hotels & Resorts', contract: '12 Luxury Properties', payables: '₹0', contact: 'Rohan Mehra (Sales Dir.)' },
    { id: 'VEND-02', name: 'IndiGo Airlines Desk', category: 'Aviation & Flights', contract: 'Corporate Group Desk', payables: '₹0', contact: 'Pooja V. (Key Accounts)' },
    { id: 'VEND-03', name: 'Himalayan Transit Cabs', category: 'Fleet & Surface Transport', contract: '18 SUVs / Tempo Travellers', payables: '₹0', contact: 'Jaspreet Singh (Fleet Head)' },
    { id: 'VEND-04', name: 'Goa Coastal Water Excursions', category: 'Activities & Watersports', contract: 'Catamaran & Scuba Ops', payables: '₹0', contact: 'Mario Fernandes' },
  ];

  // Inventory data
  const inventoryData = [
    { id: 'INV-01', item: 'Goa Beachfront Premium Chalets', vendor: 'Taj Resorts Goa', blocked: '20 Rooms', allocated: '18 Rooms', available: '2 Rooms', status: 'Low Stock' },
    { id: 'INV-02', item: 'IndiGo DEL-GOI Group Flight Block', vendor: 'IndiGo Desk', blocked: '40 Seats', allocated: '32 Seats', available: '8 Seats', status: 'In Stock' },
    { id: 'INV-03', item: 'Manali Pine Forest Cottages', vendor: 'Himalayan Retreats', blocked: '15 Rooms', allocated: '9 Rooms', available: '6 Rooms', status: 'In Stock' },
    { id: 'INV-04', item: 'Dubai Desert Camp VIP Seating', vendor: 'Arabian Nights Tour Co', blocked: '25 Vouchers', allocated: '14 Vouchers', available: '11 Vouchers', status: 'In Stock' },
  ];

  // Packages data
  const packagesData = [
    {
      id: 'PKG-01',
      title: 'Manali Snow & Adventure Trail',
      duration: '6 Days / 5 Nights',
      price: '₹24,999',
      inclusions: ['4-Star Hotel', 'Private SUV', 'Breakfast & Dinner', 'Rohtang Pass Permit'],
      gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    },
    {
      id: 'PKG-02',
      title: 'Kerala Backwaters & Munnar Hills',
      duration: '5 Days / 4 Nights',
      price: '₹29,500',
      inclusions: ['Houseboat Stay', 'Tea Plantation Resort', 'All Transfers', 'Spice Garden Tour'],
      gradient: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
    },
    {
      id: 'PKG-03',
      title: 'Goa Sun, Sand & Sunset Cruise',
      duration: '4 Days / 3 Nights',
      price: '₹18,400',
      inclusions: ['Beachfront Resort', 'North & South Goa Cab', 'Mandovi River Cruise', 'Breakfast'],
      gradient: 'linear-gradient(135deg, #b45309 0%, #f59e0b 100%)',
    },
    {
      id: 'PKG-04',
      title: 'Dubai Desert Safari & City Lights',
      duration: '6 Days / 5 Nights',
      price: '₹62,000',
      inclusions: ['Burj Khalifa Level 124', 'Desert BBQ & Safari', 'Marina Yacht Tour', 'UAE Visa'],
      gradient: 'linear-gradient(135deg, #6b21a8 0%, #a855f7 100%)',
    },
  ];

  // Bookings data
  const bookingsData = [
    { id: 'HC-BKG-9921', customer: 'Sneha Iyer', package: 'Kerala Backwaters (5D/4N)', travelDates: '12 Nov - 16 Nov 2026', pnr: 'IX-49201', status: 'Confirmed', amount: '₹48,000' },
    { id: 'HC-BKG-9922', customer: 'Amit Traders (Group)', package: 'Goa Corporate Retreat (40 Pax)', travelDates: '22 Nov - 25 Nov 2026', pnr: '6E-88219 (Block)', status: 'Confirmed', amount: '₹1,85,000' },
    { id: 'HC-BKG-9923', customer: 'Priya Mehta', package: 'Dubai City & Safari (6D/5N)', travelDates: '04 Dec - 09 Dec 2026', pnr: 'EK-512', status: 'Voucher Issued', amount: '₹1,25,000' },
    { id: 'HC-BKG-9924', customer: 'Ananya Deshpande', package: 'Manali Snow Trail (6D/5N)', travelDates: '18 Dec - 23 Dec 2026', pnr: 'SG-2201', status: 'Pending Payment', amount: '₹54,000' },
  ];

  // Invoices / Sales data
  const salesInvoicesData = [
    { id: 'INV-2026-081', customer: 'Amit Traders Ltd.', date: '28 Oct 2026', amount: '₹1,85,000', gst: '₹9,250', status: 'Paid', method: 'NEFT Transfer' },
    { id: 'INV-2026-082', customer: 'Priya Mehta', date: '30 Oct 2026', amount: '₹1,25,000', gst: '₹6,250', status: 'Paid', method: 'Credit Card' },
    { id: 'INV-2026-083', customer: 'Sneha Iyer', date: '01 Nov 2026', amount: '₹48,000', gst: '₹2,400', status: 'Paid', method: 'UPI' },
    { id: 'INV-2026-084', customer: 'Dr. Rajesh Khanna', date: '02 Nov 2026', amount: '₹27,229', gst: '₹1,361', status: 'Paid', method: 'Net Banking' },
  ];

  // Employees data
  const employeesData = [
    { name: 'Vikram Malhotra', role: 'Senior Tour Director', specialty: 'North India & Himalayas', tours: '42 Expeditions', phone: '+91 98110 54321', email: 'vikram.m@holidaycity.com', avatar: 'VM' },
    { name: 'Pooja Nair', role: 'International Travel Consultant', specialty: 'Middle East & Europe', tours: 'IATA Certified', phone: '+91 98200 99887', email: 'pooja.n@holidaycity.com', avatar: 'PN' },
    { name: 'Karan Deshmukh', role: 'Corporate Accounts & Operations', specialty: 'MICE & Corporate Retreats', tours: '98% Client CSAT', phone: '+91 98330 11223', email: 'karan.d@holidaycity.com', avatar: 'KD' },
  ];

  // Navigation menu items matching exact sidebar from screenshot
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crm', label: 'CRM / Leads', icon: Target },
    { id: 'customers', label: 'Customers', icon: UserCheck },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'inventory', label: 'Inventory', icon: Box },
    { id: 'sales', label: 'Sales', icon: BadgePercent },
    { id: 'purchase', label: 'Purchase', icon: ShoppingCart },
    { id: 'packages', label: 'Packages', icon: BookOpen },
    { id: 'bookings', label: 'Travel Bookings', icon: Ticket },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'accounts', label: 'Accounts', icon: Calculator },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  ];

  return (
    <div className="tat-erp-root">
      {/* 1. SIDEBAR */}
      <aside className="tat-sidebar">
        {/* Brand Logo Header */}
        <div className="tat-sidebar-brand">
          <div className="tat-logo-mark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 13h4l3-8 4 14 3-6h4"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="tat-brand-text">
            <span className="tat-brand-name">
              <span className="text-cyan">Holiday</span>City
            </span>
            <span className="tat-brand-legal">Pvt. Ltd.</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="tat-nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`tat-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} className="tat-nav-icon" />
                <span className="tat-nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="tat-sidebar-footer">
          <button
            onClick={() => navigate('/product/tours-and-travels')}
            className="tat-nav-item logout"
            title="Return to Speshway Products"
          >
            <LogOut size={18} className="tat-nav-icon" />
            <span className="tat-nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <div className="tat-main-wrapper">
        {/* Top Navbar */}
        <header className="tat-topbar">
          <div className="tat-topbar-left">
            <h2 className="tat-module-title">Travel Agency ERP</h2>
            <Link to="/product/tours-and-travels" className="tat-back-chip">
              <ArrowLeft size={13} />
              <span>Back to Speshway ERP</span>
            </Link>
          </div>

          <div className="tat-topbar-right">
            <button className="tat-bell-btn" title="Notifications">
              <Bell size={18} />
              <span className="tat-bell-dot"></span>
            </button>

            <div className="tat-user-pill">
              <span className="tat-user-role">Owner</span>
              <div className="tat-user-avatar">
                <span>O</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic View based on Active Tab */}
        <main className="tat-content">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Dashboard</h1>
                <p className="tat-subheading">Overview tuned for your industry.</p>
              </div>

              {/* 11 Metric KPI Cards Grid */}
              <div className="tat-kpi-grid">
                {kpiData.map((kpi) => (
                  <div key={kpi.id} className="tat-kpi-card" onClick={() => {
                    if (kpi.id === 'leads') setActiveTab('crm');
                    else if (kpi.id === 'customers') setActiveTab('customers');
                    else if (kpi.id === 'vendors') setActiveTab('vendors');
                    else if (kpi.id === 'products') setActiveTab('packages');
                    else if (kpi.id === 'low_stock') setActiveTab('inventory');
                    else if (kpi.id === 'employees') setActiveTab('employees');
                    else if (kpi.id === 'receivables' || kpi.id === 'sales_mo') setActiveTab('sales');
                  }} style={{ cursor: 'pointer' }}>
                    <span className="tat-kpi-label">{kpi.label}</span>
                    <span className="tat-kpi-value">{kpi.value}</span>
                  </div>
                ))}
              </div>

              {/* Lower Two-Column Section: Chart & Recent Leads */}
              <div className="tat-lower-grid">
                {/* Left Card: Sales - last 30 days Chart */}
                <div className="tat-card tat-chart-card">
                  <div className="tat-card-head">
                    <h3 className="tat-card-title">Sales &mdash; last 30 days</h3>
                    <span className="tat-period-badge">Live Trajectory</span>
                  </div>

                  <div className="tat-chart-container">
                    <div className="tat-chart-svg-wrap">
                      <div className="tat-y-axis">
                        <span>₹3.5L</span>
                        <span>₹3.0L</span>
                        <span>₹2.5L</span>
                        <span>₹2.0L</span>
                        <span>₹1.5L</span>
                      </div>

                      <div className="tat-svg-canvas">
                        <svg viewBox="0 0 600 240" preserveAspectRatio="none" className="tat-chart-svg">
                          <defs>
                            <linearGradient id="tatGreenGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                              <stop offset="60%" stopColor="#10b981" stopOpacity="0.10" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="0" y1="70" x2="600" y2="70" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="0" y1="120" x2="600" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="0" y1="170" x2="600" y2="170" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                          <line x1="0" y1="220" x2="600" y2="220" stroke="#e2e8f0" strokeWidth="1" />

                          <path
                            d="M 0 210 Q 75 190, 150 160 T 300 110 T 450 75 T 600 35 L 600 240 L 0 240 Z"
                            fill="url(#tatGreenGradient)"
                          />

                          <path
                            d="M 0 210 Q 75 190, 150 160 T 300 110 T 450 75 T 600 35"
                            fill="none"
                            stroke="#059669"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />

                          <circle cx="0" cy="210" r="5" fill="#059669" />
                          <circle cx="150" cy="160" r="5" fill="#059669" />
                          <circle cx="300" cy="110" r="5" fill="#059669" />
                          <circle cx="450" cy="75" r="5" fill="#059669" />
                          <circle cx="600" cy="35" r="6" fill="#047857" stroke="#ffffff" strokeWidth="2.5" />
                        </svg>
                      </div>
                    </div>

                    <div className="tat-x-axis">
                      <span>03 Oct</span>
                      <span>09 Oct</span>
                      <span>16 Oct</span>
                      <span>23 Oct</span>
                      <span>30 Oct</span>
                      <span>02 Nov</span>
                    </div>
                  </div>
                </div>

                {/* Right Card: Recent Leads */}
                <div className="tat-card tat-leads-card">
                  <div className="tat-card-head">
                    <h3 className="tat-card-title">Recent leads</h3>
                    <button
                      onClick={() => setActiveTab('crm')}
                      style={{ background: 'none', border: 'none', color: '#059669', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      View All &rarr;
                    </button>
                  </div>

                  <div className="tat-leads-list">
                    {leadsData.map((lead) => (
                      <div key={lead.id} className="tat-lead-row">
                        <span className="tat-lead-name">{lead.name}</span>
                        <span className={`tat-lead-badge ${lead.statusType}`}>{lead.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: CRM / LEADS */}
          {activeTab === 'crm' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">CRM / Inbound Leads</h1>
                <p className="tat-subheading">Manage inbound customer vacation inquiries, budgets, and sales pipeline.</p>
              </div>

              <div className="tat-view-toolbar">
                <div className="tat-search-wrap">
                  <Search size={16} className="tat-search-icon" />
                  <input
                    type="text"
                    placeholder="Search leads by name, destination, email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="tat-search-input"
                  />
                </div>
                <div className="tat-toolbar-actions">
                  <button
                    onClick={() => setLeadFilter('all')}
                    className={`tat-filter-pill ${leadFilter === 'all' ? 'active' : ''}`}
                  >
                    All Leads (4)
                  </button>
                  <button
                    onClick={() => setLeadFilter('won')}
                    className={`tat-filter-pill ${leadFilter === 'won' ? 'active' : ''}`}
                  >
                    Won (2)
                  </button>
                  <button
                    onClick={() => setLeadFilter('qualified')}
                    className={`tat-filter-pill ${leadFilter === 'qualified' ? 'active' : ''}`}
                  >
                    Qualified (1)
                  </button>
                  <button
                    onClick={() => setLeadFilter('new')}
                    className={`tat-filter-pill ${leadFilter === 'new' ? 'active' : ''}`}
                  >
                    New (1)
                  </button>
                  <button className="tat-btn-primary" onClick={() => alert('New Lead creation modal')}>
                    <Plus size={16} /> New Lead
                  </button>
                </div>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Lead Name</th>
                        <th>Inquired Package / Destination</th>
                        <th>Contact Details</th>
                        <th>Budget Quote</th>
                        <th>Agent</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadsData
                        .filter((l) => leadFilter === 'all' || l.statusType === leadFilter)
                        .filter((l) =>
                          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.destination.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((lead) => (
                          <tr key={lead.id}>
                            <td><strong>{lead.name}</strong></td>
                            <td>{lead.destination}</td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.8rem' }}>
                                <span>{lead.email}</span>
                                <span style={{ color: '#64748b' }}>{lead.phone}</span>
                              </div>
                            </td>
                            <td><strong style={{ color: '#059669' }}>{lead.budget}</strong></td>
                            <td>{lead.agent}</td>
                            <td>
                              <span className={`tat-lead-badge ${lead.statusType}`}>{lead.status}</span>
                            </td>
                            <td style={{ fontSize: '0.8rem', color: '#64748b' }}>{lead.date}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: CUSTOMERS */}
          {activeTab === 'customers' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Customers Directory</h1>
                <p className="tat-subheading">Traveler profiles, corporate group managers, and booking history.</p>
              </div>

              <div className="tat-view-toolbar">
                <div className="tat-search-wrap">
                  <Search size={16} className="tat-search-icon" />
                  <input
                    type="text"
                    placeholder="Search customers by name, phone, email..."
                    className="tat-search-input"
                  />
                </div>
                <div className="tat-toolbar-actions">
                  <button className="tat-btn-primary">
                    <Plus size={16} /> Add Customer
                  </button>
                </div>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Customer ID</th>
                        <th>Client Name</th>
                        <th>Account Type</th>
                        <th>Email &amp; Mobile</th>
                        <th>Trips Booked</th>
                        <th>Total Spent</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersData.map((c) => (
                        <tr key={c.id}>
                          <td><code>{c.id}</code></td>
                          <td><strong>{c.name}</strong></td>
                          <td><span className="tat-status-pill neutral">{c.type}</span></td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.8rem' }}>
                              <span>{c.email}</span>
                              <span style={{ color: '#64748b' }}>{c.phone}</span>
                            </div>
                          </td>
                          <td><strong>{c.trips} Holidays</strong></td>
                          <td><strong style={{ color: '#059669' }}>{c.spent}</strong></td>
                          <td><span className="tat-status-pill success">{c.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 4: VENDORS */}
          {activeTab === 'vendors' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Vendors &amp; Destination Partners</h1>
                <p className="tat-subheading">Airlines, luxury hotel chains, surface fleets, and local tour operators.</p>
              </div>

              <div className="tat-view-toolbar">
                <div className="tat-search-wrap">
                  <Search size={16} className="tat-search-icon" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    className="tat-search-input"
                  />
                </div>
                <div className="tat-toolbar-actions">
                  <button className="tat-btn-primary">
                    <Plus size={16} /> Add Partner Vendor
                  </button>
                </div>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Partner Name</th>
                        <th>Service Category</th>
                        <th>Contract Scope</th>
                        <th>Key Contact Person</th>
                        <th>Outstanding Payables</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorsData.map((v) => (
                        <tr key={v.id}>
                          <td><strong>{v.name}</strong></td>
                          <td><span className="tat-status-pill primary">{v.category}</span></td>
                          <td>{v.contract}</td>
                          <td>{v.contact}</td>
                          <td><strong>{v.payables}</strong></td>
                          <td><span className="tat-status-pill success">Contract Active</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 5: INVENTORY */}
          {activeTab === 'inventory' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Inventory &amp; Allocations</h1>
                <p className="tat-subheading">Blocked hotel rooms, group flight allocations, and safari passes.</p>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Resource / Room Block</th>
                        <th>Contracted Vendor</th>
                        <th>Blocked Units</th>
                        <th>Allocated</th>
                        <th>Available In-Stock</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryData.map((inv) => (
                        <tr key={inv.id}>
                          <td><strong>{inv.item}</strong></td>
                          <td>{inv.vendor}</td>
                          <td>{inv.blocked}</td>
                          <td>{inv.allocated}</td>
                          <td><strong style={{ color: inv.status === 'Low Stock' ? '#d97706' : '#059669' }}>{inv.available}</strong></td>
                          <td>
                            <span className={`tat-status-pill ${inv.status === 'Low Stock' ? 'warning' : 'success'}`}>
                              {inv.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 6: SALES */}
          {activeTab === 'sales' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Sales Orders &amp; Tax Invoices</h1>
                <p className="tat-subheading">Client billing, GST receipts, and payment reconciliations.</p>
              </div>

              <div className="tat-view-toolbar">
                <div className="tat-search-wrap">
                  <Search size={16} className="tat-search-icon" />
                  <input
                    type="text"
                    placeholder="Search invoices by customer, ID..."
                    className="tat-search-input"
                  />
                </div>
                <div className="tat-toolbar-actions">
                  <button className="tat-btn-primary">
                    <Plus size={16} /> Create Invoice
                  </button>
                </div>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Invoice Number</th>
                        <th>Client / Organization</th>
                        <th>Billing Date</th>
                        <th>GST (5%)</th>
                        <th>Total Amount</th>
                        <th>Payment Mode</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesInvoicesData.map((inv) => (
                        <tr key={inv.id}>
                          <td><code>{inv.id}</code></td>
                          <td><strong>{inv.customer}</strong></td>
                          <td>{inv.date}</td>
                          <td>{inv.gst}</td>
                          <td><strong style={{ color: '#059669' }}>{inv.amount}</strong></td>
                          <td>{inv.method}</td>
                          <td><span className="tat-status-pill success">{inv.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 7: PURCHASE */}
          {activeTab === 'purchase' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Supplier Purchases &amp; Vouchers</h1>
                <p className="tat-subheading">Purchase orders issued to partner hotels, airline desks, and coach fleets.</p>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Purchase Order</th>
                        <th>Vendor Partner</th>
                        <th>Service / Scope</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>PO-2026-031</code></td>
                        <td><strong>Taj Resorts Goa</strong></td>
                        <td>18 Deluxe Rooms Booking Block</td>
                        <td><strong>₹1,26,000</strong></td>
                        <td><span className="tat-status-pill success">Settled</span></td>
                      </tr>
                      <tr>
                        <td><code>PO-2026-032</code></td>
                        <td><strong>IndiGo Airlines Desk</strong></td>
                        <td>32 Group Return Flight Tickets</td>
                        <td><strong>₹1,84,000</strong></td>
                        <td><span className="tat-status-pill success">Settled</span></td>
                      </tr>
                      <tr>
                        <td><code>PO-2026-033</code></td>
                        <td><strong>Himalayan Transit Cabs</strong></td>
                        <td>5 SUVs 6D Private Surface Hire</td>
                        <td><strong>₹27,229</strong></td>
                        <td><span className="tat-status-pill success">Settled</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 8: PACKAGES */}
          {activeTab === 'packages' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Holiday Packages Catalog</h1>
                <p className="tat-subheading">Active curated vacation bundles, itineraries, and fixed departures.</p>
              </div>

              <div className="tat-packages-grid">
                {packagesData.map((pkg) => (
                  <div key={pkg.id} className="tat-pkg-card">
                    <div className="tat-pkg-header" style={{ background: pkg.gradient }}>
                      <span className="tat-pkg-duration">{pkg.duration}</span>
                      <MapPin size={24} color="#ffffff" style={{ opacity: 0.9 }} />
                    </div>
                    <div className="tat-pkg-body">
                      <h3 className="tat-pkg-title">{pkg.title}</h3>
                      <div className="tat-pkg-inclusions">
                        {pkg.inclusions.map((inc, i) => (
                          <span key={i} className="tat-inc-chip">{inc}</span>
                        ))}
                      </div>
                      <div className="tat-pkg-footer">
                        <div className="tat-pkg-price">
                          {pkg.price} <small>/ person</small>
                        </div>
                        <button className="tat-btn-book" onClick={() => alert(`Selected package: ${pkg.title}`)}>
                          Book Tour
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAB 9: BOOKINGS */}
          {activeTab === 'bookings' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Confirmed Travel Bookings &amp; PNRs</h1>
                <p className="tat-subheading">Real-time travel reservations, e-tickets, and hotel vouchers.</p>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Booking Ref</th>
                        <th>Primary Passenger</th>
                        <th>Package / Itinerary</th>
                        <th>Travel Dates</th>
                        <th>PNR / Voucher</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingsData.map((b) => (
                        <tr key={b.id}>
                          <td><code>{b.id}</code></td>
                          <td><strong>{b.customer}</strong></td>
                          <td>{b.package}</td>
                          <td>{b.travelDates}</td>
                          <td><code>{b.pnr}</code></td>
                          <td><strong style={{ color: '#059669' }}>{b.amount}</strong></td>
                          <td>
                            <span className={`tat-status-pill ${b.status === 'Confirmed' ? 'success' : 'purple'}`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 10: EXPENSES */}
          {activeTab === 'expenses' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Operating Expenses</h1>
                <p className="tat-subheading">Track visa filing fees, marketing spend, and agency overheads.</p>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Expense Category</th>
                        <th>Details</th>
                        <th>Amount</th>
                        <th>Payment Mode</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>02 Nov 2026</td>
                        <td>Marketing &amp; Google Ads</td>
                        <td>Goa &amp; Manali Winter Campaign</td>
                        <td><strong>₹12,500</strong></td>
                        <td>Corporate Credit Card</td>
                        <td><span className="tat-status-pill success">Approved</span></td>
                      </tr>
                      <tr>
                        <td>31 Oct 2026</td>
                        <td>UAE Visa Processing Fees</td>
                        <td>Dubai 5 Pax Express Visa</td>
                        <td><strong>₹18,000</strong></td>
                        <td>Bank Direct Transfer</td>
                        <td><span className="tat-status-pill success">Approved</span></td>
                      </tr>
                      <tr>
                        <td>28 Oct 2026</td>
                        <td>Branch Utility &amp; Internet</td>
                        <td>High-speed Fiber Lease Line</td>
                        <td><strong>₹3,400</strong></td>
                        <td>UPI Auto-debit</td>
                        <td><span className="tat-status-pill success">Approved</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 11: ACCOUNTS */}
          {activeTab === 'accounts' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Accounts &amp; Financial Ledger</h1>
                <p className="tat-subheading">Receivables summary, balance sheet, and bank accounts.</p>
              </div>

              <div className="tat-kpi-grid" style={{ marginBottom: '24px' }}>
                <div className="tat-kpi-card">
                  <span className="tat-kpi-label">Total Receivables</span>
                  <span className="tat-kpi-value" style={{ color: '#059669' }}>₹3,37,229</span>
                </div>
                <div className="tat-kpi-card">
                  <span className="tat-kpi-label">Accounts Payable</span>
                  <span className="tat-kpi-value">₹0</span>
                </div>
                <div className="tat-kpi-card">
                  <span className="tat-kpi-label">Cash In Bank</span>
                  <span className="tat-kpi-value">₹2,84,500</span>
                </div>
                <div className="tat-kpi-card">
                  <span className="tat-kpi-label">GST Liability (Q3)</span>
                  <span className="tat-kpi-value">₹19,261</span>
                </div>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Transaction ID</th>
                        <th>Account</th>
                        <th>Particulars</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>TXN-991</code></td>
                        <td>HDFC Bank Current</td>
                        <td>Amit Traders Corporate Booking Receipt</td>
                        <td>&mdash;</td>
                        <td><strong style={{ color: '#059669' }}>+₹1,85,000</strong></td>
                        <td>₹2,84,500</td>
                      </tr>
                      <tr>
                        <td><code>TXN-990</code></td>
                        <td>HDFC Bank Current</td>
                        <td>Priya Mehta Dubai Booking Receipt</td>
                        <td>&mdash;</td>
                        <td><strong style={{ color: '#059669' }}>+₹1,25,000</strong></td>
                        <td>₹99,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 12: EMPLOYEES */}
          {activeTab === 'employees' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Travel Agency Staff &amp; Consultants</h1>
                <p className="tat-subheading">Tour directors, international ticketing consultants, and group managers.</p>
              </div>

              <div className="tat-staff-grid">
                {employeesData.map((emp, i) => (
                  <div key={i} className="tat-staff-card">
                    <div className="tat-staff-avatar">{emp.avatar}</div>
                    <div className="tat-staff-info">
                      <span className="tat-staff-name">{emp.name}</span>
                      <span className="tat-staff-role">{emp.role}</span>
                      <span className="tat-staff-meta">Specialty: {emp.specialty}</span>
                      <span className="tat-staff-meta">Exp: {emp.tours}</span>
                      <span className="tat-staff-meta" style={{ marginTop: '4px', color: '#059669' }}>{emp.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAB 13: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <>
              <div className="tat-page-header">
                <h1 className="tat-heading">Staff Attendance &amp; Shift Logs</h1>
                <p className="tat-subheading">Daily consultant check-ins, biometric logs, and roster schedule.</p>
              </div>

              <div className="tat-table-card">
                <div className="tat-table-responsive">
                  <table className="tat-table">
                    <thead>
                      <tr>
                        <th>Consultant Name</th>
                        <th>Branch</th>
                        <th>Check-In Time</th>
                        <th>Check-Out Time</th>
                        <th>Total Hours</th>
                        <th>Biometric Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Vikram Malhotra</strong></td>
                        <td>Mumbai Main HQ</td>
                        <td>09:12 AM</td>
                        <td>In Progress</td>
                        <td>3h 24m</td>
                        <td><span className="tat-status-pill success">Verified On-Time</span></td>
                      </tr>
                      <tr>
                        <td><strong>Pooja Nair</strong></td>
                        <td>Mumbai Main HQ</td>
                        <td>09:05 AM</td>
                        <td>In Progress</td>
                        <td>3h 31m</td>
                        <td><span className="tat-status-pill success">Verified On-Time</span></td>
                      </tr>
                      <tr>
                        <td><strong>Karan Deshmukh</strong></td>
                        <td>Field / Client Visit</td>
                        <td>09:30 AM</td>
                        <td>In Progress</td>
                        <td>3h 06m</td>
                        <td><span className="tat-status-pill primary">Mobile Punch In</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default TravelAgencyDashboard;

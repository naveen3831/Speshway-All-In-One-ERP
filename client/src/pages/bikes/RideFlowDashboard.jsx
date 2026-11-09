import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Bike,
  Tag,
  Calendar,
  Users,
  Store,
  Wrench,
  Percent,
  BarChart3,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  Check,
  Clock,
  MapPin,
  Sparkles,
  Download,
  Info,
  CalendarDays,
  Shield,
  FileText,
  TrendingUp,
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Zap,
  Menu,
  ArrowLeft,
} from 'lucide-react';
import './RideFlowDashboard.css';

// RideFlow Brand Logo matching screenshot (Orange rounded square badge with white bike)
const RideFlowLogoIcon = () => (
  <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="rfEmeraldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.6" stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Orange Rounded Badge */}
    <rect x="10" y="10" width="80" height="80" rx="20" fill="url(#rfEmeraldGrad)" />
    {/* Motorcycle Silhouette in White */}
    {/* Front & Rear Wheels */}
    <circle cx="30" cy="62" r="14" stroke="#FFFFFF" strokeWidth="4.5" fill="none" />
    <circle cx="70" cy="62" r="14" stroke="#FFFFFF" strokeWidth="4.5" fill="none" />
    <circle cx="30" cy="62" r="4" fill="#FFFFFF" />
    <circle cx="70" cy="62" r="4" fill="#FFFFFF" />
    {/* Frame, Tank & Handlebars */}
    <path
      d="M30 62 L45 42 L65 42 L70 62"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M45 42 L56 62 L70 62"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M65 42 L62 30 L55 30"
      stroke="#FFFFFF"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Seat */}
    <path d="M40 38 Q48 35 56 38" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

export const RideFlowDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartToggle, setChartToggle] = useState('bookings'); // 'bookings' or 'revenue'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Nov 03, 2026');
  const [modalMode, setModalMode] = useState(null); // 'add-bike', 'create-offer', 'add-dealer', 'view-bookings', 'manage-services'

  // 12 Navigation Items matching screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'bikes', label: 'Bikes', icon: Bike },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'bookings', label: 'Bookings', icon: Calendar, badge: '24' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'dealers', label: 'Dealers', icon: Store },
    { id: 'services', label: 'Service Requests', icon: Wrench },
    { id: 'offers', label: 'Offers & Deals', icon: Percent },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Quick Action Items matching screenshot
  const quickActions = [
    { id: 'add-bike', label: 'Add New Bike', icon: Bike, actionId: 'bikes' },
    { id: 'create-offer', label: 'Create Offer / Deal', icon: Tag, actionId: 'offers' },
    { id: 'add-dealer', label: 'Add Dealer', icon: Store, actionId: 'dealers' },
    { id: 'view-bookings', label: 'View Bookings', icon: Calendar, actionId: 'bookings' },
    { id: 'manage-services', label: 'Manage Services', icon: Wrench, actionId: 'services' },
  ];

  // Recent Bookings (5 rows matching screenshot)
  const recentBookings = [
    {
      id: '#RF1048',
      customer: 'Ravi Teja',
      bikeModel: 'Honda SP 125',
      date: 'Nov 15, 2026',
      amount: '₹95,000',
      status: 'Confirmed',
      statusClass: 'rf-status-confirmed',
    },
    {
      id: '#RF1047',
      customer: 'Sneha Reddy',
      bikeModel: 'TVS Apache RTR',
      date: 'Nov 10, 2026',
      amount: '₹1,68,000',
      status: 'In Progress',
      statusClass: 'rf-status-progress',
    },
    {
      id: '#RF1046',
      customer: 'Arjun Kumar',
      bikeModel: 'Bajaj Pulsar 150',
      date: 'Nov 20, 2026',
      amount: '₹1,25,000',
      status: 'Confirmed',
      statusClass: 'rf-status-confirmed',
    },
    {
      id: '#RF1045',
      customer: 'Priya Mehta',
      bikeModel: 'Activa 6G',
      date: 'Nov 08, 2026',
      amount: '₹78,000',
      status: 'Pending',
      statusClass: 'rf-status-pending',
    },
    {
      id: '#RF1044',
      customer: 'Karthik Rao',
      bikeModel: 'Ola S1 Pro',
      date: 'Nov 07, 2026',
      amount: '₹1,39,000',
      status: 'Completed',
      statusClass: 'rf-status-completed',
    },
  ];

  // Recent Service Requests (5 rows matching screenshot)
  const recentServiceRequests = [
    {
      id: '#SR2084',
      customer: 'Vijay Kumar',
      bikeModel: 'Honda Shine',
      date: 'Nov 15, 2026',
      serviceType: 'General Service',
      status: 'In Progress',
      statusClass: 'rf-status-progress',
    },
    {
      id: '#SR2083',
      customer: 'Manish Reddy',
      bikeModel: 'TVS Ntorq',
      date: 'Nov 12, 2026',
      serviceType: 'Periodic Service',
      status: 'Scheduled',
      statusClass: 'rf-status-scheduled',
    },
    {
      id: '#SR2082',
      customer: 'Anil Kumar',
      bikeModel: 'Pulsar 150',
      date: 'Nov 10, 2026',
      serviceType: 'Engine Check',
      status: 'In Progress',
      statusClass: 'rf-status-progress',
    },
    {
      id: '#SR2081',
      customer: 'Neha Sinha',
      bikeModel: 'Activa 6G',
      date: 'Nov 09, 2026',
      serviceType: 'Battery Replace',
      status: 'Completed',
      statusClass: 'rf-status-completed',
    },
    {
      id: '#SR2080',
      customer: 'Rakesh Rao',
      bikeModel: 'Ola S1 Pro',
      date: 'Nov 07, 2026',
      serviceType: 'General Service',
      status: 'Completed',
      statusClass: 'rf-status-completed',
    },
  ];

  // Bikes by Category matching screenshot donut
  const categoriesBreakdown = [
    { label: 'Commuter Bikes', pct: '36%', count: 89, color: '#059669' },
    { label: 'Sports Bikes', pct: '20%', count: 50, color: '#10b981' },
    { label: 'Cruisers', pct: '14%', count: 35, color: '#34d399' },
    { label: 'Scooters', pct: '18%', count: 45, color: '#6ee7b7' },
    { label: 'Electric Bikes', pct: '12%', count: 29, color: '#a7f3d0' },
  ];

  // Full Bikes Inventory list for Bikes tab
  const allBikesList = [
    { model: 'Honda SP 125', category: 'Commuter Bikes', engine: '124 cc', mileage: '65 kmpl', price: '₹95,000', stock: 18, dealer: 'City Honda' },
    { model: 'TVS Apache RTR 160 4V', category: 'Sports Bikes', engine: '159 cc', mileage: '45 kmpl', price: '₹1,68,000', stock: 12, dealer: 'Apex TVS' },
    { model: 'Bajaj Pulsar 150', category: 'Commuter Bikes', engine: '149 cc', mileage: '50 kmpl', price: '₹1,25,000', stock: 15, dealer: 'Metro Bajaj' },
    { model: 'Royal Enfield Classic 350', category: 'Cruisers', engine: '349 cc', mileage: '35 kmpl', price: '₹2,15,000', stock: 8, dealer: 'Heritage Moto' },
    { model: 'Honda Activa 6G', category: 'Scooters', engine: '109 cc', mileage: '55 kmpl', price: '₹78,000', stock: 24, dealer: 'City Honda' },
    { model: 'Ola S1 Pro Gen 2', category: 'Electric Bikes', engine: 'Electric 11kW', mileage: '180 km/charge', price: '₹1,39,000', stock: 14, dealer: 'Ola Electric Hub' },
    { model: 'Yamaha MT-15 V2', category: 'Sports Bikes', engine: '155 cc', mileage: '48 kmpl', price: '₹1,72,000', stock: 9, dealer: 'Yamaha Speed' },
  ];

  // Dealers list for Dealers tab
  const dealersList = [
    { name: 'City Honda Prime Motors', location: 'Banjara Hills, Hyderabad', bikesSold: 142, rating: '4.9 ★', contact: '+91 98490 11223', status: 'Certified Dealer' },
    { name: 'Apex TVS Showroom & Service', location: 'Gachibowli, Hyderabad', bikesSold: 98, rating: '4.8 ★', contact: '+91 98222 33445', status: 'Authorized Dealer' },
    { name: 'Metro Bajaj Two-Wheelers', location: 'Secunderabad', bikesSold: 115, rating: '4.7 ★', contact: '+91 98333 44556', status: 'Certified Dealer' },
    { name: 'Heritage Royal Enfield Garage', location: 'Jubilee Hills, Hyderabad', bikesSold: 76, rating: '5.0 ★', contact: '+91 98444 55667', status: 'Premium Dealership' },
    { name: 'Ola Electric Experience Center', location: 'Madhapur, Hitec City', bikesSold: 130, rating: '4.9 ★', contact: '+91 98555 66778', status: 'Direct Store' },
  ];

  // Customers list for Customers tab
  const customersList = [
    { name: 'Ravi Teja', phone: '+91 98490 12345', email: 'ravi.teja@gmail.com', city: 'Hyderabad', bikeOwned: 'Honda SP 125', purchaseDate: 'Nov 15, 2026', totalSpent: '₹95,000' },
    { name: 'Sneha Reddy', phone: '+91 99887 65432', email: 'sneha.reddy@yahoo.com', city: 'Secunderabad', bikeOwned: 'TVS Apache RTR', purchaseDate: 'Nov 10, 2026', totalSpent: '₹1,68,000' },
    { name: 'Arjun Kumar', phone: '+91 91234 56789', email: 'arjun.kumar@corp.com', city: 'Gachibowli', bikeOwned: 'Bajaj Pulsar 150', purchaseDate: 'Nov 20, 2026', totalSpent: '₹1,25,000' },
    { name: 'Priya Mehta', phone: '+91 98765 43210', email: 'priya.mehta@outlook.com', city: 'Banjara Hills', bikeOwned: 'Activa 6G', purchaseDate: 'Nov 08, 2026', totalSpent: '₹78,000' },
    { name: 'Karthik Rao', phone: '+91 94401 23456', email: 'karthik.rao@gmail.com', city: 'Jubilee Hills', bikeOwned: 'Ola S1 Pro', purchaseDate: 'Nov 07, 2026', totalSpent: '₹1,39,000' },
  ];

  // Offers list for Offers tab
  const offersList = [
    { title: 'Diwali Festive Mega Cashback', discount: '₹5,000 Instant Cashback', validity: 'Valid till Nov 30, 2026', models: 'All Commuter & Sports Bikes', status: 'Active' },
    { title: 'Zero Down Payment EMI Scheme', discount: '0% Processing Fee + Low ROI', validity: 'Valid till Dec 15, 2026', models: 'Electric Scooters (Ola & Ather)', status: 'Active' },
    { title: 'Exchange Bonus Upgrade', discount: 'Up to ₹8,000 Extra on Old Bike', validity: 'Valid till Nov 25, 2026', models: 'Pulsar & Apache Series', status: 'Active' },
    { title: 'Free 1-Year Comprehensive Insurance', discount: '100% Free Insurance Worth ₹4,500', validity: 'Valid till Nov 18, 2026', models: 'Honda SP 125 & Activa 6G', status: 'Active' },
  ];

  return (
    <div className="rf-wrapper">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="rf-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 1. LEFT SIDEBAR (Dark Navy #0b1120 with Emerald Silk Wave) */}
      <aside className={`rf-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="rf-sidebar-top">
          {/* Brand Header */}
          <div className="rf-brand">
            <div className="rf-logo-container">
              <RideFlowLogoIcon />
            </div>
            <div className="rf-brand-text">
              <div className="rf-brand-row">
                <span className="brand-white">RideFlow</span>
              </div>
              <span className="rf-brand-subtitle">ADMIN PANEL</span>
            </div>
            <button
              type="button"
              className="rf-sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items (12 items) */}
          <nav className="rf-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`rf-nav-btn ${isActive ? 'active' : ''}`}
                >
                  <div className="rf-nav-btn-left">
                    <Icon size={18} className="rf-nav-icon" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="rf-nav-badge">{item.badge}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Pinned Bottom */}
        <div className="rf-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="rf-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="rf-user-profile">
            <div className="rf-avatar">RF</div>
            <div className="rf-user-info">
              <span className="rf-user-name">RideFlow Manager</span>
              <span className="rf-user-role">Smart 2-Wheeler Fleet HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT */}
      <div className="rf-main">
        {/* Topbar with exactly 82px height */}
        <header className="rf-topbar">
          <div className="rf-topbar-left">
            <div className="rf-header-title-wrap">
              <button
                type="button"
                className="rf-menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="rf-greeting-title">
                  {navItems.find(n => n.id === activeTab)?.label || 'RideFlow Management'}
                </h1>
                <p className="rf-greeting-subtitle">Here&apos;s what&apos;s happening at RideFlow today.</p>
              </div>
            </div>
          </div>

          <div className="rf-topbar-right">
            <button
              onClick={() => navigate('/products')}
              className="dashboard-back-link rf-back-catalog-btn"
              title="Return to Catalog"
            >
              <ArrowLeft size={15} /> <span>Back</span>
            </button>

            {/* Global Search Bar */}
            <div className="rf-search-box">
              <Search size={16} className="rf-search-icon" />
              <input
                type="text"
                placeholder="Search bikes, bookings, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rf-search-input"
              />
            </div>

            {/* Date Pill Dropdown */}
            <div className="rf-date-pill">
              <Calendar size={15} className="text-green" />
              <span>{selectedDate}</span>
              <ChevronDown size={14} />
            </div>

            {/* Notifications Bell with unread dot */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="rf-icon-btn"
              title="RideFlow Notifications"
            >
              <Bell size={19} />
              <span className="rf-unread-dot"></span>
            </button>

            {/* User Profile */}
            <div className="rf-user-profile-top">
              <span className="rf-user-name">Admin</span>
              <div className="rf-avatar">A</div>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Content */}
        <div className="rf-content">
          {/* TAB 1: MAIN DASHBOARD VIEW (EXACT MATCH TO SCREENSHOT) */}
          {activeTab === 'dashboard' && (
            <div className="rf-dashboard-view">
              {/* 5 KPI Stat Cards in a row */}
              <div className="rf-stats-grid">
                {/* 1. Total Bikes */}
                <div className="rf-stat-card">
                  <div className="rf-stat-icon-wrap bg-green-light">
                    <Bike size={22} className="text-green" />
                  </div>
                  <div className="rf-stat-info">
                    <span className="rf-stat-label">Total Bikes</span>
                    <div className="rf-stat-value">248</div>
                    <div className="rf-stat-trend text-green">
                      <span>↑ +12% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 2. Total Bookings */}
                <div className="rf-stat-card">
                  <div className="rf-stat-icon-wrap bg-green-light">
                    <Calendar size={22} className="text-green" />
                  </div>
                  <div className="rf-stat-info">
                    <span className="rf-stat-label">Total Bookings</span>
                    <div className="rf-stat-value">318</div>
                    <div className="rf-stat-trend text-green">
                      <span>↑ +24% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 3. Total Customers */}
                <div className="rf-stat-card">
                  <div className="rf-stat-icon-wrap bg-green-light">
                    <Users size={22} className="text-green" />
                  </div>
                  <div className="rf-stat-info">
                    <span className="rf-stat-label">Total Customers</span>
                    <div className="rf-stat-value">982</div>
                    <div className="rf-stat-trend text-green">
                      <span>↑ +18% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 4. Total Dealers */}
                <div className="rf-stat-card">
                  <div className="rf-stat-icon-wrap bg-green-light">
                    <Store size={22} className="text-green" />
                  </div>
                  <div className="rf-stat-info">
                    <span className="rf-stat-label">Total Dealers</span>
                    <div className="rf-stat-value">76</div>
                    <div className="rf-stat-trend text-green">
                      <span>↑ +9% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 5. Total Revenue */}
                <div className="rf-stat-card">
                  <div className="rf-stat-icon-wrap bg-green-light">
                    <span className="rf-rupee-symbol">₹</span>
                  </div>
                  <div className="rf-stat-info">
                    <span className="rf-stat-label">Total Revenue</span>
                    <div className="rf-stat-value">₹12,48,000</div>
                    <div className="rf-stat-trend text-green">
                      <span>↑ +28% from last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Bookings Overview + Bikes by Category + Quick Actions */}
              <div className="rf-analytics-grid">
                {/* 1. Bookings Overview (Mixed Bar & Line Chart) */}
                <div className="rf-card rf-bookings-card">
                  <div className="rf-card-header">
                    <div className="rf-card-icon-title">
                      <BarChart3 size={20} className="text-green" />
                      <div>
                        <h3>Bookings Overview</h3>
                        <p className="rf-card-subtitle">Bike bookings and revenue for the last 7 days</p>
                      </div>
                    </div>
                    <div className="rf-chart-toggles">
                      <button
                        onClick={() => setChartToggle('bookings')}
                        className={`rf-toggle-pill ${chartToggle === 'bookings' ? 'active' : ''}`}
                      >
                        Bookings
                      </button>
                      <button
                        onClick={() => setChartToggle('revenue')}
                        className={`rf-toggle-pill ${chartToggle === 'revenue' ? 'active' : ''}`}
                      >
                        Revenue
                      </button>
                    </div>
                  </div>

                  <div className="rf-chart-body">
                    <svg viewBox="0 0 420 220" className="rf-svg-chart">
                      {/* Grid lines */}
                      <line x1="38" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="52" x2="380" y2="52" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="84" x2="380" y2="84" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="116" x2="380" y2="116" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="148" x2="380" y2="148" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="180" x2="380" y2="180" stroke="#e2e8f0" />

                      {/* Left Y-Axis Labels (Bookings) */}
                      <text x="30" y="24" textAnchor="end" className="chart-label">60</text>
                      <text x="30" y="56" textAnchor="end" className="chart-label">50</text>
                      <text x="30" y="88" textAnchor="end" className="chart-label">40</text>
                      <text x="30" y="120" textAnchor="end" className="chart-label">30</text>
                      <text x="30" y="152" textAnchor="end" className="chart-label">20</text>
                      <text x="30" y="184" textAnchor="end" className="chart-label">10</text>
                      <text x="30" y="188" textAnchor="end" className="chart-label" style={{ opacity: 0.5 }}>0</text>

                      {/* Right Y-Axis Labels (Revenue) */}
                      <text x="415" y="24" textAnchor="end" className="chart-label">₹2.4L</text>
                      <text x="415" y="56" textAnchor="end" className="chart-label">₹2.0L</text>
                      <text x="415" y="88" textAnchor="end" className="chart-label">₹1.6L</text>
                      <text x="415" y="120" textAnchor="end" className="chart-label">₹1.2L</text>
                      <text x="415" y="152" textAnchor="end" className="chart-label">₹80K</text>
                      <text x="415" y="184" textAnchor="end" className="chart-label">₹40K</text>

                      {/* BARS: Mon 24, Tue 28, Wed 32, Thu 30, Fri 38, Sat 46, Sun 52 */}
                      {/* Mon: 24 */}
                      <rect x="54" y="116" width="30" height="64" rx="4" fill="#a7f3d0" />
                      <text x="69" y="110" textAnchor="middle" className="bar-number">24</text>
                      <text x="69" y="196" textAnchor="middle" className="chart-day-label">Mon</text>

                      {/* Tue: 28 */}
                      <rect x="100" y="106" width="30" height="74" rx="4" fill="#a7f3d0" />
                      <text x="115" y="100" textAnchor="middle" className="bar-number">28</text>
                      <text x="115" y="196" textAnchor="middle" className="chart-day-label">Tue</text>

                      {/* Wed: 32 */}
                      <rect x="146" y="95" width="30" height="85" rx="4" fill="#a7f3d0" />
                      <text x="161" y="89" textAnchor="middle" className="bar-number">32</text>
                      <text x="161" y="196" textAnchor="middle" className="chart-day-label">Wed</text>

                      {/* Thu: 30 */}
                      <rect x="192" y="100" width="30" height="80" rx="4" fill="#a7f3d0" />
                      <text x="207" y="94" textAnchor="middle" className="bar-number">30</text>
                      <text x="207" y="196" textAnchor="middle" className="chart-day-label">Thu</text>

                      {/* Fri: 38 */}
                      <rect x="238" y="79" width="30" height="101" rx="4" fill="#a7f3d0" />
                      <text x="253" y="73" textAnchor="middle" className="bar-number">38</text>
                      <text x="253" y="196" textAnchor="middle" className="chart-day-label">Fri</text>

                      {/* Sat: 46 */}
                      <rect x="284" y="58" width="30" height="122" rx="4" fill="#a7f3d0" />
                      <text x="299" y="52" textAnchor="middle" className="bar-number">46</text>
                      <text x="299" y="196" textAnchor="middle" className="chart-day-label">Sat</text>

                      {/* Sun: 52 */}
                      <rect x="330" y="42" width="30" height="138" rx="4" fill="#a7f3d0" />
                      <text x="345" y="36" textAnchor="middle" className="bar-number">52</text>
                      <text x="345" y="196" textAnchor="middle" className="chart-day-label">Sun</text>

                      {/* REVENUE LINE CURVE */}
                      <path
                        d="M69 130 Q115 110, 161 95 T207 98 T253 70 T299 50 T345 35"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.2"
                      />
                      <circle cx="69" cy="130" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="115" cy="115" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="161" cy="95" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="207" cy="98" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="253" cy="70" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="299" cy="50" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="345" cy="35" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                    </svg>

                    {/* Chart Legend */}
                    <div className="rf-chart-legend">
                      <div className="legend-item">
                        <span className="legend-box-bookings"></span>
                        <span>Bookings</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-line-revenue"></span>
                        <span>Revenue</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Bikes by Category (Donut Chart) */}
                <div className="rf-card rf-category-card">
                  <div className="rf-card-header">
                    <div className="rf-card-icon-title">
                      <Calendar size={20} className="text-green" />
                      <div>
                        <h3>Bikes by Category</h3>
                      </div>
                    </div>
                  </div>

                  <div className="rf-donut-container">
                    <div className="donut-graphic-wrap">
                      <svg viewBox="0 0 160 160" className="donut-svg">
                        <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" />
                        {/* Commuter Bikes: 36% (122.4) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#059669"
                          strokeWidth="22"
                          strokeDasharray="122.4 340"
                          strokeDashoffset="0"
                        />
                        {/* Sports Bikes: 20% (68) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="22"
                          strokeDasharray="68 340"
                          strokeDashoffset="-122.4"
                        />
                        {/* Cruisers: 14% (47.6) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="22"
                          strokeDasharray="47.6 340"
                          strokeDashoffset="-190.4"
                        />
                        {/* Scooters: 18% (61.2) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#6ee7b7"
                          strokeWidth="22"
                          strokeDasharray="61.2 340"
                          strokeDashoffset="-238"
                        />
                        {/* Electric Bikes: 12% (40.8) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#a7f3d0"
                          strokeWidth="22"
                          strokeDasharray="40.8 340"
                          strokeDashoffset="-299.2"
                        />
                      </svg>
                      <div className="donut-center-text">
                        <span className="donut-num">248</span>
                        <span className="donut-sub">Bikes</span>
                      </div>
                    </div>

                    <div className="donut-legend-list">
                      {categoriesBreakdown.map((cat, i) => (
                        <div key={i} className="donut-legend-row">
                          <span className="dot" style={{ backgroundColor: cat.color }}></span>
                          <span className="legend-text">{cat.label}</span>
                          <span className="legend-pct">{cat.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Quick Actions Card */}
                <div className="rf-card rf-quick-actions-card">
                  <div className="rf-card-header">
                    <div className="rf-card-icon-title">
                      <span className="text-green font-bold text-lg">⚡</span>
                      <div>
                        <h3>Quick Actions</h3>
                      </div>
                    </div>
                  </div>

                  <div className="rf-actions-list">
                    {quickActions.map((qa) => {
                      const Icon = qa.icon;
                      return (
                        <button
                          key={qa.id}
                          onClick={() => setModalMode(qa.id)}
                          className="rf-action-row"
                        >
                          <div className="action-row-left">
                            <div className="action-icon-wrap">
                              <Icon size={18} className="text-green" />
                            </div>
                            <span className="action-label">{qa.label}</span>
                          </div>
                          <ChevronRight size={16} className="action-chevron" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Bookings (Left) + Recent Service Requests (Right) */}
              <div className="rf-bottom-grid">
                {/* 1. Recent Bookings Card */}
                <div className="rf-card rf-recent-bookings-card">
                  <div className="rf-card-header">
                    <div className="rf-card-icon-title">
                      <Calendar size={20} className="text-green" />
                      <div>
                        <h3>Recent Bookings</h3>
                        <p className="rf-card-subtitle">Latest 5 bike bookings</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('bookings')} className="rf-btn-view-all">
                      View All &rarr;
                    </button>
                  </div>

                  <div className="rf-table-responsive">
                    <table className="rf-table">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Bike Model</th>
                          <th>Booking Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((bk) => (
                          <tr key={bk.id}>
                            <td className="rf-id-cell">{bk.id}</td>
                            <td className="rf-customer-name">{bk.customer}</td>
                            <td className="rf-model-cell">{bk.bikeModel}</td>
                            <td>{bk.date}</td>
                            <td className="rf-amount-cell">{bk.amount}</td>
                            <td>
                              <span className={`rf-status-pill ${bk.statusClass}`}>
                                {bk.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Recent Service Requests Card */}
                <div className="rf-card rf-services-card">
                  <div className="rf-card-header">
                    <div className="rf-card-icon-title">
                      <Wrench size={20} className="text-green" />
                      <div>
                        <h3>Recent Service Requests</h3>
                        <p className="rf-card-subtitle">Latest 5 service requests</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('services')} className="rf-btn-view-all">
                      View All &rarr;
                    </button>
                  </div>

                  <div className="rf-table-responsive">
                    <table className="rf-table">
                      <thead>
                        <tr>
                          <th>Service ID</th>
                          <th>Customer</th>
                          <th>Bike Model</th>
                          <th>Request Date</th>
                          <th>Service Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentServiceRequests.map((sr) => (
                          <tr key={sr.id}>
                            <td className="rf-id-cell">{sr.id}</td>
                            <td className="rf-customer-name">{sr.customer}</td>
                            <td className="rf-model-cell">{sr.bikeModel}</td>
                            <td>{sr.date}</td>
                            <td>{sr.serviceType}</td>
                            <td>
                              <span className={`rf-status-pill ${sr.statusClass}`}>
                                {sr.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BIKES TAB */}
          {activeTab === 'bikes' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Bikes Catalog &amp; Inventory</h2>
                  <p className="rf-subview-sub">Manage 248 two-wheeler models, specs, prices, and stock levels</p>
                </div>
                <button onClick={() => setModalMode('add-bike')} className="rf-btn-primary">
                  <Plus size={16} /> Add New Bike
                </button>
              </div>

              <div className="rf-table-responsive">
                <table className="rf-table">
                  <thead>
                    <tr>
                      <th>Bike Model</th>
                      <th>Category</th>
                      <th>Engine</th>
                      <th>Mileage</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Dealer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBikesList.map((b, i) => (
                      <tr key={i}>
                        <td className="rf-model-cell">{b.model}</td>
                        <td>{b.category}</td>
                        <td>{b.engine}</td>
                        <td>{b.mileage}</td>
                        <td className="rf-amount-cell">{b.price}</td>
                        <td><span className="rf-stock-badge">{b.stock} in stock</span></td>
                        <td>{b.dealer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Two-Wheeler Categories</h2>
                  <p className="rf-subview-sub">Browse and configure two-wheeler segment specifications</p>
                </div>
                <button onClick={() => alert('Add category modal')} className="rf-btn-primary">
                  <Plus size={16} /> Add Category
                </button>
              </div>

              <div className="rf-categories-grid">
                {categoriesBreakdown.map((cat, i) => (
                  <div key={i} className="rf-category-card-item">
                    <div className="cat-color-bar" style={{ backgroundColor: cat.color }}></div>
                    <div className="cat-card-body">
                      <h3>{cat.label}</h3>
                      <p>{cat.count} Bikes in Catalog</p>
                      <span className="cat-pct-badge">{cat.pct} of total volume</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Customer Bike Bookings</h2>
                  <p className="rf-subview-sub">318 active customer orders, advance test-ride bookings, and purchases</p>
                </div>
                <button onClick={() => setModalMode('view-bookings')} className="rf-btn-primary">
                  <Plus size={16} /> New Booking
                </button>
              </div>

              <div className="rf-table-responsive">
                <table className="rf-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Bike Model</th>
                      <th>Booking Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((bk) => (
                      <tr key={bk.id}>
                        <td className="rf-id-cell">{bk.id}</td>
                        <td className="rf-customer-name">{bk.customer}</td>
                        <td className="rf-model-cell">{bk.bikeModel}</td>
                        <td>{bk.date}</td>
                        <td className="rf-amount-cell">{bk.amount}</td>
                        <td>
                          <span className={`rf-status-pill ${bk.statusClass}`}>{bk.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMERS TAB */}
          {activeTab === 'customers' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Customer Profiles</h2>
                  <p className="rf-subview-sub">982 registered riders, bike owners, and prospect inquiries</p>
                </div>
              </div>

              <div className="rf-table-responsive">
                <table className="rf-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Bike Owned</th>
                      <th>Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersList.map((c, i) => (
                      <tr key={i}>
                        <td className="rf-customer-name">{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>{c.city}</td>
                        <td className="rf-model-cell">{c.bikeOwned}</td>
                        <td className="rf-amount-cell">{c.totalSpent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: DEALERS TAB */}
          {activeTab === 'dealers' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Partner Dealership Network</h2>
                  <p className="rf-subview-sub">76 verified showroom and service partners across major cities</p>
                </div>
                <button onClick={() => setModalMode('add-dealer')} className="rf-btn-primary">
                  <Plus size={16} /> Add Dealer
                </button>
              </div>

              <div className="rf-table-responsive">
                <table className="rf-table">
                  <thead>
                    <tr>
                      <th>Dealership Name</th>
                      <th>Location</th>
                      <th>Contact</th>
                      <th>Bikes Sold</th>
                      <th>Rating</th>
                      <th>Badge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dealersList.map((d, i) => (
                      <tr key={i}>
                        <td className="rf-customer-name">{d.name}</td>
                        <td>{d.location}</td>
                        <td>{d.contact}</td>
                        <td className="rf-amount-cell">{d.bikesSold}</td>
                        <td>{d.rating}</td>
                        <td><span className="rf-status-pill rf-status-confirmed">{d.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: SERVICE REQUESTS TAB */}
          {activeTab === 'services' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Service &amp; Maintenance Requests</h2>
                  <p className="rf-subview-sub">Track periodic servicing, engine diagnostics, oil changes, and parts replacement</p>
                </div>
                <button onClick={() => setModalMode('manage-services')} className="rf-btn-primary">
                  <Plus size={16} /> Book Service
                </button>
              </div>

              <div className="rf-table-responsive">
                <table className="rf-table">
                  <thead>
                    <tr>
                      <th>Service ID</th>
                      <th>Customer</th>
                      <th>Bike Model</th>
                      <th>Request Date</th>
                      <th>Service Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentServiceRequests.map((sr) => (
                      <tr key={sr.id}>
                        <td className="rf-id-cell">{sr.id}</td>
                        <td className="rf-customer-name">{sr.customer}</td>
                        <td className="rf-model-cell">{sr.bikeModel}</td>
                        <td>{sr.date}</td>
                        <td>{sr.serviceType}</td>
                        <td>
                          <span className={`rf-status-pill ${sr.statusClass}`}>{sr.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: OFFERS & DEALS TAB */}
          {activeTab === 'offers' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Special Offers &amp; Festive Deals</h2>
                  <p className="rf-subview-sub">Promotional campaigns, festival cashback, exchange bonuses, and finance options</p>
                </div>
                <button onClick={() => setModalMode('create-offer')} className="rf-btn-primary">
                  <Plus size={16} /> Create Offer
                </button>
              </div>

              <div className="rf-offers-grid">
                {offersList.map((off, i) => (
                  <div key={i} className="rf-offer-card">
                    <span className="rf-offer-tag">{off.status}</span>
                    <h3 className="rf-offer-title">{off.title}</h3>
                    <div className="rf-offer-discount">{off.discount}</div>
                    <p className="rf-offer-models">Applicable on: {off.models}</p>
                    <div className="rf-offer-validity">{off.validity}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: REPORTS & ANALYTICS TAB */}
          {activeTab === 'reports' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Sales &amp; Booking Analytics</h2>
                  <p className="rf-subview-sub">Deep dive into dealer performance, model velocity, and customer retention</p>
                </div>
                <button onClick={() => alert('Exporting monthly audit PDF...')} className="rf-btn-primary">
                  <Download size={16} /> Export Reports
                </button>
              </div>

              <div className="rf-stats-grid">
                <div className="rf-stat-card">
                  <div className="rf-stat-info">
                    <span className="rf-stat-label">Average Order Value (AOV)</span>
                    <div className="rf-stat-value">₹1,18,000</div>
                    <div className="rf-stat-trend text-green">↑ +8.4% YoY</div>
                  </div>
                </div>
                <div className="rf-stat-card">
                  <div className="rf-stat-info">
                    <span className="rf-stat-label">Test Ride Conversion Rate</span>
                    <div className="rf-stat-value">42.6%</div>
                    <div className="rf-stat-trend text-green">↑ +5.1% QoQ</div>
                  </div>
                </div>
                <div className="rf-stat-card">
                  <div className="rf-stat-info">
                    <span className="rf-stat-label">Dealer Compliance Score</span>
                    <div className="rf-stat-value">98.5%</div>
                    <div className="rf-stat-trend text-green">↑ +1.2%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">Customer Feedback &amp; Reviews</h2>
                  <p className="rf-subview-sub">Real reviews submitted by verified two-wheeler buyers and service customers</p>
                </div>
              </div>

              <div className="rf-reviews-list">
                <div className="rf-review-item">
                  <div className="review-top">
                    <span className="review-author">Ravi Teja</span>
                    <span className="review-rating">5.0 ★★★★★</span>
                  </div>
                  <p className="review-text">
                    "Booked my Honda SP 125 through RideFlow. Got instant dealer connection, test ride at my doorstep, and delivery in 24 hours. Incredible platform!"
                  </p>
                  <span className="review-date">Nov 02, 2026 &bull; Verified Purchase</span>
                </div>
                <div className="rf-review-item">
                  <div className="review-top">
                    <span className="review-author">Sneha Reddy</span>
                    <span className="review-rating">5.0 ★★★★★</span>
                  </div>
                  <p className="review-text">
                    "The EMI options and exchange bonus on my old scooter made buying the TVS Apache RTR so seamless. Customer support answered all my questions within minutes."
                  </p>
                  <span className="review-date">Nov 01, 2026 &bull; Verified Purchase</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">System &amp; Order Notifications</h2>
                  <p className="rf-subview-sub">Real-time alerts regarding test-ride bookings, dealership allocations, and service updates</p>
                </div>
              </div>

              <div className="rf-notifications-list">
                <div className="rf-notif-item unread">
                  <div className="notif-icon-box bg-green-light">
                    <Bike size={18} className="text-green" />
                  </div>
                  <div className="notif-content">
                    <h4>New Booking Received (#RF1048)</h4>
                    <p>Ravi Teja booked Honda SP 125. Assigned to City Honda Prime Motors.</p>
                    <span className="notif-time">15 mins ago</span>
                  </div>
                </div>
                <div className="rf-notif-item unread">
                  <div className="notif-icon-box bg-green-light">
                    <Wrench size={18} className="text-green" />
                  </div>
                  <div className="notif-content">
                    <h4>Service Request Scheduled (#SR2084)</h4>
                    <p>Vijay Kumar scheduled General Service for Honda Shine at Apex TVS.</p>
                    <span className="notif-time">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="rf-subview">
              <div className="rf-subview-header">
                <div>
                  <h2 className="rf-subview-title">RideFlow Settings</h2>
                  <p className="rf-subview-sub">Configure platform parameters, regional dealer radius, and notification preferences</p>
                </div>
                <button onClick={() => alert('Settings updated successfully!')} className="rf-btn-primary">
                  <Check size={16} /> Save Changes
                </button>
              </div>

              <div className="rf-settings-form">
                <div className="rf-form-group">
                  <label>Brand / Platform Name</label>
                  <input type="text" defaultValue="RideFlow Automotive Technologies" className="rf-form-input" />
                </div>
                <div className="rf-form-group">
                  <label>Official Support Email</label>
                  <input type="email" defaultValue="support@rideflow.speshway.site" className="rf-form-input" />
                </div>
                <div className="rf-form-group">
                  <label>Dealer Discovery Radius (km)</label>
                  <input type="number" defaultValue="25" className="rf-form-input" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACTION MODALS */}
      {modalMode && (
        <div className="rf-modal-overlay" onClick={() => setModalMode(null)}>
          <div className="rf-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="rf-modal-header">
              <h3>
                {modalMode === 'add-bike' && 'Add New Bike'}
                {modalMode === 'create-offer' && 'Create Offer / Deal'}
                {modalMode === 'add-dealer' && 'Add Partner Dealer'}
                {modalMode === 'view-bookings' && 'Record New Booking'}
                {modalMode === 'manage-services' && 'Schedule Service Request'}
              </h3>
              <button onClick={() => setModalMode(null)} className="rf-modal-close-btn">
                <X size={18} />
              </button>
            </div>

            <div className="rf-modal-body">
              {modalMode === 'add-bike' && (
                <div className="rf-form">
                  <div className="rf-form-group">
                    <label>Bike Model Name</label>
                    <input type="text" placeholder="e.g. Yamaha R15 V4" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Category</label>
                    <select className="rf-form-input">
                      <option>Commuter Bikes</option>
                      <option>Sports Bikes</option>
                      <option>Cruisers</option>
                      <option>Scooters</option>
                      <option>Electric Bikes</option>
                    </select>
                  </div>
                  <div className="rf-form-row">
                    <div className="rf-form-group">
                      <label>Ex-Showroom Price (₹)</label>
                      <input type="text" placeholder="₹1,85,000" className="rf-form-input" />
                    </div>
                    <div className="rf-form-group">
                      <label>Mileage / Range</label>
                      <input type="text" placeholder="45 kmpl" className="rf-form-input" />
                    </div>
                  </div>
                </div>
              )}

              {modalMode === 'create-offer' && (
                <div className="rf-form">
                  <div className="rf-form-group">
                    <label>Offer Title</label>
                    <input type="text" placeholder="e.g. Year-End Mega Discount" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Discount Value</label>
                    <input type="text" placeholder="₹5,000 Cashback" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Applicable Models</label>
                    <input type="text" placeholder="All Commuter Bikes" className="rf-form-input" />
                  </div>
                </div>
              )}

              {modalMode === 'add-dealer' && (
                <div className="rf-form">
                  <div className="rf-form-group">
                    <label>Dealership Business Name</label>
                    <input type="text" placeholder="e.g. Star Motors" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Location / City</label>
                    <input type="text" placeholder="e.g. Kukatpally, Hyderabad" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Contact Number</label>
                    <input type="text" placeholder="+91 98490 12345" className="rf-form-input" />
                  </div>
                </div>
              )}

              {modalMode === 'view-bookings' && (
                <div className="rf-form">
                  <div className="rf-form-group">
                    <label>Customer Name</label>
                    <input type="text" placeholder="e.g. Ravi Teja" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Bike Model</label>
                    <input type="text" placeholder="e.g. Honda SP 125" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Booking Amount (₹)</label>
                    <input type="text" placeholder="₹95,000" className="rf-form-input" />
                  </div>
                </div>
              )}

              {modalMode === 'manage-services' && (
                <div className="rf-form">
                  <div className="rf-form-group">
                    <label>Customer Name</label>
                    <input type="text" placeholder="e.g. Vijay Kumar" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Bike Model</label>
                    <input type="text" placeholder="e.g. Honda Shine" className="rf-form-input" />
                  </div>
                  <div className="rf-form-group">
                    <label>Service Type</label>
                    <select className="rf-form-input">
                      <option>General Service</option>
                      <option>Periodic Service</option>
                      <option>Engine Check</option>
                      <option>Battery Replace</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="rf-modal-footer">
              <button onClick={() => setModalMode(null)} className="rf-btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Operation submitted successfully!');
                  setModalMode(null);
                }}
                className="rf-btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


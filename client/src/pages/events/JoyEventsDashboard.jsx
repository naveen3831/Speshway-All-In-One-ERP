import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Calendar,
  Ticket,
  Users,
  Store,
  Layers,
  LayoutGrid,
  Percent,
  CreditCard,
  BarChart3,
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
  DollarSign,
  Filter,
  Download,
  Info,
  CalendarDays,
  Shield,
  FileText,
  TrendingUp,
  Tag,
  Gift,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowLeft,
} from 'lucide-react';
import './JoyEventsDashboard.css';

// Joy Events Logo Brand Icon matching screenshot
const JoyEventsLogoIcon = () => (
  <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="joyGreenGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Calendar Binder Box */}
    <rect x="14" y="20" width="72" height="66" rx="14" fill="#0F172A" stroke="url(#joyGreenGrad)" strokeWidth="4" />
    {/* Spiral Rings */}
    <rect x="28" y="12" width="6" height="16" rx="3" fill="#10B981" />
    <rect x="66" y="12" width="6" height="16" rx="3" fill="#10B981" />
    {/* Top Calendar Header Bar */}
    <path d="M16 34 L84 34" stroke="#10B981" strokeWidth="3" />
    {/* Big Checkmark */}
    <path
      d="M34 56 L46 68 L68 44"
      stroke="#10B981"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const JoyEventsDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chartToggle, setChartToggle] = useState('bookings'); // 'bookings' or 'revenue'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Nov 03, 2026');
  const [modalMode, setModalMode] = useState(null); // 'create-event', 'add-vendor', 'create-package', 'manage-booking', 'send-notification'

  // 12 Navigation Items matching screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'bookings', label: 'Bookings', icon: Ticket, badge: '24' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'packages', label: 'Packages', icon: Layers },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'commissions', label: 'Commissions', icon: Percent },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Quick Action Items matching screenshot
  const quickActions = [
    { id: 'create-event', label: 'Create New Event', icon: Calendar, actionId: 'events' },
    { id: 'add-vendor', label: 'Add New Vendor', icon: Store, actionId: 'vendors' },
    { id: 'create-package', label: 'Create Package', icon: Layers, actionId: 'packages' },
    { id: 'manage-bookings', label: 'Manage Bookings', icon: Ticket, actionId: 'bookings' },
    { id: 'send-notification', label: 'Send Notification', icon: Bell, actionId: 'notifications' },
  ];

  // Recent Bookings (5 rows matching screenshot)
  const recentBookings = [
    {
      id: '#JE1048',
      customer: 'Ravi Teja',
      eventType: 'Wedding',
      date: 'Nov 15, 2026',
      amount: '₹4,50,000',
      status: 'Confirmed',
      statusClass: 'joy-status-confirmed',
    },
    {
      id: '#JE1047',
      customer: 'Sneha Reddy',
      eventType: 'Birthday Party',
      date: 'Nov 10, 2026',
      amount: '₹75,000',
      status: 'In Progress',
      statusClass: 'joy-status-progress',
    },
    {
      id: '#JE1046',
      customer: 'Arjun Kumar',
      eventType: 'Corporate Event',
      date: 'Nov 20, 2026',
      amount: '₹2,00,000',
      status: 'Confirmed',
      statusClass: 'joy-status-confirmed',
    },
    {
      id: '#JE1045',
      customer: 'Priya Mehta',
      eventType: 'Engagement',
      date: 'Nov 08, 2026',
      amount: '₹1,20,000',
      status: 'Pending',
      statusClass: 'joy-status-pending',
    },
    {
      id: '#JE1044',
      customer: 'Karthik Rao',
      eventType: 'Family Function',
      date: 'Nov 07, 2026',
      amount: '₹60,000',
      status: 'Completed',
      statusClass: 'joy-status-completed',
    },
  ];

  // Upcoming Events (5 rows matching screenshot with photo previews)
  const upcomingEvents = [
    {
      name: 'Wedding Ceremony',
      customer: 'Ravi Teja',
      date: 'Nov 15, 2026',
      venue: 'Grand Palace',
      status: 'Confirmed',
      statusClass: 'joy-status-confirmed',
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Corporate Meet',
      customer: 'Arjun Kumar',
      date: 'Nov 20, 2026',
      venue: 'ITC Convention',
      status: 'Scheduled',
      statusClass: 'joy-status-scheduled',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Birthday Celebration',
      customer: 'Sneha Reddy',
      date: 'Nov 10, 2026',
      venue: 'Joy Banquets',
      status: 'In Progress',
      statusClass: 'joy-status-progress',
      img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Engagement Event',
      customer: 'Priya Mehta',
      date: 'Nov 08, 2026',
      venue: 'Lake View Hall',
      status: 'Pending',
      statusClass: 'joy-status-pending',
      img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Family Gathering',
      customer: 'Karthik Rao',
      date: 'Nov 07, 2026',
      venue: 'Garden Resorts',
      status: 'Confirmed',
      statusClass: 'joy-status-confirmed',
      img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=120&q=80',
    },
  ];

  // Events by category static data matching screenshot donut
  const categoriesBreakdown = [
    { label: 'Weddings', pct: '34%', count: 43, color: '#059669' },
    { label: 'Birthday Parties', pct: '18%', count: 23, color: '#10b981' },
    { label: 'Corporate Events', pct: '16%', count: 20, color: '#34d399' },
    { label: 'Social Gatherings', pct: '12%', count: 15, color: '#6ee7b7' },
    { label: 'Concerts & Shows', pct: '10%', count: 13, color: '#a7f3d0' },
    { label: 'Other Events', pct: '10%', count: 12, color: '#cbd5e1' },
  ];

  // Full Events list for Events tab
  const allEventsList = [
    ...upcomingEvents,
    {
      name: 'Annual Tech Gala',
      customer: 'Tech Innovations Ltd',
      date: 'Nov 22, 2026',
      venue: 'HICC Novotel',
      status: 'Scheduled',
      statusClass: 'joy-status-scheduled',
      img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=120&q=80',
    },
    {
      name: 'Silver Jubilee Anniversary',
      customer: 'Venkatesh Rao',
      date: 'Nov 25, 2026',
      venue: 'Taj Krishna Lawns',
      status: 'Confirmed',
      statusClass: 'joy-status-confirmed',
      img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=120&q=80',
    },
  ];

  // Full Customers list for Customers tab
  const customersList = [
    { name: 'Ravi Teja', phone: '+91 98490 12345', email: 'ravi.teja@gmail.com', events: 3, totalSpent: '₹7,80,000', city: 'Hyderabad', status: 'VIP' },
    { name: 'Sneha Reddy', phone: '+91 99887 65432', email: 'sneha.reddy@yahoo.com', events: 2, totalSpent: '₹1,95,000', city: 'Secunderabad', status: 'Active' },
    { name: 'Arjun Kumar', phone: '+91 91234 56789', email: 'arjun.kumar@corp.com', events: 5, totalSpent: '₹6,40,000', city: 'Gachibowli', status: 'Corporate' },
    { name: 'Priya Mehta', phone: '+91 98765 43210', email: 'priya.mehta@outlook.com', events: 1, totalSpent: '₹1,20,000', city: 'Banjara Hills', status: 'New' },
    { name: 'Karthik Rao', phone: '+91 94401 23456', email: 'karthik.rao@gmail.com', events: 4, totalSpent: '₹3,50,000', city: 'Jubilee Hills', status: 'Active' },
    { name: 'Ananya Sharma', phone: '+91 97001 88990', email: 'ananya.sharma@gmail.com', events: 2, totalSpent: '₹2,10,000', city: 'Madhapur', status: 'Active' },
  ];

  // Full Vendors list for Vendors tab
  const vendorsList = [
    { name: 'Royal Palace Decorators', category: 'Decor & Lighting', contact: 'Mahesh V.', phone: '+91 98111 22334', rating: '4.9 ★', eventsDone: 42, commission: '12%' },
    { name: 'Saffron Grand Catering', category: 'Catering & Beverages', contact: 'Chef Sanjeev', phone: '+91 98222 33445', rating: '4.8 ★', eventsDone: 58, commission: '10%' },
    { name: 'LensCraft Cinematic Studio', category: 'Photography & Film', contact: 'Kiran Deep', phone: '+91 98333 44556', rating: '5.0 ★', eventsDone: 35, commission: '15%' },
    { name: 'SoundVibe DJ & Stage Audio', category: 'Sound & Entertainment', contact: 'DJ Sunny', phone: '+91 98444 55667', rating: '4.7 ★', eventsDone: 29, commission: '10%' },
    { name: 'Blossom Floral Designers', category: 'Flower & Stage Arch', contact: 'Meenakshi R.', phone: '+91 98555 66778', rating: '4.9 ★', eventsDone: 51, commission: '12%' },
  ];

  // Packages list for Packages tab
  const packagesList = [
    { title: 'Royal Wedding Extravaganza', category: 'Wedding', price: '₹5,50,000', includes: 'Full Stage Decor, 3-Course Banquet Catering, Drone Film, DJ, Welcome Girls', bookings: 18 },
    { title: 'Grand Birthday Carnival', category: 'Birthday', price: '₹85,000', includes: 'Themed Balloon Sculptures, Magic Show, Custom Cake 5kg, Sound System, Photo Booth', bookings: 34 },
    { title: 'Executive Corporate Summit', category: 'Corporate', price: '₹2,50,000', includes: 'LED Video Wall, Audio Rostrum, High Tea & Lunch, Live Webcast, Delegate Badges', bookings: 22 },
    { title: 'Floral Mandap & Muhurtham', category: 'Traditional', price: '₹1,80,000', includes: 'Fresh Jasmine & Rose Decor, Priest Chanting Mic Setup, Nadaswaram, Brass Urli', bookings: 15 },
  ];

  return (
    <div className="joy-wrapper">
      {/* 1. LEFT SIDEBAR (Dark Navy #0b1120 with Emerald Green Wave) */}
      <aside className="joy-sidebar">
        <div className="joy-sidebar-top">
          {/* Brand Header */}
        <div className="joy-brand">
          <div className="joy-logo-container">
            <JoyEventsLogoIcon />
          </div>
          <div className="joy-brand-text">
            <div className="joy-brand-row">
              <span className="brand-white">Joy</span>
              <span className="brand-emerald">Events</span>
            </div>
            <span className="joy-brand-subtitle">ADMIN PANEL</span>
          </div>
        </div>

        {/* Navigation Items (12 items) */}
        <nav className="joy-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`joy-nav-btn ${isActive ? 'active' : ''}`}
              >
                <div className="joy-nav-btn-left">
                  <Icon size={18} className="joy-nav-icon" />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="joy-nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        </div>

        {/* Sidebar Pinned Bottom */}
        <div className="joy-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="joy-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="joy-user-profile">
            <div className="joy-avatar">JE</div>
            <div className="joy-user-info">
              <span className="joy-user-name">Event Director</span>
              <span className="joy-user-role">Joy Events & Weddings HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT */}
      <div className="joy-main">
        {/* Top Navbar with Height 82px matching request */}
        <header className="joy-topbar">
          <div className="joy-topbar-left">
            <h1 className="joy-greeting-title">Good Morning, Admin 👋</h1>
            <p className="joy-greeting-subtitle">Here&apos;s what&apos;s happening at Joy Events today.</p>
          </div>

          <div className="joy-topbar-right">
            {/* Global Search Bar */}
            <div className="joy-search-box">
              <Search size={16} className="joy-search-icon" />
              <input
                type="text"
                placeholder="Search events, bookings, vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="joy-search-input"
              />
            </div>

            {/* Date Pill Dropdown */}
            <div className="joy-date-pill">
              <Calendar size={15} className="text-green" />
              <span>{selectedDate}</span>
              <ChevronDown size={14} />
            </div>

            {/* Notifications Bell with unread dot */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="joy-icon-btn"
              title="Joy Events Notifications"
            >
              <Bell size={19} />
              <span className="joy-unread-dot"></span>
            </button>

            {/* User Profile */}
            <div className="joy-user-profile">
              <span className="joy-user-name">Admin</span>
              <div className="joy-avatar">A</div>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Content */}
        <div className="joy-content">
          {/* TAB 1: MAIN DASHBOARD VIEW (EXACT MATCH TO SCREENSHOT) */}
          {activeTab === 'dashboard' && (
            <div className="joy-dashboard-view">
              {/* 5 KPI Stat Cards in a row */}
              <div className="joy-stats-grid">
                {/* 1. Total Events */}
                <div className="joy-stat-card">
                  <div className="joy-stat-icon-wrap bg-green-light">
                    <Calendar size={22} className="text-green" />
                  </div>
                  <div className="joy-stat-info">
                    <span className="joy-stat-label">Total Events</span>
                    <div className="joy-stat-value">126</div>
                    <div className="joy-stat-trend text-green">
                      <span>↑ +18% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 2. Total Bookings */}
                <div className="joy-stat-card">
                  <div className="joy-stat-icon-wrap bg-green-light">
                    <Ticket size={22} className="text-green" />
                  </div>
                  <div className="joy-stat-info">
                    <span className="joy-stat-label">Total Bookings</span>
                    <div className="joy-stat-value">318</div>
                    <div className="joy-stat-trend text-green">
                      <span>↑ +24% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 3. Total Customers */}
                <div className="joy-stat-card">
                  <div className="joy-stat-icon-wrap bg-green-light">
                    <Users size={22} className="text-green" />
                  </div>
                  <div className="joy-stat-info">
                    <span className="joy-stat-label">Total Customers</span>
                    <div className="joy-stat-value">982</div>
                    <div className="joy-stat-trend text-green">
                      <span>↑ +12% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 4. Total Vendors */}
                <div className="joy-stat-card">
                  <div className="joy-stat-icon-wrap bg-green-light">
                    <Store size={22} className="text-green" />
                  </div>
                  <div className="joy-stat-info">
                    <span className="joy-stat-label">Total Vendors</span>
                    <div className="joy-stat-value">76</div>
                    <div className="joy-stat-trend text-green">
                      <span>↑ +9% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 5. Total Revenue */}
                <div className="joy-stat-card">
                  <div className="joy-stat-icon-wrap bg-green-light">
                    <span className="joy-rupee-symbol">₹</span>
                  </div>
                  <div className="joy-stat-info">
                    <span className="joy-stat-label">Total Revenue</span>
                    <div className="joy-stat-value">₹12,48,000</div>
                    <div className="joy-stat-trend text-green">
                      <span>↑ +28% from last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Event Bookings Overview + Events by Category + Quick Actions */}
              <div className="joy-analytics-grid">
                {/* 1. Event Bookings Overview (Mixed Bar & Line Chart) */}
                <div className="joy-card joy-bookings-card">
                  <div className="joy-card-header">
                    <div className="joy-card-icon-title">
                      <BarChart3 size={20} className="text-green" />
                      <div>
                        <h3>Event Bookings Overview</h3>
                        <p className="joy-card-subtitle">Event bookings and revenue for the last 7 days</p>
                      </div>
                    </div>
                    <div className="joy-chart-toggles">
                      <button
                        onClick={() => setChartToggle('bookings')}
                        className={`joy-toggle-pill ${chartToggle === 'bookings' ? 'active' : ''}`}
                      >
                        Bookings
                      </button>
                      <button
                        onClick={() => setChartToggle('revenue')}
                        className={`joy-toggle-pill ${chartToggle === 'revenue' ? 'active' : ''}`}
                      >
                        Revenue
                      </button>
                    </div>
                  </div>

                  <div className="joy-chart-body">
                    <svg viewBox="0 0 420 220" className="joy-svg-chart">
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
                      {/* Mon: 24 (height = 24 * 2.66 = ~64, y = 180 - 64 = 116) */}
                      <rect x="54" y="116" width="30" height="64" rx="4" fill="#a7f3d0" />
                      <text x="69" y="110" textAnchor="middle" className="bar-number">24</text>
                      <text x="69" y="196" textAnchor="middle" className="chart-day-label">Mon</text>

                      {/* Tue: 28 (height = 74, y = 106) */}
                      <rect x="100" y="106" width="30" height="74" rx="4" fill="#a7f3d0" />
                      <text x="115" y="100" textAnchor="middle" className="bar-number">28</text>
                      <text x="115" y="196" textAnchor="middle" className="chart-day-label">Tue</text>

                      {/* Wed: 32 (height = 85, y = 95) */}
                      <rect x="146" y="95" width="30" height="85" rx="4" fill="#a7f3d0" />
                      <text x="161" y="89" textAnchor="middle" className="bar-number">32</text>
                      <text x="161" y="196" textAnchor="middle" className="chart-day-label">Wed</text>

                      {/* Thu: 30 (height = 80, y = 100) */}
                      <rect x="192" y="100" width="30" height="80" rx="4" fill="#a7f3d0" />
                      <text x="207" y="94" textAnchor="middle" className="bar-number">30</text>
                      <text x="207" y="196" textAnchor="middle" className="chart-day-label">Thu</text>

                      {/* Fri: 38 (height = 101, y = 79) */}
                      <rect x="238" y="79" width="30" height="101" rx="4" fill="#a7f3d0" />
                      <text x="253" y="73" textAnchor="middle" className="bar-number">38</text>
                      <text x="253" y="196" textAnchor="middle" className="chart-day-label">Fri</text>

                      {/* Sat: 46 (height = 122, y = 58) */}
                      <rect x="284" y="58" width="30" height="122" rx="4" fill="#a7f3d0" />
                      <text x="299" y="52" textAnchor="middle" className="bar-number">46</text>
                      <text x="299" y="196" textAnchor="middle" className="chart-day-label">Sat</text>

                      {/* Sun: 52 (height = 138, y = 42) */}
                      <rect x="330" y="42" width="30" height="138" rx="4" fill="#a7f3d0" />
                      <text x="345" y="36" textAnchor="middle" className="bar-number">52</text>
                      <text x="345" y="196" textAnchor="middle" className="chart-day-label">Sun</text>

                      {/* REVENUE LINE CURVE (-o- Revenue) */}
                      <path
                        d="M69 130 Q115 110, 161 95 T207 98 T253 70 T299 50 T345 35"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.2"
                      />
                      {/* Nodes on revenue line */}
                      <circle cx="69" cy="130" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="115" cy="115" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="161" cy="95" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="207" cy="98" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="253" cy="70" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="299" cy="50" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="345" cy="35" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                    </svg>

                    {/* Chart Legend matching screenshot */}
                    <div className="joy-chart-legend">
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

                {/* 2. Events by Category (Donut Chart) */}
                <div className="joy-card joy-category-card">
                  <div className="joy-card-header">
                    <div className="joy-card-icon-title">
                      <Calendar size={20} className="text-green" />
                      <div>
                        <h3>Events by Category</h3>
                      </div>
                    </div>
                  </div>

                  <div className="joy-donut-container">
                    <div className="donut-graphic-wrap">
                      <svg viewBox="0 0 160 160" className="donut-svg">
                        <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" />
                        {/* Weddings: 34% (115.6) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#059669"
                          strokeWidth="22"
                          strokeDasharray="115.6 340"
                          strokeDashoffset="0"
                        />
                        {/* Birthday Parties: 18% (61.2) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="22"
                          strokeDasharray="61.2 340"
                          strokeDashoffset="-115.6"
                        />
                        {/* Corporate Events: 16% (54.4) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="22"
                          strokeDasharray="54.4 340"
                          strokeDashoffset="-176.8"
                        />
                        {/* Social Gatherings: 12% (40.8) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#6ee7b7"
                          strokeWidth="22"
                          strokeDasharray="40.8 340"
                          strokeDashoffset="-231.2"
                        />
                        {/* Concerts & Shows: 10% (34) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#a7f3d0"
                          strokeWidth="22"
                          strokeDasharray="34 340"
                          strokeDashoffset="-272"
                        />
                        {/* Other Events: 10% (34) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="22"
                          strokeDasharray="34 340"
                          strokeDashoffset="-306"
                        />
                      </svg>
                      <div className="donut-center-text">
                        <span className="donut-num">126</span>
                        <span className="donut-sub">Events</span>
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
                <div className="joy-card joy-quick-actions-card">
                  <div className="joy-card-header">
                    <div className="joy-card-icon-title">
                      <span className="text-green font-bold text-lg">⚡</span>
                      <div>
                        <h3>Quick Actions</h3>
                      </div>
                    </div>
                  </div>

                  <div className="joy-actions-list">
                    {quickActions.map((qa) => {
                      const Icon = qa.icon;
                      return (
                        <button
                          key={qa.id}
                          onClick={() => setModalMode(qa.id)}
                          className="joy-action-row"
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

              {/* Bottom Row: Recent Bookings (Left) + Upcoming Events (Right) */}
              <div className="joy-bottom-grid">
                {/* 1. Recent Bookings Card */}
                <div className="joy-card joy-recent-bookings-card">
                  <div className="joy-card-header">
                    <div className="joy-card-icon-title">
                      <Ticket size={20} className="text-green" />
                      <div>
                        <h3>Recent Bookings</h3>
                        <p className="joy-card-subtitle">Latest 5 event bookings</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('bookings')} className="joy-btn-view-all">
                      View All &rarr;
                    </button>
                  </div>

                  <div className="joy-table-responsive">
                    <table className="joy-table">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Event Type</th>
                          <th>Event Date</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((bk) => (
                          <tr key={bk.id}>
                            <td className="joy-booking-id">{bk.id}</td>
                            <td className="joy-customer-name">{bk.customer}</td>
                            <td>{bk.eventType}</td>
                            <td>{bk.date}</td>
                            <td className="joy-amount-cell">{bk.amount}</td>
                            <td>
                              <span className={`joy-status-pill ${bk.statusClass}`}>
                                {bk.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Upcoming Events Card */}
                <div className="joy-card joy-upcoming-events-card">
                  <div className="joy-card-header">
                    <div className="joy-card-icon-title">
                      <Calendar size={20} className="text-green" />
                      <div>
                        <h3>Upcoming Events</h3>
                        <p className="joy-card-subtitle">Next 5 scheduled events</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('events')} className="joy-btn-view-all">
                      View All &rarr;
                    </button>
                  </div>

                  <div className="joy-table-responsive">
                    <table className="joy-table">
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Venue</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingEvents.map((evt, idx) => (
                          <tr key={idx}>
                            <td>
                              <div className="joy-event-cell">
                                <img
                                  src={evt.img}
                                  alt={evt.name}
                                  className="joy-event-thumb"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                                <span className="joy-event-title">{evt.name}</span>
                              </div>
                            </td>
                            <td>{evt.customer}</td>
                            <td>{evt.date}</td>
                            <td>{evt.venue}</td>
                            <td>
                              <span className={`joy-status-pill ${evt.statusClass}`}>
                                {evt.status}
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

          {/* TAB 2: EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">All Scheduled Events</h2>
                  <p className="joy-subview-sub">Manage and monitor all past and upcoming event reservations</p>
                </div>
                <button onClick={() => setModalMode('create-event')} className="joy-btn-primary">
                  <Plus size={16} /> Create New Event
                </button>
              </div>

              <div className="joy-table-responsive">
                <table className="joy-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Venue</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allEventsList.map((evt, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="joy-event-cell">
                            <img src={evt.img} alt={evt.name} className="joy-event-thumb" />
                            <span className="joy-event-title">{evt.name}</span>
                          </div>
                        </td>
                        <td>{evt.customer}</td>
                        <td>{evt.date}</td>
                        <td>{evt.venue}</td>
                        <td>
                          <span className={`joy-status-pill ${evt.statusClass}`}>{evt.status}</span>
                        </td>
                        <td>
                          <button onClick={() => alert(`Viewing details for ${evt.name}`)} className="joy-btn-sm">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">Bookings Registry</h2>
                  <p className="joy-subview-sub">Review incoming, confirmed, and completed client reservations</p>
                </div>
                <button onClick={() => setModalMode('manage-bookings')} className="joy-btn-primary">
                  <Plus size={16} /> New Booking
                </button>
              </div>

              <div className="joy-table-responsive">
                <table className="joy-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Event Type</th>
                      <th>Event Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((bk) => (
                      <tr key={bk.id}>
                        <td className="joy-booking-id">{bk.id}</td>
                        <td className="joy-customer-name">{bk.customer}</td>
                        <td>{bk.eventType}</td>
                        <td>{bk.date}</td>
                        <td className="joy-amount-cell">{bk.amount}</td>
                        <td>
                          <span className={`joy-status-pill ${bk.statusClass}`}>{bk.status}</span>
                        </td>
                        <td>
                          <button onClick={() => alert(`Editing booking ${bk.id}`)} className="joy-btn-sm">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS TAB */}
          {activeTab === 'customers' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">Client Directory</h2>
                  <p className="joy-subview-sub">Manage 982 client profiles, spending history, and booking activity</p>
                </div>
                <button onClick={() => alert('Add customer form')} className="joy-btn-primary">
                  <Plus size={16} /> Add Customer
                </button>
              </div>

              <div className="joy-table-responsive">
                <table className="joy-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th>Total Events</th>
                      <th>Total Spent</th>
                      <th>Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customersList.map((c, i) => (
                      <tr key={i}>
                        <td className="joy-customer-name">{c.name}</td>
                        <td>{c.phone}</td>
                        <td>{c.email}</td>
                        <td>{c.city}</td>
                        <td>{c.events}</td>
                        <td className="joy-amount-cell">{c.totalSpent}</td>
                        <td>
                          <span className="joy-status-pill joy-status-confirmed">{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: VENDORS TAB */}
          {activeTab === 'vendors' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">Vendors &amp; Suppliers</h2>
                  <p className="joy-subview-sub">76 partner vendors spanning decorators, caterers, sound, and lighting</p>
                </div>
                <button onClick={() => setModalMode('add-vendor')} className="joy-btn-primary">
                  <Plus size={16} /> Add New Vendor
                </button>
              </div>

              <div className="joy-table-responsive">
                <table className="joy-table">
                  <thead>
                    <tr>
                      <th>Vendor Name</th>
                      <th>Category</th>
                      <th>Contact Person</th>
                      <th>Phone</th>
                      <th>Rating</th>
                      <th>Events Completed</th>
                      <th>Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorsList.map((v, i) => (
                      <tr key={i}>
                        <td className="joy-customer-name">{v.name}</td>
                        <td>{v.category}</td>
                        <td>{v.contact}</td>
                        <td>{v.phone}</td>
                        <td className="joy-amount-cell">{v.rating}</td>
                        <td>{v.eventsDone}</td>
                        <td>{v.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PACKAGES TAB */}
          {activeTab === 'packages' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">Event Packages &amp; Bundles</h2>
                  <p className="joy-subview-sub">Pre-built event packages with catering, decor, and entertainment bundles</p>
                </div>
                <button onClick={() => setModalMode('create-package')} className="joy-btn-primary">
                  <Plus size={16} /> Create Package
                </button>
              </div>

              <div className="joy-packages-grid">
                {packagesList.map((pkg, i) => (
                  <div key={i} className="joy-package-card">
                    <div className="joy-package-header">
                      <span className="joy-package-tag">{pkg.category}</span>
                      <span className="joy-package-price">{pkg.price}</span>
                    </div>
                    <h3 className="joy-package-title">{pkg.title}</h3>
                    <p className="joy-package-desc">{pkg.includes}</p>
                    <div className="joy-package-footer">
                      <span>{pkg.bookings} Active Bookings</span>
                      <button onClick={() => alert(`Editing package ${pkg.title}`)} className="joy-btn-sm">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">Event Categories</h2>
                  <p className="joy-subview-sub">Classification and operational templates for event genres</p>
                </div>
                <button onClick={() => alert('New Category modal')} className="joy-btn-primary">
                  <Plus size={16} /> Add Category
                </button>
              </div>

              <div className="joy-categories-grid">
                {categoriesBreakdown.map((cat, i) => (
                  <div key={i} className="joy-category-card-item">
                    <div className="cat-color-bar" style={{ backgroundColor: cat.color }}></div>
                    <div className="cat-card-body">
                      <h3>{cat.label}</h3>
                      <p>{cat.count} Events Scheduled</p>
                      <span className="cat-pct-badge">{cat.pct} of total volume</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: COMMISSIONS TAB */}
          {activeTab === 'commissions' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">Partner Commissions</h2>
                  <p className="joy-subview-sub">Payout records and revenue share agreements with event vendors</p>
                </div>
              </div>

              <div className="joy-table-responsive">
                <table className="joy-table">
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Service Category</th>
                      <th>Agreed Split</th>
                      <th>Settled (This Month)</th>
                      <th>Pending Settlement</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="joy-customer-name">Royal Palace Decorators</td>
                      <td>Decor &amp; Lighting</td>
                      <td>12%</td>
                      <td className="joy-amount-cell">₹54,000</td>
                      <td>₹18,000</td>
                      <td><span className="joy-status-pill joy-status-confirmed">Active</span></td>
                    </tr>
                    <tr>
                      <td className="joy-customer-name">Saffron Grand Catering</td>
                      <td>Catering &amp; Beverages</td>
                      <td>10%</td>
                      <td className="joy-amount-cell">₹1,24,000</td>
                      <td>₹42,000</td>
                      <td><span className="joy-status-pill joy-status-confirmed">Active</span></td>
                    </tr>
                    <tr>
                      <td className="joy-customer-name">LensCraft Cinematic Studio</td>
                      <td>Photography &amp; Film</td>
                      <td>15%</td>
                      <td className="joy-amount-cell">₹36,000</td>
                      <td>₹12,000</td>
                      <td><span className="joy-status-pill joy-status-confirmed">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">Payment Settlements</h2>
                  <p className="joy-subview-sub">Invoices, UPI receipts, bank transfers, and advance deposits</p>
                </div>
                <button onClick={() => alert('Generate Invoice modal')} className="joy-btn-primary">
                  <Download size={16} /> Export Invoices
                </button>
              </div>

              <div className="joy-table-responsive">
                <table className="joy-table">
                  <thead>
                    <tr>
                      <th>Txn ID</th>
                      <th>Customer</th>
                      <th>Event</th>
                      <th>Method</th>
                      <th>Amount</th>
                      <th>Timestamp</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="joy-booking-id">TXN-88210</td>
                      <td>Ravi Teja</td>
                      <td>Wedding Ceremony</td>
                      <td>Bank Transfer (NEFT)</td>
                      <td className="joy-amount-cell">₹2,00,000</td>
                      <td>Nov 03, 2026 11:20 AM</td>
                      <td><span className="joy-status-pill joy-status-confirmed">Success</span></td>
                    </tr>
                    <tr>
                      <td className="joy-booking-id">TXN-88209</td>
                      <td>Sneha Reddy</td>
                      <td>Birthday Celebration</td>
                      <td>UPI (Google Pay)</td>
                      <td className="joy-amount-cell">₹50,000</td>
                      <td>Nov 03, 2026 09:45 AM</td>
                      <td><span className="joy-status-pill joy-status-confirmed">Success</span></td>
                    </tr>
                    <tr>
                      <td className="joy-booking-id">TXN-88208</td>
                      <td>Arjun Kumar</td>
                      <td>Corporate Meet</td>
                      <td>Corporate Card (Visa)</td>
                      <td className="joy-amount-cell">₹1,00,000</td>
                      <td>Nov 02, 2026 04:15 PM</td>
                      <td><span className="joy-status-pill joy-status-confirmed">Success</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: REPORTS & ANALYTICS TAB */}
          {activeTab === 'reports' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">Performance &amp; Financial Analytics</h2>
                  <p className="joy-subview-sub">Detailed revenue breakdowns, customer acquisition rates, and margin reports</p>
                </div>
                <button onClick={() => alert('Exporting PDF...')} className="joy-btn-primary">
                  <Download size={16} /> Download Monthly Audit
                </button>
              </div>

              <div className="joy-stats-grid">
                <div className="joy-stat-card">
                  <div className="joy-stat-info">
                    <span className="joy-stat-label">Net Operating Margin</span>
                    <div className="joy-stat-value">31.4%</div>
                    <div className="joy-stat-trend text-green">↑ +4.2% QoQ</div>
                  </div>
                </div>
                <div className="joy-stat-card">
                  <div className="joy-stat-info">
                    <span className="joy-stat-label">Average Booking Value</span>
                    <div className="joy-stat-value">₹1,84,000</div>
                    <div className="joy-stat-trend text-green">↑ +14% YoY</div>
                  </div>
                </div>
                <div className="joy-stat-card">
                  <div className="joy-stat-info">
                    <span className="joy-stat-label">Vendor Fulfillment Rate</span>
                    <div className="joy-stat-value">99.2%</div>
                    <div className="joy-stat-trend text-green">↑ +1.1%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">System &amp; Booking Alerts</h2>
                  <p className="joy-subview-sub">Real-time alerts regarding venue confirmations, vendor assignments, and deposits</p>
                </div>
                <button onClick={() => setModalMode('send-notification')} className="joy-btn-primary">
                  <Plus size={16} /> Broadcast Message
                </button>
              </div>

              <div className="joy-notifications-list">
                <div className="joy-notif-item unread">
                  <div className="notif-icon-box bg-green-light">
                    <Ticket size={18} className="text-green" />
                  </div>
                  <div className="notif-content">
                    <h4>New Booking Request Received (#JE1048)</h4>
                    <p>Ravi Teja booked Grand Palace for Wedding Ceremony on Nov 15, 2026. Deposit of ₹2,00,000 received.</p>
                    <span className="notif-time">10 mins ago</span>
                  </div>
                </div>
                <div className="joy-notif-item unread">
                  <div className="notif-icon-box bg-green-light">
                    <Store size={18} className="text-green" />
                  </div>
                  <div className="notif-content">
                    <h4>Vendor Assigned to Corporate Meet</h4>
                    <p>LensCraft Cinematic Studio accepted the photography contract for ITC Convention on Nov 20.</p>
                    <span className="notif-time">45 mins ago</span>
                  </div>
                </div>
                <div className="joy-notif-item unread">
                  <div className="notif-icon-box bg-green-light">
                    <Calendar size={18} className="text-green" />
                  </div>
                  <div className="notif-content">
                    <h4>Stage Layout Approved</h4>
                    <p>Client Sneha Reddy approved the floral arch and balloon theme for Joy Banquets.</p>
                    <span className="notif-time">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="joy-subview">
              <div className="joy-subview-header">
                <div>
                  <h2 className="joy-subview-title">System Settings</h2>
                  <p className="joy-subview-sub">Configure Joy Events company details, tax rates, payment gateways, and staff permissions</p>
                </div>
                <button onClick={() => alert('Settings saved successfully!')} className="joy-btn-primary">
                  <Check size={16} /> Save Changes
                </button>
              </div>

              <div className="joy-settings-form">
                <div className="joy-form-group">
                  <label>Company / Brand Name</label>
                  <input type="text" defaultValue="Joy Events Private Limited" className="joy-form-input" />
                </div>
                <div className="joy-form-group">
                  <label>Support Email Address</label>
                  <input type="email" defaultValue="support@joyevents.speshway.site" className="joy-form-input" />
                </div>
                <div className="joy-form-group">
                  <label>GSTIN / Tax ID</label>
                  <input type="text" defaultValue="36AAACJ8921P1Z4" className="joy-form-input" />
                </div>
                <div className="joy-form-group">
                  <label>Default Currency</label>
                  <input type="text" defaultValue="INR (₹)" disabled className="joy-form-input" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACTION MODALS */}
      {modalMode && (
        <div className="joy-modal-overlay" onClick={() => setModalMode(null)}>
          <div className="joy-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="joy-modal-header">
              <h3>
                {modalMode === 'create-event' && 'Create New Event'}
                {modalMode === 'add-vendor' && 'Add New Vendor'}
                {modalMode === 'create-package' && 'Create Event Package'}
                {modalMode === 'manage-bookings' && 'Manage Bookings'}
                {modalMode === 'send-notification' && 'Send Notification'}
              </h3>
              <button onClick={() => setModalMode(null)} className="joy-modal-close-btn">
                <X size={18} />
              </button>
            </div>

            <div className="joy-modal-body">
              {modalMode === 'create-event' && (
                <div className="joy-form">
                  <div className="joy-form-group">
                    <label>Event Name</label>
                    <input type="text" placeholder="e.g. Grand Wedding Reception" className="joy-form-input" />
                  </div>
                  <div className="joy-form-group">
                    <label>Customer Name</label>
                    <input type="text" placeholder="e.g. Ravi Teja" className="joy-form-input" />
                  </div>
                  <div className="joy-form-row">
                    <div className="joy-form-group">
                      <label>Date</label>
                      <input type="date" defaultValue="2026-11-15" className="joy-form-input" />
                    </div>
                    <div className="joy-form-group">
                      <label>Venue</label>
                      <input type="text" placeholder="e.g. Grand Palace" className="joy-form-input" />
                    </div>
                  </div>
                </div>
              )}

              {modalMode === 'add-vendor' && (
                <div className="joy-form">
                  <div className="joy-form-group">
                    <label>Vendor Business Name</label>
                    <input type="text" placeholder="e.g. Royal Decorators" className="joy-form-input" />
                  </div>
                  <div className="joy-form-group">
                    <label>Service Category</label>
                    <select className="joy-form-input">
                      <option>Decor &amp; Lighting</option>
                      <option>Catering &amp; Beverages</option>
                      <option>Photography &amp; Film</option>
                      <option>Sound &amp; DJ</option>
                    </select>
                  </div>
                  <div className="joy-form-group">
                    <label>Phone</label>
                    <input type="text" placeholder="+91 98490 12345" className="joy-form-input" />
                  </div>
                </div>
              )}

              {modalMode === 'create-package' && (
                <div className="joy-form">
                  <div className="joy-form-group">
                    <label>Package Title</label>
                    <input type="text" placeholder="e.g. Silver Wedding Package" className="joy-form-input" />
                  </div>
                  <div className="joy-form-group">
                    <label>Price (₹)</label>
                    <input type="text" placeholder="₹2,50,000" className="joy-form-input" />
                  </div>
                  <div className="joy-form-group">
                    <label>Services Included</label>
                    <textarea rows="3" placeholder="Stage decor, lighting, catering for 200 guests" className="joy-form-input" />
                  </div>
                </div>
              )}

              {modalMode === 'manage-bookings' && (
                <div className="joy-form">
                  <div className="joy-form-group">
                    <label>Select Booking</label>
                    <select className="joy-form-input">
                      <option>#JE1048 - Ravi Teja (Wedding)</option>
                      <option>#JE1047 - Sneha Reddy (Birthday)</option>
                      <option>#JE1046 - Arjun Kumar (Corporate)</option>
                    </select>
                  </div>
                  <div className="joy-form-group">
                    <label>Update Status</label>
                    <select className="joy-form-input">
                      <option>Confirmed</option>
                      <option>In Progress</option>
                      <option>Pending</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
              )}

              {modalMode === 'send-notification' && (
                <div className="joy-form">
                  <div className="joy-form-group">
                    <label>Recipient Group</label>
                    <select className="joy-form-input">
                      <option>All Clients</option>
                      <option>All Vendors</option>
                      <option>Event Managers</option>
                    </select>
                  </div>
                  <div className="joy-form-group">
                    <label>Notification Message</label>
                    <textarea rows="3" placeholder="Type your broadcast update..." className="joy-form-input" />
                  </div>
                </div>
              )}
            </div>

            <div className="joy-modal-footer">
              <button onClick={() => setModalMode(null)} className="joy-btn-secondary">
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Action submitted successfully!');
                  setModalMode(null);
                }}
                className="joy-btn-primary"
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


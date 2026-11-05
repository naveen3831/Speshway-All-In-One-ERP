import React, { useState } from 'react';
import {
  useNavigate,
  Link } from 'react-router-dom';
import {
  LayoutGrid,
  Calendar,
  Users,
  Scissors,
  Package,
  Crown,
  Inbox,
  Tag,
  CreditCard,
  TrendingUp,
  UserCheck,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Search,
  Filter,
  Plus,
  Check,
  CheckCircle,
  Clock,
  AlertTriangle,
  Info,
  DollarSign,
  BarChart3,
  Award,
  Sparkles,
  Download,
  Eye,
  ShieldCheck,
  Heart,
  Star,
  MapPin,
  Smile,
} from 'lucide-react';
import './SalonDashboard.css';

// SPY Salon Jubilee Hills Studio Circular Gold Emblem
const SpySalonLogoIcon = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="spyEmeraldGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <radialGradient id="spyBgGrad" cx="50" cy="50" r="45" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E293B" />
        <stop offset="1" stopColor="#0B1120" />
      </radialGradient>
    </defs>
    {/* Outer Gold Ring */}
    <circle cx="50" cy="50" r="46" stroke="url(#spyEmeraldGrad)" strokeWidth="3" fill="url(#spyBgGrad)" />
    <circle cx="50" cy="50" r="41" stroke="url(#spyEmeraldGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    {/* Monogram Silhouette & Shears */}
    <path
      d="M38 32 C38 26, 62 26, 62 32 C62 38, 48 40, 48 48 C48 56, 64 56, 64 64 C64 72, 36 72, 36 64"
      stroke="url(#spyEmeraldGrad)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Scissors Accent */}
    <path
      d="M44 48 L56 60 M56 48 L44 60"
      stroke="url(#spyEmeraldGrad)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="42" cy="62" r="3" stroke="url(#spyEmeraldGrad)" strokeWidth="1.5" />
    <circle cx="58" cy="62" r="3" stroke="url(#spyEmeraldGrad)" strokeWidth="1.5" />
    {/* Star spark */}
    <path d="M50 22L51.5 25.5L55 27L51.5 28.5L50 32L48.5 28.5L45 27L48.5 25.5Z" fill="url(#spyEmeraldGrad)" />
  </svg>
);

export const SalonDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chartMode, setChartMode] = useState('revenue'); // 'revenue' | 'bookings'
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [appointmentFilter, setAppointmentFilter] = useState('All');

  // Navigation Items matching the screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: 24 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'services', label: 'Services', icon: Scissors },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'memberships', label: 'Memberships', icon: Crown },
    { id: 'inventory', label: 'Inventory', icon: Inbox },
    { id: 'offers', label: 'Offers & Coupons', icon: Tag },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'users', label: 'Users & Roles', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Static Data: Top Booked Services (matching reference image)
  const topBookedServices = [
    {
      id: 1,
      name: 'Hair Cut & Styling',
      specs: 'Precision fade, layered cut & blow dry',
      bookings: 142,
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Facial & Skin Care',
      specs: 'Gold glow radiance & deep pore clean',
      bookings: 96,
      price: '₹1,499',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Hair Spa & Treatment',
      specs: 'Moroccan argan oil therapy & massage',
      bookings: 78,
      price: '₹1,299',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=80',
    },
  ];

  // Static Data: Recent Appointments
  const recentAppointments = [
    {
      id: '#APT-6184',
      customer: 'Ananya Sharma',
      service: 'Hair Cut & Styling',
      stylist: 'Rahul (Master Stylist)',
      amount: '₹599',
      payment: 'Paid',
      paymentMethod: 'UPI / PhonePe',
      status: 'Completed',
      time: 'Today, 04:30 PM',
    },
    {
      id: '#APT-6183',
      customer: 'Karthik Varma',
      service: 'Beard Grooming & Hair Spa',
      stylist: 'Danish (Beard Specialist)',
      amount: '₹899',
      payment: 'Paid',
      paymentMethod: 'Credit Card',
      status: 'In Service',
      time: 'Today, 05:15 PM',
    },
    {
      id: '#APT-6182',
      customer: 'Ritu Kapoor',
      service: 'Facial & Skin Care (Gold)',
      stylist: 'Priya (Skin Aesthetician)',
      amount: '₹1,499',
      payment: 'Paid',
      paymentMethod: 'Google Pay',
      status: 'Confirmed',
      time: 'Today, 06:00 PM',
    },
    {
      id: '#APT-6181',
      customer: 'Meera Iyer',
      service: 'Global Hair Color & Spa',
      stylist: 'Danish (Colorist)',
      amount: '₹2,499',
      payment: 'Pending',
      paymentMethod: 'Cash On Arrival',
      status: 'Confirmed',
      time: 'Tomorrow, 11:00 AM',
    },
    {
      id: '#APT-6180',
      customer: 'Rohan Joshi',
      service: 'Royal Grooming Package',
      stylist: 'Rahul (Master Stylist)',
      amount: '₹3,299',
      payment: 'Paid',
      paymentMethod: 'NetBanking',
      status: 'Completed',
      time: 'Yesterday, 07:00 PM',
    },
  ];

  // Static Data: Top Stylists & Staff Roster
  const topStylists = [
    {
      id: 1,
      name: 'Rahul M.',
      role: 'Master Creative Director',
      rating: 4.9,
      bookings: 42,
      specialty: 'Precision Haircuts & Texturing',
      available: true,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Priya S.',
      role: 'Senior Aesthetician',
      rating: 4.8,
      bookings: 36,
      specialty: 'Hydra-Facials & Skin Peels',
      available: true,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Danish K.',
      role: 'Senior Hair Colorist',
      rating: 4.9,
      bookings: 28,
      specialty: 'Balayage & Keratin Therapy',
      available: false,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
  ];

  // Static Data: Low Stock Salon Consumables
  const lowStockConsumables = [
    { name: 'Moroccan Argan Hair Serum 100ml', sku: 'SLN-SRM-01', left: 3, category: 'Hair Care' },
    { name: 'Herbal Radiance Facial Kit', sku: 'SLN-FCL-08', left: 4, category: 'Skincare' },
    { name: 'Keratin Deep Infusion Treatment', sku: 'SLN-KRT-04', left: 2, category: 'Spa Treatment' },
    { name: 'Nourishing Beard Conditioning Oil', sku: 'SLN-BRD-12', left: 5, category: 'Men Grooming' },
  ];

  // Static Data: Full Services Catalog for Services Tab
  const servicesList = [
    { id: 'SRV-01', name: 'Signature Hair Cut & Blow Dry', category: 'Hair', duration: '45 mins', price: '₹599', bookings: 340, status: 'Active' },
    { id: 'SRV-02', name: 'Advanced Hydra-Facial Glow', category: 'Skin', duration: '60 mins', price: '₹1,499', bookings: 210, status: 'Active' },
    { id: 'SRV-03', name: 'Moroccan Oil Deep Hair Spa', category: 'Hair Spa', duration: '50 mins', price: '₹1,299', bookings: 195, status: 'Active' },
    { id: 'SRV-04', name: 'Beard Sculpting & Hot Towel Treatment', category: 'Men', duration: '30 mins', price: '₹499', bookings: 160, status: 'Active' },
    { id: 'SRV-05', name: 'Keratin Smooth & Rebonding', category: 'Chemical', duration: '120 mins', price: '₹3,999', bookings: 88, status: 'Active' },
    { id: 'SRV-06', name: 'Bridal Radiance Pre-Care Package', category: 'Bridal', duration: '180 mins', price: '₹7,499', bookings: 45, status: 'Active' },
    { id: 'SRV-07', name: 'Aroma Scalp & Shoulder Massage', category: 'Wellness', duration: '40 mins', price: '₹899', bookings: 110, status: 'Active' },
  ];

  // Static Data: Memberships & Packages
  const membershipsList = [
    { name: 'Royal Platinum VIP', price: '₹19,999/yr', discount: '20% OFF all services', freeSpas: '4 Free Sessions', members: 48, status: 'Active' },
    { name: 'Gold Studio Club', price: '₹9,999/yr', discount: '15% OFF all services', freeSpas: '2 Free Sessions', members: 115, status: 'Active' },
    { name: 'Silver Grooming Pass', price: '₹4,999/6mo', discount: '10% OFF all services', freeSpas: '1 Free Session', members: 230, status: 'Active' },
  ];

  // Status Badge Helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
      case 'Paid':
      case 'Active':
        return <span className="salon-badge salon-badge-green">{status}</span>;
      case 'In Service':
      case 'Confirmed':
        return <span className="salon-badge salon-badge-blue">{status}</span>;
      case 'Pending':
        return <span className="salon-badge salon-badge-amber">{status}</span>;
      case 'Cancelled':
        return <span className="salon-badge salon-badge-red">{status}</span>;
      default:
        return <span className="salon-badge salon-badge-gray">{status}</span>;
    }
  };

  return (
    <div className="salon-wrapper">
      {/* 1. LEFT SIDEBAR */}
      <aside className="salon-sidebar">
        {/* Brand Header */}
        <div className="salon-brand">
          <div className="salon-logo-container">
            <SpySalonLogoIcon />
          </div>
          <div className="salon-brand-text">
            <div className="salon-brand-title">SPY SALON</div>
            <div className="salon-brand-subtitle">JUBILEE HILLS STUDIO</div>
            <div className="salon-brand-tag">ADMIN PANEL</div>
          </div>
        </div>

        {/* Sidebar Menu Options */}
        <nav className="salon-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`salon-nav-btn ${isActive ? 'active' : ''}`}
              >
                <div className="salon-nav-btn-left">
                  <Icon size={19} className="salon-nav-icon" />
                  <span className="salon-nav-label">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="salon-nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Decorative Gold Silk Wave at Sidebar Bottom */}
        <div className="salon-sidebar-gold-wave">
          <svg viewBox="0 0 250 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="salon-wave-svg">
            <path
              d="M0 50 Q70 10, 140 45 T250 30 L250 80 L0 80 Z"
              fill="url(#goldSilkGrad1)"
              opacity="0.8"
            />
            <path
              d="M0 65 Q80 30, 160 60 T250 45 L250 80 L0 80 Z"
              fill="url(#goldSilkGrad2)"
            />
            <defs>
              <linearGradient id="goldSilkGrad1" x1="0" y1="20" x2="250" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" stopOpacity="0.4" />
                <stop offset="0.5" stopColor="#D97706" stopOpacity="0.6" />
                <stop offset="1" stopColor="#78350F" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="goldSilkGrad2" x1="0" y1="40" x2="250" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D97706" />
                <stop offset="0.7" stopColor="#B45309" />
                <stop offset="1" stopColor="#451A03" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="salon-sidebar-footer">
          <button
            onClick={() => navigate('/product/saloon')}
            className="salon-logout-btn"
            title="Exit Admin Panel"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT */}
      <div className="salon-main">
        {/* Top Navbar matching 82px height */}
        <header className="salon-topbar">
          <div className="salon-topbar-left">
            <h1 className="salon-topbar-title">SPY Salon Management</h1>
            <div className="salon-status-pill">
              <span className="salon-status-dot"></span>
              <span className="salon-status-text">Operational</span>
            </div>
          </div>

          <div className="salon-topbar-right">
            <button
              onClick={() => navigate('/product/saloon')}
              className="salon-btn-back-services"
              title="Return to Services Page"
            >
              <ArrowLeft size={16} />
              <span>Back to Services</span>
            </button>

            <button className="salon-icon-btn" title="Notifications">
              <Bell size={20} />
              <span className="salon-unread-dot"></span>
            </button>

            <div className="salon-user-profile">
              <span className="salon-user-name">Admin</span>
              <div className="salon-avatar">S</div>
            </div>
          </div>
        </header>

        {/* Dynamic Content View */}
        <div className="salon-content">
          {/* TAB 1: MAIN DASHBOARD VIEW (EXACT MATCH TO REFERENCE IMAGE) */}
          {activeTab === 'dashboard' && (
            <div className="salon-dashboard-view">
              {/* Welcome Header & Date Range Filter */}
              <div className="salon-welcome-row">
                <div className="salon-welcome-left">
                  <h2 className="salon-welcome-title">Welcome back, Admin 👋</h2>
                  <p className="salon-welcome-subtitle">
                    Manage appointments, customers, services, staff, and salon operations in one place.
                  </p>
                </div>
                <div className="salon-welcome-right">
                  <div className="salon-date-picker-btn">
                    <Calendar size={16} />
                    <span>{dateRange}</span>
                    <ChevronDown size={15} />
                  </div>
                </div>
              </div>

              {/* 4 KPI Stat Cards */}
              <div className="salon-stats-grid">
                {/* 1. Total Bookings */}
                <div className="salon-stat-card">
                  <div className="salon-stat-icon-wrap bg-green-light">
                    <Calendar size={22} className="text-green" />
                  </div>
                  <div className="salon-stat-info">
                    <span className="salon-stat-label">Total Bookings</span>
                    <div className="salon-stat-value">248</div>
                    <div className="salon-stat-trend text-green">
                      <span>↑ +14% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 2. Total Customers */}
                <div className="salon-stat-card">
                  <div className="salon-stat-icon-wrap bg-blue-light">
                    <Users size={22} className="text-blue" />
                  </div>
                  <div className="salon-stat-info">
                    <span className="salon-stat-label">Total Customers</span>
                    <div className="salon-stat-value">1,426</div>
                    <div className="salon-stat-trend text-green">
                      <span>↑ +8% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 3. Total Services */}
                <div className="salon-stat-card">
                  <div className="salon-stat-icon-wrap bg-amber-light">
                    <Scissors size={22} className="text-amber" />
                  </div>
                  <div className="salon-stat-info">
                    <span className="salon-stat-label">Total Services</span>
                    <div className="salon-stat-value">86</div>
                    <div className="salon-stat-sub text-gray">
                      <span>12 service categories</span>
                    </div>
                  </div>
                </div>

                {/* 4. Total Revenue */}
                <div className="salon-stat-card">
                  <div className="salon-stat-icon-wrap bg-emerald-light">
                    <span className="salon-rupee-symbol">₹</span>
                  </div>
                  <div className="salon-stat-info">
                    <span className="salon-stat-label">Total Revenue</span>
                    <div className="salon-stat-value">₹52,430</div>
                    <div className="salon-stat-trend text-green">
                      <span>↑ +18% from last 7 days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Revenue Overview Area Chart & Top Booked Services */}
              <div className="salon-analytics-grid">
                {/* Revenue Overview Area Chart */}
                <div className="salon-card salon-chart-card">
                  <div className="salon-card-header">
                    <div className="salon-card-icon-title">
                      <BarChart3 size={20} className="text-green" />
                      <div>
                        <h3>Revenue Overview</h3>
                        <p className="salon-card-subtitle">Daily revenue and booking trends</p>
                      </div>
                    </div>

                    <div className="salon-chart-toggle">
                      <button
                        onClick={() => setChartMode('revenue')}
                        className={`salon-toggle-btn ${chartMode === 'revenue' ? 'active' : ''}`}
                      >
                        Revenue
                      </button>
                      <button
                        onClick={() => setChartMode('bookings')}
                        className={`salon-toggle-btn ${chartMode === 'bookings' ? 'active' : ''}`}
                      >
                        Bookings
                      </button>
                    </div>
                  </div>

                  {/* SVG Area Chart matching screenshot curve */}
                  <div className="salon-chart-body">
                    <div className="salon-chart-container">
                      <svg viewBox="0 0 700 240" className="salon-svg-chart">
                        <defs>
                          <linearGradient id="salonAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines */}
                        <line x1="60" y1="20" x2="680" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="55" x2="680" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="90" x2="680" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="125" x2="680" y2="125" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="160" x2="680" y2="160" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="195" x2="680" y2="195" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="210" x2="680" y2="210" stroke="#e2e8f0" />

                        {/* Y-Axis Labels matching screenshot */}
                        <text x="52" y="24" textAnchor="end" className="chart-label">₹60,000</text>
                        <text x="52" y="59" textAnchor="end" className="chart-label">₹50,000</text>
                        <text x="52" y="94" textAnchor="end" className="chart-label">₹40,000</text>
                        <text x="52" y="129" textAnchor="end" className="chart-label">₹30,000</text>
                        <text x="52" y="164" textAnchor="end" className="chart-label">₹20,000</text>
                        <text x="52" y="199" textAnchor="end" className="chart-label">₹10,000</text>
                        <text x="52" y="214" textAnchor="end" className="chart-label">₹0</text>

                        {/* Area Fill Curve */}
                        {/* Points: 
                            Oct 27 (x=95, y=190 [₹12k])
                            Oct 28 (x=185, y=168 [₹19k])
                            Oct 29 (x=275, y=125 [₹31k])
                            Oct 30 (x=365, y=140 [₹27k])
                            Oct 31 (x=455, y=105 [₹38k])
                            Nov 01 (x=545, y=100 [₹39.5k])
                            Nov 02 (x=640, y=42 [₹55k])
                        */}
                        <path
                          d="M95 190 C140 185, 145 168, 185 168 C225 168, 235 125, 275 125 C315 125, 325 140, 365 140 C405 140, 415 105, 455 105 C495 105, 505 100, 545 100 C585 100, 600 42, 640 42 L640 210 L95 210 Z"
                          fill="url(#salonAreaGrad)"
                        />

                        {/* Stroke Curve Line */}
                        <path
                          d="M95 190 C140 185, 145 168, 185 168 C225 168, 235 125, 275 125 C315 125, 325 140, 365 140 C405 140, 415 105, 455 105 C495 105, 505 100, 545 100 C585 100, 600 42, 640 42"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Data Points */}
                        <circle cx="95" cy="190" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="185" cy="168" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="275" cy="125" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="365" cy="140" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="455" cy="105" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="545" cy="100" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="640" cy="42" r="6" fill="#ffffff" stroke="#10b981" strokeWidth="3.5" />

                        {/* X-Axis Dates */}
                        <text x="95" y="230" textAnchor="middle" className="chart-date">Oct 27</text>
                        <text x="185" y="230" textAnchor="middle" className="chart-date">Oct 28</text>
                        <text x="275" y="230" textAnchor="middle" className="chart-date">Oct 29</text>
                        <text x="365" y="230" textAnchor="middle" className="chart-date">Oct 30</text>
                        <text x="455" y="230" textAnchor="middle" className="chart-date">Oct 31</text>
                        <text x="545" y="230" textAnchor="middle" className="chart-date">Nov 01</text>
                        <text x="640" y="230" textAnchor="middle" className="chart-date">Nov 02</text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Top Booked Services Card matching screenshot */}
                <div className="salon-card salon-top-services-card">
                  <div className="salon-card-header">
                    <div className="salon-card-icon-title">
                      <Award size={20} className="text-green" />
                      <div>
                        <h3>Top Booked Services</h3>
                        <p className="salon-card-subtitle">This week</p>
                      </div>
                    </div>
                  </div>

                  <div className="salon-top-services-list">
                    {topBookedServices.map((srv) => (
                      <div key={srv.id} className="salon-top-service-item">
                        <div className="salon-service-img-box">
                          <img
                            src={srv.image}
                            alt={srv.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<div class="service-fallback-icon">✂️</div>';
                            }}
                          />
                        </div>
                        <div className="salon-service-details">
                          <h4 className="salon-service-name">{srv.name}</h4>
                          <span className="salon-service-bookings">{srv.bookings} bookings</span>
                        </div>
                        <div className="salon-service-price-tag">{srv.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower Section: Recent Bookings & Staff/Inventory */}
              <div className="salon-bottom-grid">
                {/* Recent Bookings Table */}
                <div className="salon-card salon-recent-bookings-card">
                  <div className="salon-card-header">
                    <div className="salon-card-icon-title">
                      <Calendar size={20} className="text-green" />
                      <div>
                        <h3>Recent Bookings</h3>
                        <p className="salon-card-subtitle">Live walk-ins and booked studio sessions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('appointments')}
                      className="salon-btn-view-all"
                    >
                      View All Bookings &rarr;
                    </button>
                  </div>

                  <div className="salon-table-responsive">
                    <table className="salon-table">
                      <thead>
                        <tr>
                          <th>BOOKING ID</th>
                          <th>CLIENT</th>
                          <th>SERVICE &amp; STYLIST</th>
                          <th>AMOUNT</th>
                          <th>PAYMENT</th>
                          <th>STATUS</th>
                          <th>TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentAppointments.map((apt) => (
                          <tr key={apt.id}>
                            <td className="font-semibold text-green">{apt.id}</td>
                            <td>
                              <div className="salon-client-cell">
                                <span className="salon-client-name">{apt.customer}</span>
                              </div>
                            </td>
                            <td>
                              <div className="salon-service-cell">
                                <span className="font-semibold">{apt.service}</span>
                                <span className="salon-stylist-sub">{apt.stylist}</span>
                              </div>
                            </td>
                            <td className="font-semibold">{apt.amount}</td>
                            <td>{renderStatusBadge(apt.payment)}</td>
                            <td>{renderStatusBadge(apt.status)}</td>
                            <td className="text-muted text-sm">{apt.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top Stylists & Salon Inventory */}
                <div className="salon-card salon-stylists-card">
                  <div className="salon-card-header">
                    <div className="salon-card-icon-title">
                      <Star size={20} className="text-amber" />
                      <div>
                        <h3>Senior Stylists</h3>
                        <p className="salon-card-subtitle">Chairs &amp; active roster</p>
                      </div>
                    </div>
                  </div>

                  <div className="salon-stylists-list">
                    {topStylists.map((st) => (
                      <div key={st.id} className="salon-stylist-item">
                        <div className="salon-stylist-avatar-wrap">
                          <img
                            src={st.image}
                            alt={st.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<div class="avatar-fallback">✂️</div>';
                            }}
                          />
                        </div>
                        <div className="salon-stylist-info">
                          <div className="salon-stylist-name-row">
                            <h4 className="salon-stylist-name">{st.name}</h4>
                            <span className="salon-rating-tag">⭐ {st.rating}</span>
                          </div>
                          <span className="salon-stylist-role">{st.role}</span>
                          <span className="salon-stylist-bookings">{st.bookings} bookings this week</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Low Stock Alert */}
                  <div className="salon-quick-alert-box">
                    <div className="alert-head">
                      <AlertTriangle size={16} className="text-amber" />
                      <span>Low Consumables (3 items)</span>
                    </div>
                    <p className="alert-desc">Moroccan Argan Serum &amp; Keratin Kits require immediate replenishment.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Info Banner */}
              <div className="salon-info-banner">
                <Info size={18} className="text-green" />
                <p>
                  <strong>SPY Salon – Jubilee Hills Studio Luxury Salon &amp; Wellness ERP</strong> &nbsp;|&nbsp;
                  Manage appointments, stylist rosters, service packages, customer loyalty, and salon billing seamlessly.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="salon-appointments-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Appointments &amp; Schedule</h2>
                  <p className="salon-section-subtitle">Real-time chair scheduling, walk-ins, and online booking pipeline</p>
                </div>
                <button className="salon-btn-primary">
                  <Plus size={16} />
                  <span>Book Appointment</span>
                </button>
              </div>

              <div className="salon-filter-bar">
                <div className="salon-search-input-wrap">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search client name, phone or booking ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="salon-filter-pills">
                  {['All', 'Confirmed', 'In Service', 'Completed', 'Pending'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setAppointmentFilter(status)}
                      className={`salon-pill-btn ${appointmentFilter === status ? 'active' : ''}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="salon-card">
                <div className="salon-table-responsive">
                  <table className="salon-table">
                    <thead>
                      <tr>
                        <th>BOOKING ID</th>
                        <th>CLIENT</th>
                        <th>SERVICE</th>
                        <th>STYLIST</th>
                        <th>AMOUNT</th>
                        <th>PAYMENT</th>
                        <th>STATUS</th>
                        <th>APPOINTMENT TIME</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentAppointments
                        .filter((a) => appointmentFilter === 'All' || a.status === appointmentFilter)
                        .map((apt) => (
                          <tr key={apt.id}>
                            <td className="font-semibold text-green">{apt.id}</td>
                            <td className="font-semibold">{apt.customer}</td>
                            <td>{apt.service}</td>
                            <td>{apt.stylist}</td>
                            <td className="font-semibold">{apt.amount}</td>
                            <td>{renderStatusBadge(apt.payment)}</td>
                            <td>{renderStatusBadge(apt.status)}</td>
                            <td>{apt.time}</td>
                            <td>
                              <button className="salon-table-action-btn">Manage</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMERS DIRECTORY */}
          {activeTab === 'customers' && (
            <div className="salon-customers-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Client Directory</h2>
                  <p className="salon-section-subtitle">1,426 VIP patrons, visit frequency, preferences, and loyalty spend</p>
                </div>
                <button className="salon-btn-primary">
                  <Plus size={16} />
                  <span>Register Client</span>
                </button>
              </div>

              <div className="salon-card">
                <div className="salon-table-responsive">
                  <table className="salon-table">
                    <thead>
                      <tr>
                        <th>CLIENT</th>
                        <th>PHONE</th>
                        <th>MEMBERSHIP TIER</th>
                        <th>VISITS</th>
                        <th>LIFETIME SPEND</th>
                        <th>PREFERRED STYLIST</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-semibold">Ananya Sharma</td>
                        <td>+91 98765 43210</td>
                        <td><span className="salon-badge salon-badge-green">Royal Platinum VIP</span></td>
                        <td>14 visits</td>
                        <td className="font-semibold text-green">₹28,400</td>
                        <td>Rahul (Creative Dir.)</td>
                        <td><span className="salon-badge salon-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Karthik Varma</td>
                        <td>+91 98123 45678</td>
                        <td><span className="salon-badge salon-badge-blue">Gold Studio Club</span></td>
                        <td>8 visits</td>
                        <td className="font-semibold text-green">₹14,200</td>
                        <td>Danish (Grooming)</td>
                        <td><span className="salon-badge salon-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Ritu Kapoor</td>
                        <td>+91 97654 32109</td>
                        <td><span className="salon-badge salon-badge-green">Royal Platinum VIP</span></td>
                        <td>19 visits</td>
                        <td className="font-semibold text-green">₹42,850</td>
                        <td>Priya (Aesthetician)</td>
                        <td><span className="salon-badge salon-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES CATALOG */}
          {activeTab === 'services' && (
            <div className="salon-services-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Salon Services Menu</h2>
                  <p className="salon-section-subtitle">86 bespoke treatments, hair therapies, styling, and groom rates</p>
                </div>
                <button className="salon-btn-primary">
                  <Plus size={16} />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="salon-card">
                <div className="salon-table-responsive">
                  <table className="salon-table">
                    <thead>
                      <tr>
                        <th>CODE</th>
                        <th>SERVICE NAME</th>
                        <th>CATEGORY</th>
                        <th>DURATION</th>
                        <th>PRICE</th>
                        <th>TOTAL BOOKINGS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesList.map((s) => (
                        <tr key={s.id}>
                          <td className="font-mono text-muted">{s.id}</td>
                          <td className="font-semibold">{s.name}</td>
                          <td><span className="salon-badge salon-badge-gray">{s.category}</span></td>
                          <td>{s.duration}</td>
                          <td className="font-semibold text-green">{s.price}</td>
                          <td>{s.bookings} times</td>
                          <td>{renderStatusBadge(s.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PACKAGES */}
          {activeTab === 'packages' && (
            <div className="salon-packages-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Bridal &amp; Wellness Packages</h2>
                  <p className="salon-section-subtitle">Bundled treatment sessions for weddings, parties, and rejuvenation</p>
                </div>
                <button className="salon-btn-primary">
                  <Plus size={16} />
                  <span>Create Package</span>
                </button>
              </div>

              <div className="salon-packages-grid">
                <div className="salon-card salon-pkg-card">
                  <div className="salon-pkg-tag">Most Popular</div>
                  <h3 className="salon-pkg-title">Royal Grooming Suite</h3>
                  <div className="salon-pkg-price">₹3,299 <span>/ session</span></div>
                  <ul className="salon-pkg-list">
                    <li>✓ Precision Haircut &amp; Scalp Detox</li>
                    <li>✓ Moroccan Oil Hair Spa with Steam</li>
                    <li>✓ Royal Shave with Hot Herbal Towel</li>
                    <li>✓ Charcoal Detan Radiance Pack</li>
                  </ul>
                  <button className="salon-btn-primary" style={{ width: '100%', marginTop: '14px' }}>Book for Client</button>
                </div>

                <div className="salon-card salon-pkg-card gold-border">
                  <div className="salon-pkg-tag gold">Bridal Premium</div>
                  <h3 className="salon-pkg-title">Radiant Bridal Glow</h3>
                  <div className="salon-pkg-price">₹7,499 <span>/ session</span></div>
                  <ul className="salon-pkg-list">
                    <li>✓ 24K Gold Crystal Radiance Facial</li>
                    <li>✓ Keratin Moisture Infusion Spa</li>
                    <li>✓ Full Body Exfoliation &amp; Polishing</li>
                    <li>✓ Deluxe Manicure &amp; Pedicure</li>
                  </ul>
                  <button className="salon-btn-primary" style={{ width: '100%', marginTop: '14px' }}>Book for Client</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MEMBERSHIPS */}
          {activeTab === 'memberships' && (
            <div className="salon-memberships-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Loyalty Club Memberships</h2>
                  <p className="salon-section-subtitle">Recurring tier plans with discount privileges and VIP priority bookings</p>
                </div>
                <button className="salon-btn-primary">
                  <Plus size={16} />
                  <span>New Membership Plan</span>
                </button>
              </div>

              <div className="salon-card">
                <div className="salon-table-responsive">
                  <table className="salon-table">
                    <thead>
                      <tr>
                        <th>MEMBERSHIP TIER</th>
                        <th>ANNUAL FEE</th>
                        <th>SERVICE DISCOUNT</th>
                        <th>COMPLIMENTARY SERVICES</th>
                        <th>ACTIVE SUBSCRIBERS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {membershipsList.map((m, idx) => (
                        <tr key={idx}>
                          <td className="font-semibold text-green">{m.name}</td>
                          <td className="font-semibold">{m.price}</td>
                          <td><span className="salon-badge salon-badge-green">{m.discount}</span></td>
                          <td>{m.freeSpas}</td>
                          <td>{m.members} active clients</td>
                          <td>{renderStatusBadge(m.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="salon-inventory-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Salon Consumables &amp; Retail Stock</h2>
                  <p className="salon-section-subtitle">Shampoos, professional color tubes, spa oils, and skincare kits</p>
                </div>
                <button className="salon-btn-primary">
                  <Download size={16} />
                  <span>Inventory Audit Report</span>
                </button>
              </div>

              <div className="salon-card">
                <div className="salon-table-responsive">
                  <table className="salon-table">
                    <thead>
                      <tr>
                        <th>ITEM NAME</th>
                        <th>SKU</th>
                        <th>CATEGORY</th>
                        <th>STOCK LEVEL</th>
                        <th>MIN THRESHOLD</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lowStockConsumables.map((item, idx) => (
                        <tr key={idx}>
                          <td className="font-semibold">{item.name}</td>
                          <td className="font-mono text-muted">{item.sku}</td>
                          <td>{item.category}</td>
                          <td className="text-amber font-semibold">{item.left} units left</td>
                          <td>10 units</td>
                          <td><span className="salon-badge salon-badge-red">Urgent Reorder</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: OFFERS & COUPONS */}
          {activeTab === 'offers' && (
            <div className="salon-offers-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Salon Coupons &amp; Festival Deals</h2>
                  <p className="salon-section-subtitle">Promotional discount vouchers for Jubilee Hills clients</p>
                </div>
                <button className="salon-btn-primary">
                  <Plus size={16} />
                  <span>Create Promo Code</span>
                </button>
              </div>

              <div className="salon-card">
                <div className="salon-table-responsive">
                  <table className="salon-table">
                    <thead>
                      <tr>
                        <th>COUPON CODE</th>
                        <th>DISCOUNT</th>
                        <th>MIN BILL</th>
                        <th>VALID UNTIL</th>
                        <th>REDEMPTIONS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono font-bold text-green">SPYGROW20</td>
                        <td>20% OFF</td>
                        <td>₹1,499</td>
                        <td>30 Nov 2026</td>
                        <td>142 times</td>
                        <td><span className="salon-badge salon-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-mono font-bold text-green">FIRSTGLOW</td>
                        <td>Flat ₹300 OFF</td>
                        <td>₹999</td>
                        <td>31 Dec 2026</td>
                        <td>380 times</td>
                        <td><span className="salon-badge salon-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="salon-payments-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Billing &amp; Studio POS Log</h2>
                  <p className="salon-section-subtitle">Split payments, UPI receipts, tips, and daily till balance</p>
                </div>
                <button className="salon-btn-primary">
                  <Download size={16} />
                  <span>Export Till Settlement</span>
                </button>
              </div>

              <div className="salon-card">
                <div className="salon-table-responsive">
                  <table className="salon-table">
                    <thead>
                      <tr>
                        <th>RECEIPT ID</th>
                        <th>CLIENT</th>
                        <th>MODE</th>
                        <th>AMOUNT</th>
                        <th>STYLIST TIP</th>
                        <th>STATUS</th>
                        <th>TIME</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono font-semibold">REC-8921</td>
                        <td>Ananya Sharma</td>
                        <td>UPI / PhonePe</td>
                        <td className="font-semibold text-green">₹599</td>
                        <td>₹50</td>
                        <td><span className="salon-badge salon-badge-green">Settled</span></td>
                        <td>Today, 04:45 PM</td>
                      </tr>
                      <tr>
                        <td className="font-mono font-semibold">REC-8920</td>
                        <td>Karthik Varma</td>
                        <td>HDFC Card POS</td>
                        <td className="font-semibold text-green">₹899</td>
                        <td>₹100</td>
                        <td><span className="salon-badge salon-badge-green">Settled</span></td>
                        <td>Today, 05:30 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: REPORTS */}
          {activeTab === 'reports' && (
            <div className="salon-reports-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Performance Analytics</h2>
                  <p className="salon-section-subtitle">Chair utilization, revenue per stylist, and retention rates</p>
                </div>
                <button className="salon-btn-primary">
                  <Download size={16} />
                  <span>Download Monthly Report</span>
                </button>
              </div>

              <div className="salon-stats-grid">
                <div className="salon-stat-card">
                  <div className="salon-stat-info">
                    <span className="salon-stat-label">Chair Occupancy Rate</span>
                    <div className="salon-stat-value">84.2%</div>
                    <div className="salon-stat-trend text-green">↑ +6.5% vs last month</div>
                  </div>
                </div>
                <div className="salon-stat-card">
                  <div className="salon-stat-info">
                    <span className="salon-stat-label">Repeat Client Ratio</span>
                    <div className="salon-stat-value">71.8%</div>
                    <div className="salon-stat-trend text-green">↑ +4.2% high loyalty</div>
                  </div>
                </div>
                <div className="salon-stat-card">
                  <div className="salon-stat-info">
                    <span className="salon-stat-label">Average Ticket Size</span>
                    <div className="salon-stat-value">₹1,140</div>
                    <div className="salon-stat-trend text-green">↑ +12.0% upselling</div>
                  </div>
                </div>
                <div className="salon-stat-card">
                  <div className="salon-stat-info">
                    <span className="salon-stat-label">Staff Productivity Score</span>
                    <div className="salon-stat-value">92 / 100</div>
                    <div className="salon-stat-trend text-green">⭐ Outstanding</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="salon-users-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Staff Members &amp; Stylist Access</h2>
                  <p className="salon-section-subtitle">Front-desk receptionists, senior stylists, and studio managers</p>
                </div>
                <button className="salon-btn-primary">
                  <Plus size={16} />
                  <span>Add Staff Member</span>
                </button>
              </div>

              <div className="salon-card">
                <div className="salon-table-responsive">
                  <table className="salon-table">
                    <thead>
                      <tr>
                        <th>STAFF MEMBER</th>
                        <th>ROLE</th>
                        <th>ACCESS LEVEL</th>
                        <th>PHONE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Studio Admin</strong><br/><span className="text-muted text-sm">admin@spysalon.com</span></td>
                        <td><span className="salon-badge salon-badge-green">General Manager</span></td>
                        <td>Full Control (Finance, Services, Staff)</td>
                        <td>+91 99887 76655</td>
                        <td><span className="salon-badge salon-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td><strong>Rahul M.</strong><br/><span className="text-muted text-sm">rahul@spysalon.com</span></td>
                        <td><span className="salon-badge salon-badge-blue">Master Stylist</span></td>
                        <td>Bookings, Appointments, Till POS</td>
                        <td>+91 98765 11223</td>
                        <td><span className="salon-badge salon-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="salon-settings-view">
              <div className="salon-section-header">
                <div>
                  <h2 className="salon-section-title">Studio Settings</h2>
                  <p className="salon-section-subtitle">Jubilee Hills branch hours, chair capacity, tax, and SMS alerts</p>
                </div>
                <button className="salon-btn-primary">
                  <Check size={16} />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="salon-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Studio Name</label>
                    <input
                      type="text"
                      defaultValue="SPY Salon - Jubilee Hills Studio"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Operating Hours</label>
                    <input
                      type="text"
                      defaultValue="09:00 AM - 09:30 PM (Mon - Sun)"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Total Styling Chairs</label>
                    <input
                      type="number"
                      defaultValue="12"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

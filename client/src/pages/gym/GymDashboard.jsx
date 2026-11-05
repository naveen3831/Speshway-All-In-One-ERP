import React, { useState } from 'react';
import {
  LayoutGrid,
  Users,
  UserCheck,
  Dumbbell,
  Crown,
  Calendar,
  CreditCard,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  ArrowLeft,
  Plus,
  Check,
  Award,
  Download,
  Info,
  Clock,
  Flame,
  Activity,
  HeartPulse,
} from 'lucide-react';
import './GymDashboard.css';

// American Fitness Gym Dumbbell Emblem Logo
const GymLogoIcon = () => (
  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gymEmeraldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="gymPlateGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F1F5F9" />
        <stop offset="1" stopColor="#94A3B8" />
      </linearGradient>
    </defs>
    {/* Left Weight Plates */}
    <rect x="12" y="30" width="8" height="40" rx="3" fill="url(#gymEmeraldGrad)" />
    <rect x="22" y="24" width="7" height="52" rx="3" fill="#10B981" />
    <rect x="31" y="34" width="5" height="32" rx="2" fill="url(#gymPlateGrad)" />
    
    {/* Main Barbell Rod */}
    <rect x="36" y="47" width="28" height="6" rx="2" fill="#FFFFFF" />
    
    {/* Right Weight Plates */}
    <rect x="64" y="34" width="5" height="32" rx="2" fill="url(#gymPlateGrad)" />
    <rect x="71" y="24" width="7" height="52" rx="3" fill="#10B981" />
    <rect x="80" y="30" width="8" height="40" rx="3" fill="url(#gymEmeraldGrad)" />

    {/* Center Circular Badge */}
    <circle cx="50" cy="50" r="16" fill="#0B1120" stroke="#10B981" strokeWidth="2.5" />
    
    {/* Inner Barbell & 3 Stars */}
    <path d="M45 42L46 43.5L47.5 43.5L46.3 44.5L46.7 46L45 45L43.3 46L43.7 44.5L42.5 43.5L44 43.5Z" fill="#34D399" />
    <path d="M50 40L51 41.5L52.5 41.5L51.3 42.5L51.7 44L50 43L48.3 44L48.7 42.5L47.5 41.5L49 41.5Z" fill="#34D399" />
    <path d="M55 42L56 43.5L57.5 43.5L56.3 44.5L56.7 46L55 45L53.3 46L53.7 44.5L52.5 43.5L54 43.5Z" fill="#34D399" />
    
    {/* Mini Dumbbell in Center */}
    <rect x="42" y="52" width="2.5" height="9" rx="1" fill="#34D399" />
    <rect x="55.5" y="52" width="2.5" height="9" rx="1" fill="#34D399" />
    <rect x="43" y="55.5" width="14" height="2" fill="#FFFFFF" />
  </svg>
);

export const GymDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chartMode, setChartMode] = useState('revenue'); // 'revenue' | 'memberships'
  const [dateRange, setDateRange] = useState('Last 7 Days');

  // Sidebar navigation options matching user screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'trainers', label: 'Trainers', icon: UserCheck },
    { id: 'classes', label: 'Classes', icon: Dumbbell },
    { id: 'memberships', label: 'Memberships', icon: Crown },
    { id: 'bookings', label: 'Bookings', icon: Calendar, badge: '24' },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle2 },
    { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'users', label: 'Users & Roles', icon: ShieldCheck },
    { id: 'equipment', label: 'Gym Equipment & Service', icon: Activity },
    { id: 'nutrition', label: 'Diet & Supplements', icon: HeartPulse },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Static Data: Top Classes matching screenshot
  const topClasses = [
    {
      id: 1,
      name: 'Strength Training',
      bookings: '142 bookings',
      price: '₹599',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Yoga & Flexibility',
      bookings: '96 bookings',
      price: '₹499',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Cardio HIIT',
      bookings: '78 bookings',
      price: '₹699',
      image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=160&auto=format&fit=crop&q=80',
    },
  ];

  // Static Data: Recent Member Check-ins & Bookings
  const recentBookings = [
    {
      id: '#BK-9281',
      member: 'Rohit Sharma',
      plan: 'Platinum VIP Annual',
      classType: 'Strength Training (Pro)',
      trainer: 'Vikram Rajput',
      time: 'Today, 06:30 AM',
      amount: '₹599',
      status: 'Completed',
    },
    {
      id: '#BK-9282',
      member: 'Ananya Reddy',
      plan: 'Gold Flexi Monthly',
      classType: 'Vinyasa Flow Yoga',
      trainer: 'Pooja Hegde',
      time: 'Today, 07:15 AM',
      amount: '₹499',
      status: 'In Progress',
    },
    {
      id: '#BK-9283',
      member: 'Kabir Verma',
      plan: 'Silver Regular',
      classType: 'Cardio HIIT & Spin',
      trainer: 'Aryan Malhotra',
      time: 'Today, 08:00 AM',
      amount: '₹699',
      status: 'Confirmed',
    },
    {
      id: '#BK-9284',
      member: 'Sneha Patel',
      plan: 'Platinum VIP Annual',
      classType: 'CrossFit Power Blast',
      trainer: 'Vikram Rajput',
      time: 'Today, 09:30 AM',
      amount: '₹799',
      status: 'Confirmed',
    },
    {
      id: '#BK-9285',
      member: 'Devendra Singhania',
      plan: 'Corporate Group Pass',
      classType: 'Core & Abdominal Blitz',
      trainer: 'Sameer Sen',
      time: 'Today, 10:15 AM',
      amount: '₹450',
      status: 'Completed',
    },
  ];

  // Static Data: Trainers Roster
  const trainersRoster = [
    {
      id: 1,
      name: 'Vikram Rajput',
      role: 'Master Strength & Bodybuilding Coach',
      specialty: 'Hypertrophy & Powerlifting',
      rating: '4.9 ⭐',
      clients: '48 Active Clients',
      experience: '9+ Years',
      status: 'On Floor',
    },
    {
      id: 2,
      name: 'Pooja Hegde',
      role: 'Certified Yoga & Mobility Specialist',
      specialty: 'Ashtanga, Pilates & Rehab',
      rating: '4.9 ⭐',
      clients: '56 Active Clients',
      experience: '7+ Years',
      status: 'In Studio 1',
    },
    {
      id: 3,
      name: 'Aryan Malhotra',
      role: 'Head HIIT & Endurance Trainer',
      specialty: 'Fat Loss, Spin & Aerobics',
      rating: '4.8 ⭐',
      clients: '42 Active Clients',
      experience: '6+ Years',
      status: 'On Floor',
    },
  ];

  // Helper for status badges
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
      case 'Confirmed':
      case 'Active':
      case 'On Floor':
        return <span className="gym-badge gym-badge-green">{status}</span>;
      case 'In Progress':
      case 'In Studio 1':
        return <span className="gym-badge gym-badge-blue">{status}</span>;
      case 'Pending':
        return <span className="gym-badge gym-badge-amber">{status}</span>;
      default:
        return <span className="gym-badge gym-badge-gray">{status}</span>;
    }
  };

  return (
    <div className="gym-wrapper">
      {/* 1. LEFT SIDEBAR (Dark Navy #0b1120 with Emerald Green Wave) */}
      <aside className="gym-sidebar">
        <div className="gym-sidebar-top">
          {/* Brand Header */}
        <div className="gym-brand">
          <div className="gym-logo-container">
            <GymLogoIcon />
          </div>
          <div className="gym-brand-text">
            <span className="gym-brand-title">American Fitness Gym</span>
            <span className="gym-brand-subtitle">ADMIN PANEL</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="gym-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`gym-nav-btn ${isActive ? 'active' : ''}`}
              >
                <div className="gym-nav-btn-left">
                  <Icon size={18} className="gym-nav-icon" />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="gym-nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        </div>

        {/* Sidebar Pinned Bottom */}
        <div className="gym-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="gym-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="gym-user-profile">
            <div className="gym-avatar">AF</div>
            <div className="gym-user-info">
              <span className="gym-user-name">Head Fitness Coach</span>
              <span className="gym-user-role">American Fitness Gym HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT */}
      <div className="gym-main">
        {/* Top Navbar with Height 82px matching user request */}
        <header className="gym-topbar">
          <div className="gym-topbar-left">
            <h1 className="gym-topbar-title">American Fitness Gym</h1>
            <div className="gym-status-pill">
              <span className="gym-status-dot"></span>
              <span className="gym-status-text">Operational</span>
            </div>
          </div>

          <div className="gym-topbar-right">
            <button
              onClick={() => navigate('/product/american-fitness-gym')}
              className="gym-btn-back-website"
              title="Return to Website"
            >
              <ArrowLeft size={16} />
              <span>Back to Website</span>
            </button>

            <button className="gym-icon-btn" title="Gym Notifications">
              <Bell size={20} />
              <span className="gym-unread-dot"></span>
            </button>

            <div className="gym-user-profile">
              <span className="gym-user-name">Admin</span>
              <div className="gym-avatar">A</div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="gym-content">
          {/* TAB 1: MAIN DASHBOARD VIEW (EXACT MATCH TO USER SCREENSHOT) */}
          {activeTab === 'dashboard' && (
            <div className="gym-dashboard-view">
              {/* Header Greeting & Controls */}
              <div className="gym-welcome-row">
                <div className="gym-welcome-left">
                  <h2 className="gym-welcome-title">Welcome back, Admin 👋</h2>
                  <p className="gym-welcome-subtitle">
                    Manage members, classes, trainers, memberships, and gym operations in one place.
                  </p>
                </div>
                <div className="gym-welcome-right">
                  <div className="gym-date-picker-btn">
                    <Calendar size={16} />
                    <span>{dateRange}</span>
                    <ChevronDown size={15} />
                  </div>
                </div>
              </div>

              {/* 5 KPI Stat Cards matching screenshot */}
              <div className="gym-stats-grid">
                {/* 1. Total Members */}
                <div className="gym-stat-card">
                  <div className="gym-stat-icon-wrap bg-green-light">
                    <Users size={22} className="text-green" />
                  </div>
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Total Members</span>
                    <div className="gym-stat-value">1,426</div>
                    <div className="gym-stat-trend text-green">
                      <span>↑ +8% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 2. Total Trainers */}
                <div className="gym-stat-card">
                  <div className="gym-stat-icon-wrap bg-green-light">
                    <UserCheck size={22} className="text-green" />
                  </div>
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Total Trainers</span>
                    <div className="gym-stat-value">32</div>
                    <div className="gym-stat-trend text-green">
                      <span>↑ +4% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 3. Total Classes */}
                <div className="gym-stat-card">
                  <div className="gym-stat-icon-wrap bg-green-light">
                    <Dumbbell size={22} className="text-green" />
                  </div>
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Total Classes</span>
                    <div className="gym-stat-value">186</div>
                    <div className="gym-stat-trend text-green">
                      <span>↑ +12% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 4. Total Bookings */}
                <div className="gym-stat-card">
                  <div className="gym-stat-icon-wrap bg-green-light">
                    <Calendar size={22} className="text-green" />
                  </div>
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Total Bookings</span>
                    <div className="gym-stat-value">248</div>
                    <div className="gym-stat-trend text-green">
                      <span>↑ +14% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 5. Total Revenue */}
                <div className="gym-stat-card">
                  <div className="gym-stat-icon-wrap bg-green-light">
                    <span className="gym-rupee-symbol">₹</span>
                  </div>
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Total Revenue</span>
                    <div className="gym-stat-value">₹1,24,750</div>
                    <div className="gym-stat-trend text-green">
                      <span>↑ +18% from last 7 days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Revenue Overview Area Chart & Top Classes */}
              <div className="gym-analytics-grid">
                {/* Revenue Overview Area Chart */}
                <div className="gym-card gym-chart-card">
                  <div className="gym-card-header">
                    <div className="gym-card-icon-title">
                      <TrendingUp size={20} className="text-green" />
                      <div>
                        <h3>Revenue Overview</h3>
                        <p className="gym-card-subtitle">Daily revenue and membership trends</p>
                      </div>
                    </div>

                    <div className="gym-chart-toggle">
                      <button
                        onClick={() => setChartMode('revenue')}
                        className={`gym-toggle-btn ${chartMode === 'revenue' ? 'active' : ''}`}
                      >
                        Revenue
                      </button>
                      <button
                        onClick={() => setChartMode('memberships')}
                        className={`gym-toggle-btn ${chartMode === 'memberships' ? 'active' : ''}`}
                      >
                        Memberships
                      </button>
                    </div>
                  </div>

                  {/* SVG Area Chart matching screenshot curve */}
                  <div className="gym-chart-body">
                    <div className="gym-chart-container">
                      <svg viewBox="0 0 700 240" className="gym-svg-chart">
                        <defs>
                          <linearGradient id="gymAreaGrad" x1="0" y1="0" x2="0" y2="1">
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
                            Oct 28 (x=185, y=168 [₹20k])
                            Oct 29 (x=275, y=125 [₹31k])
                            Oct 30 (x=365, y=142 [₹26k])
                            Oct 31 (x=455, y=107 [₹37k])
                            Nov 01 (x=545, y=103 [₹38.5k])
                            Nov 02 (x=640, y=42 [₹55k])
                        */}
                        <path
                          d="M95 190 C140 185, 145 168, 185 168 C225 168, 235 125, 275 125 C315 125, 325 142, 365 142 C405 142, 415 107, 455 107 C495 107, 505 103, 545 103 C585 103, 600 42, 640 42 L640 210 L95 210 Z"
                          fill="url(#gymAreaGrad)"
                        />

                        {/* Stroke Curve Line */}
                        <path
                          d="M95 190 C140 185, 145 168, 185 168 C225 168, 235 125, 275 125 C315 125, 325 142, 365 142 C405 142, 415 107, 455 107 C495 107, 505 103, 545 103 C585 103, 600 42, 640 42"
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
                        <circle cx="365" cy="142" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="455" cy="107" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="545" cy="103" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
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

                {/* Top Classes Card matching screenshot */}
                <div className="gym-card gym-top-classes-card">
                  <div className="gym-card-header">
                    <div className="gym-card-icon-title">
                      <Award size={20} className="text-green" />
                      <div>
                        <h3>Top Classes</h3>
                        <p className="gym-card-subtitle">This week</p>
                      </div>
                    </div>
                  </div>

                  <div className="gym-top-classes-list">
                    {topClasses.map((cls) => (
                      <div key={cls.id} className="gym-top-class-item">
                        <div className="gym-class-img-box">
                          <img
                            src={cls.image}
                            alt={cls.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<div class="cls-fallback-icon">🏋️</div>';
                            }}
                          />
                        </div>
                        <div className="gym-class-details">
                          <h4 className="gym-class-name">{cls.name}</h4>
                          <span className="gym-class-bookings">{cls.bookings}</span>
                        </div>
                        <span className="gym-class-price">{cls.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower Section: Recent Member Bookings Table & Active Trainers Roster */}
              <div className="gym-bottom-grid">
                {/* Recent Member Bookings Table */}
                <div className="gym-card gym-recent-bookings-card">
                  <div className="gym-card-header">
                    <div className="gym-card-icon-title">
                      <Calendar size={20} className="text-green" />
                      <div>
                        <h3>Recent Member Bookings &amp; Check-ins</h3>
                        <p className="gym-card-subtitle">Live turnstile admissions, booked personal training and group sessions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="gym-btn-view-all"
                    >
                      View All Bookings &rarr;
                    </button>
                  </div>

                  <div className="gym-table-responsive">
                    <table className="gym-table">
                      <thead>
                        <tr>
                          <th>BOOKING ID</th>
                          <th>MEMBER</th>
                          <th>CLASS TYPE</th>
                          <th>TRAINER</th>
                          <th>AMOUNT</th>
                          <th>CHECK-IN TIME</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentBookings.map((b) => (
                          <tr key={b.id}>
                            <td className="font-semibold text-green font-mono">{b.id}</td>
                            <td>
                              <div className="gym-cell-col">
                                <span className="font-semibold">{b.member}</span>
                                <span className="text-muted text-sm">{b.plan}</span>
                              </div>
                            </td>
                            <td className="font-medium">{b.classType}</td>
                            <td className="text-muted">{b.trainer}</td>
                            <td className="font-semibold text-green">{b.amount}</td>
                            <td className="text-muted text-sm">{b.time}</td>
                            <td>{renderStatusBadge(b.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Active Trainers On Floor Card */}
                <div className="gym-card gym-trainers-card">
                  <div className="gym-card-header">
                    <div className="gym-card-icon-title">
                      <Flame size={20} className="text-amber" />
                      <div>
                        <h3>Active Trainers</h3>
                        <p className="gym-card-subtitle">Floor coaches &amp; studio</p>
                      </div>
                    </div>
                  </div>

                  <div className="gym-trainers-list">
                    {trainersRoster.map((tr) => (
                      <div key={tr.id} className="gym-trainer-item">
                        <div className="gym-trainer-top">
                          <span className="font-semibold">{tr.name}</span>
                          <span className="gym-badge gym-badge-green">{tr.status}</span>
                        </div>
                        <p className="gym-trainer-role">{tr.role}</p>
                        <div className="gym-trainer-meta">
                          <span>{tr.specialty}</span>
                          <span className="font-semibold">{tr.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="gym-capacity-box">
                    <div className="capacity-head">
                      <Activity size={16} className="text-green" />
                      <span>Live Floor Occupancy</span>
                    </div>
                    <p className="capacity-desc">72 / 120 Members currently working out (Safe Capacity: 60%)</p>
                  </div>
                </div>
              </div>

              {/* Bottom ERP Info Banner */}
              <div className="gym-info-banner">
                <Info size={18} className="text-green" />
                <p>
                  <strong>American Fitness Gym – Health &amp; Athletic Club ERP</strong> &nbsp;|&nbsp;
                  Biometric turnstile check-in, PT scheduling, supplement inventory, membership renewals, and POS.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: MEMBERS DIRECTORY */}
          {activeTab === 'members' && (
            <div className="gym-members-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Members Directory</h2>
                  <p className="gym-section-subtitle">1,426 active athletes, bodybuilders, and fitness enthusiasts</p>
                </div>
                <button className="gym-btn-primary">
                  <Plus size={16} />
                  <span>Enroll New Member</span>
                </button>
              </div>

              <div className="gym-card">
                <div className="gym-table-responsive">
                  <table className="gym-table">
                    <thead>
                      <tr>
                        <th>MEMBER ID</th>
                        <th>NAME</th>
                        <th>MEMBERSHIP TIER</th>
                        <th>PHONE</th>
                        <th>RENEWAL DATE</th>
                        <th>ATTENDANCE STREAK</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono text-green font-bold">#AFG-1049</td>
                        <td className="font-semibold">Rohit Sharma</td>
                        <td><span className="gym-badge gym-badge-purple">Platinum VIP Annual</span></td>
                        <td className="font-mono text-muted">+91 98765 43210</td>
                        <td>14 Dec 2026</td>
                        <td><span className="text-green font-bold">🔥 18 Days</span></td>
                        <td><span className="gym-badge gym-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-mono text-green font-bold">#AFG-1050</td>
                        <td className="font-semibold">Ananya Reddy</td>
                        <td><span className="gym-badge gym-badge-blue">Gold Flexi Monthly</span></td>
                        <td className="font-mono text-muted">+91 98223 11456</td>
                        <td>28 Nov 2026</td>
                        <td><span className="text-green font-bold">🔥 9 Days</span></td>
                        <td><span className="gym-badge gym-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-mono text-green font-bold">#AFG-1051</td>
                        <td className="font-semibold">Kabir Verma</td>
                        <td><span className="gym-badge gym-badge-gray">Silver Regular</span></td>
                        <td className="font-mono text-muted">+91 99100 88231</td>
                        <td>05 Dec 2026</td>
                        <td><span className="text-muted">4 Days</span></td>
                        <td><span className="gym-badge gym-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRAINERS */}
          {activeTab === 'trainers' && (
            <div className="gym-trainers-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Certified Coaches &amp; Personal Trainers</h2>
                  <p className="gym-section-subtitle">32 strength, CrossFit, yoga, and nutrition certified fitness mentors</p>
                </div>
                <button className="gym-btn-primary">
                  <Plus size={16} />
                  <span>Onboard Trainer</span>
                </button>
              </div>

              <div className="gym-card">
                <div className="gym-table-responsive">
                  <table className="gym-table">
                    <thead>
                      <tr>
                        <th>COACH NAME</th>
                        <th>DESIGNATION</th>
                        <th>CERTIFICATIONS</th>
                        <th>ACTIVE CLIENTS</th>
                        <th>RATING</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainersRoster.map((tr) => (
                        <tr key={tr.id}>
                          <td className="font-bold">{tr.name}</td>
                          <td>{tr.role}</td>
                          <td className="text-muted">{tr.specialty}</td>
                          <td className="font-semibold text-green">{tr.clients}</td>
                          <td className="font-bold">{tr.rating}</td>
                          <td>{renderStatusBadge(tr.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLASSES */}
          {activeTab === 'classes' && (
            <div className="gym-classes-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Workout Classes Schedule</h2>
                  <p className="gym-section-subtitle">186 weekly strength, functional, Zumba, and HIIT group workout sessions</p>
                </div>
                <button className="gym-btn-primary">
                  <Plus size={16} />
                  <span>Schedule Class</span>
                </button>
              </div>

              <div className="gym-card">
                <div className="gym-table-responsive">
                  <table className="gym-table">
                    <thead>
                      <tr>
                        <th>CLASS NAME</th>
                        <th>STUDIO ROOM</th>
                        <th>INSTRUCTOR</th>
                        <th>CAPACITY</th>
                        <th>PRICE / PASS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-bold text-green">Strength Training Masterclass</td>
                        <td>Weight Arena A</td>
                        <td>Vikram Rajput</td>
                        <td>24 / 25 Enrolled</td>
                        <td className="font-bold">₹599</td>
                        <td><span className="gym-badge gym-badge-green">Almost Full</span></td>
                      </tr>
                      <tr>
                        <td className="font-bold text-green">Yoga &amp; Flexibility Flow</td>
                        <td>Studio 1 (Zen Room)</td>
                        <td>Pooja Hegde</td>
                        <td>18 / 20 Enrolled</td>
                        <td className="font-bold">₹499</td>
                        <td><span className="gym-badge gym-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-bold text-green">Cardio HIIT &amp; Spin Sprint</td>
                        <td>Spinning Dome</td>
                        <td>Aryan Malhotra</td>
                        <td>15 / 18 Enrolled</td>
                        <td className="font-bold">₹699</td>
                        <td><span className="gym-badge gym-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MEMBERSHIPS */}
          {activeTab === 'memberships' && (
            <div className="gym-memberships-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Membership Plans &amp; Tiers</h2>
                  <p className="gym-section-subtitle">Annual, quarterly, and monthly access packages with sauna and locker perks</p>
                </div>
                <button className="gym-btn-primary">
                  <Plus size={16} />
                  <span>Create Plan</span>
                </button>
              </div>

              <div className="gym-stats-grid">
                <div className="gym-stat-card">
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Platinum VIP Annual</span>
                    <div className="gym-stat-value">₹24,999/yr</div>
                    <div className="gym-stat-trend text-green">All access + Sauna + 12 PT</div>
                  </div>
                </div>
                <div className="gym-stat-card">
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Gold Flexi Monthly</span>
                    <div className="gym-stat-value">₹2,499/mo</div>
                    <div className="gym-stat-trend text-green">Gym floor + 4 Group classes</div>
                  </div>
                </div>
                <div className="gym-stat-card">
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Silver Regular</span>
                    <div className="gym-stat-value">₹1,799/mo</div>
                    <div className="gym-stat-trend text-green">Off-peak 11 AM - 5 PM access</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="gym-bookings-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Class &amp; PT Session Bookings</h2>
                  <p className="gym-section-subtitle">248 confirmed bookings for personal training, HIIT, and yoga sessions</p>
                </div>
                <button className="gym-btn-primary">
                  <Plus size={16} />
                  <span>Manual Booking</span>
                </button>
              </div>

              <div className="gym-card">
                <div className="gym-table-responsive">
                  <table className="gym-table">
                    <thead>
                      <tr>
                        <th>BOOKING ID</th>
                        <th>MEMBER NAME</th>
                        <th>CLASS / SESSION</th>
                        <th>COACH</th>
                        <th>DATE &amp; TIME</th>
                        <th>FEE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((b) => (
                        <tr key={b.id}>
                          <td className="font-mono font-bold text-green">{b.id}</td>
                          <td className="font-semibold">{b.member}</td>
                          <td>{b.classType}</td>
                          <td>{b.trainer}</td>
                          <td className="text-muted">{b.time}</td>
                          <td className="font-bold text-green">{b.amount}</td>
                          <td>{renderStatusBadge(b.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="gym-payments-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Payments &amp; Till Invoices</h2>
                  <p className="gym-section-subtitle">₹1,24,750 recorded this week across recurring memberships and POS supplement bar</p>
                </div>
                <button className="gym-btn-primary">
                  <Download size={16} />
                  <span>Export Financial Report</span>
                </button>
              </div>

              <div className="gym-stats-grid">
                <div className="gym-stat-card">
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Membership Subscriptions</span>
                    <div className="gym-stat-value">₹94,500</div>
                    <div className="gym-stat-trend text-green">↑ +14% growth</div>
                  </div>
                </div>
                <div className="gym-stat-card">
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">PT Coach Sessions</span>
                    <div className="gym-stat-value">₹21,800</div>
                    <div className="gym-stat-trend text-green">38 slots booked</div>
                  </div>
                </div>
                <div className="gym-stat-card">
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Protein &amp; Juice Bar POS</span>
                    <div className="gym-stat-value">₹8,450</div>
                    <div className="gym-stat-trend text-green">High margin retail</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="gym-attendance-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Biometric Turnstile Attendance Logs</h2>
                  <p className="gym-section-subtitle">RFID keyfob, biometric fingerprint, and mobile QR code entry history</p>
                </div>
                <button className="gym-btn-primary">
                  <Download size={16} />
                  <span>Download Attendance CSV</span>
                </button>
              </div>

              <div className="gym-card">
                <div className="gym-table-responsive">
                  <table className="gym-table">
                    <thead>
                      <tr>
                        <th>TIMESTAMP</th>
                        <th>MEMBER NAME</th>
                        <th>ENTRY GATE</th>
                        <th>ACCESS METHOD</th>
                        <th>MEMBERSHIP STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono text-muted">10:42 AM Today</td>
                        <td className="font-bold">Rohit Sharma</td>
                        <td>Turnstile Gate 01 (Main Entry)</td>
                        <td>Biometric Fingerprint</td>
                        <td><span className="gym-badge gym-badge-green">Verified Access</span></td>
                      </tr>
                      <tr>
                        <td className="font-mono text-muted">10:28 AM Today</td>
                        <td className="font-bold">Ananya Reddy</td>
                        <td>Turnstile Gate 02 (Studio Wing)</td>
                        <td>Mobile App QR Code</td>
                        <td><span className="gym-badge gym-badge-green">Verified Access</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: REPORTS */}
          {activeTab === 'reports' && (
            <div className="gym-reports-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Gym Analytics &amp; Retention Reports</h2>
                  <p className="gym-section-subtitle">Member churn, peak hour workout patterns, and machine usage metrics</p>
                </div>
                <button className="gym-btn-primary">
                  <Download size={16} />
                  <span>Generate Monthly Audit</span>
                </button>
              </div>

              <div className="gym-stats-grid">
                <div className="gym-stat-card">
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Retention Rate</span>
                    <div className="gym-stat-value">94.2%</div>
                    <div className="gym-stat-trend text-green">⭐ Top industry tier</div>
                  </div>
                </div>
                <div className="gym-stat-card">
                  <div className="gym-stat-info">
                    <span className="gym-stat-label">Peak Workout Hours</span>
                    <div className="gym-stat-value">6 AM - 9 AM &bull; 6 PM - 9 PM</div>
                    <div className="gym-stat-trend text-green">Highest floor traffic</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="gym-users-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Staff Permissions &amp; Roles</h2>
                  <p className="gym-section-subtitle">Reception desk, floor managers, nutritionists, and head coaches</p>
                </div>
                <button className="gym-btn-primary">
                  <Plus size={16} />
                  <span>Invite Staff</span>
                </button>
              </div>

              <div className="gym-card">
                <div className="gym-table-responsive">
                  <table className="gym-table">
                    <thead>
                      <tr>
                        <th>STAFF MEMBER</th>
                        <th>ROLE</th>
                        <th>DEPARTMENT</th>
                        <th>ACCESS LEVEL</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Central Gym Admin</strong><br/><span className="text-muted text-sm">admin@americanfitness.com</span></td>
                        <td><span className="gym-badge gym-badge-green">Super Administrator</span></td>
                        <td>Management</td>
                        <td>Full Control (Finance, Members, Biometrics)</td>
                        <td><span className="gym-badge gym-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td><strong>Vikram Rajput</strong><br/><span className="text-muted text-sm">vikram@americanfitness.com</span></td>
                        <td><span className="gym-badge gym-badge-blue">Head Coach</span></td>
                        <td>Fitness &amp; Training</td>
                        <td>Class Rosters, PT Schedules</td>
                        <td><span className="gym-badge gym-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="gym-settings-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Gym Facility &amp; Hardware Configuration</h2>
                  <p className="gym-section-subtitle">Turnstile hardware IP, emergency exit alarms, and operating hours</p>
                </div>
                <button className="gym-btn-primary">
                  <Check size={16} />
                  <span>Save Settings</span>
                </button>
              </div>

              <div className="gym-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Gym Operating Hours</label>
                    <input
                      type="text"
                      defaultValue="05:30 AM – 11:00 PM (Monday – Sunday)"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Biometric Turnstile Controller IP</label>
                    <input
                      type="text"
                      defaultValue="192.168.1.180 (Gate 1 & Gate 2 Controller)"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

          {/* TAB: GYM EQUIPMENT & SERVICE */}
          {activeTab === 'equipment' && (
            <div className="gym-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Fitness Machinery & Preventative Maintenance</h2>
                  <p className="gym-section-subtitle">Treadmills, cable cross machines, plate-loaded racks, and scheduled technician audits</p>
                </div>
                <button className="gym-btn-primary">
                  <Plus size={16} />
                  <span>Log Service Ticket</span>
                </button>
              </div>
              <div className="gym-card">
                <div className="gym-table-responsive">
                  <table className="gym-table">
                    <thead>
                      <tr>
                        <th>EQUIPMENT ID</th>
                        <th>MACHINE NAME & BRAND</th>
                        <th>ZONE / SECTION</th>
                        <th>LAST SERVICE DATE</th>
                        <th>NEXT AUDIT DUE</th>
                        <th>TECHNICIAN</th>
                        <th>OPERATIONAL STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'EQP-TR-101', name: 'Life Fitness Elevation Treadmill #1', zone: 'Cardio Deck (Floor 1)', last: '12 Oct 2026', next: '12 Jan 2027', tech: 'FitTech Services Hyderabad', st: 'Optimal' },
                        { id: 'EQP-TR-102', name: 'Life Fitness Elevation Treadmill #2', zone: 'Cardio Deck (Floor 1)', last: '12 Oct 2026', next: '12 Jan 2027', tech: 'FitTech Services Hyderabad', st: 'Optimal' },
                        { id: 'EQP-SM-204', name: 'Hammer Strength Dual Adjustable Pulley', zone: 'Functional Strength Zone', last: '24 Sep 2026', next: '24 Dec 2026', tech: 'Apex Fitness Care', st: 'Optimal' },
                        { id: 'EQP-LR-308', name: 'Rogue Monster Olympic Power Rack', zone: 'Heavy Powerlifting Area', last: '01 Aug 2026', next: '01 Feb 2027', tech: 'Internal Gym Master', st: 'Optimal' },
                      ].map((e, i) => (
                        <tr key={i}>
                          <td><strong>{e.id}</strong></td>
                          <td><span style={{ fontWeight: 600 }}>{e.name}</span></td>
                          <td>{e.zone}</td>
                          <td>{e.last}</td>
                          <td>{e.next}</td>
                          <td>{e.tech}</td>
                          <td><span className="gym-active-badge">{e.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DIET & NUTRITION */}
          {activeTab === 'nutrition' && (
            <div className="gym-view">
              <div className="gym-section-header">
                <div>
                  <h2 className="gym-section-title">Diet Plans & Nutrition Pro Store</h2>
                  <p className="gym-section-subtitle">Whey isolates, BCAAs, pre-workouts, and certified nutritionist member meal plans</p>
                </div>
                <button className="gym-btn-primary">
                  <Plus size={16} />
                  <span>Assign Diet Plan</span>
                </button>
              </div>
              <div className="gym-card">
                <div className="gym-table-responsive">
                  <table className="gym-table">
                    <thead>
                      <tr>
                        <th>MEMBER NAME</th>
                        <th>NUTRITIONIST</th>
                        <th>TARGET GOAL</th>
                        <th>DAILY CALORIE TARGET</th>
                        <th>MACRO RATIO (P/C/F)</th>
                        <th>SUPPLEMENT STACK</th>
                        <th>PLAN STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { mem: 'Rohit Verma', nut: 'Dr. Shruti Sen (Sports Nutritionist)', goal: 'Lean Muscle Hypertrophy', cal: '2,650 kcal', mac: '40% / 40% / 20%', sup: 'Gold Standard Whey + Creatine Monohydrate', st: 'Active Plan' },
                        { mem: 'Ananya Sharma', nut: 'Dr. Shruti Sen', goal: 'Athletic Conditioning & Fat Loss', cal: '1,750 kcal', mac: '35% / 45% / 20%', sup: 'Hydrolyzed Whey Isolate + Multivitamin', st: 'Active Plan' },
                        { mem: 'Vikram Patel', nut: 'Coach Marcus Vance', goal: 'Strength & Powerlifting Prep', cal: '3,200 kcal', mac: '35% / 45% / 20%', sup: 'Whey Protein + BCAA + Electrolytes', st: 'Active Plan' },
                        { mem: 'Kavita Reddy', nut: 'Dr. Shruti Sen', goal: 'Metabolic Reset & Tone', cal: '1,600 kcal', mac: '30% / 50% / 20%', sup: 'Plant Protein Organic + Omega 3', st: 'Active Plan' },
                      ].map((n, i) => (
                        <tr key={i}>
                          <td><strong>{n.mem}</strong></td>
                          <td>{n.nut}</td>
                          <td><span style={{ fontWeight: 600 }}>{n.goal}</span></td>
                          <td>{n.cal}</td>
                          <td><span className="gym-operational-pill">{n.mac}</span></td>
                          <td style={{ fontSize: '13px', color: '#475569' }}>{n.sup}</td>
                          <td><span className="gym-active-badge">{n.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

      </div>
    </div>
  );
};


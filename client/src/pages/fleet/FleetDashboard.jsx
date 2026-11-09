import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  CreditCard,
  ShieldCheck,
  Truck,
  Users,
  Navigation,
  Fuel,
  Wrench,
  TrendingUp,
  MapPin,
  UserCheck,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Calendar,
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
  Radio,
  Compass,
  Gauge,
  Activity,
  Car,
  Menu,
  X,
} from 'lucide-react';
import './FleetDashboard.css';

// Fleet Management Gold & Navy Shield Emblem Logo
const FleetLogoIcon = () => (
  <svg width="46" height="46" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fleetEmerald" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="fleetShieldBg" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1E293B" />
        <stop offset="1" stopColor="#0B1120" />
      </linearGradient>
    </defs>
    {/* Outer Shield with Gold Border */}
    <path
      d="M50 8L84 22V50C84 72 50 90 50 90C50 90 16 72 16 50V22L50 8Z"
      fill="url(#fleetShieldBg)"
      stroke="url(#fleetEmerald)"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Commercial Heavy Semi-Truck Silhouette */}
    <path
      d="M32 44H56V62H32V44Z"
      fill="#F8FAFC"
    />
    <path
      d="M56 48H68L74 54V62H56V48Z"
      fill="#F8FAFC"
    />
    <circle cx="40" cy="64" r="4.5" fill="#10B981" stroke="#F8FAFC" strokeWidth="1.5" />
    <circle cx="66" cy="64" r="4.5" fill="#10B981" stroke="#F8FAFC" strokeWidth="1.5" />
    {/* Golden Banner with FLEET */}
    <rect x="22" y="50" width="56" height="13" rx="3" fill="url(#fleetEmerald)" />
    <text x="50" y="60" textAnchor="middle" fill="#0B1120" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">FLEET</text>
    {/* 3 Gold Stars below */}
    <path d="M42 69L43 71L45 71L43.5 72.5L44 74.5L42 73L40 74.5L40.5 72.5L39 71L41 71Z" fill="url(#fleetEmerald)" />
    <path d="M50 70L51 72L53 72L51.5 73.5L52 75.5L50 74L48 75.5L48.5 73.5L47 72L49 72Z" fill="url(#fleetEmerald)" />
    <path d="M58 69L59 71L61 71L59.5 72.5L60 74.5L58 73L56 74.5L56.5 72.5L55 71L57 71Z" fill="url(#fleetEmerald)" />
  </svg>
);

export const FleetDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartMode, setChartMode] = useState('revenue'); // 'revenue' | 'trips'
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [tripFilter, setTripFilter] = useState('All');

  // Navigation Items matching the screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'vehicles', label: 'Vehicles', icon: Truck },
    { id: 'drivers', label: 'Drivers', icon: Users },
    { id: 'trips', label: 'Trips', icon: Navigation },
    { id: 'fuel', label: 'Fuel Management', icon: Fuel },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'geofencing', label: 'Geofencing', icon: MapPin },
    { id: 'users', label: 'Users & Roles', icon: UserCheck },
    { id: 'dispatch', label: 'Dispatch Board', icon: Compass },
    { id: 'inspections', label: 'RTO & Fitness Audit', icon: ShieldCheck },
    { id: 'toll-expenses', label: 'FASTag & Tolls', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Static Data: Top Vehicles (matching screenshot)
  const topVehicles = [
    {
      id: 1,
      plate: 'MH 12 AB 1234',
      model: 'Tata Prima 5530.S Heavy Truck',
      trips: 28,
      distance: '2,860 km',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      plate: 'TS 08 CD 5678',
      model: 'Volvo 9600 Multi-Axle Intercity Coach',
      trips: 24,
      distance: '2,420 km',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      plate: 'AP 28 EF 9012',
      model: 'Force Urbania Express Cargo Van',
      trips: 18,
      distance: '1,980 km',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=160&auto=format&fit=crop&q=80',
    },
  ];

  // Static Data: Live Dispatched Trips
  const recentTrips = [
    {
      id: '#TRP-8401',
      vehicle: 'MH 12 AB 1234',
      vehicleType: 'Heavy Freight (18T)',
      driver: 'Rajesh Kumar',
      route: 'Mumbai Hub → Pune Logistics Park',
      amount: '₹34,500',
      fuel: '84 L',
      status: 'Completed',
      dispatchTime: 'Today, 08:30 AM',
    },
    {
      id: '#TRP-8402',
      vehicle: 'TS 08 CD 5678',
      vehicleType: 'Intercity Bus',
      driver: 'Mohammad Ali',
      route: 'Hyderabad Central → Vijayawada Hub',
      amount: '₹28,900',
      fuel: '62 L',
      status: 'In Transit',
      dispatchTime: 'Today, 10:15 AM',
    },
    {
      id: '#TRP-8403',
      vehicle: 'AP 28 EF 9012',
      vehicleType: 'Refrigerated Van',
      driver: 'Suresh Reddy',
      route: 'Vizag Port → Kakinada Food Hub',
      amount: '₹16,400',
      fuel: '38 L',
      status: 'In Transit',
      dispatchTime: 'Today, 11:00 AM',
    },
    {
      id: '#TRP-8404',
      vehicle: 'KA 01 GH 3456',
      vehicleType: 'Container Truck',
      driver: 'Vikram Singh',
      route: 'Bengaluru ICD → Chennai Port Terminal',
      amount: '₹42,000',
      fuel: '110 L',
      status: 'Scheduled',
      dispatchTime: 'Today, 02:00 PM',
    },
    {
      id: '#TRP-8405',
      vehicle: 'DL 04 JK 7890',
      vehicleType: 'Flatbed Lorry',
      driver: 'Amit Sharma',
      route: 'Delhi Gateway → Jaipur Industrial Area',
      amount: '₹22,800',
      fuel: '54 L',
      status: 'Completed',
      dispatchTime: 'Yesterday, 09:40 PM',
    },
  ];

  // Static Data: Full Vehicles Registry for Vehicles Tab
  const vehiclesRegistry = [
    { id: 'VEH-01', plate: 'MH 12 AB 1234', type: 'Heavy Truck', make: 'Tata Prima 5530.S', fuelLevel: '82%', odo: '84,210 km', driver: 'Rajesh Kumar', status: 'Active' },
    { id: 'VEH-02', plate: 'TS 08 CD 5678', type: 'Intercity Coach', make: 'Volvo 9600 Multi-Axle', fuelLevel: '68%', odo: '1,12,450 km', driver: 'Mohammad Ali', status: 'Active' },
    { id: 'VEH-03', plate: 'AP 28 EF 9012', type: 'Refrigerated Van', make: 'Force Urbania Express', fuelLevel: '94%', odo: '46,800 km', driver: 'Suresh Reddy', status: 'Active' },
    { id: 'VEH-04', plate: 'KA 01 GH 3456', type: 'Container Lorry', make: 'BharatBenz 3528C', fuelLevel: '45%', odo: '92,100 km', driver: 'Vikram Singh', status: 'Scheduled' },
    { id: 'VEH-05', plate: 'DL 04 JK 7890', type: 'Flatbed Trailer', make: 'Ashok Leyland 4220', fuelLevel: '76%', odo: '68,400 km', driver: 'Amit Sharma', status: 'In Service' },
    { id: 'VEH-06', plate: 'TN 09 LM 4567', type: 'City Cargo Van', make: 'Mahindra Bolero Maxi', fuelLevel: '58%', odo: '32,150 km', driver: 'Karthik Raja', status: 'Active' },
    { id: 'VEH-07', plate: 'GJ 01 NP 8901', type: 'Tanker (Fuel)', make: 'Tata Signa 4825.TK', fuelLevel: '88%', odo: '1,42,800 km', driver: 'Prakash Patel', status: 'Active' },
  ];

  // Static Data: Drivers Roster
  const driversRoster = [
    { id: 'DRV-101', name: 'Rajesh Kumar', license: 'MH-14201800912', exp: '12 yrs', vehicle: 'MH 12 AB 1234', rating: '4.9 ⭐', phone: '+91 98765 11001', status: 'On Duty' },
    { id: 'DRV-102', name: 'Mohammad Ali', license: 'TS-09201600843', exp: '9 yrs', vehicle: 'TS 08 CD 5678', rating: '4.8 ⭐', phone: '+91 98123 22002', status: 'On Duty' },
    { id: 'DRV-103', name: 'Suresh Reddy', license: 'AP-28201900762', exp: '7 yrs', vehicle: 'AP 28 EF 9012', rating: '4.9 ⭐', phone: '+91 97654 33003', status: 'On Duty' },
    { id: 'DRV-104', name: 'Vikram Singh', license: 'KA-01201500411', exp: '14 yrs', vehicle: 'KA 01 GH 3456', rating: '4.7 ⭐', phone: '+91 99887 44004', status: 'Standby' },
    { id: 'DRV-105', name: 'Amit Sharma', license: 'DL-04202000298', exp: '6 yrs', vehicle: 'DL 04 JK 7890', rating: '4.8 ⭐', phone: '+91 96543 55005', status: 'On Duty' },
  ];

  // Static Data: Maintenance Schedule
  const maintenanceLogs = [
    { vehicle: 'MH 12 AB 1234', task: 'Brake Pad Replacement & Engine Oil', dueIn: '320 km', priority: 'High', workshop: 'Central Fleet Workshop (Bay 2)' },
    { vehicle: 'DL 04 JK 7890', task: 'Annual Fitness Certificate & Inspection', dueIn: '5 days', priority: 'Medium', workshop: 'RTO Authorized Center' },
    { vehicle: 'KA 01 GH 3456', task: 'Tire Rotation & Wheel Alignment', dueIn: '1,200 km', priority: 'Normal', workshop: 'South Bay Tyre Hub' },
    { vehicle: 'TS 08 CD 5678', task: 'Air Conditioning System Service', dueIn: '850 km', priority: 'Normal', workshop: 'Volvo Authorized Service Center' },
  ];

  // Status Badge Helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Active':
      case 'Completed':
      case 'On Duty':
      case 'Optimal':
        return <span className="fleet-badge fleet-badge-green">{status}</span>;
      case 'In Transit':
      case 'Scheduled':
        return <span className="fleet-badge fleet-badge-blue">{status}</span>;
      case 'In Service':
      case 'Standby':
        return <span className="fleet-badge fleet-badge-amber">{status}</span>;
      case 'Overdue':
      case 'High':
      case 'Alert':
        return <span className="fleet-badge fleet-badge-red">{status}</span>;
      default:
        return <span className="fleet-badge fleet-badge-gray">{status}</span>;
    }
  };

  return (
    <div className="fleet-wrapper">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fleet-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 1. LEFT SIDEBAR */}
      <aside className={`fleet-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="fleet-sidebar-top">
          {/* Brand Header */}
          <div className="fleet-brand">
            <div className="fleet-logo-container">
              <FleetLogoIcon />
            </div>
            <div className="fleet-brand-text">
              <div className="fleet-brand-title">Fleet Management</div>
              <div className="fleet-brand-tag">ADMIN PANEL</div>
            </div>
            <button
              type="button"
              className="fleet-sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar Menu Options */}
          <nav className="fleet-nav">
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
                  className={`fleet-nav-btn ${isActive ? 'active' : ''}`}
                >
                  <div className="fleet-nav-btn-left">
                    <Icon size={19} className="fleet-nav-icon" />
                    <span className="fleet-nav-label">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Pinned Bottom */}
        <div className="fleet-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="fleet-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="fleet-user-profile">
            <div className="fleet-avatar">FM</div>
            <div className="fleet-user-info">
              <span className="fleet-user-name">Fleet Commander</span>
              <span className="fleet-user-role">Logistics Operations HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT */}
      <div className="fleet-main">
        {/* Top Navbar with Height 82px matching request */}
        <header className="fleet-topbar">
          <div className="fleet-topbar-left">
            <div className="fleet-header-title-wrap">
              <button
                type="button"
                className="fleet-menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="fleet-topbar-title">
                  {navItems.find(n => n.id === activeTab)?.label || 'Fleet Management'}
                </h1>
                <div className="fleet-status-pill">
                  <span className="fleet-status-dot"></span>
                  <span className="fleet-status-text">Operational</span>
                </div>
              </div>
            </div>
          </div>

          <div className="fleet-topbar-right">
            <button
              onClick={() => navigate('/products')}
              className="dashboard-back-link fleet-btn-back-vehicles"
              title="Return to Catalog"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <button className="fleet-icon-btn" title="Alerts & Telemetry">
              <Bell size={20} />
              <span className="fleet-unread-dot"></span>
            </button>

            <div className="fleet-user-profile-top">
              <span className="fleet-user-name">Admin</span>
              <div className="fleet-avatar">S</div>
            </div>
          </div>
        </header>

        {/* Dynamic Content View */}
        <div className="fleet-content">
          {/* TAB 1: MAIN DASHBOARD VIEW (EXACT MATCH TO REFERENCE IMAGE) */}
          {activeTab === 'dashboard' && (
            <div className="fleet-dashboard-view">
              {/* Header Greeting & Controls */}
              <div className="fleet-welcome-row">
                <div className="fleet-welcome-left">
                  <h2 className="fleet-welcome-title">Welcome back, Admin 👋</h2>
                  <p className="fleet-welcome-subtitle">
                    Manage vehicles, drivers, trips, fuel, maintenance and fleet operations in one place.
                  </p>
                </div>
                <div className="fleet-welcome-right">
                  <div className="fleet-date-picker-btn">
                    <Calendar size={16} />
                    <span>{dateRange}</span>
                    <ChevronDown size={15} />
                  </div>
                </div>
              </div>

              {/* 5 KPI Stat Cards matching screenshot */}
              <div className="fleet-stats-grid">
                {/* 1. Total Vehicles */}
                <div className="fleet-stat-card">
                  <div className="fleet-stat-icon-wrap bg-green-light">
                    <Car size={22} className="text-green" />
                  </div>
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Total Vehicles</span>
                    <div className="fleet-stat-value">48</div>
                    <div className="fleet-stat-trend text-green">
                      <span>↑ +8% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 2. Total Drivers */}
                <div className="fleet-stat-card">
                  <div className="fleet-stat-icon-wrap bg-green-light">
                    <Users size={22} className="text-green" />
                  </div>
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Total Drivers</span>
                    <div className="fleet-stat-value">32</div>
                    <div className="fleet-stat-trend text-green">
                      <span>↑ +6% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 3. Total Trips */}
                <div className="fleet-stat-card">
                  <div className="fleet-stat-icon-wrap bg-green-light">
                    <Navigation size={22} className="text-green" />
                  </div>
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Total Trips</span>
                    <div className="fleet-stat-value">186</div>
                    <div className="fleet-stat-trend text-green">
                      <span>↑ +12% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 4. Fuel Consumed */}
                <div className="fleet-stat-card">
                  <div className="fleet-stat-icon-wrap bg-green-light">
                    <Fuel size={22} className="text-green" />
                  </div>
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Fuel Consumed</span>
                    <div className="fleet-stat-value">4,820 L</div>
                    <div className="fleet-stat-trend text-green">
                      <span>↑ +9% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 5. Total Revenue */}
                <div className="fleet-stat-card">
                  <div className="fleet-stat-icon-wrap bg-green-light">
                    <span className="fleet-rupee-symbol">₹</span>
                  </div>
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Total Revenue</span>
                    <div className="fleet-stat-value">₹1,24,750</div>
                    <div className="fleet-stat-trend text-green">
                      <span>↑ +15% from last 7 days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Revenue Overview Area Chart & Top Vehicles */}
              <div className="fleet-analytics-grid">
                {/* Revenue Overview Area Chart */}
                <div className="fleet-card fleet-chart-card">
                  <div className="fleet-card-header">
                    <div className="fleet-card-icon-title">
                      <BarChart3 size={20} className="text-green" />
                      <div>
                        <h3>Revenue Overview</h3>
                        <p className="fleet-card-subtitle">Daily revenue and trip trends</p>
                      </div>
                    </div>

                    <div className="fleet-chart-toggle">
                      <button
                        onClick={() => setChartMode('revenue')}
                        className={`fleet-toggle-btn ${chartMode === 'revenue' ? 'active' : ''}`}
                      >
                        Revenue
                      </button>
                      <button
                        onClick={() => setChartMode('trips')}
                        className={`fleet-toggle-btn ${chartMode === 'trips' ? 'active' : ''}`}
                      >
                        Trips
                      </button>
                    </div>
                  </div>

                  {/* SVG Area Chart matching screenshot curve */}
                  <div className="fleet-chart-body">
                    <div className="fleet-chart-container">
                      <svg viewBox="0 0 700 240" className="fleet-svg-chart">
                        <defs>
                          <linearGradient id="fleetAreaGrad" x1="0" y1="0" x2="0" y2="1">
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
                          fill="url(#fleetAreaGrad)"
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

                {/* Top Vehicles Card matching screenshot */}
                <div className="fleet-card fleet-top-vehicles-card">
                  <div className="fleet-card-header">
                    <div className="fleet-card-icon-title">
                      <Award size={20} className="text-green" />
                      <div>
                        <h3>Top Vehicles</h3>
                        <p className="fleet-card-subtitle">By trip count this week</p>
                      </div>
                    </div>
                  </div>

                  <div className="fleet-top-vehicles-list">
                    {topVehicles.map((veh) => (
                      <div key={veh.id} className="fleet-top-vehicle-item">
                        <div className="fleet-vehicle-img-box">
                          <img
                            src={veh.image}
                            alt={veh.plate}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<div class="veh-fallback-icon">🚚</div>';
                            }}
                          />
                        </div>
                        <div className="fleet-vehicle-details">
                          <h4 className="fleet-vehicle-plate">{veh.plate}</h4>
                          <span className="fleet-vehicle-meta">{veh.trips} trips &bull; {veh.distance}</span>
                        </div>
                        <span className="fleet-active-badge">Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower Section: Recent Trips Table & Maintenance/Telemetry */}
              <div className="fleet-bottom-grid">
                {/* Recent Trips Table */}
                <div className="fleet-card fleet-recent-trips-card">
                  <div className="fleet-card-header">
                    <div className="fleet-card-icon-title">
                      <Navigation size={20} className="text-green" />
                      <div>
                        <h3>Live Trip Dispatches</h3>
                        <p className="fleet-card-subtitle">Active freight runs, route status, and fuel consumption</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('trips')}
                      className="fleet-btn-view-all"
                    >
                      View All Trips &rarr;
                    </button>
                  </div>

                  <div className="fleet-table-responsive">
                    <table className="fleet-table">
                      <thead>
                        <tr>
                          <th>TRIP ID</th>
                          <th>VEHICLE</th>
                          <th>DRIVER</th>
                          <th>ROUTE</th>
                          <th>REVENUE</th>
                          <th>FUEL</th>
                          <th>STATUS</th>
                          <th>DISPATCH TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTrips.map((trp) => (
                          <tr key={trp.id}>
                            <td className="font-semibold text-green">{trp.id}</td>
                            <td>
                              <div className="fleet-cell-col">
                                <span className="font-semibold">{trp.vehicle}</span>
                                <span className="text-muted text-sm">{trp.vehicleType}</span>
                              </div>
                            </td>
                            <td>{trp.driver}</td>
                            <td className="text-muted font-medium">{trp.route}</td>
                            <td className="font-semibold text-green">{trp.amount}</td>
                            <td>{trp.fuel}</td>
                            <td>{renderStatusBadge(trp.status)}</td>
                            <td className="text-muted text-sm">{trp.dispatchTime}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Maintenance & Geofence Alerts Card */}
                <div className="fleet-card fleet-alerts-card">
                  <div className="fleet-card-header">
                    <div className="fleet-card-icon-title">
                      <AlertTriangle size={20} className="text-amber" />
                      <div>
                        <h3>Maintenance &amp; Alerts</h3>
                        <p className="fleet-card-subtitle">Service intervals &amp; geofence</p>
                      </div>
                    </div>
                  </div>

                  <div className="fleet-alerts-list">
                    {maintenanceLogs.map((log, idx) => (
                      <div key={idx} className="fleet-alert-item">
                        <div className="fleet-alert-top">
                          <span className="font-semibold">{log.vehicle}</span>
                          <span className="fleet-badge fleet-badge-amber">{log.dueIn}</span>
                        </div>
                        <p className="fleet-alert-task">{log.task}</p>
                        <span className="fleet-alert-workshop">{log.workshop}</span>
                      </div>
                    ))}
                  </div>

                  <div className="fleet-geofence-alert-box">
                    <div className="alert-head">
                      <Radio size={16} className="text-green" />
                      <span>Live Geofence Boundary Check</span>
                    </div>
                    <p className="alert-desc">All 48 GPS units active. Zero unauthorized route deviations detected today.</p>
                  </div>
                </div>
              </div>

              {/* Bottom ERP Info Banner */}
              <div className="fleet-info-banner">
                <Info size={18} className="text-green" />
                <p>
                  <strong>Fleet Management – Enterprise Transport &amp; Logistics ERP</strong> &nbsp;|&nbsp;
                  Live GPS tracking, vehicle diagnostics, automated fuel logs, driver rosters, and trip dispatch.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: VEHICLES REGISTRY */}
          {activeTab === 'vehicles' && (
            <div className="fleet-vehicles-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Vehicles Registry</h2>
                  <p className="fleet-section-subtitle">Manage 48 transport trucks, intercity coaches, and refrigerated delivery vans</p>
                </div>
                <button className="fleet-btn-primary">
                  <Plus size={16} />
                  <span>Add New Vehicle</span>
                </button>
              </div>

              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>REGISTRATION NO.</th>
                        <th>MODEL &amp; MAKE</th>
                        <th>TYPE</th>
                        <th>FUEL LEVEL</th>
                        <th>ODOMETER</th>
                        <th>ASSIGNED DRIVER</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehiclesRegistry.map((v) => (
                        <tr key={v.id}>
                          <td className="font-bold text-green font-mono">{v.plate}</td>
                          <td className="font-semibold">{v.make}</td>
                          <td><span className="fleet-badge fleet-badge-gray">{v.type}</span></td>
                          <td><span className="font-semibold">{v.fuelLevel}</span></td>
                          <td className="font-mono text-muted">{v.odo}</td>
                          <td>{v.driver}</td>
                          <td>{renderStatusBadge(v.status)}</td>
                          <td>
                            <button className="fleet-table-action-btn">Diagnostics</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DRIVERS ROSTER */}
          {activeTab === 'drivers' && (
            <div className="fleet-drivers-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Driver Directory &amp; Compliance</h2>
                  <p className="fleet-section-subtitle">32 verified commercial drivers with driving licenses and duty status</p>
                </div>
                <button className="fleet-btn-primary">
                  <Plus size={16} />
                  <span>Onboard Driver</span>
                </button>
              </div>

              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>DRIVER NAME</th>
                        <th>LICENSE NUMBER</th>
                        <th>EXPERIENCE</th>
                        <th>CURRENT VEHICLE</th>
                        <th>SAFETY RATING</th>
                        <th>PHONE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driversRoster.map((d) => (
                        <tr key={d.id}>
                          <td className="font-semibold">{d.name}</td>
                          <td className="font-mono text-muted">{d.license}</td>
                          <td>{d.exp}</td>
                          <td className="font-semibold text-green">{d.vehicle}</td>
                          <td className="font-semibold">{d.rating}</td>
                          <td>{d.phone}</td>
                          <td>{renderStatusBadge(d.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TRIPS MANAGEMENT */}
          {activeTab === 'trips' && (
            <div className="fleet-trips-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Trips &amp; Waybill Logs</h2>
                  <p className="fleet-section-subtitle">186 recorded journeys with live odometer and waypoint checkpoints</p>
                </div>
                <button className="fleet-btn-primary">
                  <Plus size={16} />
                  <span>Create Waybill Trip</span>
                </button>
              </div>

              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>TRIP ID</th>
                        <th>VEHICLE PLATE</th>
                        <th>DRIVER</th>
                        <th>ROUTE ORIGIN &rarr; DESTINATION</th>
                        <th>BILLED REVENUE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTrips.map((t) => (
                        <tr key={t.id}>
                          <td className="font-mono font-bold text-green">{t.id}</td>
                          <td className="font-semibold">{t.vehicle}</td>
                          <td>{t.driver}</td>
                          <td className="font-medium text-muted">{t.route}</td>
                          <td className="font-bold text-green">{t.amount}</td>
                          <td>{renderStatusBadge(t.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FUEL MANAGEMENT */}
          {activeTab === 'fuel' && (
            <div className="fleet-fuel-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Fuel Dispensation &amp; Mileage</h2>
                  <p className="fleet-section-subtitle">4,820 L consumed this week across all active regional routes</p>
                </div>
                <button className="fleet-btn-primary">
                  <Download size={16} />
                  <span>Fuel Consumption Audit</span>
                </button>
              </div>

              <div className="fleet-stats-grid">
                <div className="fleet-stat-card">
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Average Fleet Mileage</span>
                    <div className="fleet-stat-value">4.2 km/L</div>
                    <div className="fleet-stat-trend text-green">↑ +0.3 km/L efficiency</div>
                  </div>
                </div>
                <div className="fleet-stat-card">
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Total Fuel Expenditure</span>
                    <div className="fleet-stat-value">₹4,57,900</div>
                    <div className="fleet-stat-trend text-green">Avg ₹95.00 / Liter</div>
                  </div>
                </div>
                <div className="fleet-stat-card">
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Fuel Theft / Variance</span>
                    <div className="fleet-stat-value">0.0%</div>
                    <div className="fleet-stat-trend text-green">100% sensor verified</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MAINTENANCE */}
          {activeTab === 'maintenance' && (
            <div className="fleet-maintenance-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Preventive Maintenance Schedule</h2>
                  <p className="fleet-section-subtitle">Lubrication, tire tread depth, brake discs, and fitness fitness audits</p>
                </div>
                <button className="fleet-btn-primary">
                  <Plus size={16} />
                  <span>Schedule Service</span>
                </button>
              </div>

              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>VEHICLE PLATE</th>
                        <th>SERVICE TASK</th>
                        <th>DUE THRESHOLD</th>
                        <th>AUTHORIZED WORKSHOP</th>
                        <th>PRIORITY</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceLogs.map((m, idx) => (
                        <tr key={idx}>
                          <td className="font-bold font-mono">{m.vehicle}</td>
                          <td className="font-semibold">{m.task}</td>
                          <td className="text-amber font-semibold">{m.dueIn}</td>
                          <td>{m.workshop}</td>
                          <td>{renderStatusBadge(m.priority)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: REPORTS */}
          {activeTab === 'reports' && (
            <div className="fleet-reports-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Fleet Telemetry &amp; Financials</h2>
                  <p className="fleet-section-subtitle">Operating margins, cost-per-km, driver downtime, and asset utilization</p>
                </div>
                <button className="fleet-btn-primary">
                  <Download size={16} />
                  <span>Download Full Report</span>
                </button>
              </div>

              <div className="fleet-stats-grid">
                <div className="fleet-stat-card">
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Cost Per Kilometer (CPK)</span>
                    <div className="fleet-stat-value">₹24.80</div>
                    <div className="fleet-stat-trend text-green">↓ -₹1.40 vs target</div>
                  </div>
                </div>
                <div className="fleet-stat-card">
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">Fleet Utilization</span>
                    <div className="fleet-stat-value">91.4%</div>
                    <div className="fleet-stat-trend text-green">↑ +4.2% high uptime</div>
                  </div>
                </div>
                <div className="fleet-stat-card">
                  <div className="fleet-stat-info">
                    <span className="fleet-stat-label">On-Time Delivery Rate</span>
                    <div className="fleet-stat-value">98.2%</div>
                    <div className="fleet-stat-trend text-green">⭐ Industry leading</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: GEOFENCING */}
          {activeTab === 'geofencing' && (
            <div className="fleet-geofence-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Geofencing &amp; Zone Security</h2>
                  <p className="fleet-section-subtitle">Virtual boundary triggers for ports, warehouses, and toll corridors</p>
                </div>
                <button className="fleet-btn-primary">
                  <Plus size={16} />
                  <span>Create Geofence Zone</span>
                </button>
              </div>

              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>ZONE NAME</th>
                        <th>RADIUS / AREA</th>
                        <th>ASSIGNED DEPOT</th>
                        <th>ALERT TRIGGER</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-semibold">Mumbai Nhava Sheva Terminal</td>
                        <td>5.0 km Circular</td>
                        <td>Western Hub</td>
                        <td>Entry / Exit SMS &amp; Webhook</td>
                        <td><span className="fleet-badge fleet-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Hyderabad Shamshabad Cargo Zone</td>
                        <td>3.5 km Perimeter</td>
                        <td>South Central Hub</td>
                        <td>Speed &gt; 40 km/h Alert</td>
                        <td><span className="fleet-badge fleet-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="fleet-users-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Fleet Dispatchers &amp; Controller Roles</h2>
                  <p className="fleet-section-subtitle">Manage control room operators, depot managers, and safety compliance officers</p>
                </div>
                <button className="fleet-btn-primary">
                  <Plus size={16} />
                  <span>Invite Fleet Staff</span>
                </button>
              </div>

              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>STAFF MEMBER</th>
                        <th>ROLE</th>
                        <th>DEPOT JURISDICTION</th>
                        <th>PERMISSIONS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Central Admin Controller</strong><br/><span className="text-muted text-sm">controller@speshwayfleet.com</span></td>
                        <td><span className="fleet-badge fleet-badge-green">Fleet Director</span></td>
                        <td>Pan-India All Hubs</td>
                        <td>Full Control (GPS, Fuel, Invoicing)</td>
                        <td><span className="fleet-badge fleet-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td><strong>Manoj Deshmukh</strong><br/><span className="text-muted text-sm">manoj.d@speshwayfleet.com</span></td>
                        <td><span className="fleet-badge fleet-badge-blue">Senior Dispatcher</span></td>
                        <td>Western Corridor (MH &amp; GJ)</td>
                        <td>Trips, Drivers, Waybills</td>
                        <td><span className="fleet-badge fleet-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="fleet-settings-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Fleet Telematics &amp; GPS Configuration</h2>
                  <p className="fleet-section-subtitle">Sensor ping intervals, fuel flow sensors, and emergency SOS protocol</p>
                </div>
                <button className="fleet-btn-primary">
                  <Check size={16} />
                  <span>Save Configuration</span>
                </button>
              </div>

              <div className="fleet-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>GPS Telemetry Polling Rate</label>
                    <input
                      type="text"
                      defaultValue="10 seconds (High Precision Real-Time)"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Over-Speed Alert Threshold</label>
                    <input
                      type="text"
                      defaultValue="75 km/h (Commercial Heavy Commercial Vehicles)"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

          {/* TAB: DISPATCH BOARD */}
          {activeTab === 'dispatch' && (
            <div className="fleet-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Freight Dispatch Command Center</h2>
                  <p className="fleet-section-subtitle">Real-time load allocation, trailer coupling, and consignment assignments</p>
                </div>
                <button className="fleet-btn-primary">
                  <Plus size={16} />
                  <span>Assign Consignment</span>
                </button>
              </div>
              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>LOAD ID</th>
                        <th>VEHICLE</th>
                        <th>DRIVER IN CHARGE</th>
                        <th>ORIGIN & DESTINATION</th>
                        <th>PAYLOAD WEIGHT</th>
                        <th>SCHEDULED DEPARTURE</th>
                        <th>DISPATCH STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'DISP-8910', veh: 'TS-09-UB-4421 (Tata Prima 5530)', drv: 'Rajesh Kumar', route: 'Hyderabad ICD → Nhava Sheva Mumbai', wt: '28.5 Tonnes', dep: 'Today 08:30 PM', st: 'Dispatched' },
                        { id: 'DISP-8909', veh: 'MH-12-RN-8842 (BharatBenz 2823)', drv: 'Vikram Singh', route: 'Pune Chakan → Sri City Chennai', wt: '22.0 Tonnes', dep: 'Today 10:00 PM', st: 'Loading at Dock' },
                        { id: 'DISP-8908', veh: 'KA-01-MJ-9910 (Volvo FM 420)', drv: 'S. Anthony', route: 'Bengaluru Peenya → Hyderabad Shamshabad', wt: '18.4 Tonnes', dep: 'Tomorrow 06:00 AM', st: 'Staged' },
                        { id: 'DISP-8907', veh: 'TS-07-EX-3312 (Ashok Leyland 4220)', drv: 'M. Venkat Rao', route: 'Secunderabad → Visakhapatnam Port', wt: '24.2 Tonnes', dep: 'Tomorrow 08:00 AM', st: 'Staged' },
                      ].map((d, i) => (
                        <tr key={i}>
                          <td><strong>{d.id}</strong></td>
                          <td>{d.veh}</td>
                          <td>{d.drv}</td>
                          <td><span style={{ fontWeight: 600 }}>{d.route}</span></td>
                          <td>{d.wt}</td>
                          <td>{d.dep}</td>
                          <td><span className="fleet-active-badge">{d.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: RTO INSPECTIONS */}
          {activeTab === 'inspections' && (
            <div className="fleet-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">Vehicle Fitness, Insurance & RTO Compliance</h2>
                  <p className="fleet-section-subtitle">National Permit renewals, Pollution Under Control (PUC), and Road Tax audit</p>
                </div>
                <button className="fleet-btn-primary">
                  <ShieldCheck size={16} />
                  <span>Log RTO Renewal</span>
                </button>
              </div>
              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>REGISTRATION</th>
                        <th>VEHICLE MODEL</th>
                        <th>FITNESS CERT (FC)</th>
                        <th>COMPREHENSIVE INSURANCE</th>
                        <th>NATIONAL PERMIT</th>
                        <th>PUC POLLUTION</th>
                        <th>COMPLIANCE HEALTH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { reg: 'TS-09-UB-4421', mod: 'Tata Prima 5530.S', fc: 'Valid till 14 May 2027', ins: 'ICICI Lombard (31 Dec 2026)', np: '5-Year All-India Permit', puc: 'Passed (Green Tag)', st: 'Compliant' },
                        { reg: 'MH-12-RN-8842', mod: 'BharatBenz 2823R', fc: 'Valid till 22 Aug 2027', ins: 'HDFC ERGO (18 Oct 2026)', np: 'All-India National Permit', puc: 'Passed (Green Tag)', st: 'Compliant' },
                        { reg: 'KA-01-MJ-9910', mod: 'Volvo FM 420 6x4', fc: 'Valid till 08 Nov 2026', ins: 'Bajaj Allianz (12 Nov 2026)', np: 'All-India National Permit', puc: 'Passed (Green Tag)', st: 'Compliant' },
                        { reg: 'TS-07-EX-3312', mod: 'Ashok Leyland 4220 HG', fc: 'Valid till 19 Jan 2028', ins: 'Tata AIG (24 Feb 2027)', np: 'All-India National Permit', puc: 'Passed (Green Tag)', st: 'Compliant' },
                      ].map((r, i) => (
                        <tr key={i}>
                          <td><strong>{r.reg}</strong></td>
                          <td>{r.mod}</td>
                          <td><span className="fleet-active-badge">{r.fc}</span></td>
                          <td>{r.ins}</td>
                          <td>{r.np}</td>
                          <td>{r.puc}</td>
                          <td><span className="fleet-active-badge">{r.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FASTAG TOLLS */}
          {activeTab === 'toll-expenses' && (
            <div className="fleet-view">
              <div className="fleet-section-header">
                <div>
                  <h2 className="fleet-section-title">National Highway FASTag & Tollway Debits</h2>
                  <p className="fleet-section-subtitle">Automated deduction telemetry from NHAI toll plazas across transit routes</p>
                </div>
                <button className="fleet-btn-primary">
                  <CreditCard size={16} />
                  <span>Recharge Fleet FASTag</span>
                </button>
              </div>
              <div className="fleet-card">
                <div className="fleet-table-responsive">
                  <table className="fleet-table">
                    <thead>
                      <tr>
                        <th>TXN ID</th>
                        <th>VEHICLE REG</th>
                        <th>TOLL PLAZA & HIGHWAY</th>
                        <th>TIMESTAMP</th>
                        <th>AXLE CLASS</th>
                        <th>TOLL DEDUCTION</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { tx: 'FT-908124', reg: 'TS-09-UB-4421', plaza: 'Pantangi Toll (NH-65 Hyderabad-Vijayawada)', dt: 'Today 11:42 AM', cl: 'MAV (3-Axle Commercial)', amt: '₹480.00', st: 'Paid' },
                        { tx: 'FT-908123', reg: 'MH-12-RN-8842', plaza: 'Khed Shivapur Plaza (NH-48 Pune-Satara)', dt: 'Today 09:15 AM', cl: 'HCV (2-Axle Heavy)', amt: '₹340.00', st: 'Paid' },
                        { tx: 'FT-908122', reg: 'KA-01-MJ-9910', plaza: 'Attibele Toll Plaza (NH-44 Bengaluru-Hosur)', dt: 'Today 08:30 AM', cl: 'Multi-Axle Truck', amt: '₹510.00', st: 'Paid' },
                        { tx: 'FT-908121', reg: 'TS-07-EX-3312', plaza: 'Thonakkal Toll Plaza (NH-66)', dt: 'Yesterday 09:20 PM', cl: 'MAV (3-Axle Commercial)', amt: '₹460.00', st: 'Paid' },
                      ].map((t, i) => (
                        <tr key={i}>
                          <td><strong>{t.tx}</strong></td>
                          <td>{t.reg}</td>
                          <td><span style={{ fontWeight: 600 }}>{t.plaza}</span></td>
                          <td>{t.dt}</td>
                          <td>{t.cl}</td>
                          <td><strong style={{ color: '#059669' }}>{t.amt}</strong></td>
                          <td><span className="fleet-active-badge">{t.st}</span></td>
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


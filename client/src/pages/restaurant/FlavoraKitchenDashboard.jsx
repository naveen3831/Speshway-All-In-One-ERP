import React, { useState } from 'react';
import {
  LayoutGrid,
  ShoppingCart,
  Calendar,
  Users,
  UtensilsCrossed,
  Layers,
  CreditCard,
  Tag,
  Star,
  BarChart3,
  ShieldCheck,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  ArrowLeft,
  Plus,
  Check,
  Award,
  Download,
  Info,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MapPin,
  Flame,
  Coffee,
} from 'lucide-react';
import './FlavoraKitchenDashboard.css';

// Flavora Kitchen Chef Hat & Botanical Leaves Logo Icon
const FlavoraLogoIcon = () => (
  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="flavoraOrange" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.6" stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="flavoraGreen" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Chef Hat Crest */}
    <path
      d="M32 40 C24 35 25 22 36 20 C42 12 58 12 64 20 C75 22 76 35 68 40 L68 45 C68 46 66 47 64 47 L36 47 C34 47 32 46 32 45 Z"
      fill="none"
      stroke="url(#flavoraOrange)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M40 47 L40 52 C40 54 42 55 44 55 L56 55 C58 55 60 54 60 52 L60 47" fill="none" stroke="url(#flavoraOrange)" strokeWidth="3" />
    
    {/* Dual Culinary Fresh Herb / Mint Leaves */}
    <path
      d="M50 56 C40 56 36 68 38 78 C48 78 58 70 50 56 Z"
      fill="url(#flavoraGreen)"
    />
    <path
      d="M50 62 C58 60 66 68 64 78 C54 78 48 70 50 62 Z"
      fill="url(#flavoraGreen)"
      opacity="0.9"
    />
    
    {/* Outer Accent Ring Curve */}
    <path
      d="M24 64 C20 48 24 30 38 22 M76 36 C80 50 78 68 66 78"
      stroke="url(#flavoraOrange)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const FlavoraKitchenDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chartToggle, setChartToggle] = useState('orders'); // 'orders' | 'revenue'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Nov 03, 2026');

  // 13 Navigation Menu Items matching screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '24' },
    { id: 'reservations', label: 'Reservations', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'menu', label: 'Menu Management', icon: UtensilsCrossed },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'tables', label: 'Tables', icon: Coffee },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'offers', label: 'Offers & Discounts', icon: Tag },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users & Roles', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Static Data: Popular Menu Items matching screenshot
  const popularMenuItems = [
    {
      id: 1,
      name: 'Chicken Biryani',
      ordersCount: '286 orders',
      rankCount: '286',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: 'Paneer Butter Masala',
      ordersCount: '198 orders',
      rankCount: '198',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Veg Fried Rice',
      ordersCount: '176 orders',
      rankCount: '176',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Grilled Chicken',
      ordersCount: '142 orders',
      rankCount: '142',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=160&auto=format&fit=crop&q=80',
    },
    {
      id: 5,
      name: 'Margherita Pizza',
      ordersCount: '128 orders',
      rankCount: '128',
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=160&auto=format&fit=crop&q=80',
    },
  ];

  // Static Data: Recent Orders (Latest 5 orders matching screenshot)
  const recentOrders = [
    {
      id: '#ORD1258',
      customer: 'Ravi Teja',
      items: 'Chicken Biryani, Coke',
      amount: '₹549',
      status: 'Completed',
    },
    {
      id: '#ORD1257',
      customer: 'Sneha Reddy',
      items: 'Paneer Butter Masala, Naan',
      amount: '₹399',
      status: 'Preparing',
    },
    {
      id: '#ORD1256',
      customer: 'Arjun Kumar',
      items: 'Veg Fried Rice, Manchurian',
      amount: '₹329',
      status: 'Completed',
    },
    {
      id: '#ORD1255',
      customer: 'Priya Mehta',
      items: 'Grilled Chicken, Salad',
      amount: '₹649',
      status: 'Ready',
    },
    {
      id: '#ORD1254',
      customer: 'Karthik Rao',
      items: 'Margherita Pizza, Garlic Bread',
      amount: '₹799',
      status: 'Out for Delivery',
    },
  ];

  // Static Data: Reservation Schedule matching screenshot
  const reservationSchedule = [
    {
      time: '12:30 PM',
      customer: 'Anand Varma',
      table: 'T-04',
      guests: '4',
      status: 'Confirmed',
    },
    {
      time: '1:00 PM',
      customer: 'Neha Sharma',
      table: 'T-06',
      guests: '2',
      status: 'Confirmed',
    },
    {
      time: '7:00 PM',
      customer: 'Suresh Babu',
      table: 'T-02',
      guests: '6',
      status: 'Pending',
    },
    {
      time: '7:30 PM',
      customer: 'Divya Reddy',
      table: 'T-08',
      guests: '4',
      status: 'Confirmed',
    },
    {
      time: '8:00 PM',
      customer: 'Rajesh Kumar',
      table: 'T-05',
      guests: '8',
      status: 'Confirmed',
    },
  ];

  // Helper for order status badge styling
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
      case 'Confirmed':
        return <span className="flavora-badge flavora-badge-green">{status}</span>;
      case 'Preparing':
      case 'Pending':
        return <span className="flavora-badge flavora-badge-amber">{status}</span>;
      case 'Ready':
        return <span className="flavora-badge flavora-badge-green">{status}</span>;
      case 'Out for Delivery':
        return <span className="flavora-badge flavora-badge-blue">{status}</span>;
      default:
        return <span className="flavora-badge flavora-badge-gray">{status}</span>;
    }
  };

  return (
    <div className="flavora-wrapper">
      {/* 1. LEFT SIDEBAR (Dark Navy #0b1120 with Emerald Green Wave) */}
      <aside className="flavora-sidebar">
        <div className="flavora-sidebar-top">
          {/* Brand Header */}
        <div className="flavora-brand">
          <div className="flavora-logo-container">
            <FlavoraLogoIcon />
          </div>
          <div className="flavora-brand-text">
            <span className="flavora-brand-title">Flavora Kitchen</span>
            <span className="flavora-brand-subtitle">ADMIN PANEL</span>
          </div>
        </div>

        {/* 13 Navigation Menu Items */}
        <nav className="flavora-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flavora-nav-btn ${isActive ? 'active' : ''}`}
              >
                <div className="flavora-nav-btn-left">
                  <Icon size={18} className="flavora-nav-icon" />
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="flavora-nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
        </div>

        {/* Sidebar Pinned Bottom */}
        <div className="flavora-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="flavora-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="flavora-user-profile">
            <div className="flavora-avatar">FK</div>
            <div className="flavora-user-info">
              <span className="flavora-user-name">Executive Chef Lead</span>
              <span className="flavora-user-role">Flavora Cloud Kitchen HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT */}
      <div className="flavora-main">
        {/* Top Navbar Height 82px matching request */}
        <header className="flavora-topbar">
          <div className="flavora-topbar-left">
            <h1 className="flavora-greeting-title">Good Morning, Admin 👋</h1>
            <p className="flavora-greeting-subtitle">Here&apos;s what&apos;s happening at Flavora Kitchen today.</p>
          </div>

          <div className="flavora-topbar-right">
            {/* Search Input matching screenshot */}
            <div className="flavora-search-box">
              <Search size={16} className="flavora-search-icon" />
              <input
                type="text"
                placeholder="Search orders, customers, menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flavora-search-input"
              />
            </div>

            {/* Date Pill dropdown */}
            <div className="flavora-date-pill">
              <Calendar size={15} />
              <span>{selectedDate}</span>
              <ChevronDown size={14} />
            </div>

            {/* Notifications Bell */}
            <button className="flavora-icon-btn" title="Restaurant Notifications">
              <Bell size={19} />
              <span className="flavora-unread-dot"></span>
            </button>

            {/* User Profile with Green Avatar A */}
            <div className="flavora-user-profile">
              <span className="flavora-user-name">Admin</span>
              <div className="flavora-avatar">A</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flavora-content">
          {/* TAB 1: MAIN DASHBOARD VIEW (EXACT MATCH TO REFERENCE SCREENSHOT) */}
          {activeTab === 'dashboard' && (
            <div className="flavora-dashboard-view">
              {/* 4 KPI Stat Cards */}
              <div className="flavora-stats-grid">
                {/* 1. Total Orders */}
                <div className="flavora-stat-card">
                  <div className="flavora-stat-icon-wrap bg-green-light">
                    <ShoppingCart size={22} className="text-green" />
                  </div>
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Total Orders</span>
                    <div className="flavora-stat-value">1,248</div>
                    <div className="flavora-stat-trend text-green">
                      <span>↑ +12% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 2. Today's Reservations */}
                <div className="flavora-stat-card">
                  <div className="flavora-stat-icon-wrap bg-green-light">
                    <Calendar size={22} className="text-green" />
                  </div>
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Today&apos;s Reservations</span>
                    <div className="flavora-stat-value">86</div>
                    <div className="flavora-stat-trend text-green">
                      <span>↑ +18% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 3. Total Customers */}
                <div className="flavora-stat-card">
                  <div className="flavora-stat-icon-wrap bg-green-light">
                    <Users size={22} className="text-green" />
                  </div>
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Total Customers</span>
                    <div className="flavora-stat-value">5,420</div>
                    <div className="flavora-stat-trend text-green">
                      <span>↑ +9% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 4. Monthly Revenue */}
                <div className="flavora-stat-card">
                  <div className="flavora-stat-icon-wrap bg-green-light">
                    <span className="flavora-rupee-symbol">₹</span>
                  </div>
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Monthly Revenue</span>
                    <div className="flavora-stat-value">₹4,76,500</div>
                    <div className="flavora-stat-trend text-green">
                      <span>↑ +22% from last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Orders & Revenue Overview + Popular Menu Items */}
              <div className="flavora-analytics-grid">
                {/* Orders & Revenue Overview Mixed Bar + Line Chart */}
                <div className="flavora-card flavora-chart-card">
                  <div className="flavora-card-header">
                    <div className="flavora-card-icon-title">
                      <BarChart3 size={20} className="text-green" />
                      <div>
                        <h3>Orders &amp; Revenue Overview</h3>
                        <p className="flavora-card-subtitle">Weekly orders and revenue performance</p>
                      </div>
                    </div>

                    <div className="flavora-chart-toggle">
                      <button
                        onClick={() => setChartToggle('orders')}
                        className={`flavora-toggle-btn ${chartToggle === 'orders' ? 'active' : ''}`}
                      >
                        Orders
                      </button>
                      <button
                        onClick={() => setChartToggle('revenue')}
                        className={`flavora-toggle-btn ${chartToggle === 'revenue' ? 'active' : ''}`}
                      >
                        Revenue
                      </button>
                    </div>
                  </div>

                  {/* SVG Mixed Chart: Bars (Orders) + Line (Revenue) matching screenshot */}
                  <div className="flavora-chart-body">
                    <div className="flavora-chart-container">
                      <svg viewBox="0 0 720 250" className="flavora-svg-chart">
                        {/* Horizontal Grid lines */}
                        <line x1="60" y1="20" x2="660" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="55" x2="660" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="90" x2="660" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="125" x2="660" y2="125" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="160" x2="660" y2="160" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="195" x2="660" y2="195" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="60" y1="210" x2="660" y2="210" stroke="#e2e8f0" />

                        {/* Y-Axis Left Labels (Orders: 300 to 0) */}
                        <text x="50" y="24" textAnchor="end" className="chart-label">300</text>
                        <text x="50" y="59" textAnchor="end" className="chart-label">250</text>
                        <text x="50" y="94" textAnchor="end" className="chart-label">200</text>
                        <text x="50" y="129" textAnchor="end" className="chart-label">150</text>
                        <text x="50" y="164" textAnchor="end" className="chart-label">100</text>
                        <text x="50" y="199" textAnchor="end" className="chart-label">50</text>
                        <text x="50" y="214" textAnchor="end" className="chart-label">0</text>

                        {/* Y-Axis Right Labels (Revenue: ₹1.2L to ₹0) */}
                        <text x="670" y="24" textAnchor="start" className="chart-label">₹1.2L</text>
                        <text x="670" y="59" textAnchor="start" className="chart-label">₹1.0L</text>
                        <text x="670" y="94" textAnchor="start" className="chart-label">₹80K</text>
                        <text x="670" y="129" textAnchor="start" className="chart-label">₹60K</text>
                        <text x="670" y="164" textAnchor="start" className="chart-label">₹40K</text>
                        <text x="670" y="199" textAnchor="start" className="chart-label">₹20K</text>
                        <text x="670" y="214" textAnchor="start" className="chart-label">₹0</text>

                        {/* 7 Columns: Mon, Tue, Wed, Thu, Fri, Sat, Sun */}
                        {/* 1. Mon: Orders 132 */}
                        <rect x="80" y="122" width="38" height="88" rx="4" fill="#d1fae5" />
                        <text x="99" y="142" textAnchor="middle" className="bar-count-label">132</text>
                        <text x="99" y="228" textAnchor="middle" className="chart-day-label">Mon</text>

                        {/* 2. Tue: Orders 148 */}
                        <rect x="165" y="112" width="38" height="98" rx="4" fill="#d1fae5" />
                        <text x="184" y="132" textAnchor="middle" className="bar-count-label">148</text>
                        <text x="184" y="228" textAnchor="middle" className="chart-day-label">Tue</text>

                        {/* 3. Wed: Orders 164 */}
                        <rect x="250" y="102" width="38" height="108" rx="4" fill="#d1fae5" />
                        <text x="269" y="122" textAnchor="middle" className="bar-count-label">164</text>
                        <text x="269" y="228" textAnchor="middle" className="chart-day-label">Wed</text>

                        {/* 4. Thu: Orders 158 */}
                        <rect x="335" y="106" width="38" height="104" rx="4" fill="#d1fae5" />
                        <text x="354" y="126" textAnchor="middle" className="bar-count-label">158</text>
                        <text x="354" y="228" textAnchor="middle" className="chart-day-label">Thu</text>

                        {/* 5. Fri: Orders 185 */}
                        <rect x="420" y="89" width="38" height="121" rx="4" fill="#d1fae5" />
                        <text x="439" y="109" textAnchor="middle" className="bar-count-label">185</text>
                        <text x="439" y="228" textAnchor="middle" className="chart-day-label">Fri</text>

                        {/* 6. Sat: Orders 236 */}
                        <rect x="505" y="58" width="38" height="152" rx="4" fill="#d1fae5" />
                        <text x="524" y="78" textAnchor="middle" className="bar-count-label">236</text>
                        <text x="524" y="228" textAnchor="middle" className="chart-day-label">Sat</text>

                        {/* 7. Sun: Orders 225 */}
                        <rect x="590" y="65" width="38" height="145" rx="4" fill="#d1fae5" />
                        <text x="609" y="85" textAnchor="middle" className="bar-count-label">225</text>
                        <text x="609" y="228" textAnchor="middle" className="chart-day-label">Sun</text>

                        {/* Revenue Connected Trend Line */}
                        <path
                          d="M99 155 L184 142 L269 130 L354 135 L439 108 L524 68 L609 52"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Line Points */}
                        <circle cx="99" cy="155" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                        <circle cx="184" cy="142" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                        <circle cx="269" cy="130" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                        <circle cx="354" cy="135" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                        <circle cx="439" cy="108" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                        <circle cx="524" cy="68" r="4.5" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
                        <circle cx="609" cy="52" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                      </svg>
                    </div>

                    {/* Chart Bottom Legend matching screenshot */}
                    <div className="flavora-chart-legend">
                      <div className="legend-item">
                        <span className="legend-box-green"></span>
                        <span>Orders</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-line-dot"></span>
                        <span>Revenue</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Menu Items Card matching screenshot */}
                <div className="flavora-card flavora-popular-card">
                  <div className="flavora-card-header">
                    <div className="flavora-card-icon-title">
                      <Award size={20} className="text-green" />
                      <div>
                        <h3>Popular Menu Items</h3>
                        <p className="flavora-card-subtitle">Most ordered items this week</p>
                      </div>
                    </div>
                  </div>

                  <div className="flavora-popular-list">
                    {popularMenuItems.map((item) => (
                      <div key={item.id} className="flavora-popular-item">
                        <div className="flavora-dish-img-box">
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<div class="dish-fallback-icon">🍲</div>';
                            }}
                          />
                        </div>
                        <div className="flavora-dish-details">
                          <h4 className="flavora-dish-name">{item.name}</h4>
                          <span className="flavora-dish-orders">{item.ordersCount}</span>
                        </div>
                        <span className="flavora-dish-rank-badge">{item.rankCount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Recent Orders Table & Reservation Schedule Table */}
              <div className="flavora-bottom-grid">
                {/* 1. Recent Orders Card */}
                <div className="flavora-card flavora-recent-orders-card">
                  <div className="flavora-card-header">
                    <div className="flavora-card-icon-title">
                      <ShoppingCart size={20} className="text-green" />
                      <div>
                        <h3>Recent Orders</h3>
                        <p className="flavora-card-subtitle">Latest 5 orders from your restaurant</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="flavora-btn-view-all"
                    >
                      View All Orders &rarr;
                    </button>
                  </div>

                  <div className="flavora-table-responsive">
                    <table className="flavora-table">
                      <thead>
                        <tr>
                          <th>ORDER ID</th>
                          <th>CUSTOMER</th>
                          <th>ITEMS</th>
                          <th>AMOUNT</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((ord) => (
                          <tr key={ord.id}>
                            <td className="font-semibold text-muted font-mono">{ord.id}</td>
                            <td className="font-bold">{ord.customer}</td>
                            <td className="text-muted">{ord.items}</td>
                            <td className="font-bold">{ord.amount}</td>
                            <td>{renderStatusBadge(ord.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Reservation Schedule Card */}
                <div className="flavora-card flavora-reservations-card">
                  <div className="flavora-card-header">
                    <div className="flavora-card-icon-title">
                      <Calendar size={20} className="text-green" />
                      <div>
                        <h3>Reservation Schedule</h3>
                        <p className="flavora-card-subtitle">Upcoming table reservations</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('reservations')}
                      className="flavora-btn-view-all"
                    >
                      View All Reservations &rarr;
                    </button>
                  </div>

                  <div className="flavora-table-responsive">
                    <table className="flavora-table">
                      <thead>
                        <tr>
                          <th>TIME</th>
                          <th>CUSTOMER</th>
                          <th>TABLE</th>
                          <th>GUESTS</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservationSchedule.map((res, idx) => (
                          <tr key={idx}>
                            <td className="font-semibold text-muted">{res.time}</td>
                            <td className="font-bold">{res.customer}</td>
                            <td className="font-semibold font-mono text-green">{res.table}</td>
                            <td className="font-semibold">{res.guests}</td>
                            <td>{renderStatusBadge(res.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Bottom ERP Info Banner */}
              <div className="flavora-info-banner">
                <Info size={18} className="text-green" />
                <p>
                  <strong>Flavora Kitchen – Enterprise Cloud Kitchen &amp; Restaurant ERP</strong> &nbsp;|&nbsp;
                  Live table reservations, kitchen display system (KDS), digital POS, menu recipe costings, and online food delivery integration.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS VIEW */}
          {activeTab === 'orders' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Kitchen Orders &amp; Live KDS</h2>
                  <p className="flavora-section-subtitle">24 active dine-in, takeaway, and food delivery orders in progress</p>
                </div>
                <button className="flavora-btn-primary">
                  <Plus size={16} />
                  <span>Create Order</span>
                </button>
              </div>

              <div className="flavora-card">
                <div className="flavora-table-responsive">
                  <table className="flavora-table">
                    <thead>
                      <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER</th>
                        <th>ORDER ITEMS</th>
                        <th>TOTAL AMOUNT</th>
                        <th>PAYMENT METHOD</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td className="font-mono font-bold text-green">{ord.id}</td>
                          <td className="font-semibold">{ord.customer}</td>
                          <td>{ord.items}</td>
                          <td className="font-bold">{ord.amount}</td>
                          <td><span className="flavora-badge flavora-badge-gray">UPI / Card</span></td>
                          <td>{renderStatusBadge(ord.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RESERVATIONS */}
          {activeTab === 'reservations' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Dining Room Table Reservations</h2>
                  <p className="flavora-section-subtitle">86 booked banquet and restaurant tables for today</p>
                </div>
                <button className="flavora-btn-primary">
                  <Plus size={16} />
                  <span>Book Table</span>
                </button>
              </div>

              <div className="flavora-card">
                <div className="flavora-table-responsive">
                  <table className="flavora-table">
                    <thead>
                      <tr>
                        <th>TIME</th>
                        <th>GUEST NAME</th>
                        <th>TABLE NUMBER</th>
                        <th>PARTY SIZE</th>
                        <th>SPECIAL REQUESTS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservationSchedule.map((r, i) => (
                        <tr key={i}>
                          <td className="font-semibold">{r.time}</td>
                          <td className="font-bold">{r.customer}</td>
                          <td className="font-mono text-green font-bold">{r.table}</td>
                          <td>{r.guests} Guests</td>
                          <td className="text-muted">Window seating, Birthday celebration</td>
                          <td>{renderStatusBadge(r.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Customer Loyalty &amp; CRM</h2>
                  <p className="flavora-section-subtitle">5,420 registered food lovers and regular patrons</p>
                </div>
                <button className="flavora-btn-primary">
                  <Download size={16} />
                  <span>Export Customer List</span>
                </button>
              </div>

              <div className="flavora-stats-grid">
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Repeat Customers</span>
                    <div className="flavora-stat-value">68.4%</div>
                    <div className="flavora-stat-trend text-green">↑ High retention rate</div>
                  </div>
                </div>
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Average Order Value</span>
                    <div className="flavora-stat-value">₹640</div>
                    <div className="flavora-stat-trend text-green">Dine-in average</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MENU MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Menu Items &amp; Pricing</h2>
                  <p className="flavora-section-subtitle">124 starters, main courses, mocktails, and desserts</p>
                </div>
                <button className="flavora-btn-primary">
                  <Plus size={16} />
                  <span>Add Menu Item</span>
                </button>
              </div>

              <div className="flavora-card">
                <div className="flavora-table-responsive">
                  <table className="flavora-table">
                    <thead>
                      <tr>
                        <th>ITEM NAME</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>PORTION</th>
                        <th>KITCHEN STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {popularMenuItems.map((item) => (
                        <tr key={item.id}>
                          <td className="font-bold">{item.name}</td>
                          <td><span className="flavora-badge flavora-badge-green">Main Course</span></td>
                          <td className="font-bold text-green">₹349</td>
                          <td>Serves 1-2</td>
                          <td><span className="flavora-badge flavora-badge-green">In Stock</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Food &amp; Beverage Categories</h2>
                  <p className="flavora-section-subtitle">Organize your restaurant menu items by dietary type and course</p>
                </div>
                <button className="flavora-btn-primary">
                  <Plus size={16} />
                  <span>Add Category</span>
                </button>
              </div>

              <div className="flavora-stats-grid">
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Biryanis &amp; Rice</span>
                    <div className="flavora-stat-value">18 Dishes</div>
                  </div>
                </div>
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Tandoor &amp; Grills</span>
                    <div className="flavora-stat-value">24 Dishes</div>
                  </div>
                </div>
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Artisan Pizzas</span>
                    <div className="flavora-stat-value">12 Dishes</div>
                  </div>
                </div>
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Beverages &amp; Shakes</span>
                    <div className="flavora-stat-value">32 Drinks</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: TABLES */}
          {activeTab === 'tables' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Dining Tables &amp; Floor Plan</h2>
                  <p className="flavora-section-subtitle">Live status for 36 restaurant tables across Main Hall, Rooftop, and Family AC Lounge</p>
                </div>
                <button className="flavora-btn-primary">
                  <Plus size={16} />
                  <span>Floor Layout</span>
                </button>
              </div>

              <div className="flavora-card">
                <div className="flavora-table-responsive">
                  <table className="flavora-table">
                    <thead>
                      <tr>
                        <th>TABLE NO</th>
                        <th>ZONE</th>
                        <th>SEATING CAPACITY</th>
                        <th>CURRENT ORDER</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-bold text-green font-mono">T-01</td>
                        <td>Main Hall</td>
                        <td>4 Guests</td>
                        <td>#ORD1258 (₹549)</td>
                        <td><span className="flavora-badge flavora-badge-amber">Occupied</span></td>
                      </tr>
                      <tr>
                        <td className="font-bold text-green font-mono">T-02</td>
                        <td>Main Hall</td>
                        <td>6 Guests</td>
                        <td>None</td>
                        <td><span className="flavora-badge flavora-badge-green">Available</span></td>
                      </tr>
                      <tr>
                        <td className="font-bold text-green font-mono">T-04</td>
                        <td>Rooftop Terrace</td>
                        <td>4 Guests</td>
                        <td>Reserved at 12:30 PM</td>
                        <td><span className="flavora-badge flavora-badge-blue">Reserved</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">POS Settlements &amp; Daily Cash Register</h2>
                  <p className="flavora-section-subtitle">₹4,76,500 total monthly collection across UPI QR, EDC Cards, and Cash</p>
                </div>
                <button className="flavora-btn-primary">
                  <Download size={16} />
                  <span>Z-Report Day Close</span>
                </button>
              </div>

              <div className="flavora-stats-grid">
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Digital UPI Payments</span>
                    <div className="flavora-stat-value">₹3,24,000</div>
                    <div className="flavora-stat-trend text-green">68% of all orders</div>
                  </div>
                </div>
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Credit / Debit Cards</span>
                    <div className="flavora-stat-value">₹1,12,500</div>
                    <div className="flavora-stat-trend text-green">24% of all orders</div>
                  </div>
                </div>
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Cash Drawer</span>
                    <div className="flavora-stat-value">₹40,000</div>
                    <div className="flavora-stat-trend text-green">Audited balanced</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: OFFERS */}
          {activeTab === 'offers' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Coupons &amp; Promotional Deals</h2>
                  <p className="flavora-section-subtitle">Manage happy hour discounts, weekend buffet passes, and festive promo codes</p>
                </div>
                <button className="flavora-btn-primary">
                  <Plus size={16} />
                  <span>Create Coupon</span>
                </button>
              </div>

              <div className="flavora-card">
                <p><strong>FLAVORA20:</strong> Flat 20% off on all dine-in orders above ₹1,000.</p>
                <p style={{ marginTop: '10px' }}><strong>WEEKENDCOMBO:</strong> Buy 1 Biryani get 1 Mocktail free on Saturdays &amp; Sundays.</p>
              </div>
            </div>
          )}

          {/* TAB 10: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Guest Ratings &amp; Google Reviews</h2>
                  <p className="flavora-section-subtitle">Overall dining experience rating: 4.8 / 5.0 (1,840 verified reviews)</p>
                </div>
              </div>

              <div className="flavora-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong>Kavita Shenoy</strong>
                      <span className="flavora-badge flavora-badge-green">5.0 ⭐</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                      &ldquo;The Chicken Biryani and Paneer Butter Masala were outstanding! Amazing ambiance and courteous staff.&rdquo;
                    </p>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong>Rohan Nambiar</strong>
                      <span className="flavora-badge flavora-badge-green">4.8 ⭐</span>
                    </div>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                      &ldquo;Prompt table service, clean cutlery, and very delicious Margherita Pizza. Highly recommended!&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: REPORTS */}
          {activeTab === 'reports' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Kitchen Costing &amp; Profit Margins</h2>
                  <p className="flavora-section-subtitle">Recipe cost control, raw ingredient wastage, and daily gross profit analysis</p>
                </div>
                <button className="flavora-btn-primary">
                  <Download size={16} />
                  <span>Download Full Report</span>
                </button>
              </div>

              <div className="flavora-stats-grid">
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Food Cost Percentage</span>
                    <div className="flavora-stat-value">28.4%</div>
                    <div className="flavora-stat-trend text-green">Optimal target range</div>
                  </div>
                </div>
                <div className="flavora-stat-card">
                  <div className="flavora-stat-info">
                    <span className="flavora-stat-label">Table Turnaround Time</span>
                    <div className="flavora-stat-value">42 Minutes</div>
                    <div className="flavora-stat-trend text-green">Fast &amp; efficient</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Staff Credentials &amp; Chef Profiles</h2>
                  <p className="flavora-section-subtitle">Manage head chefs, floor managers, waitstaff, and billing operators</p>
                </div>
                <button className="flavora-btn-primary">
                  <Plus size={16} />
                  <span>Invite Staff</span>
                </button>
              </div>

              <div className="flavora-card">
                <div className="flavora-table-responsive">
                  <table className="flavora-table">
                    <thead>
                      <tr>
                        <th>STAFF NAME</th>
                        <th>ROLE</th>
                        <th>PERMISSIONS</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Restaurant General Manager</strong><br/><span className="text-muted text-sm">gm@flavorakitchen.com</span></td>
                        <td><span className="flavora-badge flavora-badge-green">General Manager</span></td>
                        <td>Full Control (KDS, Billing, Staff, Menu)</td>
                        <td><span className="flavora-badge flavora-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td><strong>Executive Chef Anand</strong><br/><span className="text-muted text-sm">anand.chef@flavorakitchen.com</span></td>
                        <td><span className="flavora-badge flavora-badge-blue">Head Chef</span></td>
                        <td>KDS Kitchen Display, Inventory, Recipes</td>
                        <td><span className="flavora-badge flavora-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="flavora-section-view">
              <div className="flavora-section-header">
                <div>
                  <h2 className="flavora-section-title">Kitchen Hardware &amp; Printer Setup</h2>
                  <p className="flavora-section-subtitle">Thermal KOT receipt printers, kitchen display screens, and tax rates</p>
                </div>
                <button className="flavora-btn-primary">
                  <Check size={16} />
                  <span>Save Configuration</span>
                </button>
              </div>

              <div className="flavora-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>KOT Thermal Printer IP</label>
                    <input
                      type="text"
                      defaultValue="192.168.1.200 (Main Kitchen Hotline)"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Restaurant GST / Tax Rate</label>
                    <input
                      type="text"
                      defaultValue="5.0% GST (Food &amp; Beverage)"
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


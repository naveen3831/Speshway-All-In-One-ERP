import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutGrid,
  ShoppingCart,
  Users,
  Package,
  Folder,
  Boxes,
  RefreshCw,
  Truck,
  Tag,
  CreditCard,
  TrendingUp,
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
} from 'lucide-react';
import './DairyDashboard.css';

// SVG graphic for Cow Logo
const CowLogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 8C3.2 6.5 2 4.5 2 3C4 3.5 6 4.8 7 6M20 8C20.8 6.5 22 4.5 22 3C20 3.5 18 4.8 17 6"
      stroke="#ffffff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 6C5 7.5 4 10 4 13C4 17.5 7.5 21 12 21C16.5 21 20 17.5 20 13C20 10 19 7.5 17 6C15 7 9 7 7 6Z"
      fill="#ffffff"
      fillOpacity="0.15"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="12.5" r="1.5" fill="#ffffff" />
    <circle cx="15.5" cy="12.5" r="1.5" fill="#ffffff" />
    <path
      d="M8.5 16.5C8.5 15.5 10 15 12 15C14 15 15.5 15.5 15.5 16.5C15.5 18 14 19 12 19C10 19 8.5 18 8.5 16.5Z"
      fill="#ffffff"
    />
    <circle cx="10.5" cy="16.5" r="0.6" fill="#059669" />
    <circle cx="13.5" cy="16.5" r="0.6" fill="#059669" />
  </svg>
);

// High-fidelity dairy product SVGs
const MilkBottleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="11" y="4" width="10" height="4" rx="2" fill="#0ea5e9" />
    <path d="M12 8H20L22 13V26C22 27.1 21.1 28 20 28H12C10.9 28 10 27.1 10 26V13L12 8Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
    <path d="M10 16C12 15 14 17 18 16C20 15.5 21 16 22 16.5V26C22 27.1 21.1 28 20 28H12C10.9 28 10 27.1 10 26V16Z" fill="#ffffff" />
    <line x1="13" y1="19" x2="19" y2="19" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="14" y1="22" x2="18" y2="22" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const PaneerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="22" rx="12" ry="6" fill="#d97706" fillOpacity="0.2" />
    <path d="M6 18C6 22 10.5 25 16 25C21.5 25 26 22 26 18H6Z" fill="#b45309" fillOpacity="0.8" />
    <rect x="10" y="11" width="7" height="6" rx="1" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
    <rect x="15" y="9" width="7" height="6" rx="1" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.2" />
    <rect x="12" y="14" width="7" height="6" rx="1" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.2" />
  </svg>
);

const CurdPotIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M7 16C7 23 11 27 16 27C21 27 25 23 25 16C25 14 24 13 22 13H10C8 13 7 14 7 16Z" fill="#9a3412" />
    <ellipse cx="16" cy="13" rx="7" ry="2.5" fill="#fef08a" />
    <ellipse cx="16" cy="12.5" rx="6" ry="2" fill="#ffffff" />
    <path d="M12 9C13 8 15 8 16 9C17 10 19 10 20 9" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ButterIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="7" y="12" width="18" height="10" rx="2" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
    <path d="M7 15L15 11L25 15" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="10" y="16" width="6" height="3" rx="0.5" fill="#ffffff" fillOpacity="0.5" />
  </svg>
);

const GheeJarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <rect x="11" y="6" width="10" height="3" rx="1.5" fill="#ca8a04" />
    <path d="M10 9H22L24 14V25C24 26.1 23.1 27 22 27H10C8.9 27 8 26.1 8 25V14L10 9Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
    <path d="M9 15C11 14 13 16 16 15C19 14 21 15 23 15.5V25C23 26.1 22.1 27 21 27H11C9.9 27 9 26.1 9 25V15Z" fill="#facc15" />
    <circle cx="16" cy="20" r="3" fill="#ffffff" fillOpacity="0.4" />
  </svg>
);

const CheeseWedgeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M6 22L26 22L24 12L6 18V22Z" fill="#fde047" stroke="#eab308" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 18L18 8L24 12" stroke="#eab308" strokeWidth="1.5" fill="#fef08a" />
    <circle cx="12" cy="19" r="1.5" fill="#ca8a04" />
    <circle cx="18" cy="18" r="2" fill="#ca8a04" />
    <circle cx="21" cy="15" r="1.2" fill="#ca8a04" />
  </svg>
);

export const DairyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [salesView, setSalesView] = useState('revenue'); // 'revenue' or 'orders'
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Sales trend points matching screenshot curve
  const salesData = [
    { date: 'Oct 25', revenue: 2400, orders: 18, x: 50, y: 160 },
    { date: 'Oct 26', revenue: 3450, orders: 24, x: 130, y: 142 },
    { date: 'Oct 27', revenue: 5900, orders: 38, x: 210, y: 110 },
    { date: 'Oct 28', revenue: 5200, orders: 31, x: 290, y: 122 },
    { date: 'Oct 29', revenue: 7300, orders: 46, x: 370, y: 92 },
    { date: 'Oct 30', revenue: 7450, orders: 49, x: 450, y: 90 },
    { date: 'Oct 31', revenue: 11400, orders: 72, x: 530, y: 32 },
  ];

  // SVG Area path generator
  const linePath = `M ${salesData.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const areaPath = `M 50,190 L ${salesData.map((p) => `${p.x},${p.y}`).join(' L ')} L 530,190 Z`;

  // Sidebar navigation items matching the screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: '12' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Folder },
    { id: 'inventory', label: 'Inventory', icon: Boxes },
    { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCw },
    { id: 'delivery', label: 'Delivery Management', icon: Truck },
    { id: 'offers', label: 'Offers & Coupons', icon: Tag },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'roles', label: 'Users & Roles', icon: UserCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Recent orders matching exact screenshot data
  const recentOrders = [
    {
      id: '#ORD-3289',
      customer: 'Ravi Kumar',
      items: 'Toned Milk (1 L) ×2, Curd (500 g) ×1',
      amount: '₹162.00',
      payment: 'Paid',
      paymentType: 'paid',
      status: 'Out for Delivery',
      statusType: 'out-delivery',
      date: 'Oct 31, 2026 10:24 AM',
    },
    {
      id: '#ORD-3288',
      customer: 'Sneha Reddy',
      items: 'Paneer (200 g) ×1, Milk (1 L) ×1',
      amount: '₹198.00',
      payment: 'Paid',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Oct 31, 2026 09:47 AM',
    },
    {
      id: '#ORD-3287',
      customer: 'Arjun Rao',
      items: 'Curd (500 g) ×2, Butter (100 g) ×1',
      amount: '₹224.00',
      payment: 'COD',
      paymentType: 'cod',
      status: 'Processing',
      statusType: 'processing',
      date: 'Oct 30, 2026 08:12 PM',
    },
    {
      id: '#ORD-3286',
      customer: 'Meena Devi',
      items: 'Milk (1 L) ×1, Ghee (500 ml) ×1',
      amount: '₹540.00',
      payment: 'Paid',
      paymentType: 'paid',
      status: 'Delivered',
      statusType: 'delivered',
      date: 'Oct 30, 2026 06:31 PM',
    },
  ];

  // Top Selling Products matching screenshot
  const topSellingProducts = [
    {
      id: 1,
      name: 'Toned Milk (1 L)',
      sold: '142 sold',
      revenue: '₹8,520',
      Icon: MilkBottleIcon,
    },
    {
      id: 2,
      name: 'Paneer (200 g)',
      sold: '89 sold',
      revenue: '₹7,120',
      Icon: PaneerIcon,
    },
    {
      id: 3,
      name: 'Curd (500 g)',
      sold: '76 sold',
      revenue: '₹4,560',
      Icon: CurdPotIcon,
    },
  ];

  // Low Stock Products matching screenshot
  const lowStockProducts = [
    {
      id: 1,
      name: 'Butter (100 g)',
      leftCount: '5 left',
      Icon: ButterIcon,
    },
    {
      id: 2,
      name: 'Ghee (500 ml)',
      leftCount: '8 left',
      Icon: GheeJarIcon,
    },
    {
      id: 3,
      name: 'Cheese (200 g)',
      leftCount: '6 left',
      Icon: CheeseWedgeIcon,
    },
  ];

  return (
    <div className="dairy-dashboard-container">
      {/* =========================================================
          LEFT SIDEBAR (Dark Navy #0b1120)
      ========================================================= */}
      <aside className="dairy-sidebar">
        <div className="dairy-sidebar-top">
          {/* Brand Header */}
          <Link to="/product/natural-milk-dairy" className="dairy-brand">
            <div className="dairy-brand-logo-box">
              <CowLogoIcon />
            </div>
            <div className="dairy-brand-text">
              <span className="dairy-brand-title">Madhur Dairy</span>
              <span className="dairy-brand-sub">ADMIN PANEL</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <ul className="dairy-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="dairy-nav-item">
                  <button
                    className={`dairy-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <Icon size={18} />
                    <span className="dairy-nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="dairy-nav-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="dairy-sidebar-footer">
          <button
            className="dairy-logout-btn"
            onClick={() => navigate('/product/natural-milk-dairy')}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =========================================================
          MAIN WRAPPER & TOP NAVBAR
      ========================================================= */}
      <div className="dairy-main-wrapper">
        <header className="dairy-top-navbar">
          <div className="dairy-nav-left">
            <span className="dairy-nav-brand-title">Madhur Dairy Management</span>
            <span className="dairy-operational-pill">
              <span className="dairy-op-dot"></span>
              Operational
            </span>
          </div>

          <div className="dairy-nav-right">
            <Link to="/product/natural-milk-dairy" className="dairy-back-catalog-link" title="Return to Natural Milk Dairy product overview">
              <ArrowLeft size={14} /> Back to Catalog
            </Link>

            <button className="dairy-bell-btn" title="Notifications">
              <Bell size={18} />
              <span className="dairy-bell-dot"></span>
            </button>

            <div className="dairy-user-pill">
              <span className="dairy-user-name">Admin</span>
              <div className="dairy-user-avatar">M</div>
            </div>
          </div>
        </header>

        {/* =========================================================
            DASHBOARD CONTENT
        ========================================================= */}
        <main className="dairy-content">
          {/* Welcome Row */}
          <div className="dairy-welcome-row">
            <div className="dairy-welcome-left">
              <h1>Welcome back, Admin 👋</h1>
              <p>Manage products, orders, customers, deliveries, and daily dairy operations in one place.</p>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                className="dairy-date-btn"
                onClick={() => setShowDateDropdown(!showDateDropdown)}
              >
                <Calendar size={15} color="#059669" />
                <span>{dateRange}</span>
                <ChevronDown size={14} color="#64748b" />
              </button>

              {showDateDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    zIndex: 60,
                    minWidth: '150px',
                    overflow: 'hidden',
                  }}
                >
                  {['Today', 'Last 7 Days', 'This Month', 'This Quarter'].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => {
                        setDateRange(opt);
                        setShowDateDropdown(false);
                      }}
                      style={{
                        padding: '9px 14px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        color: dateRange === opt ? '#059669' : '#334155',
                        fontWeight: dateRange === opt ? 600 : 400,
                        backgroundColor: dateRange === opt ? '#ecfdf5' : '#ffffff',
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* =========================================================
              4 KPI SUMMARY STATS CARDS
          ========================================================= */}
          <div className="dairy-kpi-grid">
            {/* Card 1: Total Orders */}
            <div className="dairy-kpi-card">
              <div className="dairy-kpi-icon-box green">
                <ShoppingCart size={22} />
              </div>
              <div className="dairy-kpi-info">
                <span className="dairy-kpi-label">Total Orders</span>
                <span className="dairy-kpi-value">248</span>
                <span className="dairy-kpi-growth">
                  <span>↑</span> +12% from last 7 days
                </span>
              </div>
            </div>

            {/* Card 2: Total Customers */}
            <div className="dairy-kpi-card">
              <div className="dairy-kpi-icon-box blue">
                <Users size={22} />
              </div>
              <div className="dairy-kpi-info">
                <span className="dairy-kpi-label">Total Customers</span>
                <span className="dairy-kpi-value">1,426</span>
                <span className="dairy-kpi-growth">
                  <span>↑</span> +8% from last 7 days
                </span>
              </div>
            </div>

            {/* Card 3: Total Products */}
            <div className="dairy-kpi-card">
              <div className="dairy-kpi-icon-box amber">
                <Package size={22} />
              </div>
              <div className="dairy-kpi-info">
                <span className="dairy-kpi-label">Total Products</span>
                <span className="dairy-kpi-value">86</span>
                <span className="dairy-kpi-subtext">3 categories</span>
              </div>
            </div>

            {/* Card 4: Total Revenue */}
            <div className="dairy-kpi-card">
              <div className="dairy-kpi-icon-box green">
                <span style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1 }}>₹</span>
              </div>
              <div className="dairy-kpi-info">
                <span className="dairy-kpi-label">Total Revenue</span>
                <span className="dairy-kpi-value">₹52,430</span>
                <span className="dairy-kpi-growth">
                  <span>↑</span> +18% from last 7 days
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================
              MIDDLE & LOWER GRID
          ========================================================= */}
          <div className="dairy-main-grid">
            {/* LEFT COLUMN: Sales Overview & Recent Orders */}
            <div className="dairy-col-left">
              {/* Card 1: Sales Overview */}
              <div className="dairy-card">
                <div className="dairy-card-header">
                  <div className="dairy-card-title-group">
                    <BarChart3 size={20} className="dairy-card-icon" />
                    <div>
                      <h2 className="dairy-card-h2">Sales Overview</h2>
                      <p className="dairy-card-sub">Daily revenue and order trends</p>
                    </div>
                  </div>

                  <div className="dairy-toggle-pills">
                    <button
                      className={`dairy-toggle-pill ${salesView === 'revenue' ? 'active' : ''}`}
                      onClick={() => setSalesView('revenue')}
                    >
                      Revenue
                    </button>
                    <button
                      className={`dairy-toggle-pill ${salesView === 'orders' ? 'active' : ''}`}
                      onClick={() => setSalesView('orders')}
                    >
                      Orders
                    </button>
                  </div>
                </div>

                <div className="dairy-chart-container">
                  <svg className="dairy-svg-chart" viewBox="0 0 580 220">
                    <defs>
                      <linearGradient id="salesGreenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
                        <stop offset="70%" stopColor="#10b981" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Gridlines */}
                    {[
                      { val: '₹12,000', y: 25 },
                      { val: '₹10,000', y: 55 },
                      { val: '₹8,000', y: 85 },
                      { val: '₹6,000', y: 115 },
                      { val: '₹4,000', y: 145 },
                      { val: '₹2,000', y: 175 },
                      { val: '₹0', y: 195 },
                    ].map((g, i) => (
                      <g key={i}>
                        <text x="35" y={g.y + 3} textAnchor="end" fontSize="10.5" fill="#94a3b8" fontFamily="Inter, sans-serif">
                          {salesView === 'revenue' ? g.val : `${Math.round(parseInt(g.val.replace(/[^0-9]/g, '')) / 150)} orders`}
                        </text>
                        <line x1="42" y1={g.y} x2="560" y2={g.y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      </g>
                    ))}

                    {/* Gradient Fill under the line */}
                    <path d={areaPath} fill="url(#salesGreenGradient)" />

                    {/* Curved Trend Line */}
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Circular Data Points */}
                    {salesData.map((pt, idx) => (
                      <g key={idx}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="4.5"
                          fill="#ffffff"
                          stroke="#059669"
                          strokeWidth="2.5"
                          className="dairy-chart-point"
                          onMouseEnter={() => setHoveredPoint(pt)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                        {/* X-axis date labels */}
                        <text
                          x={pt.x}
                          y="212"
                          textAnchor="middle"
                          fontSize="11"
                          fill="#64748b"
                          fontFamily="Inter, sans-serif"
                        >
                          {pt.date}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Tooltip on Hover */}
                  {hoveredPoint && (
                    <div
                      style={{
                        position: 'absolute',
                        top: `${hoveredPoint.y + 10}px`,
                        left: `${(hoveredPoint.x / 580) * 100}%`,
                        transform: 'translateX(-50%)',
                        background: '#0f172a',
                        color: '#ffffff',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        pointerEvents: 'none',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                        whiteSpace: 'nowrap',
                        zIndex: 20,
                      }}
                    >
                      <div>{hoveredPoint.date}</div>
                      <div style={{ color: '#34d399', fontSize: '11px', marginTop: '2px' }}>
                        {salesView === 'revenue' ? `₹${hoveredPoint.revenue.toLocaleString()}` : `${hoveredPoint.orders} Orders`}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card 2: Recent Orders */}
              <div className="dairy-card">
                <div className="dairy-card-header">
                  <div className="dairy-card-title-group">
                    <ShoppingCart size={20} className="dairy-card-icon" />
                    <div>
                      <h2 className="dairy-card-h2">Recent Orders</h2>
                      <p className="dairy-card-sub">Latest customer orders across all channels</p>
                    </div>
                  </div>

                  <button
                    className="dairy-view-all-link"
                    onClick={() => setActiveTab('orders')}
                  >
                    <span>View All Orders</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="dairy-table-wrapper">
                  <table className="dairy-table">
                    <thead>
                      <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER</th>
                        <th>ITEMS</th>
                        <th>AMOUNT</th>
                        <th>PAYMENT</th>
                        <th>STATUS</th>
                        <th>ORDER DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td className="dairy-order-id">{ord.id}</td>
                          <td className="dairy-customer-name">{ord.customer}</td>
                          <td className="dairy-items-text">{ord.items}</td>
                          <td className="dairy-amount-text">{ord.amount}</td>
                          <td>
                            <span className={`dairy-badge ${ord.paymentType}`}>
                              {ord.payment}
                            </span>
                          </td>
                          <td>
                            <span className={`dairy-badge ${ord.statusType}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="dairy-order-date">{ord.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Top Selling Products & Low Stock Products */}
            <div className="dairy-col-right">
              {/* Card 1: Top Selling Products */}
              <div className="dairy-card">
                <div className="dairy-card-header">
                  <div className="dairy-card-title-group">
                    <Award size={20} className="dairy-card-icon" />
                    <div>
                      <h2 className="dairy-card-h2">Top Selling Products</h2>
                      <p className="dairy-card-sub">This week</p>
                    </div>
                  </div>
                </div>

                <div className="dairy-list">
                  {topSellingProducts.map((p) => {
                    const ProductIcon = p.Icon;
                    return (
                      <div key={p.id} className="dairy-list-item">
                        <div className="dairy-item-left">
                          <div className="dairy-thumb-box">
                            <ProductIcon />
                          </div>
                          <div>
                            <div className="dairy-item-name">{p.name}</div>
                            <div className="dairy-item-sub">{p.sold}</div>
                          </div>
                        </div>
                        <div className="dairy-item-revenue">{p.revenue}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card 2: Low Stock Products */}
              <div className="dairy-card">
                <div className="dairy-card-header">
                  <div className="dairy-card-title-group">
                    <AlertTriangle size={20} className="dairy-card-icon amber" />
                    <div>
                      <h2 className="dairy-card-h2">Low Stock Products</h2>
                      <p className="dairy-card-sub">Needs restocking</p>
                    </div>
                  </div>
                </div>

                <div className="dairy-list">
                  {lowStockProducts.map((p) => {
                    const ProductIcon = p.Icon;
                    return (
                      <div key={p.id} className="dairy-list-item">
                        <div className="dairy-item-left">
                          <div className="dairy-thumb-box">
                            <ProductIcon />
                          </div>
                          <div className="dairy-item-name">{p.name}</div>
                        </div>
                        <span className="dairy-stock-badge">{p.leftCount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              BOTTOM ANNOUNCEMENT / INFO BANNER
          ========================================================= */}
          <div className="dairy-info-banner">
            <Info size={18} style={{ flexShrink: 0 }} />
            <div>
              <strong>Madhur Dairy – Dairy Management Platform</strong>
              <span className="dairy-info-divider">|</span>
              <span>Manage products, orders, inventory, customers, delivery, and subscriptions for a seamless dairy business.</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

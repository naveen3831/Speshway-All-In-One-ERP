import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Star,
  ShoppingCart,
  Users,
  Package,
  Folder,
  Layers,
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
  Sparkles,
  Download,
  Eye,
  ShieldCheck,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Keyboard,
  Watch,
  Truck,
  RotateCcw,
  Zap,
} from 'lucide-react';
import './NexoraDashboard.css';

// Stylized Nexora Logo Icon with Emerald Green Cart, speed lines, and 'N' monogram
const NexoraLogoIcon = () => (
  <svg width="44" height="40" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nexoraEmeraldGrad" x1="10" y1="10" x2="100" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.6" stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* 3 Speed Lines on left */}
    <rect x="2" y="32" width="16" height="5" rx="2.5" fill="#FFFFFF" />
    <rect x="8" y="44" width="12" height="5" rx="2.5" fill="#FFFFFF" />
    <rect x="2" y="56" width="16" height="5" rx="2.5" fill="#FFFFFF" />
    {/* Cart Chassis & Body */}
    <path
      d="M26 22H36L46 68H96L108 28H33"
      stroke="url(#nexoraEmeraldGrad)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="42" y="27" width="54" height="36" rx="4" fill="url(#nexoraEmeraldGrad)" />
    {/* Stylized White Letter 'N' inside Cart */}
    <path
      d="M54 55V35L76 55V35"
      stroke="#FFFFFF"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Cart Wheels with white rim */}
    <circle cx="52" cy="78" r="7" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
    <circle cx="90" cy="78" r="7" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
  </svg>
);

export const NexoraDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chartMode, setChartMode] = useState('revenue'); // 'revenue' | 'orders'
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderFilter, setOrderFilter] = useState('All');

  // Navigation Items matching the screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: 38 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Folder },
    { id: 'inventory', label: 'Inventory', icon: Layers },
    { id: 'offers', label: 'Offers & Coupons', icon: Tag },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp },
    { id: 'users', label: 'Users & Roles', icon: UserCheck },
    { id: 'shipments', label: 'Shipments & Logistics', icon: Truck, badge: 14 },
    { id: 'reviews', label: 'Customer Reviews', icon: Star },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  // Static Data: Top Selling Products (matching reference screenshot)
  const topSellingProducts = [
    {
      id: 1,
      name: 'Smartphone (12 GB, 256 GB)',
      specs: 'Snapdragon 8 Gen 3 • 120Hz AMOLED',
      sold: 342,
      price: '₹42,999',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=80',
      badge: 'Electronics',
    },
    {
      id: 2,
      name: 'Laptop (i5, 16 GB, 512 GB)',
      specs: '14" FHD IPS • Iris Xe Graphics',
      sold: 210,
      price: '₹56,990',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&auto=format&fit=crop&q=80',
      badge: 'Computers',
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      specs: 'Active Noise Cancellation • 40h Battery',
      sold: 186,
      price: '₹2,999',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80',
      badge: 'Audio',
    },
  ];

  // Static Data: Recent Orders (matching ERP theme)
  const recentOrders = [
    {
      id: '#ORD-9248',
      customer: 'Rahul Sharma',
      items: 'Smartphone (12 GB, 256 GB) ×1',
      amount: '₹42,999',
      payment: 'Paid',
      paymentMethod: 'UPI / GPay',
      status: 'Delivered',
      date: 'Nov 02, 2026 02:45 PM',
    },
    {
      id: '#ORD-9247',
      customer: 'Priya Patel',
      items: 'Laptop (i5, 16 GB, 512 GB) ×1',
      amount: '₹56,990',
      payment: 'Paid',
      paymentMethod: 'Credit Card',
      status: 'Processing',
      date: 'Nov 02, 2026 01:15 PM',
    },
    {
      id: '#ORD-9246',
      customer: 'Amit Verma',
      items: 'Wireless Headphones ×2',
      amount: '₹5,998',
      payment: 'COD',
      paymentMethod: 'Cash On Delivery',
      status: 'Out for Delivery',
      date: 'Nov 02, 2026 11:30 AM',
    },
    {
      id: '#ORD-9245',
      customer: 'Sneha Reddy',
      items: '4K Smart TV 55" ×1, Soundbar ×1',
      amount: '₹48,450',
      payment: 'Paid',
      paymentMethod: 'NetBanking',
      status: 'Shipped',
      date: 'Nov 01, 2026 06:20 PM',
    },
    {
      id: '#ORD-9244',
      customer: 'Vikram Malhotra',
      items: 'Mechanical Gaming Keyboard ×1',
      amount: '₹6,499',
      payment: 'Paid',
      paymentMethod: 'UPI / PhonePe',
      status: 'Delivered',
      date: 'Nov 01, 2026 04:10 PM',
    },
  ];

  // Static Data: Low Stock Electronic Items
  const lowStockProducts = [
    {
      id: 1,
      name: 'Mechanical Gaming Keyboard',
      sku: 'NEX-KB-RGB-01',
      left: 4,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      name: '4K Ultra HD Gaming Monitor 27"',
      sku: 'NEX-MON-4K-27',
      left: 2,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      name: 'Noise-Cancelling Earbuds Pro',
      sku: 'NEX-EAR-ANC-09',
      left: 5,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=120&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      name: 'Ergonomic Mesh Office Chair',
      sku: 'NEX-CHR-ERG-88',
      left: 3,
      image: 'https://images.unsplash.com/photo-1580481077111-968669e4f51e?w=120&auto=format&fit=crop&q=80',
    },
  ];

  // Static Data: Full Product Catalog for Products Tab
  const catalogProducts = [
    {
      id: 'PRD-01',
      name: 'Nexora Apex Smartphone 5G',
      category: 'Electronics',
      sku: 'NEX-PH-5G-128',
      price: '₹42,999',
      stock: 48,
      status: 'In Stock',
      rating: 4.8,
    },
    {
      id: 'PRD-02',
      name: 'Nexora UltraBook Pro 14"',
      category: 'Computers',
      sku: 'NEX-LT-I5-512',
      price: '₹56,990',
      stock: 24,
      status: 'In Stock',
      rating: 4.9,
    },
    {
      id: 'PRD-03',
      name: 'Studio Wireless Headphones',
      category: 'Audio',
      sku: 'NEX-AUD-WL-01',
      price: '₹2,999',
      stock: 82,
      status: 'In Stock',
      rating: 4.6,
    },
    {
      id: 'PRD-04',
      name: 'Quantum Mechanical RGB Keyboard',
      category: 'Gaming',
      sku: 'NEX-KB-RGB-01',
      price: '₹6,499',
      stock: 4,
      status: 'Low Stock',
      rating: 4.7,
    },
    {
      id: 'PRD-05',
      name: 'Smart AMOLED Fitness Watch 2',
      category: 'Wearables',
      sku: 'NEX-WCH-AML-02',
      price: '₹3,499',
      stock: 65,
      status: 'In Stock',
      rating: 4.5,
    },
    {
      id: 'PRD-06',
      name: 'Ultra HD 4K Smart Curved Monitor',
      category: 'Displays',
      sku: 'NEX-MON-4K-27',
      price: '₹24,999',
      stock: 2,
      status: 'Low Stock',
      rating: 4.8,
    },
    {
      id: 'PRD-07',
      name: 'Surround Bass Soundbar 120W',
      category: 'Audio',
      sku: 'NEX-SND-120W',
      price: '₹7,999',
      stock: 31,
      status: 'In Stock',
      rating: 4.7,
    },
  ];

  // Static Data: Customers List for Customers Tab
  const customersList = [
    {
      id: 'CUST-1001',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      orders: 8,
      spent: '₹1,42,850',
      tier: 'VIP Platinum',
      status: 'Active',
    },
    {
      id: 'CUST-1002',
      name: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 98123 45678',
      orders: 5,
      spent: '₹84,900',
      tier: 'Gold Member',
      status: 'Active',
    },
    {
      id: 'CUST-1003',
      name: 'Amit Verma',
      email: 'amit.verma@example.com',
      phone: '+91 97654 32109',
      orders: 12,
      spent: '₹2,18,400',
      tier: 'VIP Platinum',
      status: 'Active',
    },
    {
      id: 'CUST-1004',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      phone: '+91 99887 76655',
      orders: 3,
      spent: '₹54,449',
      tier: 'Silver Member',
      status: 'Active',
    },
    {
      id: 'CUST-1005',
      name: 'Vikram Malhotra',
      email: 'vikram.m@example.com',
      phone: '+91 96543 21987',
      orders: 9,
      spent: '₹1,26,750',
      tier: 'Gold Member',
      status: 'Active',
    },
  ];

  // Static Data: Categories List
  const categoriesList = [
    { name: 'Smartphones & Tablets', count: '412 items', revenue: '₹8,92,400', growth: '+18%' },
    { name: 'Computers & Laptops', count: '286 items', revenue: '₹7,45,000', growth: '+14%' },
    { name: 'Audio & Sound Systems', count: '540 items', revenue: '₹3,24,900', growth: '+28%' },
    { name: 'Smart Wearables & Watches', count: '310 items', revenue: '₹2,68,200', growth: '+22%' },
    { name: 'Gaming Gear & Accessories', count: '495 items', revenue: '₹1,84,000', growth: '+15%' },
    { name: 'Home Entertainment & TVs', count: '243 items', revenue: '₹4,62,000', growth: '+12%' },
  ];

  // Static Data: Offers & Coupons
  const couponsList = [
    { code: 'NEXORA10', discount: '10% OFF', minSpend: '₹1,999', uses: 842, validTill: '30 Nov 2026', status: 'Active' },
    { code: 'FESTIVE25', discount: '25% OFF', minSpend: '₹4,999', uses: 1250, validTill: '15 Nov 2026', status: 'Active' },
    { code: 'SUPERTECH', discount: 'Flat ₹2,000 OFF', minSpend: '₹25,000', uses: 320, validTill: '31 Dec 2026', status: 'Active' },
    { code: 'FREESHIP', discount: 'Free Express Shipping', minSpend: '₹999', uses: 2410, validTill: '31 Dec 2026', status: 'Active' },
  ];

  // Status Pill Badges
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
      case 'Paid':
      case 'Active':
      case 'In Stock':
        return <span className="nexora-badge nexora-badge-green">{status}</span>;
      case 'Processing':
      case 'COD':
        return <span className="nexora-badge nexora-badge-amber">{status}</span>;
      case 'Out for Delivery':
      case 'Shipped':
        return <span className="nexora-badge nexora-badge-blue">{status}</span>;
      case 'Low Stock':
        return <span className="nexora-badge nexora-badge-red">{status}</span>;
      default:
        return <span className="nexora-badge nexora-badge-gray">{status}</span>;
    }
  };

  return (
    <div className="nexora-wrapper">
      {/* 1. LEFT SIDEBAR */}
      <aside className="nexora-sidebar">
        {/* Brand Header with Red Logo and white bold text */}
        <div className="nexora-sidebar-top">
          <div className="nexora-brand">
          <div className="nexora-logo-container">
            <NexoraLogoIcon />
          </div>
          <div className="nexora-brand-text">
            <div className="nexora-brand-title">
              NEXORA<span className="nexora-dot">.</span>
            </div>
            <div className="nexora-brand-subtitle">ONLINE STORE</div>
            <div className="nexora-brand-tag">ADMIN PANEL</div>
          </div>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="nexora-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nexora-nav-btn ${isActive ? 'active' : ''}`}
              >
                <div className="nexora-nav-btn-left">
                  <Icon size={19} className="nexora-nav-icon" />
                  <span className="nexora-nav-label">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="nexora-nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="nexora-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="nexora-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="nexora-user-profile">
            <div className="nexora-avatar">NX</div>
            <div className="nexora-user-info">
              <span className="nexora-user-name">E-Commerce Admin</span>
              <span className="nexora-user-role">Nexora Online Store HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APP CONTAINER */}
      <div className="nexora-main">
        {/* Top Navbar with Height 82px matching the screenshot */}
        <header className="nexora-topbar">
          <div className="nexora-topbar-left">
            <h1 className="nexora-topbar-title">Nexora Online Store Management</h1>
            <div className="nexora-status-pill">
              <span className="nexora-status-dot"></span>
              <span className="nexora-status-text">Operational</span>
            </div>
          </div>

          <div className="nexora-topbar-right">
            <button
              onClick={() => navigate('/product/e-commerce')}
              className="nexora-btn-back-catalog"
              title="Return to Product Detail"
            >
              <ArrowLeft size={16} />
              <span>Back to Catalog</span>
            </button>

            <button className="nexora-icon-btn" title="Notifications">
              <Bell size={20} />
              <span className="nexora-unread-dot"></span>
            </button>

            <div className="nexora-user-profile">
              <span className="nexora-user-name">Admin</span>
              <div className="nexora-avatar">N</div>
            </div>
          </div>
        </header>

        {/* Dynamic Content View depending on active sidebar item */}
        <div className="nexora-content">
          {/* TAB 1: MAIN DASHBOARD (EXACT SCREENSHOT LAYOUT) */}
          {activeTab === 'dashboard' && (
            <div className="nexora-dashboard-view">
              {/* Header Greeting & Controls */}
              <div className="nexora-welcome-row">
                <div className="nexora-welcome-left">
                  <h2 className="nexora-welcome-title">Welcome back, Admin 👋</h2>
                  <p className="nexora-welcome-subtitle">
                    Manage products, orders, customers, inventory, and store operations in one place.
                  </p>
                </div>
                <div className="nexora-welcome-right">
                  <div className="nexora-date-picker-btn">
                    <Calendar size={16} />
                    <span>{dateRange}</span>
                    <ChevronDown size={15} />
                  </div>
                </div>
              </div>

              {/* 4 KPI Stat Cards */}
              <div className="nexora-stats-grid">
                {/* 1. Total Orders */}
                <div className="nexora-stat-card">
                  <div className="nexora-stat-icon-wrap bg-green-light">
                    <ShoppingCart size={22} className="text-green" />
                  </div>
                  <div className="nexora-stat-info">
                    <span className="nexora-stat-label">Total Orders</span>
                    <div className="nexora-stat-value">1,248</div>
                    <div className="nexora-stat-trend text-green">
                      <span>↑ +16% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 2. Total Customers */}
                <div className="nexora-stat-card">
                  <div className="nexora-stat-icon-wrap bg-blue-light">
                    <Users size={22} className="text-blue" />
                  </div>
                  <div className="nexora-stat-info">
                    <span className="nexora-stat-label">Total Customers</span>
                    <div className="nexora-stat-value">5,420</div>
                    <div className="nexora-stat-trend text-green">
                      <span>↑ +9% from last 7 days</span>
                    </div>
                  </div>
                </div>

                {/* 3. Total Products */}
                <div className="nexora-stat-card">
                  <div className="nexora-stat-icon-wrap bg-amber-light">
                    <Package size={22} className="text-amber" />
                  </div>
                  <div className="nexora-stat-info">
                    <span className="nexora-stat-label">Total Products</span>
                    <div className="nexora-stat-value">3,286</div>
                    <div className="nexora-stat-sub text-gray">
                      <span>18 categories</span>
                    </div>
                  </div>
                </div>

                {/* 4. Total Revenue */}
                <div className="nexora-stat-card">
                  <div className="nexora-stat-icon-wrap bg-emerald-light">
                    <span className="nexora-rupee-symbol">₹</span>
                  </div>
                  <div className="nexora-stat-info">
                    <span className="nexora-stat-label">Total Revenue</span>
                    <div className="nexora-stat-value">₹24,76,500</div>
                    <div className="nexora-stat-trend text-green">
                      <span>↑ +22% from last 7 days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Sales Overview Chart & Top Selling Products */}
              <div className="nexora-analytics-grid">
                {/* Sales Overview Area Chart */}
                <div className="nexora-card nexora-chart-card">
                  <div className="nexora-card-header">
                    <div className="nexora-card-title-group">
                      <div className="nexora-card-icon-title">
                        <BarChart3 size={20} className="text-green" />
                        <h3>Sales Overview</h3>
                      </div>
                      <p className="nexora-card-subtitle">Daily revenue and order trends</p>
                    </div>

                    <div className="nexora-chart-toggle">
                      <button
                        onClick={() => setChartMode('revenue')}
                        className={`nexora-toggle-btn ${chartMode === 'revenue' ? 'active' : ''}`}
                      >
                        Revenue
                      </button>
                      <button
                        onClick={() => setChartMode('orders')}
                        className={`nexora-toggle-btn ${chartMode === 'orders' ? 'active' : ''}`}
                      >
                        Orders
                      </button>
                    </div>
                  </div>

                  {/* SVG Area Chart matching screenshot */}
                  <div className="nexora-chart-body">
                    <div className="nexora-chart-container">
                      <svg viewBox="0 0 700 240" className="nexora-svg-chart">
                        <defs>
                          <linearGradient id="nexoraAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.01" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines */}
                        <line x1="70" y1="20" x2="680" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="70" y1="60" x2="680" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="70" y1="100" x2="680" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="70" y1="140" x2="680" y2="140" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="70" y1="180" x2="680" y2="180" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="70" y1="210" x2="680" y2="210" stroke="#e2e8f0" />

                        {/* Y-Axis Labels */}
                        <text x="60" y="24" textAnchor="end" className="chart-label">₹5,00,000</text>
                        <text x="60" y="64" textAnchor="end" className="chart-label">₹4,00,000</text>
                        <text x="60" y="104" textAnchor="end" className="chart-label">₹3,00,000</text>
                        <text x="60" y="144" textAnchor="end" className="chart-label">₹2,00,000</text>
                        <text x="60" y="184" textAnchor="end" className="chart-label">₹1,00,000</text>
                        <text x="60" y="214" textAnchor="end" className="chart-label">₹0</text>

                        {/* Area Fill Curve */}
                        {/* Points: 
                            Oct 27 (x=100, y=190 [₹85k])
                            Oct 28 (x=190, y=165 [₹1.45L])
                            Oct 29 (x=280, y=125 [₹2.45L])
                            Oct 30 (x=370, y=140 [₹2.10L])
                            Oct 31 (x=460, y=105 [₹3.05L])
                            Nov 01 (x=550, y=98 [₹3.20L])
                            Nov 02 (x=640, y=38 [₹4.75L])
                        */}
                        <path
                          d="M100 190 C150 180, 150 165, 190 165 C230 165, 240 125, 280 125 C320 125, 330 140, 370 140 C410 140, 420 105, 460 105 C500 105, 510 98, 550 98 C590 98, 600 38, 640 38 L640 210 L100 210 Z"
                          fill="url(#nexoraAreaGrad)"
                        />

                        {/* Stroke Line */}
                        <path
                          d="M100 190 C150 180, 150 165, 190 165 C230 165, 240 125, 280 125 C320 125, 330 140, 370 140 C410 140, 420 105, 460 105 C500 105, 510 98, 550 98 C590 98, 600 38, 640 38"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Data Points */}
                        <circle cx="100" cy="190" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="190" cy="165" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="280" cy="125" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="370" cy="140" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="460" cy="105" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="550" cy="98" r="5" fill="#ffffff" stroke="#10b981" strokeWidth="3" />
                        <circle cx="640" cy="38" r="6" fill="#ffffff" stroke="#10b981" strokeWidth="3.5" />

                        {/* X-Axis Dates */}
                        <text x="100" y="232" textAnchor="middle" className="chart-date">Oct 27</text>
                        <text x="190" y="232" textAnchor="middle" className="chart-date">Oct 28</text>
                        <text x="280" y="232" textAnchor="middle" className="chart-date">Oct 29</text>
                        <text x="370" y="232" textAnchor="middle" className="chart-date">Oct 30</text>
                        <text x="460" y="232" textAnchor="middle" className="chart-date">Oct 31</text>
                        <text x="550" y="232" textAnchor="middle" className="chart-date">Nov 01</text>
                        <text x="640" y="232" textAnchor="middle" className="chart-date">Nov 02</text>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Top Selling Products Card matching screenshot */}
                <div className="nexora-card nexora-top-selling-card">
                  <div className="nexora-card-header">
                    <div className="nexora-card-icon-title">
                      <Award size={20} className="text-green" />
                      <div>
                        <h3>Top Selling Products</h3>
                        <p className="nexora-card-subtitle">This week</p>
                      </div>
                    </div>
                  </div>

                  <div className="nexora-top-products-list">
                    {topSellingProducts.map((prod) => (
                      <div key={prod.id} className="nexora-top-product-item">
                        <div className="nexora-prod-img-box">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<div class="prod-fallback-icon">📱</div>';
                            }}
                          />
                        </div>
                        <div className="nexora-prod-details">
                          <h4 className="nexora-prod-name">{prod.name}</h4>
                          <span className="nexora-prod-sales">{prod.sold} sold</span>
                        </div>
                        <div className="nexora-prod-price-tag">{prod.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lower Section: Recent Orders & Low Stock Items */}
              <div className="nexora-bottom-grid">
                {/* Recent Orders Table */}
                <div className="nexora-card nexora-recent-orders-card">
                  <div className="nexora-card-header">
                    <div className="nexora-card-icon-title">
                      <ShoppingCart size={20} className="text-green" />
                      <div>
                        <h3>Recent Orders</h3>
                        <p className="nexora-card-subtitle">Latest customer orders across all channels</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="nexora-btn-view-all"
                    >
                      View All Orders &rarr;
                    </button>
                  </div>

                  <div className="nexora-table-responsive">
                    <table className="nexora-table">
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
                            <td className="font-semibold text-green">{ord.id}</td>
                            <td>
                              <div className="nexora-customer-cell">
                                <span className="nexora-cust-name">{ord.customer}</span>
                              </div>
                            </td>
                            <td className="text-muted">{ord.items}</td>
                            <td className="font-semibold">{ord.amount}</td>
                            <td>{renderStatusBadge(ord.payment)}</td>
                            <td>{renderStatusBadge(ord.status)}</td>
                            <td className="text-muted text-sm">{ord.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Low Stock Products Card */}
                <div className="nexora-card nexora-low-stock-card">
                  <div className="nexora-card-header">
                    <div className="nexora-card-icon-title">
                      <AlertTriangle size={20} className="text-amber" />
                      <div>
                        <h3>Low Stock Products</h3>
                        <p className="nexora-card-subtitle">Needs restocking</p>
                      </div>
                    </div>
                  </div>

                  <div className="nexora-low-stock-list">
                    {lowStockProducts.map((item) => (
                      <div key={item.id} className="nexora-low-stock-item">
                        <div className="nexora-low-stock-img">
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentNode.innerHTML = '<div class="prod-fallback-icon">⚠️</div>';
                            }}
                          />
                        </div>
                        <div className="nexora-low-stock-info">
                          <h4 className="nexora-low-stock-name">{item.name}</h4>
                          <span className="nexora-low-stock-sku">{item.sku}</span>
                        </div>
                        <span className="nexora-left-badge">{item.left} left</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom ERP Info Banner */}
              <div className="nexora-info-banner">
                <Info size={18} className="text-green" />
                <p>
                  <strong>Nexora Online Store – Enterprise E-Commerce Platform</strong> &nbsp;|&nbsp;
                  Manage multi-category catalog, orders, inventory, customer loyalty, and fulfillment operations seamlessly.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="nexora-orders-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Orders Management</h2>
                  <p className="nexora-section-subtitle">Real-time status tracking, fulfillment dispatch, and payment logs</p>
                </div>
                <div className="nexora-header-actions">
                  <button className="nexora-btn-primary">
                    <Download size={16} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters row */}
              <div className="nexora-filter-bar">
                <div className="nexora-search-input-wrap">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by order ID, customer name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="nexora-filter-pills">
                  {['All', 'Delivered', 'Processing', 'Out for Delivery', 'Shipped'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderFilter(status)}
                      className={`nexora-pill-btn ${orderFilter === status ? 'active' : ''}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Orders Table */}
              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>ORDER ID</th>
                        <th>CUSTOMER</th>
                        <th>ITEMS</th>
                        <th>TOTAL AMOUNT</th>
                        <th>PAYMENT METHOD</th>
                        <th>PAYMENT STATUS</th>
                        <th>ORDER STATUS</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders
                        .filter((o) => orderFilter === 'All' || o.status === orderFilter)
                        .map((ord) => (
                          <tr key={ord.id}>
                            <td className="font-semibold text-green">{ord.id}</td>
                            <td>
                              <div className="nexora-customer-cell">
                                <span className="nexora-cust-name">{ord.customer}</span>
                              </div>
                            </td>
                            <td>{ord.items}</td>
                            <td className="font-semibold">{ord.amount}</td>
                            <td>{ord.paymentMethod}</td>
                            <td>{renderStatusBadge(ord.payment)}</td>
                            <td>{renderStatusBadge(ord.status)}</td>
                            <td>
                              <button className="nexora-table-action-btn">
                                <Eye size={15} />
                                <span>Details</span>
                              </button>
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
            <div className="nexora-customers-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Customer Directory</h2>
                  <p className="nexora-section-subtitle">
                    5,420 registered shoppers with order histories, loyalty points, and lifetime value
                  </p>
                </div>
                <button className="nexora-btn-primary">
                  <Plus size={16} />
                  <span>Add Customer</span>
                </button>
              </div>

              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>CUSTOMER ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>ORDERS</th>
                        <th>LIFETIME SPENT</th>
                        <th>TIER</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersList.map((cust) => (
                        <tr key={cust.id}>
                          <td className="font-semibold text-green">{cust.id}</td>
                          <td className="font-semibold">{cust.name}</td>
                          <td>{cust.email}</td>
                          <td>{cust.phone}</td>
                          <td>{cust.orders} orders</td>
                          <td className="font-semibold text-green">{cust.spent}</td>
                          <td>
                            <span className="nexora-badge nexora-badge-blue">{cust.tier}</span>
                          </td>
                          <td>{renderStatusBadge(cust.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS CATALOG */}
          {activeTab === 'products' && (
            <div className="nexora-products-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Product Catalog</h2>
                  <p className="nexora-section-subtitle">
                    Manage 3,286 electronic devices, tech accessories, and smart appliances
                  </p>
                </div>
                <button className="nexora-btn-primary">
                  <Plus size={16} />
                  <span>Add New Product</span>
                </button>
              </div>

              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>PRODUCT NAME</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>AVAILABLE STOCK</th>
                        <th>RATING</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalogProducts.map((prod) => (
                        <tr key={prod.id}>
                          <td className="text-muted font-mono">{prod.sku}</td>
                          <td className="font-semibold">{prod.name}</td>
                          <td>
                            <span className="nexora-badge nexora-badge-gray">{prod.category}</span>
                          </td>
                          <td className="font-semibold text-green">{prod.price}</td>
                          <td>{prod.stock} units</td>
                          <td>⭐ {prod.rating}</td>
                          <td>{renderStatusBadge(prod.status)}</td>
                          <td>
                            <button className="nexora-table-action-btn">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="nexora-categories-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Product Categories</h2>
                  <p className="nexora-section-subtitle">18 retail departments with catalog hierarchies and gross margins</p>
                </div>
                <button className="nexora-btn-primary">
                  <Plus size={16} />
                  <span>New Category</span>
                </button>
              </div>

              <div className="nexora-categories-grid">
                {categoriesList.map((cat, idx) => (
                  <div key={idx} className="nexora-card nexora-category-card">
                    <div className="nexora-cat-icon-row">
                      <Folder size={24} className="text-green" />
                      <span className="nexora-badge nexora-badge-green">{cat.growth}</span>
                    </div>
                    <h3 className="nexora-cat-title">{cat.name}</h3>
                    <p className="nexora-cat-count">{cat.count}</p>
                    <div className="nexora-cat-footer">
                      <span className="nexora-cat-rev-label">Revenue:</span>
                      <span className="nexora-cat-rev-val">{cat.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="nexora-inventory-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Warehouse Inventory</h2>
                  <p className="nexora-section-subtitle">Real-time stock levels, reorder thresholds, and bin allocations</p>
                </div>
                <button className="nexora-btn-primary">
                  <Download size={16} />
                  <span>Restock Report</span>
                </button>
              </div>

              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>ITEM</th>
                        <th>SKU</th>
                        <th>LOCATION</th>
                        <th>IN STOCK</th>
                        <th>MIN REORDER LEVEL</th>
                        <th>UNIT COST</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-semibold">Nexora Apex Smartphone 5G</td>
                        <td className="font-mono">NEX-PH-5G-128</td>
                        <td>Warehouse A (Bay 4)</td>
                        <td>48 units</td>
                        <td>10 units</td>
                        <td>₹32,500</td>
                        <td><span className="nexora-badge nexora-badge-green">Optimal</span></td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Mechanical Gaming Keyboard</td>
                        <td className="font-mono">NEX-KB-RGB-01</td>
                        <td>Warehouse B (Bay 12)</td>
                        <td className="text-amber font-semibold">4 units</td>
                        <td>15 units</td>
                        <td>₹4,200</td>
                        <td><span className="nexora-badge nexora-badge-red">Reorder Urgent</span></td>
                      </tr>
                      <tr>
                        <td className="font-semibold">4K Ultra HD Gaming Monitor 27"</td>
                        <td className="font-mono">NEX-MON-4K-27</td>
                        <td>Warehouse A (Bay 1)</td>
                        <td className="text-amber font-semibold">2 units</td>
                        <td>8 units</td>
                        <td>₹18,000</td>
                        <td><span className="nexora-badge nexora-badge-red">Reorder Urgent</span></td>
                      </tr>
                      <tr>
                        <td className="font-semibold">Studio Wireless Headphones</td>
                        <td className="font-mono">NEX-AUD-WL-01</td>
                        <td>Warehouse B (Bay 8)</td>
                        <td>82 units</td>
                        <td>20 units</td>
                        <td>₹1,850</td>
                        <td><span className="nexora-badge nexora-badge-green">Optimal</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: OFFERS & COUPONS */}
          {activeTab === 'offers' && (
            <div className="nexora-offers-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Offers & Coupons</h2>
                  <p className="nexora-section-subtitle">Promotional discount campaigns and conversion performance</p>
                </div>
                <button className="nexora-btn-primary">
                  <Plus size={16} />
                  <span>Create Coupon</span>
                </button>
              </div>

              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>COUPON CODE</th>
                        <th>DISCOUNT</th>
                        <th>MINIMUM SPEND</th>
                        <th>REDEMPTIONS</th>
                        <th>VALID UNTIL</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {couponsList.map((c, i) => (
                        <tr key={i}>
                          <td className="font-mono font-bold text-green">{c.code}</td>
                          <td className="font-semibold">{c.discount}</td>
                          <td>{c.minSpend}</td>
                          <td>{c.uses} times</td>
                          <td>{c.validTill}</td>
                          <td>{renderStatusBadge(c.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="nexora-payments-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Payment Settlements</h2>
                  <p className="nexora-section-subtitle">Gateway logs, UPI payouts, and daily reconciliation</p>
                </div>
                <div className="nexora-header-actions">
                  <button className="nexora-btn-primary">
                    <Download size={16} />
                    <span>Download Payout Statement</span>
                  </button>
                </div>
              </div>

              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>TRANSACTION ID</th>
                        <th>GATEWAY</th>
                        <th>AMOUNT</th>
                        <th>FEES</th>
                        <th>NET SETTLEMENT</th>
                        <th>STATUS</th>
                        <th>TIMESTAMP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono">TXN-88291042</td>
                        <td>Razorpay UPI</td>
                        <td className="font-semibold">₹42,999</td>
                        <td>₹0.00</td>
                        <td className="font-semibold text-green">₹42,999</td>
                        <td><span className="nexora-badge nexora-badge-green">Settled</span></td>
                        <td>Today, 02:45 PM</td>
                      </tr>
                      <tr>
                        <td className="font-mono">TXN-88290987</td>
                        <td>Stripe Credit Card</td>
                        <td className="font-semibold">₹56,990</td>
                        <td>₹1,139.80</td>
                        <td className="font-semibold text-green">₹55,850.20</td>
                        <td><span className="nexora-badge nexora-badge-green">Settled</span></td>
                        <td>Today, 01:15 PM</td>
                      </tr>
                      <tr>
                        <td className="font-mono">TXN-88290514</td>
                        <td>Cash On Delivery</td>
                        <td className="font-semibold">₹5,998</td>
                        <td>₹50.00</td>
                        <td className="font-semibold text-amber">₹5,948.00</td>
                        <td><span className="nexora-badge nexora-badge-amber">Pending Collection</span></td>
                        <td>Today, 11:30 AM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: REPORTS & ANALYTICS */}
          {activeTab === 'reports' && (
            <div className="nexora-reports-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Reports & Analytics</h2>
                  <p className="nexora-section-subtitle">Financial summaries, profit margins, and buyer acquisition metrics</p>
                </div>
                <button className="nexora-btn-primary">
                  <Download size={16} />
                  <span>Download Full Report</span>
                </button>
              </div>

              <div className="nexora-stats-grid">
                <div className="nexora-stat-card">
                  <div className="nexora-stat-info">
                    <span className="nexora-stat-label">Average Order Value (AOV)</span>
                    <div className="nexora-stat-value">₹19,840</div>
                    <div className="nexora-stat-trend text-green">↑ +8.4% vs last month</div>
                  </div>
                </div>
                <div className="nexora-stat-card">
                  <div className="nexora-stat-info">
                    <span className="nexora-stat-label">Cart Conversion Rate</span>
                    <div className="nexora-stat-value">3.82%</div>
                    <div className="nexora-stat-trend text-green">↑ +0.6% vs benchmark</div>
                  </div>
                </div>
                <div className="nexora-stat-card">
                  <div className="nexora-stat-info">
                    <span className="nexora-stat-label">Customer Return Rate</span>
                    <div className="nexora-stat-value">1.4%</div>
                    <div className="nexora-stat-trend text-green">↓ -0.8% lowest in class</div>
                  </div>
                </div>
                <div className="nexora-stat-card">
                  <div className="nexora-stat-info">
                    <span className="nexora-stat-label">Net Operating Margin</span>
                    <div className="nexora-stat-value">26.8%</div>
                    <div className="nexora-stat-trend text-green">↑ +3.2% vs target</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: USERS & ROLES */}
          {activeTab === 'users' && (
            <div className="nexora-users-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Users &amp; Staff Roles</h2>
                  <p className="nexora-section-subtitle">Manage store managers, catalog editors, and warehouse personnel</p>
                </div>
                <button className="nexora-btn-primary">
                  <Plus size={16} />
                  <span>Invite Team Member</span>
                </button>
              </div>

              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>USER</th>
                        <th>ROLE</th>
                        <th>ASSIGNED STORE</th>
                        <th>PERMISSIONS</th>
                        <th>LAST ACTIVE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Admin User</strong>
                          <div className="text-muted text-sm">admin@nexora.com</div>
                        </td>
                        <td><span className="nexora-badge nexora-badge-green">Super Administrator</span></td>
                        <td>All Stores &amp; Warehouses</td>
                        <td>Full Access (Read/Write/Delete)</td>
                        <td>Just now</td>
                        <td><span className="nexora-badge nexora-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Pooja Deshmukh</strong>
                          <div className="text-muted text-sm">pooja.d@nexora.com</div>
                        </td>
                        <td><span className="nexora-badge nexora-badge-blue">Catalog Manager</span></td>
                        <td>Electronics &amp; Audio</td>
                        <td>Products, Pricing, Categories</td>
                        <td>2 hours ago</td>
                        <td><span className="nexora-badge nexora-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Karthik Nair</strong>
                          <div className="text-muted text-sm">karthik.n@nexora.com</div>
                        </td>
                        <td><span className="nexora-badge nexora-badge-amber">Fulfillment Lead</span></td>
                        <td>Warehouse A &amp; B</td>
                        <td>Orders, Dispatch, Tracking</td>
                        <td>15 mins ago</td>
                        <td><span className="nexora-badge nexora-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SHIPMENTS & LOGISTICS */}
          {activeTab === 'shipments' && (
            <div className="nexora-orders-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Courier Shipments & Logistics Telematics</h2>
                  <p className="nexora-section-subtitle">Real-time airway bill tracking across Delhivery, Blue Dart, and DTDC Express</p>
                </div>
                <button className="nexora-btn-primary">
                  <Plus size={16} />
                  <span>Create Manifest</span>
                </button>
              </div>
              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>AWB TRACKING</th>
                        <th>ORDER REF</th>
                        <th>RECIPIENT & CITY</th>
                        <th>COURIER PARTNER</th>
                        <th>PACKAGE ITEMS</th>
                        <th>EST. DELIVERY</th>
                        <th>SHIPMENT STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { awb: 'DLV-8821901', ord: '#ORD-2026-9821', rec: 'Manish Verma (Hyderabad)', cur: 'Delhivery Surface Pro', items: 'Sony WH-1000XM5 Headphones', eta: 'Tomorrow, by 4 PM', st: 'In Transit' },
                        { awb: 'BDT-4418290', ord: '#ORD-2026-9820', rec: 'Priya Sundaram (Bengaluru)', cur: 'Blue Dart Air Express', items: 'MacBook Air M3 15-inch', eta: 'Today, Out for Delivery', st: 'Out for Delivery' },
                        { awb: 'DTC-9921044', ord: '#ORD-2026-9819', rec: 'Amitabh Joshi (Mumbai)', cur: 'DTDC Premium Express', items: 'Samsung Galaxy S24 Ultra', eta: 'Delivered Today 11:20 AM', st: 'Delivered' },
                        { awb: 'XPR-7731029', ord: '#ORD-2026-9818', rec: 'Sneha Kulkarni (Pune)', cur: 'XpressBees Express', items: 'Keychron Q1 Pro Mechanical', eta: '06 Nov 2026', st: 'In Transit' },
                      ].map((s, i) => (
                        <tr key={i}>
                          <td><strong>{s.awb}</strong></td>
                          <td><span className="nexora-tag">{s.ord}</span></td>
                          <td>{s.rec}</td>
                          <td>{s.cur}</td>
                          <td>{s.items}</td>
                          <td>{s.eta}</td>
                          <td><span className="nexora-badge nexora-badge-green">{s.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CUSTOMER REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="nexora-orders-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Verified Customer Reviews & Ratings</h2>
                  <p className="nexora-section-subtitle">Real feedback and star ratings from verified purchasers</p>
                </div>
                <button className="nexora-btn-primary">
                  <Star size={16} />
                  <span>Feature Reviews</span>
                </button>
              </div>
              <div className="nexora-card">
                <div className="nexora-table-responsive">
                  <table className="nexora-table">
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th>REVIEWER</th>
                        <th>RATING</th>
                        <th>FEEDBACK COMMENT</th>
                        <th>DATE</th>
                        <th>VERIFICATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { prod: 'Sony WH-1000XM5', rev: 'Rohan Sharma (Bengaluru)', rat: '5.0 ★', comm: 'Active noise cancellation is unbeatable for office focus. Super comfy!', dt: '03 Nov 2026', ver: 'Verified Buyer' },
                        { prod: 'MacBook Air M3', rev: 'Ananya Deshpande (Pune)', rat: '5.0 ★', comm: 'Stellar battery life, lasts 16+ hours without charging. Flawless display.', dt: '02 Nov 2026', ver: 'Verified Buyer' },
                        { prod: 'Keychron Q1 Pro', rev: 'Vikram Aditya (Hyderabad)', rat: '4.8 ★', comm: 'Gateron Jupiter Red switches sound incredible. Excellent build.', dt: '01 Nov 2026', ver: 'Verified Buyer' },
                        { prod: 'Samsung S24 Ultra', rev: 'Dr. Suresh Varma (Chennai)', rat: '4.9 ★', comm: 'Camera zoom and AI transcription features are game changers.', dt: '30 Oct 2026', ver: 'Verified Buyer' },
                      ].map((r, i) => (
                        <tr key={i}>
                          <td><strong>{r.prod}</strong></td>
                          <td>{r.rev}</td>
                          <td><span style={{ color: '#059669', fontWeight: 700 }}>{r.rat}</span></td>
                          <td style={{ fontSize: '13px', color: '#475569' }}>"{r.comm}"</td>
                          <td>{r.dt}</td>
                          <td><span className="nexora-badge nexora-badge-green">{r.ver}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: STORE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="nexora-orders-view">
              <div className="nexora-section-header">
                <div>
                  <h2 className="nexora-section-title">Online Store Settings & Configuration</h2>
                  <p className="nexora-section-subtitle">Manage payment gateways, shipping zones, and brand identity</p>
                </div>
              </div>
              <div className="nexora-card" style={{ maxWidth: '720px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Store Name & Brand Domain</label>
                    <input type="text" readOnly value="Nexora Online Store &bull; store.nexora.speshway.com" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Payment Gateways Active</label>
                    <input type="text" readOnly value="Razorpay Pro &bull; Stripe International &bull; Cash on Delivery (COD)" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Default Currency & GST Regime</label>
                    <input type="text" readOnly value="₹ INR (Indian Rupee) &bull; GSTIN 36AAACN9921M1ZR" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
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


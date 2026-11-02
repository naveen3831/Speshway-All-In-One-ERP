import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  Box,
  Tag,
  BarChart2,
  Settings,
  LogOut,
  Bell,
  Menu,
  ChevronDown,
  TrendingUp,
  Search,
  Plus,
  ArrowRight,
  Filter,
  CheckCircle,
  Clock,
  Truck,
  Package,
} from 'lucide-react';
import './VexaDashboard.css';

export const VexaDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeframe, setTimeframe] = useState('30days');
  const [searchQuery, setSearchQuery] = useState('');

  // 4 KPI Stats matching the screenshot exactly
  const kpiStats = [
    {
      id: 'orders',
      label: 'Total Orders',
      value: '79',
      trend: '12%',
      isPositive: true,
      icon: ShoppingCart,
      sparkPoints: '0,22 15,18 30,24 45,14 60,19 75,8 90,14 100,5',
      fillPoints: '0,22 15,18 30,24 45,14 60,19 75,8 90,14 100,5 100,28 0,28',
    },
    {
      id: 'customers',
      label: 'Total Customers',
      value: '4',
      trend: '8%',
      isPositive: true,
      icon: Users,
      sparkPoints: '0,25 20,20 40,22 60,12 80,16 100,6',
      fillPoints: '0,25 20,20 40,22 60,12 80,16 100,6 100,28 0,28',
    },
    {
      id: 'revenue',
      label: 'Total Revenue',
      value: '₹1,59,583.92',
      trend: '14%',
      isPositive: true,
      icon: () => <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>₹</span>,
      sparkPoints: '0,24 20,19 40,23 60,13 80,18 100,8',
      fillPoints: '0,24 20,19 40,23 60,13 80,18 100,8 100,28 0,28',
    },
    {
      id: 'products',
      label: 'Total Products',
      value: '4',
      trend: '0%',
      isPositive: true,
      icon: Box,
      sparkPoints: '0,20 25,20 50,16 75,18 100,7',
      fillPoints: '0,20 25,20 50,16 75,18 100,7 100,28 0,28',
    },
  ];

  // Recent Orders matching exact screenshot
  const [orders, setOrders] = useState([
    {
      id: '#VXA-1025',
      date: 'Oct 27, 2026',
      item: 'Classic Heavyweight Tee',
      color: 'Jet Black',
      status: 'Delivered',
      statusClass: 'delivered',
      price: '₹1,999',
      customer: 'Rohan Sharma',
      payment: 'Online (UPI)',
      // SVG Black T-Shirt representation
      thumbType: 'tee-black',
    },
    {
      id: '#VXA-1024',
      date: 'Oct 26, 2026',
      item: 'Oversized Fleece Hoodie',
      color: 'Warm Beige',
      status: 'Shipped',
      statusClass: 'shipped',
      price: '₹2,499',
      customer: 'Ananya Roy',
      payment: 'Credit Card',
      // SVG Beige Hoodie representation
      thumbType: 'hoodie-beige',
    },
    {
      id: '#VXA-1023',
      date: 'Oct 25, 2026',
      item: 'Signature Embroidered Pullover',
      color: 'Maroon',
      status: 'Processing',
      statusClass: 'processing',
      price: '₹1,799',
      customer: 'Varun Verma',
      payment: 'COD',
      // SVG Maroon Hoodie representation
      thumbType: 'hoodie-maroon',
    },
  ]);

  // Products Catalog data
  const [productsList, setProductsList] = useState([
    { id: 'PROD-01', name: 'Classic Heavyweight Tee', category: 'T-Shirts', price: '₹1,999', stock: '48 In Stock', orders: 34, status: 'Active' },
    { id: 'PROD-02', name: 'Oversized Fleece Hoodie', category: 'Hoodies', price: '₹2,499', stock: '26 In Stock', orders: 28, status: 'Active' },
    { id: 'PROD-03', name: 'Signature Embroidered Pullover', category: 'Sweatshirts', price: '₹1,799', stock: '15 In Stock', orders: 12, status: 'Active' },
    { id: 'PROD-04', name: 'Relaxed Fit Cargo Chinos', category: 'Bottoms', price: '₹2,899', stock: '32 In Stock', orders: 5, status: 'Active' },
  ]);

  // Customers data
  const customersList = [
    { id: 'C-01', name: 'Rohan Sharma', email: 'rohan.s@gmail.com', phone: '+91 98201 99221', orders: 3, spent: '₹6,497' },
    { id: 'C-02', name: 'Ananya Roy', email: 'ananya.roy@yahoo.com', phone: '+91 98310 44210', orders: 2, spent: '₹4,298' },
    { id: 'C-03', name: 'Varun Verma', email: 'varun.v@outlook.com', phone: '+91 99880 12340', orders: 1, spent: '₹1,799' },
    { id: 'C-04', name: 'Sneha Patel', email: 'sneha.p@gmail.com', phone: '+91 97230 88129', orders: 4, spent: '₹8,996' },
  ];

  // Sidebar navigation menu matching screenshot
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Box },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'reports', label: 'Reports', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Helper to render product apparel thumbnails matching the screenshot
  const renderApparelThumb = (type) => {
    if (type === 'tee-black') {
      return (
        <svg viewBox="0 0 40 40" width="36" height="36">
          <path
            d="M 12 8 Q 20 14, 28 8 L 36 14 L 32 20 L 29 18 L 29 34 L 11 34 L 11 18 L 8 20 L 4 14 Z"
            fill="#1e293b"
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="18" r="3" fill="#e2e8f0" opacity="0.4" />
        </svg>
      );
    }
    if (type === 'hoodie-beige') {
      return (
        <svg viewBox="0 0 40 40" width="36" height="36">
          <path
            d="M 12 8 Q 20 12, 28 8 L 36 14 L 32 21 L 29 18 L 29 34 L 11 34 L 11 18 L 8 21 L 4 14 Z"
            fill="#d6c5ad"
            stroke="#b8a78e"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Hood pocket */}
          <path d="M 15 25 L 25 25 L 24 31 L 16 31 Z" fill="#c4b299" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 40 40" width="36" height="36">
        <path
          d="M 12 8 Q 20 12, 28 8 L 36 14 L 32 21 L 29 18 L 29 34 L 11 34 L 11 18 L 8 21 L 4 14 Z"
          fill="#831843"
          stroke="#500724"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M 15 25 L 25 25 L 24 31 L 16 31 Z" fill="#701a3d" />
      </svg>
    );
  };

  return (
    <div className="vexa-erp-root">
      {/* 1. SIDEBAR */}
      <aside className="vexa-sidebar">
        {/* Brand Header with Hanger Logo */}
        <div className="vexa-sidebar-header">
          <div className="vexa-brand-wrap">
            <div className="vexa-logo-hanger">
              {/* Custom Hanger SVG matching screenshot */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M 16 8 C 14 8, 13 9.5, 13 11 C 13 12.5, 14.5 13.5, 16 14 L 5 21 C 4 21.8, 4 23, 5.2 23 L 26.8 23 C 28 23, 28 21.8, 27 21 L 16 14 Z"
                  stroke="#10b981"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="7" r="1.5" fill="#10b981" />
              </svg>
            </div>
            <div className="vexa-brand-text">
              <span className="vexa-brand-name">VEXA</span>
              <span className="vexa-brand-subtitle">Style Hub</span>
            </div>
          </div>

          <button className="vexa-hamburger-btn" title="Toggle Navigation">
            <Menu size={20} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="vexa-nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`vexa-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} className="vexa-nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Logout */}
        <div className="vexa-sidebar-footer">
          <button
            onClick={() => navigate('/product/vexa-style-hub')}
            className="vexa-nav-item logout"
            title="Return to Product Page"
          >
            <LogOut size={18} className="vexa-nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE */}
      <div className="vexa-main-wrapper">
        {/* Topbar with Bell and Admin profile */}
        <header className="vexa-topbar">
          <div className="vexa-topbar-right">
            <button className="vexa-bell-btn" title="Notifications">
              <Bell size={20} />
              <span className="vexa-bell-badge">3</span>
            </button>

            <div className="vexa-user-pill">
              <div className="vexa-user-avatar">A</div>
              <span className="vexa-user-name">
                Admin <ChevronDown size={14} />
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="vexa-content">
          {/* TAB 1: DASHBOARD (EXACT SCREENSHOT REPLICA) */}
          {activeTab === 'dashboard' && (
            <>
              {/* Header */}
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Dashboard</h1>
                <p className="vexa-subheading">Overview of your store performance</p>
              </div>

              {/* 4 Metric KPI Cards */}
              <div className="vexa-kpi-grid">
                {kpiStats.map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.id}
                      className="vexa-kpi-card"
                      onClick={() => {
                        if (kpi.id === 'orders') setActiveTab('orders');
                        else if (kpi.id === 'customers') setActiveTab('customers');
                        else if (kpi.id === 'products') setActiveTab('products');
                        else if (kpi.id === 'revenue') setActiveTab('reports');
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="vexa-kpi-top">
                        <span className="vexa-kpi-label">{kpi.label}</span>
                        <div className="vexa-kpi-icon">
                          <Icon size={20} />
                        </div>
                      </div>

                      <div className="vexa-kpi-value">{kpi.value}</div>

                      <div className="vexa-kpi-bottom">
                        <span className="vexa-kpi-trend">
                          &uarr; {kpi.trend}
                        </span>

                        {/* Smooth Blue Sparkline Area */}
                        <div className="vexa-kpi-sparkline">
                          <svg viewBox="0 0 100 28" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                            <defs>
                              <linearGradient id={`sparkGrad-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>
                            <polygon points={kpi.fillPoints} fill={`url(#sparkGrad-${kpi.id})`} />
                            <polyline
                              points={kpi.sparkPoints}
                              fill="none"
                              stroke="#0284c7"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Two Column Layout: Sales Overview & Recent Orders */}
              <div className="vexa-lower-grid">
                {/* Left: Sales Overview Spline Area Chart */}
                <div className="vexa-card">
                  <div className="vexa-card-head">
                    <div className="vexa-card-title-wrap">
                      <BarChart2 size={20} color="#0284c7" />
                      <h3 className="vexa-card-title">Sales Overview</h3>
                    </div>

                    <select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      className="vexa-select-dropdown"
                    >
                      <option value="30days">Last 30 Days</option>
                      <option value="7days">Last 7 Days</option>
                      <option value="90days">Last 90 Days</option>
                    </select>
                  </div>

                  {/* Chart Legend */}
                  <div className="vexa-chart-legend">
                    <div className="legend-item">
                      <span className="dot-sales"></span>
                      <span>Sales</span>
                    </div>
                    <div className="legend-item">
                      <span className="dot-orders"></span>
                      <span>Orders</span>
                    </div>
                  </div>

                  {/* Dual Series Area Chart */}
                  <div className="vexa-chart-body">
                    <div className="vexa-chart-svg-wrap">
                      <div className="vexa-y-axis">
                        <span>30k</span>
                        <span>20k</span>
                        <span>10k</span>
                        <span>0</span>
                      </div>

                      <div className="vexa-svg-canvas">
                        <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="vexa-chart-svg">
                          <defs>
                            {/* Lighter Orders Area Fill */}
                            <linearGradient id="vexaOrdersGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.35" />
                              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.05" />
                            </linearGradient>
                            {/* Darker Sales Area Fill */}
                            <linearGradient id="vexaSalesGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#1e40af" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>

                          {/* Grid Lines */}
                          <line x1="0" y1="20" x2="500" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="140" x2="500" y2="140" stroke="#f1f5f9" strokeWidth="1" />
                          <line x1="0" y1="195" x2="500" y2="195" stroke="#e2e8f0" strokeWidth="1" />

                          {/* Series 1: Orders (Light Blue Curve) */}
                          <path
                            d="M 0 180 Q 50 170, 100 160 T 200 155 T 300 165 T 380 130 T 450 160 L 500 170 L 500 200 L 0 200 Z"
                            fill="url(#vexaOrdersGrad)"
                          />
                          <path
                            d="M 0 180 Q 50 170, 100 160 T 200 155 T 300 165 T 380 130 T 450 160 L 500 170"
                            fill="none"
                            stroke="#93c5fd"
                            strokeWidth="2.5"
                          />

                          {/* Series 2: Sales (Dark Blue Curve with Peak at Day 20) */}
                          <path
                            d="M 0 170 Q 50 120, 100 130 T 200 135 T 280 125 T 370 40 T 440 90 L 500 110 L 500 200 L 0 200 Z"
                            fill="url(#vexaSalesGrad)"
                          />
                          <path
                            d="M 0 170 Q 50 120, 100 130 T 200 135 T 280 125 T 370 40 T 440 90 L 500 110"
                            fill="none"
                            stroke="#1e40af"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="vexa-x-axis">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                      <span>15</span>
                      <span>20</span>
                      <span>25</span>
                      <span>30</span>
                    </div>
                  </div>
                </div>

                {/* Right: Recent Orders List */}
                <div className="vexa-card">
                  <div className="vexa-card-head">
                    <div className="vexa-card-title-wrap">
                      <Box size={20} color="#0284c7" />
                      <h3 className="vexa-card-title">Recent Orders</h3>
                    </div>

                    <button
                      onClick={() => setActiveTab('orders')}
                      className="vexa-link-more"
                    >
                      View All &rarr;
                    </button>
                  </div>

                  <div className="vexa-orders-list">
                    {orders.map((ord) => (
                      <div key={ord.id} className="vexa-order-row">
                        <div className="vexa-order-item-left">
                          <div className="vexa-order-thumb">
                            {renderApparelThumb(ord.thumbType)}
                          </div>
                          <div className="vexa-order-meta">
                            <span className="vexa-order-code">{ord.id}</span>
                            <span className="vexa-order-date">{ord.date}</span>
                          </div>
                        </div>

                        <div className="vexa-order-item-right">
                          <span className={`vexa-order-status ${ord.statusClass}`}>
                            {ord.status}
                          </span>
                          <span className="vexa-order-price">{ord.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Products Catalog</h1>
                <p className="vexa-subheading">Manage active apparel lines, pricing, and stock.</p>
              </div>

              <div className="vexa-view-toolbar">
                <div className="vexa-search-wrap">
                  <Search size={16} className="vexa-search-icon" />
                  <input
                    type="text"
                    placeholder="Search apparel products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="vexa-search-input"
                  />
                </div>
                <div className="vexa-toolbar-actions">
                  <button className="vexa-btn-primary" onClick={() => alert('New Apparel Item modal')}>
                    <Plus size={16} /> Add Product
                  </button>
                </div>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock Level</th>
                        <th>Orders Count</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productsList.map((p) => (
                        <tr key={p.id}>
                          <td><code>{p.id}</code></td>
                          <td><strong>{p.name}</strong></td>
                          <td><span className="vexa-order-status shipped">{p.category}</span></td>
                          <td><strong style={{ color: '#059669' }}>{p.price}</strong></td>
                          <td>{p.stock}</td>
                          <td>{p.orders} sold</td>
                          <td><span className="vexa-order-status delivered">{p.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Customer Orders</h1>
                <p className="vexa-subheading">Track shipment status, payments, and client receipts.</p>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Apparel Item</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Amount</th>
                        <th>Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord.id}>
                          <td><code>{ord.id}</code></td>
                          <td><strong>{ord.customer}</strong></td>
                          <td>{ord.item} ({ord.color})</td>
                          <td>{ord.date}</td>
                          <td>{ord.payment}</td>
                          <td><strong style={{ color: '#059669' }}>{ord.price}</strong></td>
                          <td><span className={`vexa-order-status ${ord.statusClass}`}>{ord.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 4: CUSTOMERS */}
          {activeTab === 'customers' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Customers Directory</h1>
                <p className="vexa-subheading">Manage client accounts, order history, and contact information.</p>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Customer ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Total Orders</th>
                        <th>Lifetime Spend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customersList.map((c) => (
                        <tr key={c.id}>
                          <td><code>{c.id}</code></td>
                          <td><strong>{c.name}</strong></td>
                          <td>{c.email}</td>
                          <td>{c.phone}</td>
                          <td>{c.orders} orders</td>
                          <td><strong style={{ color: '#059669' }}>{c.spent}</strong></td>
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
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Apparel Inventory Management</h1>
                <p className="vexa-subheading">Track warehouse stock, sizes, and restock alerts.</p>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Item Description</th>
                        <th>Sizes Available</th>
                        <th>Current Quantity</th>
                        <th>Threshold</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>VXA-SKU-01</code></td>
                        <td>Classic Heavyweight Tee (Black)</td>
                        <td>S, M, L, XL</td>
                        <td>48 units</td>
                        <td>10 units</td>
                        <td><span className="vexa-order-status delivered">Optimal</span></td>
                      </tr>
                      <tr>
                        <td><code>VXA-SKU-02</code></td>
                        <td>Oversized Fleece Hoodie (Beige)</td>
                        <td>M, L, XL</td>
                        <td>26 units</td>
                        <td>10 units</td>
                        <td><span className="vexa-order-status delivered">Optimal</span></td>
                      </tr>
                      <tr>
                        <td><code>VXA-SKU-03</code></td>
                        <td>Signature Embroidered Pullover</td>
                        <td>S, M, L</td>
                        <td>15 units</td>
                        <td>12 units</td>
                        <td><span className="vexa-order-status processing">Restock Soon</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 6: PROMOTIONS */}
          {activeTab === 'promotions' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Discount Promotions &amp; Coupons</h1>
                <p className="vexa-subheading">Create discount codes and seasonal shopping vouchers.</p>
              </div>

              <div className="vexa-table-card">
                <div className="vexa-table-responsive">
                  <table className="vexa-table">
                    <thead>
                      <tr>
                        <th>Coupon Code</th>
                        <th>Discount Value</th>
                        <th>Min Order</th>
                        <th>Total Used</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>STYLEFIRST</code></td>
                        <td>15% OFF</td>
                        <td>₹1,499</td>
                        <td>34 orders</td>
                        <td><span className="vexa-order-status delivered">Active</span></td>
                      </tr>
                      <tr>
                        <td><code>WINTER20</code></td>
                        <td>20% OFF</td>
                        <td>₹2,499</td>
                        <td>18 orders</td>
                        <td><span className="vexa-order-status delivered">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 7: REPORTS */}
          {activeTab === 'reports' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Sales &amp; Revenue Reports</h1>
                <p className="vexa-subheading">Financial analytics, average order value, and profit margins.</p>
              </div>

              <div className="vexa-kpi-grid">
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Gross Sales</span>
                  <div className="vexa-kpi-value">₹1,59,583.92</div>
                  <span className="vexa-kpi-trend">&uarr; 14% vs last month</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Avg Order Value</span>
                  <div className="vexa-kpi-value">₹2,020</div>
                  <span className="vexa-kpi-trend">&uarr; 6% healthy</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Net Profit Margin</span>
                  <div className="vexa-kpi-value">38.4%</div>
                  <span className="vexa-kpi-trend">&uarr; Apparel tier</span>
                </div>
                <div className="vexa-kpi-card">
                  <span className="vexa-kpi-label">Return Rate</span>
                  <div className="vexa-kpi-value">1.8%</div>
                  <span className="vexa-kpi-trend" style={{ color: '#059669' }}>Low SLA</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 8: SETTINGS */}
          {activeTab === 'settings' && (
            <>
              <div className="vexa-page-header">
                <h1 className="vexa-heading">Store Settings</h1>
                <p className="vexa-subheading">Configure payment gateway, delivery partners, and store details.</p>
              </div>

              <div className="vexa-card" style={{ maxWidth: '640px' }}>
                <h3 className="vexa-card-title" style={{ marginBottom: '16px' }}>Store Profile</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Store Brand Name
                    </label>
                    <input
                      type="text"
                      defaultValue="VEXA Style Hub"
                      className="vexa-search-input"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Store Currency
                    </label>
                    <input
                      type="text"
                      defaultValue="INR (₹)"
                      className="vexa-search-input"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.84rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '6px' }}>
                      Support Email
                    </label>
                    <input
                      type="email"
                      defaultValue="support@vexastylehub.com"
                      className="vexa-search-input"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default VexaDashboard;

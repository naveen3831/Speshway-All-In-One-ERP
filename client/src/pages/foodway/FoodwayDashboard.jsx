import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutGrid,
  ShoppingBag,
  Clock,
  Bike,
  UtensilsCrossed,
  Printer,
  TrendingUp,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  ArrowRight,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Truck,
  DollarSign,
  Layers,
  ArrowLeft,
  Flame,
  Check,
  MapPin,
  Phone,
  Store,
} from 'lucide-react';
import './FoodwayDashboard.css';

// Custom FoodWay Logo Icon with Chef Hat & Delivery Plate
const FoodwayLogoIcon = () => (
  <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fwGreen" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.5" stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="fwOrange" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB923C" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="#180e04" />
    {/* Cloche cover */}
    <path d="M24 64C24 44 36 34 50 34C64 34 76 44 76 64H24Z" fill="url(#fwGreen)" />
    {/* Cloche handle */}
    <circle cx="50" cy="30" r="5" fill="url(#fwOrange)" />
    {/* Serving Platter Base */}
    <rect x="18" y="66" width="64" height="6" rx="3" fill="url(#fwOrange)" />
    <path d="M34 52C42 56 58 56 66 52" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const FoodwayDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'orders', label: 'Live Orders', icon: ShoppingBag, badge: '38' },
    { id: 'kds', label: 'Kitchen KDS', icon: Flame, badge: 'Cooking' },
    { id: 'fleet', label: 'Delivery Riders', icon: Bike, badge: '16' },
    { id: 'menu', label: 'Menu Catalog', icon: UtensilsCrossed },
    { id: 'kot', label: 'Thermal KOT', icon: Printer },
    { id: 'settlements', label: 'Daily Settlements', icon: DollarSign },
    { id: 'analytics', label: 'Sales Reports', icon: TrendingUp },
    { id: 'settings', label: 'Kitchen Settings', icon: Settings },
  ];

  const liveOrders = [
    { id: '#FW-6821', customer: 'Sanjay Varma', phone: '+91 98480 91823', items: 'Hyderabadi Dum Biryani x 2, Mirchi Ka Salan', total: '₹780', station: 'Biryani Wok 1', timer: '8 mins left', rider: 'Ramesh K. (2.1 km)', status: 'cooking' },
    { id: '#FW-6820', customer: 'Meera Krishnan', phone: '+91 98840 22314', items: 'Double Cheese Truffle Burger, Peri-Peri Fries', total: '₹540', station: 'Burger Grill', timer: '3 mins left', rider: 'Vikram S. (At Gate)', status: 'ready' },
    { id: '#FW-6819', customer: 'Deepak Sen', phone: '+91 98200 44102', items: '12" Woodfired Peri-Peri Chicken Pizza, Coke Zero', total: '₹690', station: 'Stone Oven', timer: 'Dispatched', rider: 'Imran Khan (Delivering)', status: 'on-way' },
    { id: '#FW-6818', customer: 'Ananya Roy', phone: '+91 97480 33190', items: 'Loaded Nachos Grande, Mexican Burrito Bowl', total: '₹620', station: 'Salad & Wrap Bar', timer: 'Delivered', rider: 'Ramesh K. (Delivered)', status: 'delivered' },
    { id: '#FW-6817', customer: 'Rohit Sharma', phone: '+91 98190 77218', items: 'Paneer Butter Masala, Butter Naan x 4, Jeera Rice', total: '₹680', station: 'Curry Station 2', timer: 'Cooking', rider: 'Assigned', status: 'cooking' },
  ];

  const ridersList = [
    { name: 'Ramesh K.', phone: '+91 98491 00213', bike: 'TS09-EB-4412', order: '#FW-6818', battery: '84% (EV Bike)', rating: '4.9 ★', status: 'Delivering' },
    { name: 'Vikram S.', phone: '+91 98842 11094', bike: 'TS08-BK-9921', order: '#FW-6820', battery: '92%', rating: '4.8 ★', status: 'At Outlet' },
    { name: 'Imran Khan', phone: '+91 98203 44810', bike: 'TS10-MV-7712', order: '#FW-6819', battery: '68%', rating: '5.0 ★', status: 'Delivering' },
    { name: 'Sunil Jadhav', phone: '+91 97481 99201', bike: 'TS09-RT-3310', order: 'Waiting Next Order', battery: '98%', rating: '4.9 ★', status: 'Idle / Ready' },
  ];

  const menuItems = [
    { id: 'MNU-101', name: 'Signature Dum Biryani (Chicken)', category: 'Biryani & Rice', cost: '₹140', price: '₹340', margin: '58%', status: 'In Stock' },
    { id: 'MNU-102', name: 'Double Patty Smash Truffle Burger', category: 'Gourmet Burgers', cost: '₹110', price: '₹280', margin: '60%', status: 'In Stock' },
    { id: 'MNU-103', name: '12" Neapolitan Margherita Pizza', category: 'Artisan Pizza', cost: '₹95', price: '₹320', margin: '70%', status: 'In Stock' },
    { id: 'MNU-104', name: 'Crispy Peri-Peri Chicken Wings (6 pcs)', category: 'Appetizers', cost: '₹85', price: '₹240', margin: '64%', status: 'In Stock' },
    { id: 'MNU-105', name: 'Belgian Chocolate Thickshake', category: 'Beverages', cost: '₹45', price: '₹160', margin: '71%', status: 'In Stock' },
  ];

  const categorySales = [
    { name: 'Dum Biryani & Rice', count: '112 orders', rev: '₹42,800', share: '36%', color: '#059669' },
    { name: 'Gourmet Burgers', count: '84 orders', rev: '₹28,600', share: '24%', color: '#10b981' },
    { name: 'Artisan Pizzas', count: '62 orders', rev: '₹24,400', share: '21%', color: '#34d399' },
    { name: 'Wings & Appetizers', count: '48 orders', rev: '₹14,200', share: '12%', color: '#6ee7b7' },
    { name: 'Desserts & Shakes', count: '32 orders', rev: '₹8,400', share: '7%', color: '#a7f3d0' },
  ];

  return (
    <div className="foodway-dashboard-container">
      {/* 1. STICKY SIDEBAR */}
      <aside className="foodway-sidebar">
        <div className="foodway-sidebar-top">
          <div className="foodway-brand">
            <div className="foodway-brand-logo-wrap">
              <FoodwayLogoIcon />
            </div>
            <div>
              <div className="foodway-brand-title">FoodWay</div>
              <div className="foodway-brand-sub">CLOUD KITCHEN ERP</div>
            </div>
          </div>

          <ul className="foodway-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`foodway-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span className="foodway-nav-label">{item.label}</span>
                    {item.badge && <span className="foodway-nav-badge">{item.badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="foodway-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="foodway-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="foodway-user-profile">
            <div className="foodway-avatar">FW</div>
            <div className="foodway-user-info">
              <span className="foodway-user-name">Kitchen Executive</span>
              <span className="foodway-user-role">Cloud Kitchen Central</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN SCROLLABLE CONTENT */}
      <main className="foodway-main">
        {/* Top Header */}
        <header className="foodway-header">
          <div className="foodway-header-left">
            <h1 className="foodway-page-title">
              {navItems.find((n) => n.id === activeTab)?.label || 'Kitchen Dispatch Hub'}
            </h1>
            <p className="foodway-page-sub">
              FoodWay Multi-Brand Cloud Kitchen ERP &bull; Real-time KDS, Telematics &amp; Thermal KOT
            </p>
          </div>

          <div className="foodway-header-right">
            <div className="foodway-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search orders, riders, menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="foodway-prep-indicator">
              <span className="foodway-prep-pulse"></span>
              <span>Avg Prep Time: 12.4 Mins &bull; 100% On-Time</span>
            </div>

            <button className="foodway-icon-btn" title="Live KOT Alerts">
              <Bell size={18} />
              <span className="foodway-bell-dot"></span>
            </button>

            <button
              onClick={() => window.open('https://foody.speshway.site', '_blank')}
              className="foodway-btn-site"
            >
              <span>Customer Ordering Web</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="foodway-content-body">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stat Cards Row */}
              <div className="foodway-stats-grid">
                <div className="foodway-stat-card">
                  <div className="foodway-stat-icon-wrap">
                    <ShoppingBag size={22} />
                  </div>
                  <div className="foodway-stat-info">
                    <span className="foodway-stat-label">Active Live Orders</span>
                    <span className="foodway-stat-val">38</span>
                    <span className="foodway-stat-trend">14 on grill &bull; 12 in transit</span>
                  </div>
                </div>

                <div className="foodway-stat-card">
                  <div className="foodway-stat-icon-wrap">
                    <CheckCircle size={22} />
                  </div>
                  <div className="foodway-stat-info">
                    <span className="foodway-stat-label">Delivered Today</span>
                    <span className="foodway-stat-val">248</span>
                    <span className="foodway-stat-trend">↑ +32 orders vs yesterday</span>
                  </div>
                </div>

                <div className="foodway-stat-card">
                  <div className="foodway-stat-icon-wrap">
                    <Bike size={22} />
                  </div>
                  <div className="foodway-stat-info">
                    <span className="foodway-stat-label">Fleet Telematics</span>
                    <span className="foodway-stat-val">16 Riders</span>
                    <span className="foodway-stat-trend">Avg delivery: 22.8 mins</span>
                  </div>
                </div>

                <div className="foodway-stat-card">
                  <div className="foodway-stat-icon-wrap">
                    <DollarSign size={22} />
                  </div>
                  <div className="foodway-stat-info">
                    <span className="foodway-stat-label">Today's Gross Sales</span>
                    <span className="foodway-stat-val">₹1,82,400</span>
                    <span className="foodway-stat-trend">↑ +28% vs last week</span>
                  </div>
                </div>
              </div>

              {/* Charts & Quick Actions Row */}
              <div className="foodway-charts-grid">
                {/* Live Orders Table */}
                <div className="foodway-card">
                  <div className="foodway-card-header">
                    <h3 className="foodway-card-title">
                      <Clock size={18} className="text-emerald-600" />
                      Live Kitchen Dispatch Stream
                    </h3>
                    <span
                      onClick={() => setActiveTab('orders')}
                      style={{ fontSize: '13px', color: '#059669', fontWeight: '600', cursor: 'pointer' }}
                    >
                      View All Live Orders &rarr;
                    </span>
                  </div>
                  <div className="foodway-table-wrap">
                    <table className="foodway-data-table">
                      <thead>
                        <tr>
                          <th>Order #</th>
                          <th>Customer</th>
                          <th>Items Summary</th>
                          <th>Kitchen Station</th>
                          <th>Rider / Timer</th>
                          <th>Bill</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {liveOrders.map((ord) => (
                          <tr key={ord.id}>
                            <td style={{ fontWeight: 700 }}>{ord.id}</td>
                            <td>
                              <div style={{ fontWeight: 600 }}>{ord.customer}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{ord.phone}</div>
                            </td>
                            <td>{ord.items}</td>
                            <td><span style={{ color: '#d97706', fontWeight: 600 }}>{ord.station}</span></td>
                            <td>
                              <span style={{ color: '#059669', fontWeight: 600 }}>{ord.timer}</span>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{ord.rider}</div>
                            </td>
                            <td style={{ fontWeight: 700 }}>{ord.total}</td>
                            <td>
                              <span className={`foodway-status-badge ${ord.status}`}>
                                {ord.status === 'cooking' ? 'Cooking' : ord.status === 'ready' ? 'Ready for Pickup' : ord.status === 'on-way' ? 'Out for Delivery' : 'Delivered'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Categories & Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="foodway-card">
                    <div className="foodway-card-header">
                      <h3 className="foodway-card-title">
                        <Layers size={18} />
                        Sales by Food Category
                      </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {categorySales.map((cat) => (
                        <div key={cat.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: cat.color }} />
                            <span style={{ fontWeight: 600 }}>{cat.name}</span>
                          </div>
                          <span style={{ fontWeight: 700, color: '#0f172a' }}>{cat.rev} ({cat.share})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="foodway-card">
                    <div className="foodway-card-header">
                      <h3 className="foodway-card-title">
                        <UtensilsCrossed size={18} />
                        Kitchen KDS Actions
                      </h3>
                    </div>
                    <div className="foodway-actions-list">
                      <div className="foodway-action-item" onClick={() => setActiveTab('kds')}>
                        <span>Open Kitchen Display System (KDS)</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="foodway-action-item" onClick={() => setActiveTab('kot')}>
                        <span>Print Pending Thermal KOT Tickets</span>
                        <ArrowRight size={14} />
                      </div>
                      <div className="foodway-action-item" onClick={() => setActiveTab('fleet')}>
                        <span>Dispatch Rider Telematics</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: LIVE ORDERS */}
          {activeTab === 'orders' && (
            <div className="foodway-card">
              <div className="foodway-card-header">
                <div>
                  <h3 className="foodway-card-title">
                    <ShoppingBag size={18} className="text-emerald-600" />
                    Live Orders Queue &amp; Fulfillment Stream
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                    Real-time tickets received from website and partner channels with preparation countdowns.
                  </p>
                </div>
              </div>

              <div className="foodway-table-wrap" style={{ marginTop: '16px' }}>
                <table className="foodway-data-table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Customer &amp; Contact</th>
                      <th>Items Ordered</th>
                      <th>Preparation Station</th>
                      <th>Delivery Partner</th>
                      <th>Total Amount</th>
                      <th>Live Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveOrders.map((ord) => (
                      <tr key={ord.id}>
                        <td style={{ fontWeight: 700 }}>{ord.id}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{ord.customer}</div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{ord.phone}</div>
                        </td>
                        <td>{ord.items}</td>
                        <td><span style={{ color: '#d97706', fontWeight: 600 }}>{ord.station}</span></td>
                        <td>{ord.rider}</td>
                        <td style={{ fontWeight: 700 }}>{ord.total}</td>
                        <td>
                          <span className={`foodway-status-badge ${ord.status}`}>{ord.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: KITCHEN KDS */}
          {activeTab === 'kds' && (
            <div className="foodway-card">
              <div className="foodway-card-header">
                <h3 className="foodway-card-title">
                  <Flame size={18} className="text-emerald-600" />
                  Kitchen Display System (KDS Station Kanban)
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ border: '1px solid #fed7aa', background: '#fff7ed', borderRadius: '10px', padding: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#c2410c' }}>Grill Station #1</h4>
                  <p style={{ fontSize: '13px', margin: 0, fontWeight: 600 }}>Order #FW-6820: Double Truffle Burger x 1</p>
                  <span style={{ fontSize: '12px', color: '#ea580c' }}>⏱ 3 mins left</span>
                </div>
                <div style={{ border: '1px solid #a7f3d0', background: '#ecfdf5', borderRadius: '10px', padding: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#047857' }}>Biryani Wok Station</h4>
                  <p style={{ fontSize: '13px', margin: 0, fontWeight: 600 }}>Order #FW-6821: Hyderabadi Dum Biryani x 2</p>
                  <span style={{ fontSize: '12px', color: '#059669' }}>⏱ 8 mins left</span>
                </div>
                <div style={{ border: '1px solid #e2e8f0', background: '#f8fafc', borderRadius: '10px', padding: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#334155' }}>Packaging &amp; Dispatch Station</h4>
                  <p style={{ fontSize: '13px', margin: 0, fontWeight: 600 }}>Order #FW-6819: Sealed &amp; Handed to Rider</p>
                  <span style={{ fontSize: '12px', color: '#059669' }}>✓ Completed</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DELIVERY FLEET */}
          {activeTab === 'fleet' && (
            <div className="foodway-card">
              <div className="foodway-card-header">
                <h3 className="foodway-card-title">
                  <Bike size={18} className="text-emerald-600" />
                  Delivery Fleet Telematics (16 Active Riders)
                </h3>
              </div>
              <div className="foodway-table-wrap" style={{ marginTop: '16px' }}>
                <table className="foodway-data-table">
                  <thead>
                    <tr>
                      <th>Rider Name</th>
                      <th>Phone</th>
                      <th>EV Bike Number</th>
                      <th>Current Order</th>
                      <th>Battery / Fuel</th>
                      <th>Rating</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ridersList.map((r, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 700 }}>{r.name}</td>
                        <td>{r.phone}</td>
                        <td>{r.bike}</td>
                        <td><span style={{ fontWeight: 600, color: '#047857' }}>{r.order}</span></td>
                        <td>{r.battery}</td>
                        <td style={{ fontWeight: 700, color: '#d97706' }}>{r.rating}</td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857', fontWeight: 700, fontSize: '12px' }}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: MENU CATALOG */}
          {activeTab === 'menu' && (
            <div className="foodway-card">
              <div className="foodway-card-header">
                <h3 className="foodway-card-title">
                  <UtensilsCrossed size={18} className="text-emerald-600" />
                  Cloud Kitchen Recipe &amp; Menu Catalog
                </h3>
              </div>
              <div className="foodway-table-wrap" style={{ marginTop: '16px' }}>
                <table className="foodway-data-table">
                  <thead>
                    <tr>
                      <th>SKU Code</th>
                      <th>Dish Name</th>
                      <th>Category</th>
                      <th>Food Cost</th>
                      <th>Selling Price</th>
                      <th>Kitchen Margin</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((m) => (
                      <tr key={m.id}>
                        <td style={{ fontWeight: 700, color: '#047857' }}>{m.id}</td>
                        <td style={{ fontWeight: 600 }}>{m.name}</td>
                        <td>{m.category}</td>
                        <td>{m.cost}</td>
                        <td style={{ fontWeight: 700, color: '#0f172a' }}>{m.price}</td>
                        <td style={{ fontWeight: 700, color: '#059669' }}>{m.margin}</td>
                        <td>
                          <span style={{ padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857', fontWeight: 700, fontSize: '12px' }}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: THERMAL KOT */}
          {activeTab === 'kot' && (
            <div className="foodway-card">
              <div className="foodway-card-header">
                <h3 className="foodway-card-title">
                  <Printer size={18} className="text-emerald-600" />
                  Thermal Kitchen Order Ticket (KOT) Station
                </h3>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', marginTop: '16px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                  Auto-print network connected to 80mm ESC/POS thermal printers at Grill, Wok, and Packing tables for zero-delay order preparation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 7: SETTLEMENTS */}
          {activeTab === 'settlements' && (
            <div className="foodway-card">
              <div className="foodway-card-header">
                <h3 className="foodway-card-title">
                  <DollarSign size={18} className="text-emerald-600" />
                  Daily Outlet &amp; Rider Settlements
                </h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Gross Dispatches Today</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#047857' }}>₹1,82,400</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Rider Delivery Payouts</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a' }}>₹24,800</div>
                </div>
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>Net Kitchen Profit Margin</div>
                  <div style={{ fontSize: '26px', fontWeight: 800, color: '#d97706' }}>₹1,57,600</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SALES REPORTS */}
          {activeTab === 'analytics' && (
            <div className="foodway-card">
              <div className="foodway-card-header">
                <h3 className="foodway-card-title">
                  <TrendingUp size={18} className="text-emerald-600" />
                  Sales Volume &amp; Kitchen Performance Analytics
                </h3>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', marginTop: '16px' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#475569' }}>
                  Average customer rating 4.88/5.0 across 12,400 completed orders. Average preparation to delivery time: 24.2 minutes.
                </p>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="foodway-card" style={{ maxWidth: '640px' }}>
              <div className="foodway-card-header">
                <h3 className="foodway-card-title">
                  <Settings size={18} />
                  FoodWay Kitchen Configuration
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Kitchen Central Hub</label>
                  <input type="text" readOnly value="FoodWay Cloud Kitchen Hub #1 &bull; Speshway Food Tech" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Delivery Radius &amp; Geofence</label>
                  <input type="text" readOnly value="Radius: 8.5 km &bull; Automatic Rider Dispatch: Enabled" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FoodwayDashboard;

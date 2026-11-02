import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  UserCheck,
  Store,
  Box,
  BadgePercent,
  ShoppingCart,
  BookOpen,
  Ticket,
  Receipt,
  Calculator,
  Users,
  CalendarCheck,
  LogOut,
  Bell,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Plus,
  Search,
} from 'lucide-react';
import './TravelAgencyDashboard.css';

export const TravelAgencyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeTimeframe, setActiveTimeframe] = useState('30days');

  // KPI Metrics matching exact values from screenshot
  const kpiData = [
    { id: 'leads', label: 'Leads', value: '4' },
    { id: 'won', label: 'Won', value: '2' },
    { id: 'customers', label: 'Customers', value: '4' },
    { id: 'vendors', label: 'Vendors', value: '4' },
    { id: 'products', label: 'Products', value: '4' },
    { id: 'low_stock', label: 'Low Stock', value: '0' },
    { id: 'employees', label: 'Employees', value: '3' },
    { id: 'sales_mo', label: 'Sales (mo)', value: '₹0' },
    { id: 'purchase_mo', label: 'Purchase (mo)', value: '₹0' },
    { id: 'receivables', label: 'Receivables', value: '₹3,37,229' },
    { id: 'payables', label: 'Payables', value: '₹0' },
  ];

  // Recent leads list matching exact screenshot
  const recentLeads = [
    { id: 1, name: 'Sneha Iyer', status: 'Won', statusType: 'won' },
    { id: 2, name: 'Amit Traders', status: 'Won', statusType: 'won' },
    { id: 3, name: 'Priya Mehta', status: 'Qualified', statusType: 'qualified' },
    { id: 4, name: 'Rahul Sharma', status: 'New', statusType: 'new' },
  ];

  // Navigation menu items matching exact sidebar from screenshot
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'crm', label: 'CRM / Leads', icon: Target },
    { id: 'customers', label: 'Customers', icon: UserCheck },
    { id: 'vendors', label: 'Vendors', icon: Store },
    { id: 'inventory', label: 'Inventory', icon: Box },
    { id: 'sales', label: 'Sales', icon: BadgePercent },
    { id: 'purchase', label: 'Purchase', icon: ShoppingCart },
    { id: 'packages', label: 'Packages', icon: BookOpen },
    { id: 'bookings', label: 'Travel Bookings', icon: Ticket },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'accounts', label: 'Accounts', icon: Calculator },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
  ];

  return (
    <div className="tat-erp-root">
      {/* 1. SIDEBAR */}
      <aside className="tat-sidebar">
        {/* Brand Logo Header */}
        <div className="tat-sidebar-brand">
          <div className="tat-logo-mark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 13h4l3-8 4 14 3-6h4"
                stroke="#06b6d4"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="tat-brand-text">
            <span className="tat-brand-name">
              <span className="text-cyan">Holiday</span>City
            </span>
            <span className="tat-brand-legal">Pvt. Ltd.</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="tat-nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`tat-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} className="tat-nav-icon" />
                <span className="tat-nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="tat-sidebar-footer">
          <button
            onClick={() => navigate('/product/tours-and-travels')}
            className="tat-nav-item logout"
            title="Return to Speshway Products"
          >
            <LogOut size={18} className="tat-nav-icon" />
            <span className="tat-nav-label">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <div className="tat-main-wrapper">
        {/* Top Navbar */}
        <header className="tat-topbar">
          <div className="tat-topbar-left">
            <h2 className="tat-module-title">Travel Agency ERP</h2>
            <Link to="/product/tours-and-travels" className="tat-back-chip">
              <ArrowLeft size={13} />
              <span>Back to Speshway ERP</span>
            </Link>
          </div>

          <div className="tat-topbar-right">
            <button className="tat-bell-btn" title="Notifications">
              <Bell size={18} />
              <span className="tat-bell-dot"></span>
            </button>

            <div className="tat-user-pill">
              <span className="tat-user-role">Owner</span>
              <div className="tat-user-avatar">
                <span>O</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="tat-content">
          {/* Dashboard Header */}
          <div className="tat-page-header">
            <h1 className="tat-heading">Dashboard</h1>
            <p className="tat-subheading">Overview tuned for your industry.</p>
          </div>

          {/* 11 Metric KPI Cards Grid */}
          <div className="tat-kpi-grid">
            {kpiData.map((kpi) => (
              <div key={kpi.id} className="tat-kpi-card">
                <span className="tat-kpi-label">{kpi.label}</span>
                <span className="tat-kpi-value">{kpi.value}</span>
              </div>
            ))}
          </div>

          {/* Lower Two-Column Section: Chart & Recent Leads */}
          <div className="tat-lower-grid">
            {/* Left Card: Sales - last 30 days Chart */}
            <div className="tat-card tat-chart-card">
              <div className="tat-card-head">
                <h3 className="tat-card-title">Sales &mdash; last 30 days</h3>
                <span className="tat-period-badge">Live Trajectory</span>
              </div>

              <div className="tat-chart-container">
                {/* SVG Area Spline Chart matching screenshot */}
                <div className="tat-chart-svg-wrap">
                  {/* Y Axis Labels */}
                  <div className="tat-y-axis">
                    <span>₹3.5L</span>
                    <span>₹3.0L</span>
                    <span>₹2.5L</span>
                    <span>₹2.0L</span>
                    <span>₹1.5L</span>
                  </div>

                  {/* Chart Canvas */}
                  <div className="tat-svg-canvas">
                    <svg viewBox="0 0 600 240" preserveAspectRatio="none" className="tat-chart-svg">
                      <defs>
                        <linearGradient id="tatGreenGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                          <stop offset="60%" stopColor="#10b981" stopOpacity="0.10" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="70" x2="600" y2="70" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="600" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="170" x2="600" y2="170" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="220" x2="600" y2="220" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

                      {/* Area Fill */}
                      <path
                        d="M 10 220
                           Q 40 215, 60 210
                           T 110 200
                           T 150 170
                           T 190 200
                           T 240 160
                           T 280 200
                           T 330 180
                           T 380 130
                           T 430 90
                           T 490 60
                           T 540 220
                           Z"
                        fill="url(#tatGreenGradient)"
                      />

                      {/* Main Spline Line */}
                      <path
                        d="M 10 220
                           Q 40 215, 60 210
                           T 110 200
                           T 150 170
                           T 190 200
                           T 240 160
                           T 280 200
                           T 330 180
                           T 380 130
                           T 430 90
                           T 490 60
                           T 540 220"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Data Point Dots matching screenshot */}
                      <circle cx="150" cy="170" r="4.5" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
                      <circle cx="240" cy="160" r="4.5" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
                      <circle cx="330" cy="180" r="4.5" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
                      <circle cx="380" cy="130" r="4.5" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
                      <circle cx="430" cy="90" r="4.5" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
                      <circle cx="490" cy="60" r="5" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Recent leads list matching screenshot */}
            <div className="tat-card tat-leads-card">
              <div className="tat-card-head">
                <h3 className="tat-card-title">Recent leads</h3>
              </div>

              <div className="tat-leads-list">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="tat-lead-row">
                    <span className="tat-lead-name">{lead.name}</span>
                    <span className={`tat-lead-badge ${lead.statusType}`}>{lead.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

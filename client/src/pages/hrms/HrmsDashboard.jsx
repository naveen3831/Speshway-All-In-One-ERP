import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Users,
  CalendarCheck,
  CalendarMinus,
  CreditCard,
  UserPlus,
  TrendingUp,
  FileText,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Plus,
  Check,
  Plane,
  Download,
  Info,
  Clock,
  Briefcase,
  Award,
  ShieldCheck,
  Building2,
  Calendar,
  Menu,
  X,
} from 'lucide-react';
import './HrmsDashboard.css';

// Speshway HRMS Logo Brand Icon
const HrmsLogoIcon = () => (
  <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hrmsGreen" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
    {/* Modern Curved Hexagon Badge */}
    <rect x="15" y="15" width="70" height="70" rx="20" fill="#0F172A" stroke="url(#hrmsGreen)" strokeWidth="3.5" />
    {/* Connected Nodes / HR Network */}
    <circle cx="50" cy="38" r="10" fill="#FFFFFF" />
    <path d="M30 68 C30 55, 70 55, 70 68" fill="url(#hrmsGreen)" />
    <circle cx="28" cy="46" r="6" fill="url(#hrmsGreen)" />
    <circle cx="72" cy="46" r="6" fill="url(#hrmsGreen)" />
    <line x1="34" y1="46" x2="44" y2="40" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
    <line x1="66" y1="46" x2="56" y2="40" stroke="#94A3B8" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

export const HrmsDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Nov 03, 2026');

  // 11 Navigation Menu Items matching screenshot
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'leave', label: 'Leave Management', icon: CalendarMinus },
    { id: 'payroll', label: 'Payroll', icon: CreditCard },
    { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
    { id: 'departments', label: 'Departments & Org Tree', icon: Building2 },
    { id: 'holidays', label: 'Holidays & Shifts', icon: Clock },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Quick Action items
  const quickActions = [
    { id: 'employees', label: 'Add New Employee', icon: UserPlus },
    { id: 'attendance', label: 'Mark Attendance', icon: CalendarCheck },
    { id: 'leave', label: 'Approve Leave Requests', icon: Plane },
    { id: 'payroll', label: 'Process Payroll', icon: CreditCard },
    { id: 'reports', label: 'Generate Reports', icon: BarChart3 },
  ];

  // Recent Activities matching screenshot
  const recentActivities = [
    {
      id: 1,
      icon: UserPlus,
      iconBg: 'bg-green-light',
      iconColor: 'text-green',
      title: 'New employee John Mathew joined',
      time: '10 mins ago',
    },
    {
      id: 2,
      icon: Calendar,
      iconBg: 'bg-blue-light',
      iconColor: 'text-blue',
      title: 'Leave request from Priya Reddy (2 Days)',
      time: '25 mins ago',
    },
    {
      id: 3,
      icon: CalendarCheck,
      iconBg: 'bg-green-light',
      iconColor: 'text-green',
      title: 'Attendance marked for 213 employees',
      time: '1 hour ago',
    },
    {
      id: 4,
      icon: CreditCard,
      iconBg: 'bg-amber-light',
      iconColor: 'text-amber',
      title: 'Payroll processed for October 2026',
      time: '3 hours ago',
    },
    {
      id: 5,
      icon: FileText,
      iconBg: 'bg-purple-light',
      iconColor: 'text-purple',
      title: 'Performance review updated for 5 employees',
      time: '4 hours ago',
    },
  ];

  // Upcoming Leave Requests matching screenshot
  const upcomingLeaves = [
    {
      initials: 'PR',
      name: 'Priya Reddy',
      leaveType: 'Casual Leave',
      from: 'Nov 05, 2026',
      to: 'Nov 06, 2026',
      days: 2,
      status: 'Pending',
    },
    {
      initials: 'AK',
      name: 'Arjun Kumar',
      leaveType: 'Sick Leave',
      from: 'Nov 07, 2026',
      to: 'Nov 07, 2026',
      days: 1,
      status: 'Pending',
    },
    {
      initials: 'SG',
      name: 'Sneha Gupta',
      leaveType: 'Casual Leave',
      from: 'Nov 10, 2026',
      to: 'Nov 12, 2026',
      days: 3,
      status: 'Approved',
    },
    {
      initials: 'RM',
      name: 'Rahul Mehta',
      leaveType: 'Earned Leave',
      from: 'Nov 14, 2026',
      to: 'Nov 18, 2026',
      days: 5,
      status: 'Pending',
    },
  ];

  return (
    <div className="hrms-wrapper">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="hrms-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 1. LEFT SIDEBAR (Dark Navy #0b1120 with Emerald Green Wave) */}
      <aside className={`hrms-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="hrms-sidebar-top">
          {/* Brand Header */}
          <div className="hrms-brand">
            <div className="hrms-logo-container">
              <HrmsLogoIcon />
            </div>
            <div className="hrms-brand-text">
              <div className="hrms-brand-row">
                <span className="brand-italic">Speshway</span>
                <span className="brand-green">HRMS</span>
              </div>
              <span className="hrms-brand-subtitle">ADMIN PANEL</span>
            </div>
            <button
              type="button"
              className="hrms-sidebar-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="hrms-nav">
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
                  className={`hrms-nav-btn ${isActive ? 'active' : ''}`}
                >
                  <div className="hrms-nav-btn-left">
                    <Icon size={18} className="hrms-nav-icon" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && <span className="hrms-nav-badge">{item.badge}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Pinned Bottom */}
        <div className="hrms-sidebar-bottom">
          <button onClick={() => navigate('/products')} className="hrms-btn-portal">
            <ArrowLeft size={16} />
            <span>Speshway Catalog</span>
          </button>
          <div className="hrms-user-profile">
            <div className="hrms-avatar">HR</div>
            <div className="hrms-user-info">
              <span className="hrms-user-name">Human Resources Lead</span>
              <span className="hrms-user-role">Speshway HRMS Global HQ</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION CONTENT */}
      <div className="hrms-main">
        {/* Top Navbar with Height 82px matching request */}
        <header className="hrms-topbar">
          <div className="hrms-topbar-left">
            <div className="hrms-header-title-wrap">
              <button
                type="button"
                className="hrms-menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="hrms-greeting-title">
                  {navItems.find(n => n.id === activeTab)?.label || 'Speshway HRMS Management'}
                </h1>
                <p className="hrms-greeting-subtitle">Here&apos;s what&apos;s happening at Speshway HRMS today.</p>
              </div>
            </div>
          </div>

          <div className="hrms-topbar-right">
            <button
              onClick={() => navigate('/products')}
              className="dashboard-back-link hrms-back-catalog-btn"
              title="Return to Catalog"
            >
              <ArrowLeft size={15} /> <span>Back</span>
            </button>

            {/* Global Search Bar */}
            <div className="hrms-search-box">
              <Search size={16} className="hrms-search-icon" />
              <input
                type="text"
                placeholder="Search employees, attendance, leave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hrms-search-input"
              />
            </div>

            {/* Date Pill dropdown */}
            <div className="hrms-date-pill">
              <Calendar size={15} />
              <span>{selectedDate}</span>
              <ChevronDown size={14} />
            </div>

            {/* Notifications Bell */}
            <button className="hrms-icon-btn" title="HR Notifications">
              <Bell size={19} />
              <span className="hrms-unread-dot"></span>
            </button>

            {/* User Profile */}
            <div className="hrms-user-profile-top">
              <span className="hrms-user-name">Admin</span>
              <div className="hrms-avatar">A</div>
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="hrms-content">
          {/* TAB 1: MAIN DASHBOARD VIEW (EXACT MATCH TO SCREENSHOT) */}
          {activeTab === 'dashboard' && (
            <div className="hrms-dashboard-view">
              {/* 5 KPI Stat Cards in a row */}
              <div className="hrms-stats-grid">
                {/* 1. Total Employees */}
                <div className="hrms-stat-card">
                  <div className="hrms-stat-icon-wrap bg-green-light">
                    <Users size={22} className="text-green" />
                  </div>
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Total Employees</span>
                    <div className="hrms-stat-value">248</div>
                    <div className="hrms-stat-trend text-green">
                      <span>↑ +8% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 2. Present Today */}
                <div className="hrms-stat-card">
                  <div className="hrms-stat-icon-wrap bg-green-light">
                    <CalendarCheck size={22} className="text-green" />
                  </div>
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Present Today</span>
                    <div className="hrms-stat-value">213</div>
                    <div className="hrms-stat-trend text-green">
                      <span>↑ +12% from yesterday</span>
                    </div>
                  </div>
                </div>

                {/* 3. On Leave */}
                <div className="hrms-stat-card">
                  <div className="hrms-stat-icon-wrap bg-green-light">
                    <Plane size={22} className="text-green" />
                  </div>
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">On Leave</span>
                    <div className="hrms-stat-value">18</div>
                    <div className="hrms-stat-trend text-red">
                      <span>↓ -6% from yesterday</span>
                    </div>
                  </div>
                </div>

                {/* 4. New Joiners */}
                <div className="hrms-stat-card">
                  <div className="hrms-stat-icon-wrap bg-green-light">
                    <UserPlus size={22} className="text-green" />
                  </div>
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">New Joiners</span>
                    <div className="hrms-stat-value">12</div>
                    <div className="hrms-stat-trend text-green">
                      <span>↑ +20% this month</span>
                    </div>
                  </div>
                </div>

                {/* 5. Payroll (This Month) */}
                <div className="hrms-stat-card">
                  <div className="hrms-stat-icon-wrap bg-green-light">
                    <span className="hrms-rupee-symbol">₹</span>
                  </div>
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Payroll (This Month)</span>
                    <div className="hrms-stat-value">₹24,76,000</div>
                    <div className="hrms-stat-trend text-green">
                      <span>↑ +5% from last month</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Section: Attendance Overview (Bar Chart) + Employee Distribution (Donut Chart) + Quick Actions */}
              <div className="hrms-analytics-grid">
                {/* 1. Attendance Overview Stacked Bar Chart */}
                <div className="hrms-card hrms-attendance-card">
                  <div className="hrms-card-header">
                    <div className="hrms-card-icon-title">
                      <BarChart3 size={20} className="text-green" />
                      <div>
                        <h3>Attendance Overview</h3>
                        <p className="hrms-card-subtitle">Employee attendance for the last 7 days</p>
                      </div>
                    </div>
                  </div>

                  <div className="hrms-chart-body">
                    <svg viewBox="0 0 380 210" className="hrms-svg-chart">
                      {/* Grid lines */}
                      <line x1="38" y1="20" x2="360" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="52" x2="360" y2="52" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="84" x2="360" y2="84" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="116" x2="360" y2="116" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="148" x2="360" y2="148" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="38" y1="180" x2="360" y2="180" stroke="#e2e8f0" />

                      {/* Y-Axis Labels */}
                      <text x="30" y="24" textAnchor="end" className="chart-label">250</text>
                      <text x="30" y="56" textAnchor="end" className="chart-label">200</text>
                      <text x="30" y="88" textAnchor="end" className="chart-label">150</text>
                      <text x="30" y="120" textAnchor="end" className="chart-label">100</text>
                      <text x="30" y="152" textAnchor="end" className="chart-label">50</text>
                      <text x="30" y="184" textAnchor="end" className="chart-label">0</text>

                      {/* Mon: 210 Present (solid green), top is Absent (light mint) */}
                      <rect x="52" y="24" width="28" height="22" rx="3" fill="#d1fae5" />
                      <rect x="52" y="46" width="28" height="134" rx="3" fill="#10b981" />
                      <text x="66" y="112" textAnchor="middle" className="bar-number">210</text>
                      <text x="66" y="196" textAnchor="middle" className="chart-day-label">Mon</text>

                      {/* Tue: 215 Present */}
                      <rect x="96" y="21" width="28" height="22" rx="3" fill="#d1fae5" />
                      <rect x="96" y="43" width="28" height="137" rx="3" fill="#10b981" />
                      <text x="110" y="108" textAnchor="middle" className="bar-number">215</text>
                      <text x="110" y="196" textAnchor="middle" className="chart-day-label">Tue</text>

                      {/* Wed: 212 Present */}
                      <rect x="140" y="23" width="28" height="22" rx="3" fill="#d1fae5" />
                      <rect x="140" y="45" width="28" height="135" rx="3" fill="#10b981" />
                      <text x="154" y="110" textAnchor="middle" className="bar-number">212</text>
                      <text x="154" y="196" textAnchor="middle" className="chart-day-label">Wed</text>

                      {/* Thu: 208 Present */}
                      <rect x="184" y="26" width="28" height="22" rx="3" fill="#d1fae5" />
                      <rect x="184" y="48" width="28" height="132" rx="3" fill="#10b981" />
                      <text x="198" y="114" textAnchor="middle" className="bar-number">208</text>
                      <text x="198" y="196" textAnchor="middle" className="chart-day-label">Thu</text>

                      {/* Fri: 213 Present */}
                      <rect x="228" y="22" width="28" height="22" rx="3" fill="#d1fae5" />
                      <rect x="228" y="44" width="28" height="136" rx="3" fill="#10b981" />
                      <text x="242" y="110" textAnchor="middle" className="bar-number">213</text>
                      <text x="242" y="196" textAnchor="middle" className="chart-day-label">Fri</text>

                      {/* Sat: 200 Present */}
                      <rect x="272" y="31" width="28" height="22" rx="3" fill="#d1fae5" />
                      <rect x="272" y="53" width="28" height="127" rx="3" fill="#10b981" />
                      <text x="286" y="118" textAnchor="middle" className="bar-number">200</text>
                      <text x="286" y="196" textAnchor="middle" className="chart-day-label">Sat</text>

                      {/* Sun: 198 Present */}
                      <rect x="316" y="32" width="28" height="22" rx="3" fill="#d1fae5" />
                      <rect x="316" y="54" width="28" height="126" rx="3" fill="#10b981" />
                      <text x="330" y="120" textAnchor="middle" className="bar-number">198</text>
                      <text x="330" y="196" textAnchor="middle" className="chart-day-label">Sun</text>
                    </svg>

                    <div className="hrms-chart-legend">
                      <div className="legend-item">
                        <span className="legend-box-green"></span>
                        <span>Present</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-box-mint"></span>
                        <span>Absent</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Employee Distribution Donut Chart */}
                <div className="hrms-card hrms-distribution-card">
                  <div className="hrms-card-header">
                    <div className="hrms-card-icon-title">
                      <CalendarCheck size={20} className="text-green" />
                      <div>
                        <h3>Employee Distribution</h3>
                      </div>
                    </div>
                  </div>

                  <div className="hrms-donut-container">
                    <div className="donut-graphic-wrap">
                      <svg viewBox="0 0 160 160" className="donut-svg">
                        <circle cx="80" cy="80" r="54" fill="none" stroke="#e2e8f0" strokeWidth="22" />
                        {/* Engineering: 32% */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#059669"
                          strokeWidth="22"
                          strokeDasharray="108 340"
                          strokeDashoffset="0"
                        />
                        {/* Operations: 20% */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="22"
                          strokeDasharray="68 340"
                          strokeDashoffset="-108"
                        />
                        {/* Sales: 18% */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="22"
                          strokeDasharray="61 340"
                          strokeDashoffset="-176"
                        />
                        {/* HR: 10% */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#6ee7b7"
                          strokeWidth="22"
                          strokeDasharray="34 340"
                          strokeDashoffset="-237"
                        />
                        {/* Support: 10% */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#a7f3d0"
                          strokeWidth="22"
                          strokeDasharray="34 340"
                          strokeDashoffset="-271"
                        />
                        {/* Others: 10% */}
                        <circle
                          cx="80"
                          cy="80"
                          r="54"
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="22"
                          strokeDasharray="34 340"
                          strokeDashoffset="-305"
                        />
                      </svg>
                      <div className="donut-center-text">
                        <span className="donut-num">248</span>
                        <span className="donut-sub">Employees</span>
                      </div>
                    </div>

                    <div className="donut-legend-list">
                      <div className="donut-legend-row">
                        <span className="dot dot-deep-green"></span>
                        <span className="legend-text">Engineering</span>
                        <span className="legend-pct">32%</span>
                      </div>
                      <div className="donut-legend-row">
                        <span className="dot dot-green"></span>
                        <span className="legend-text">Operations</span>
                        <span className="legend-pct">20%</span>
                      </div>
                      <div className="donut-legend-row">
                        <span className="dot dot-light-green"></span>
                        <span className="legend-text">Sales &amp; Marketing</span>
                        <span className="legend-pct">18%</span>
                      </div>
                      <div className="donut-legend-row">
                        <span className="dot dot-mint"></span>
                        <span className="legend-text">HR &amp; Admin</span>
                        <span className="legend-pct">10%</span>
                      </div>
                      <div className="donut-legend-row">
                        <span className="dot dot-pale-green"></span>
                        <span className="legend-text">Support</span>
                        <span className="legend-pct">10%</span>
                      </div>
                      <div className="donut-legend-row">
                        <span className="dot dot-gray"></span>
                        <span className="legend-text">Others</span>
                        <span className="legend-pct">10%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Quick Actions Card */}
                <div className="hrms-card hrms-quick-actions-card">
                  <div className="hrms-card-header">
                    <div className="hrms-card-icon-title">
                      <span className="text-green font-bold text-lg">⚡</span>
                      <div>
                        <h3>Quick Actions</h3>
                      </div>
                    </div>
                  </div>

                  <div className="hrms-actions-list">
                    {quickActions.map((qa, i) => {
                      const Icon = qa.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveTab(qa.id)}
                          className="hrms-action-row"
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

              {/* Bottom Row: Recent Activities + Upcoming Leave Requests */}
              <div className="hrms-bottom-grid">
                {/* 1. Recent Activities Card */}
                <div className="hrms-card hrms-activities-card">
                  <div className="hrms-card-header">
                    <div className="hrms-card-icon-title">
                      <Clock size={20} className="text-green" />
                      <div>
                        <h3>Recent Activities</h3>
                        <p className="hrms-card-subtitle">Latest actions across the system</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('notifications')} className="hrms-btn-view-all">
                      View All &rarr;
                    </button>
                  </div>

                  <div className="hrms-activities-list">
                    {recentActivities.map((act) => {
                      const Icon = act.icon;
                      return (
                        <div key={act.id} className="hrms-activity-item">
                          <div className={`activity-icon-box ${act.iconBg}`}>
                            <Icon size={16} className={act.iconColor} />
                          </div>
                          <div className="activity-details">
                            <p className="activity-title">{act.title}</p>
                          </div>
                          <span className="activity-time">{act.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Upcoming Leave Requests Card */}
                <div className="hrms-card hrms-leaves-card">
                  <div className="hrms-card-header">
                    <div className="hrms-card-icon-title">
                      <CalendarMinus size={20} className="text-green" />
                      <div>
                        <h3>Upcoming Leave Requests</h3>
                        <p className="hrms-card-subtitle">Pending and upcoming leave requests</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('leave')} className="hrms-btn-view-all">
                      View All Requests &rarr;
                    </button>
                  </div>

                  <div className="hrms-table-responsive">
                    <table className="hrms-table">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Leave Type</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Days</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {upcomingLeaves.map((lv, i) => (
                          <tr key={i}>
                            <td>
                              <div className="hrms-employee-cell">
                                <span className="emp-avatar-badge">{lv.initials}</span>
                                <span className="font-semibold">{lv.name}</span>
                              </div>
                            </td>
                            <td>{lv.leaveType}</td>
                            <td className="text-muted">{lv.from}</td>
                            <td className="text-muted">{lv.to}</td>
                            <td className="font-semibold text-center">{lv.days}</td>
                            <td>
                              {lv.status === 'Approved' ? (
                                <span className="hrms-badge hrms-badge-green">Approved</span>
                              ) : (
                                <span className="hrms-badge hrms-badge-amber">Pending</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Bottom ERP Info Banner */}
              <div className="hrms-info-banner">
                <Info size={18} className="text-green" />
                <p>
                  <strong>Speshway HRMS – Enterprise Workforce, Payroll &amp; Talent ERP</strong> &nbsp;|&nbsp;
                  Automated biometric attendance, salary slips, tax compliance, hiring applicant tracking, and performance appraisal cycles.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: EMPLOYEES */}
          {activeTab === 'employees' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Employee Directory &amp; Records</h2>
                  <p className="hrms-section-subtitle">248 active corporate staff, engineers, and department executives</p>
                </div>
                <button className="hrms-btn-primary">
                  <Plus size={16} />
                  <span>Add Employee</span>
                </button>
              </div>

              <div className="hrms-card">
                <div className="hrms-table-responsive">
                  <table className="hrms-table">
                    <thead>
                      <tr>
                        <th>EMPLOYEE ID</th>
                        <th>NAME</th>
                        <th>DEPARTMENT</th>
                        <th>DESIGNATION</th>
                        <th>JOIN DATE</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono text-green font-bold">#SP-EMP-1048</td>
                        <td className="font-bold">John Mathew</td>
                        <td>Engineering</td>
                        <td>Senior Full-Stack Lead</td>
                        <td>Today</td>
                        <td><span className="hrms-badge hrms-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-mono text-green font-bold">#SP-EMP-1032</td>
                        <td className="font-bold">Priya Reddy</td>
                        <td>Product &amp; Design</td>
                        <td>Lead UI/UX Designer</td>
                        <td>12 Jan 2025</td>
                        <td><span className="hrms-badge hrms-badge-green">Active</span></td>
                      </tr>
                      <tr>
                        <td className="font-mono text-green font-bold">#SP-EMP-1014</td>
                        <td className="font-bold">Arjun Kumar</td>
                        <td>Operations</td>
                        <td>Operations Manager</td>
                        <td>04 Jun 2024</td>
                        <td><span className="hrms-badge hrms-badge-green">Active</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Biometric Attendance &amp; Shift Logs</h2>
                  <p className="hrms-section-subtitle">213 employees checked in on time today (86% on-time punch rate)</p>
                </div>
                <button className="hrms-btn-primary">
                  <Download size={16} />
                  <span>Export Shift Logs</span>
                </button>
              </div>

              <div className="hrms-stats-grid">
                <div className="hrms-stat-card">
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">On-Time Arrivals</span>
                    <div className="hrms-stat-value">198</div>
                    <div className="hrms-stat-trend text-green">↑ Excellent punctuality</div>
                  </div>
                </div>
                <div className="hrms-stat-card">
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Late Arrivals</span>
                    <div className="hrms-stat-value">15</div>
                    <div className="hrms-stat-trend text-amber">Within grace period</div>
                  </div>
                </div>
                <div className="hrms-stat-card">
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Overtime Hours</span>
                    <div className="hrms-stat-value">46.5 hrs</div>
                    <div className="hrms-stat-trend text-green">Auto calculated</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEAVE MANAGEMENT */}
          {activeTab === 'leave' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Leave Approvals &amp; Entitlements</h2>
                  <p className="hrms-section-subtitle">Manage casual, sick, maternity, and earned vacation quotas</p>
                </div>
                <button className="hrms-btn-primary">
                  <Plus size={16} />
                  <span>Apply Leave</span>
                </button>
              </div>

              <div className="hrms-card">
                <div className="hrms-table-responsive">
                  <table className="hrms-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Days</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingLeaves.map((lv, i) => (
                        <tr key={i}>
                          <td>
                            <div className="hrms-employee-cell">
                              <span className="emp-avatar-badge">{lv.initials}</span>
                              <span className="font-semibold">{lv.name}</span>
                            </div>
                          </td>
                          <td>{lv.leaveType}</td>
                          <td className="text-muted">{lv.from}</td>
                          <td className="text-muted">{lv.to}</td>
                          <td className="font-semibold text-center">{lv.days}</td>
                          <td>
                            {lv.status === 'Approved' ? (
                              <span className="hrms-badge hrms-badge-green">Approved</span>
                            ) : (
                              <span className="hrms-badge hrms-badge-amber">Pending</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PAYROLL */}
          {activeTab === 'payroll' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Payroll Computation &amp; Payslips</h2>
                  <p className="hrms-section-subtitle">₹24,76,000 monthly total CTC with EPF, ESI, TDS, and bonus breakdown</p>
                </div>
                <button className="hrms-btn-primary">
                  <Download size={16} />
                  <span>Run Batch Bank Transfer</span>
                </button>
              </div>

              <div className="hrms-stats-grid">
                <div className="hrms-stat-card">
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Net Salary Disbursed</span>
                    <div className="hrms-stat-value">₹21,80,450</div>
                    <div className="hrms-stat-trend text-green">100% Direct Deposit</div>
                  </div>
                </div>
                <div className="hrms-stat-card">
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">TDS &amp; Statutory Dues</span>
                    <div className="hrms-stat-value">₹2,95,550</div>
                    <div className="hrms-stat-trend text-green">Compliant with Indian Tax Code</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RECRUITMENT */}
          {activeTab === 'recruitment' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Hiring Pipeline &amp; ATS</h2>
                  <p className="hrms-section-subtitle">12 new joiners onboarded this month, 24 candidates in interview rounds</p>
                </div>
                <button className="hrms-btn-primary">
                  <Plus size={16} />
                  <span>Post Job Opening</span>
                </button>
              </div>

              <div className="hrms-card">
                <p><strong>Senior React / Node Developer:</strong> 4 shortlisted for technical round.</p>
                <p style={{ marginTop: '10px' }}><strong>Product Marketing Manager:</strong> Final leadership interview scheduled for Friday.</p>
              </div>
            </div>
          )}

          {/* TAB 7: PERFORMANCE */}
          {activeTab === 'performance' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">KPIs, OKRs &amp; Performance Appraisals</h2>
                  <p className="hrms-section-subtitle">Q4 performance reviews completed for 5 teams with 94.2% milestone completion</p>
                </div>
                <button className="hrms-btn-primary">
                  <Download size={16} />
                  <span>Appraisal Summary</span>
                </button>
              </div>

              <div className="hrms-stats-grid">
                <div className="hrms-stat-card">
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Average Performance Score</span>
                    <div className="hrms-stat-value">4.6 / 5.0</div>
                    <div className="hrms-stat-trend text-green">⭐ High team velocity</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Employee Document Repository</h2>
                  <p className="hrms-section-subtitle">Aadhaar, PAN, offer letters, NDA, degree certificates, and increment letters</p>
                </div>
                <button className="hrms-btn-primary">
                  <Plus size={16} />
                  <span>Upload Document</span>
                </button>
              </div>

              <div className="hrms-card">
                <p>All 248 employees have verified KYC, signed confidentiality deeds, and updated bank records.</p>
              </div>
            </div>
          )}

          {/* TAB 9: REPORTS */}
          {activeTab === 'reports' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">HR Analytics &amp; Attrition Metrics</h2>
                  <p className="hrms-section-subtitle">Turnover rate, cost per hire, gender diversity, and average tenure</p>
                </div>
                <button className="hrms-btn-primary">
                  <Download size={16} />
                  <span>Download Annual HR Audit</span>
                </button>
              </div>

              <div className="hrms-stats-grid">
                <div className="hrms-stat-card">
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Attrition Rate</span>
                    <div className="hrms-stat-value">3.2%</div>
                    <div className="hrms-stat-trend text-green">Far below 12% industry baseline</div>
                  </div>
                </div>
                <div className="hrms-stat-card">
                  <div className="hrms-stat-info">
                    <span className="hrms-stat-label">Average Tenure</span>
                    <div className="hrms-stat-value">3.4 Years</div>
                    <div className="hrms-stat-trend text-green">High staff loyalty</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">System Alerts &amp; Announcements</h2>
                  <p className="hrms-section-subtitle">3 unread notifications requiring HR manager review</p>
                </div>
              </div>

              <div className="hrms-card">
                <div className="hrms-activities-list">
                  {recentActivities.map((act) => {
                    const Icon = act.icon;
                    return (
                      <div key={act.id} className="hrms-activity-item">
                        <div className={`activity-icon-box ${act.iconBg}`}>
                          <Icon size={16} className={act.iconColor} />
                        </div>
                        <div className="activity-details">
                          <p className="activity-title">{act.title}</p>
                        </div>
                        <span className="activity-time">{act.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="hrms-section-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Company HR Policies &amp; Work Shifts</h2>
                  <p className="hrms-section-subtitle">Work hours, biometric turnstile device IP, probation rules, and holidays</p>
                </div>
                <button className="hrms-btn-primary">
                  <Check size={16} />
                  <span>Save Settings</span>
                </button>
              </div>

              <div className="hrms-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Standard Office Shift Hours</label>
                    <input
                      type="text"
                      defaultValue="09:30 AM – 06:30 PM (Monday – Friday)"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Biometric Attendance Machine IP</label>
                    <input
                      type="text"
                      defaultValue="192.168.1.150 (ZKTeco Biometric Terminal)"
                      style={{ width: '100%', maxWidth: '420px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

          {/* TAB: DEPARTMENTS & ORG TREE */}
          {activeTab === 'departments' && (
            <div className="hrms-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Corporate Departments & Team Structure</h2>
                  <p className="hrms-section-subtitle">Departmental headcount, budget allocations, and designated department heads</p>
                </div>
                <button className="hrms-btn-primary">
                  <Plus size={16} />
                  <span>Add Department</span>
                </button>
              </div>
              <div className="hrms-card">
                <div className="hrms-table-responsive">
                  <table className="hrms-table">
                    <thead>
                      <tr>
                        <th>DEPT CODE</th>
                        <th>DEPARTMENT NAME</th>
                        <th>HEAD OF DEPARTMENT (HOD)</th>
                        <th>TOTAL HEADCOUNT</th>
                        <th>LOCATIONS</th>
                        <th>ANNUAL BUDGET</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { code: 'ENG-01', name: 'Software Engineering & Platform AI', hod: 'Praveen Chawla (VP Engg)', count: '48 Engineers', loc: 'Hyderabad HQ & Remote', bud: '₹4.80 Cr', st: 'Active' },
                        { code: 'PRD-02', name: 'Product Management & Design Systems', hod: 'Ananya Deshpande (Head of Product)', count: '16 Leads', loc: 'Hyderabad HQ', bud: '₹1.90 Cr', st: 'Active' },
                        { code: 'SAL-03', name: 'Enterprise Sales & Business Dev', hod: 'Siddharth Varma (VP Sales)', count: '28 Executives', loc: 'Mumbai, BLR & Delhi', bud: '₹2.40 Cr', st: 'Active' },
                        { code: 'OPS-04', name: 'Customer Success & Technical Support', hod: 'Meera Krishnan (Support Lead)', count: '22 Analysts', loc: 'Hyderabad Campus', bud: '₹1.10 Cr', st: 'Active' },
                      ].map((d, i) => (
                        <tr key={i}>
                          <td><strong>{d.code}</strong></td>
                          <td><span style={{ fontWeight: 600 }}>{d.name}</span></td>
                          <td>{d.hod}</td>
                          <td><span className="hrms-active-badge">{d.count}</span></td>
                          <td>{d.loc}</td>
                          <td><strong style={{ color: '#059669' }}>{d.bud}</strong></td>
                          <td><span className="hrms-active-badge">{d.st}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HOLIDAYS & SHIFTS */}
          {activeTab === 'holidays' && (
            <div className="hrms-view">
              <div className="hrms-section-header">
                <div>
                  <h2 className="hrms-section-title">Official Holiday Calendar & Shift Schedules</h2>
                  <p className="hrms-section-subtitle">Gazetted national holidays, festive optional leaves, and work shifts</p>
                </div>
                <button className="hrms-btn-primary">
                  <Plus size={16} />
                  <span>Add Company Holiday</span>
                </button>
              </div>
              <div className="hrms-card">
                <div className="hrms-table-responsive">
                  <table className="hrms-table">
                    <thead>
                      <tr>
                        <th>HOLIDAY OCCASION</th>
                        <th>DATE & DAY</th>
                        <th>HOLIDAY CATEGORY</th>
                        <th>APPLICABLE BRANCHES</th>
                        <th>LEAVE DEDUCTION</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { occ: 'Diwali / Deepavali Celebrations', dt: '01 Nov 2026 (Sunday) - 03 Nov (Tue)', cat: 'Mandatory Gazetted Holiday', br: 'All India Offices', ded: 'Paid Company Holiday', st: 'Upcoming' },
                        { occ: 'Guru Nanak Jayanti', dt: '15 Nov 2026 (Sunday)', cat: 'Restricted / Optional Holiday', br: 'All Offices', ded: 'Optional Leave Credit', st: 'Upcoming' },
                        { occ: 'Christmas Day', dt: '25 Dec 2026 (Friday)', cat: 'Mandatory Gazetted Holiday', br: 'All India Offices', ded: 'Paid Company Holiday', st: 'Scheduled' },
                        { occ: 'New Year Day', dt: '01 Jan 2027 (Friday)', cat: 'Mandatory Gazetted Holiday', br: 'All India Offices', ded: 'Paid Company Holiday', st: 'Scheduled' },
                      ].map((h, i) => (
                        <tr key={i}>
                          <td><strong>{h.occ}</strong></td>
                          <td>{h.dt}</td>
                          <td><span className="hrms-badge-amber">{h.cat}</span></td>
                          <td>{h.br}</td>
                          <td>{h.ded}</td>
                          <td><span className="hrms-active-badge">{h.st}</span></td>
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


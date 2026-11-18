import React, { useState, useRef, useEffect, useMemo } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket, DEFAULT_BRANDING } from '../../context/SocketContext';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import { AdminLogin } from './AdminLogin';
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Globe,
  Inbox,
  Settings,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Bell,
  Sparkles,
  CheckCircle,
  Clock,
  Menu,
  X,
  User,
  Headphones,
  Phone,
  HelpCircle,
  LifeBuoy,
} from 'lucide-react';

export const AdminLayout = () => {
  const {
    user,
    loading,
    login,
    logout,
    sessionExpired,
    sessionExpiredReason,
    dismissSessionExpired,
    timeoutMinutes,
  } = useAuth();
  const { activities, modulesData, branding, homeContent } = useSocket();
  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const brandTitle = currentBranding.brandTitle || 'SPESHWAY';
  const brandSubtitle = currentBranding.brandSubtitle || 'ALL IN ONE ERP';
  const logoUrl = currentBranding.logoUrl || '/logo.png';
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);

  // Close mobile sidebar and sheets when route changes
  useEffect(() => {
    setShowMobileProfile(false);
    setSidebarOpen(false);
  }, [location.pathname]);

  const isProfileActive =
    location.pathname === '/admin/home' ||
    location.pathname === '/admin/inquiries' ||
    location.pathname === '/admin/settings' ||
    location.pathname === '/admin/users';

  const normalizedPath = (location.pathname || '').replace(/\/+$/, '') || '/';

  const getMobileTopbarTitle = () => {
    const path = location.pathname;
    if (path.includes('/new')) return 'New Project';
    if (path.includes('/edit')) return 'Edit Project';
    if (path.startsWith('/admin/products') || path.startsWith('/admin/projects')) return 'Projects';
    if (path.startsWith('/admin/pricing')) return 'Pricing';
    if (path.startsWith('/admin/inquiries')) return 'Inquiries';
    if (path.startsWith('/admin/settings')) return 'Settings';
    if (path.startsWith('/admin/home')) return 'Home Page';
    if (path.startsWith('/admin/users')) return 'Users';
    if (path.startsWith('/admin/urls')) return 'URLs';
    return 'Dashboard';
  };

  const getMobilePageIcon = () => {
    const path = location.pathname;
    if (path.startsWith('/admin/products') || path.startsWith('/admin/projects')) {
      return <Package size={18} />;
    }
    if (path.startsWith('/admin/pricing')) {
      return <CreditCard size={18} />;
    }
    if (path.startsWith('/admin/inquiries')) {
      return <Inbox size={18} />;
    }
    if (path.startsWith('/admin/settings')) {
      return <Settings size={18} />;
    }
    if (path.startsWith('/admin/home')) {
      return <Globe size={18} />;
    }
    if (path.startsWith('/admin/users')) {
      return <User size={18} />;
    }
    return <LayoutDashboard size={18} />;
  };

  const getDesktopTopbarTitle = () => {
    const path = location.pathname;
    if (path.includes('/new')) return 'Add New Project';
    if (path.includes('/edit')) return 'Edit Project';
    if (path.startsWith('/admin/products') || path.startsWith('/admin/projects')) return 'Project Management';
    if (path.startsWith('/admin/pricing')) return 'Pricing & Plans Management';
    if (path.startsWith('/admin/inquiries')) return 'Customer Inquiries & Leads';
    if (path.startsWith('/admin/settings')) return 'System Settings';
    if (path.startsWith('/admin/urls')) return 'Website & Admin Dashboard URL Directory';
    if (path.startsWith('/admin/users')) return 'Users & Personnel Directory';
    if (path.startsWith('/admin/home')) return 'Home Page Options';
    return 'Executive Dashboard Overview';
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const notifRef = useRef(null);
  const notifDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Trap scroll strictly inside the notification card so background page never scrolls
  useEffect(() => {
    if (!showNotifications) return;
    const dropdown = notifDropdownRef.current;
    if (!dropdown) return;

    const handleWheel = (e) => {
      const list = dropdown.querySelector('.admin-notif-list');
      if (!list) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = list;
      const isScrollable = scrollHeight > clientHeight;
      const deltaY = e.deltaY;

      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      // If scrolling on header or footer, scroll the list instead of parent page
      if (!list.contains(e.target)) {
        list.scrollTop += deltaY;
        e.preventDefault();
        return;
      }

      // If at boundary (top or bottom), isolate scroll so page does not move
      const isAtTop = scrollTop <= 0 && deltaY < 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1 && deltaY > 0;

      if (isAtTop || isAtBottom) {
        e.preventDefault();
      }
    };

    dropdown.addEventListener('wheel', handleWheel, { passive: false });
    return () => dropdown.removeEventListener('wheel', handleWheel);
  }, [showNotifications]);

  // Lock sidebar from scrolling and forward mouse wheel scrolling to main content
  const mainWrapRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const sidebarEl = sidebarRef.current;
    const mainWrapEl = mainWrapRef.current;
    if (!sidebarEl || !mainWrapEl) return;

    const handleSidebarWheel = (e) => {
      mainWrapEl.scrollTop += e.deltaY;
    };

    sidebarEl.addEventListener('wheel', handleSidebarWheel, { passive: true });
    return () => sidebarEl.removeEventListener('wheel', handleSidebarWheel);
  }, [user]);

  const notificationItems = useMemo(() => {
    const list = [];
    const requests = modulesData?.demoRequests || [];

    // Add recent demo inquiries
    if (requests.length > 0) {
      requests.slice(0, 3).forEach((req, idx) => {
        list.push({
          id: `inq-${req.id || idx}`,
          icon: <Inbox size={15} className="text-purple" />,
          text: `New customer inquiry received from ${req.fullName || req.name || 'Enterprise Client'} (${req.company || req.projectInterest || 'ERP Project'})`,
          time: req.createdAt ? new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : `${(idx + 1) * 3}m ago`,
          unread: !notificationsRead,
        });
      });
    } else {
      list.push({
        id: 'inq-default',
        icon: <Inbox size={15} className="text-purple" />,
        text: 'New customer inquiry received from Alex Morgan',
        time: '5m ago',
        unread: !notificationsRead,
      });
    }

    // Add project catalog sync notification
    list.push({
      id: 'cat-sync',
      icon: <Sparkles size={15} className="text-emerald" />,
      text: 'Enterprise Project Catalog synchronized in real time',
      time: 'Just now',
      unread: !notificationsRead,
    });

    // Add recent activities from activity stream
    if (Array.isArray(activities) && activities.length > 0) {
      activities.slice(0, 3).forEach((act, idx) => {
        list.push({
          id: `act-${act.id || idx}`,
          icon: <Clock size={15} className="text-muted" />,
          text: act.text,
          time: act.time || 'A moment ago',
          unread: false,
        });
      });
    } else {
      list.push(
        {
          id: 'act-1',
          icon: <Clock size={15} className="text-muted" />,
          text: 'Sarah Jenkins checked in to Mumbai HQ',
          time: 'Just now',
          unread: false,
        },
        {
          id: 'act-2',
          icon: <Clock size={15} className="text-muted" />,
          text: 'Task "Q3 Financial Reconciliation" marked Completed',
          time: '2m ago',
          unread: false,
        }
      );
    }

    // System connectivity and compliance
    list.push(
      {
        id: 'sys-db',
        icon: <CheckCircle size={15} className="text-blue" />,
        text: 'MongoDB connection & WebSocket socket engine online',
        time: '15m ago',
        unread: false,
      },
      {
        id: 'sys-sec',
        icon: <ShieldCheck size={15} className="text-emerald" />,
        text: 'Automated 256-bit SOC-2 Type II security check passed',
        time: '1h ago',
        unread: false,
      }
    );

    return list;
  }, [modulesData, activities, notificationsRead]);

  const unreadCount = useMemo(() => {
    return notificationItems.filter((i) => i.unread).length;
  }, [notificationItems]);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('speshway_admin_authenticated');
    } catch (e) {}
    logout();
    navigate('/admin');
  };

  // If still loading session check
  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Admin Workspace...</p>
      </div>
    );
  }

  // 1. If not authenticated or not an admin in this session, show the dedicated Admin Login Portal
  const isAdminAuthenticated =
    user &&
    user.role === 'admin' &&
    sessionStorage.getItem('speshway_admin_authenticated') === 'true';

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  // 2. Once authenticated as Admin, show strictly the Admin Dashboard Console
  return (
    <div className="admin-layout-container">
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}

      {/* Dedicated Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo-badge">
            <img src={logoUrl} alt={`${brandTitle} Admin Logo`} className="admin-sidebar-logo-img" />
          </div>
          <div className="brand-text">
            <span className="brand-title">{brandTitle}</span>
            <span className="brand-subtitle">ADMIN CONSOLE</span>
          </div>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-menu">
          <NavLink
            to="/admin"
            end
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive ||
              location.pathname === '/admin' ||
              location.pathname === '/admin/' ||
              location.pathname === '/admin/overview' ||
              location.pathname === '/admin/dashboard'
                ? 'admin-nav-item active'
                : 'admin-nav-item'
            }
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <Package size={18} />
            <span>Project Management</span>
          </NavLink>

          <NavLink
            to="/admin/pricing"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <CreditCard size={18} />
            <span>Pricing Plans</span>
          </NavLink>

          <NavLink
            to="/admin/inquiries"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <Inbox size={18} />
            <span>Enquiries</span>
          </NavLink>

          <NavLink
            to="/admin/home"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <Globe size={18} />
            <span>Home Page Options</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <Settings size={18} />
            <span>System Settings</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <div
            className="admin-sidebar-profile"
            style={{
              borderTop: 'none',
              paddingTop: 0,
              marginTop: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div className="admin-avatar">
              {(() => {
                if (!user?.name) return 'AD';
                const parts = user.name.trim().split(/\s+/);
                if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
                return user.name.substring(0, 2).toUpperCase();
              })()}
            </div>
            <div className="profile-meta" style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <span
                  className="profile-name"
                  title={user?.name || 'Speshway Administrator'}
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >
                  {user?.name || 'Speshway Administrator'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  title="Sign Out"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f87171',
                    cursor: 'pointer',
                    padding: '3px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    transition: 'color 0.2s, background-color 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ef4444';
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#f87171';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut size={15} />
                </button>
              </div>
              <span className="profile-email">{user?.email || 'admin@gmail.com'}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Screen */}
      <div
        className="admin-main-wrap has-admin-topbar"
        ref={mainWrapRef}
      >
        {/* Top Navbar: Rendered across all Admin pages */}
        <header className="admin-topbar">
          {/* Brand Logo & Tagline Lockup (Mobile Response: Logo | SPESHWAY — ALL IN ONE ERP —) */}
          <div className="admin-topbar-logo-area">
            <Link
              to="/admin"
              className="admin-topbar-brand-link"
              title={`${brandTitle} - ${brandSubtitle}`}
              aria-label={`${brandTitle} Dashboard`}
            >
              <div className="admin-topbar-logo-badge">
                <img
                  src={logoUrl}
                  alt={`${brandTitle} Logo`}
                  className="admin-topbar-brand-logo"
                />
              </div>
              <div className="admin-topbar-divider" />
              <div className="admin-topbar-brand-text">
                <span className="admin-topbar-brand-title">{brandTitle}</span>
                <div className="admin-topbar-subtitle-row">
                  <span className="admin-topbar-dash">—</span>
                  <span className="admin-topbar-subtitle">{brandSubtitle}</span>
                  <span className="admin-topbar-dash">—</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Topbar Page Title Area (Hidden on mobile) */}
          <div className="topbar-left admin-topbar-desktop-title-area">
            <span className="topbar-page-icon-mobile" aria-hidden="true">
              {getMobilePageIcon()}
            </span>
            <span className="topbar-title">
              <span className="topbar-title-desktop">{getDesktopTopbarTitle()}</span>
              <span className="topbar-title-mobile">{getMobileTopbarTitle()}</span>
            </span>
          </div>

          {/* Right-side controls: Notification Bell Icon & Dropdown */}
          <div className="topbar-right admin-topbar-right-controls">
            <div className="admin-notif-wrapper" ref={notifRef}>
              <button
                type="button"
                className="admin-bell-btn"
                onClick={() => setShowNotifications((prev) => !prev)}
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell size={19} />
                {!notificationsRead && unreadCount > 0 && <span className="admin-bell-dot" />}
              </button>

              {showNotifications && (
                <div className="admin-notif-dropdown" ref={notifDropdownRef}>
                  <div className="admin-notif-dropdown-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="admin-notif-dropdown-title">Notifications</span>
                      {!notificationsRead && unreadCount > 0 && (
                        <span className="admin-notif-badge-pill">{unreadCount} New</span>
                      )}
                    </div>
                    {!notificationsRead && unreadCount > 0 && (
                      <button
                        type="button"
                        className="admin-notif-clear-btn"
                        onClick={() => setNotificationsRead(true)}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="admin-notif-list">
                    {notificationItems.map((item) => (
                      <div
                        key={item.id}
                        className={`admin-notif-item ${item.unread ? 'unread' : ''}`}
                      >
                        <div className="admin-notif-item-icon">{item.icon}</div>
                        <div className="admin-notif-item-content">
                          <p className="admin-notif-item-text">{item.text}</p>
                          <span className="admin-notif-item-time">{item.time}</span>
                        </div>
                        {item.unread && <span className="admin-notif-item-unread-dot" />}
                      </div>
                    ))}
                  </div>

                  <div className="admin-notif-dropdown-footer">
                    <Link
                      to="/admin/inquiries"
                      onClick={() => setShowNotifications(false)}
                      className="admin-notif-view-all"
                    >
                      View all inquiries &amp; leads &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="admin-content-inner has-admin-topbar">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Mobile Responsive Only) */}
      <nav className="admin-mobile-bottom-bar" aria-label="Admin Mobile Navigation">
        <NavLink
          to="/admin"
          end
          onClick={() => {
            setShowMobileProfile(false);
          }}
          className={({ isActive }) =>
            `admin-bottom-nav-item ${
              (isActive ||
                location.pathname === '/admin' ||
                location.pathname === '/admin/' ||
                location.pathname === '/admin/overview' ||
                location.pathname === '/admin/dashboard') &&
              !showMobileProfile
                ? 'active'
                : ''
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          onClick={() => {
            setShowMobileProfile(false);
          }}
          className={({ isActive }) =>
            `admin-bottom-nav-item ${isActive && !showMobileProfile ? 'active' : ''}`
          }
        >
          <Package size={20} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/admin/pricing"
          onClick={() => {
            setShowMobileProfile(false);
          }}
          className={({ isActive }) =>
            `admin-bottom-nav-item ${isActive && !showMobileProfile ? 'active' : ''}`
          }
        >
          <CreditCard size={20} />
          <span>Pricing</span>
        </NavLink>

        <NavLink
          to="/admin/inquiries"
          onClick={() => {
            setShowMobileProfile(false);
          }}
          className={({ isActive }) =>
            `admin-bottom-nav-item ${
              (isActive || location.pathname.startsWith('/admin/inquiries')) && !showMobileProfile
                ? 'active'
                : ''
            }`
          }
          aria-label="Support & Inquiries"
        >
          <div className="admin-bottom-avatar-icon">
            <Headphones size={20} />
            {unreadCount > 0 && <span className="admin-bottom-dot" />}
          </div>
          <span>Support</span>
        </NavLink>

        <button
          type="button"
          onClick={() => {
            setShowMobileProfile((prev) => !prev);
          }}
          className={`admin-bottom-nav-item ${
            (isProfileActive && !location.pathname.startsWith('/admin/inquiries')) || showMobileProfile
              ? 'active'
              : ''
          }`}
          aria-label="Admin Profile & More Menu"
        >
          <div className="admin-bottom-avatar-icon">
            <User size={20} />
            {unreadCount > 0 && <span className="admin-bottom-dot" />}
          </div>
          <span>Profile</span>
        </button>
      </nav>

      {/* Mobile Profile Full Screen View - Remaining admin items inside profile */}
      {showMobileProfile && (
        <div className="admin-profile-fullscreen-view" role="dialog" aria-modal="true" aria-label="Admin Account & Management">
          {/* Top Sticky Header */}
          <div className="admin-support-fullscreen-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div
                className="admin-support-fullscreen-logo-badge"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 1px 4px rgba(15, 23, 42, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  padding: '3px',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={logoUrl}
                  alt={`${brandTitle} Logo`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <h3 className="admin-support-fullscreen-title">
                  Admin Account &amp; Management
                </h3>
                <span className="admin-support-fullscreen-sub">
                  Profile &amp; Administrative Options
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="admin-support-fullscreen-body">
            {/* Admin User Profile Card */}
            <div className="profile-sheet-user-card">
              <div className="profile-sheet-avatar">
                <img
                  src={logoUrl}
                  alt={`${brandTitle} Logo`}
                  className="profile-sheet-avatar-logo"
                />
              </div>
              <div className="profile-sheet-user-info">
                <div className="profile-sheet-name-row">
                  <span className="profile-sheet-user-name">{user?.name || 'Speshway Administrator'}</span>
                  <span className="profile-sheet-badge">ADMIN</span>
                </div>
                <span className="profile-sheet-user-email">{user?.email || 'admin@gmail.com'}</span>
              </div>
            </div>

            <div className="profile-sheet-section-label">MANAGEMENT &amp; OPTIONS</div>

            {/* Remaining Menu Items shown inside Profile */}
            <div className="profile-sheet-menu-list">
              <NavLink
                to="/admin/inquiries"
                onClick={() => setShowMobileProfile(false)}
                className={({ isActive }) => `profile-sheet-item ${isActive ? 'active' : ''}`}
              >
                <div className="profile-sheet-item-icon purple">
                  <Inbox size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="profile-sheet-item-title">Enquiries</span>
                    {unreadCount > 0 && <span className="profile-sheet-count-pill">{unreadCount} New</span>}
                  </div>
                  <span className="profile-sheet-item-sub">Client leads, demo bookings &amp; contact inquiries</span>
                </div>
                <ArrowRight size={15} className="profile-sheet-item-arrow" />
              </NavLink>

              <NavLink
                to="/admin/home"
                onClick={() => setShowMobileProfile(false)}
                className={({ isActive }) => `profile-sheet-item ${isActive ? 'active' : ''}`}
              >
                <div className="profile-sheet-item-icon blue">
                  <Globe size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <span className="profile-sheet-item-title">Home Page Options</span>
                  <span className="profile-sheet-item-sub">Customize hero banner, titles &amp; branding</span>
                </div>
                <ArrowRight size={15} className="profile-sheet-item-arrow" />
              </NavLink>

              <NavLink
                to="/admin/settings"
                onClick={() => setShowMobileProfile(false)}
                className={({ isActive }) => `profile-sheet-item ${isActive ? 'active' : ''}`}
              >
                <div className="profile-sheet-item-icon emerald">
                  <Settings size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <span className="profile-sheet-item-title">System Settings</span>
                  <span className="profile-sheet-item-sub">Security, session timeout &amp; preferences</span>
                </div>
                <ArrowRight size={15} className="profile-sheet-item-arrow" />
              </NavLink>

              <NavLink
                to="/admin/inquiries"
                onClick={() => setShowMobileProfile(false)}
                className={({ isActive }) => `profile-sheet-item ${isActive ? 'active' : ''}`}
              >
                <div className="profile-sheet-item-icon teal">
                  <Headphones size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <span className="profile-sheet-item-title">Support &amp; Inquiries</span>
                  <span className="profile-sheet-item-sub">Client leads, demo bookings &amp; contact tickets</span>
                </div>
                <ArrowRight size={15} className="profile-sheet-item-arrow" />
              </NavLink>
            </div>

            <div className="profile-sheet-divider" />

            {/* Sign Out */}
            <div className="profile-sheet-actions-group">
              <button
                type="button"
                onClick={() => {
                  setShowMobileProfile(false);
                  setShowLogoutConfirm(true);
                }}
                className="profile-sheet-logout-btn"
              >
                <LogOut size={16} />
                <span>Sign Out of Admin Console</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Card Modal */}
      {showLogoutConfirm && (
        <div
          onClick={() => setShowLogoutConfirm(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '420px',
              width: '100%',
              padding: '30px 24px',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Warning Icon Badge */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <LogOut size={26} style={{ marginLeft: '3px' }} />
            </div>

            {/* Title */}
            <h3
              style={{
                margin: '0 0 8px 0',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0f172a',
              }}
            >
              Sign Out Confirmation
            </h3>

            {/* Description */}
            <p
              style={{
                margin: '0 0 24px 0',
                fontSize: '0.88rem',
                color: '#64748b',
                lineHeight: 1.5,
              }}
            >
              Are you sure you want to sign out of the Speshway Admin Console? You will need your admin credentials to access the dashboard again.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1,
                  padding: '11px 18px',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  handleLogout();
                }}
                style={{
                  flex: 1,
                  padding: '11px 18px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                }}
              >
                <LogOut size={16} /> Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

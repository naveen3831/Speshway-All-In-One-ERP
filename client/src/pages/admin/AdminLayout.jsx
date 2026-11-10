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
  ArrowLeft,
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
  const logoUrl = currentBranding.logoUrl || '/logo.png';
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [showMobileSupport, setShowMobileSupport] = useState(false);

  // Close mobile sidebar and sheets when route changes
  useEffect(() => {
    setShowMobileProfile(false);
    setShowMobileSupport(false);
    setSidebarOpen(false);
  }, [location.pathname]);

  const isProfileActive =
    location.pathname === '/admin/home' ||
    location.pathname === '/admin/inquiries' ||
    location.pathname === '/admin/settings' ||
    location.pathname === '/admin/users';

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
    return `${brandTitle} Dashboard`;
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
    if (path.includes('/new')) return `${brandTitle} Add New Project`;
    if (path.includes('/edit')) return `${brandTitle} Edit Project`;
    if (path.startsWith('/admin/products') || path.startsWith('/admin/projects')) return `${brandTitle} Projects Management`;
    if (path.startsWith('/admin/pricing')) return `${brandTitle} Pricing Plans`;
    if (path.startsWith('/admin/inquiries')) return `${brandTitle} Demo Inquiries`;
    if (path.startsWith('/admin/settings')) return `${brandTitle} System Settings`;
    if (path.startsWith('/admin/home')) return `${brandTitle} Home Page Options`;
    if (path.startsWith('/admin/users')) return `${brandTitle} User Management`;
    return `${brandTitle} Administrative Dashboard`;
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

  // 1. If not authenticated or not an admin, show the dedicated Admin Login Portal
  if (!user || user.role !== 'admin') {
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
          <img src={logoUrl} alt={`${brandTitle} Admin Logo`} className="admin-sidebar-logo-img" />
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
            to="/admin/overview"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              isActive || location.pathname === '/admin/overview' || location.pathname === '/admin/dashboard'
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
            <span>Categories Management</span>
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
            <span>Demo Inquiries</span>
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
      <div className="admin-main-wrap" ref={mainWrapRef}>
        <header className="admin-topbar">
          <div className="topbar-left">
            <span className="topbar-page-icon-mobile" aria-hidden="true">
              {getMobilePageIcon()}
            </span>
            <span className="topbar-title">
              <span className="topbar-title-desktop">{getDesktopTopbarTitle()}</span>
              <span className="topbar-title-mobile">{getMobileTopbarTitle()}</span>
            </span>
          </div>

          <div className="topbar-right">
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

        <div className="admin-content-inner">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (Mobile Responsive Only) */}
      <nav className="admin-mobile-bottom-bar" aria-label="Admin Mobile Navigation">
        <NavLink
          to="/admin/overview"
          onClick={() => {
            setShowMobileProfile(false);
            setShowMobileSupport(false);
          }}
          className={({ isActive }) =>
            `admin-bottom-nav-item ${(isActive || location.pathname === '/admin/overview' || location.pathname === '/admin/dashboard') && !showMobileProfile && !showMobileSupport ? 'active' : ''}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          onClick={() => {
            setShowMobileProfile(false);
            setShowMobileSupport(false);
          }}
          className={({ isActive }) =>
            `admin-bottom-nav-item ${isActive && !showMobileProfile && !showMobileSupport ? 'active' : ''}`
          }
        >
          <Package size={20} />
          <span>Projects</span>
        </NavLink>

        <NavLink
          to="/admin/pricing"
          onClick={() => {
            setShowMobileProfile(false);
            setShowMobileSupport(false);
          }}
          className={({ isActive }) =>
            `admin-bottom-nav-item ${isActive && !showMobileProfile && !showMobileSupport ? 'active' : ''}`
          }
        >
          <CreditCard size={20} />
          <span>Pricing</span>
        </NavLink>

        <button
          type="button"
          onClick={() => {
            setShowMobileProfile(false);
            setShowMobileSupport((prev) => !prev);
          }}
          className={`admin-bottom-nav-item ${showMobileSupport ? 'active' : ''}`}
          aria-label="Admin 24/7 Support"
        >
          <Headphones size={20} />
          <span>Support</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setShowMobileSupport(false);
            setShowMobileProfile((prev) => !prev);
          }}
          className={`admin-bottom-nav-item ${
            (isProfileActive && !showMobileSupport) || showMobileProfile ? 'active' : ''
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
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#e6f7f0',
                  color: '#00875a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <User size={19} />
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
                {(() => {
                  if (!user?.name) return 'AD';
                  const parts = user.name.trim().split(/\s+/);
                  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
                  return user.name.substring(0, 2).toUpperCase();
                })()}
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
                to="/admin/inquiries"
                onClick={() => setShowMobileProfile(false)}
                className={({ isActive }) => `profile-sheet-item ${isActive ? 'active' : ''}`}
              >
                <div className="profile-sheet-item-icon purple">
                  <Inbox size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="profile-sheet-item-title">Demo Inquiries</span>
                    {unreadCount > 0 && <span className="profile-sheet-count-pill">{unreadCount} New</span>}
                  </div>
                  <span className="profile-sheet-item-sub">Client leads, demo bookings &amp; contact inquiries</span>
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

              <button
                type="button"
                onClick={() => {
                  setShowMobileProfile(false);
                  setShowMobileSupport(true);
                }}
                className="profile-sheet-item"
                style={{ width: '100%', textAlign: 'left', background: '#ffffff', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                <div className="profile-sheet-item-icon teal">
                  <Headphones size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <span className="profile-sheet-item-title">24/7 Enterprise Support</span>
                  <span className="profile-sheet-item-sub">Hotline, email helpdesk &amp; documentation</span>
                </div>
                <ArrowRight size={15} className="profile-sheet-item-arrow" />
              </button>
            </div>

            <div className="profile-sheet-divider" />

            {/* Live Website Link & Sign Out */}
            <div className="profile-sheet-actions-group">
              <Link
                to="/"
                onClick={() => setShowMobileProfile(false)}
                className="profile-sheet-action-link"
              >
                <ArrowLeft size={16} />
                <span>Return to Live Website</span>
              </Link>

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

      {/* Mobile Support Full Screen View */}
      {showMobileSupport && (
        <div className="admin-support-fullscreen-view" role="dialog" aria-modal="true" aria-label="24/7 Enterprise Support">
          {/* Top Fullscreen Sticky Header */}
          <div className="admin-support-fullscreen-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#e6f7f0',
                  color: '#00875a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Headphones size={19} />
              </div>
              <div style={{ minWidth: 0 }}>
                <h3 className="admin-support-fullscreen-title">
                  24/7 Enterprise Support
                </h3>
                <span className="admin-support-fullscreen-sub">
                  Speshway Admin Help Desk &amp; Monitoring
                </span>
              </div>
            </div>
          </div>

          {/* Fullscreen Scrollable Body */}
          <div className="admin-support-fullscreen-body">
            {/* Live Uptime Status Card */}
            <div className="admin-support-status-card">
              <div className="admin-support-status-dot" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#065f46' }}>
                  All Systems Operational &bull; 99.9% Uptime
                </div>
                <div style={{ fontSize: '0.73rem', color: '#047857' }}>
                  Dedicated 24/7 SLA Priority Help Desk Active
                </div>
              </div>
              <span className="admin-support-live-badge">Live SLA</span>
            </div>

            <div className="profile-sheet-section-label">INSTANT ASSISTANCE CHANNELS</div>

            <div className="profile-sheet-menu-list">
              {/* Phone Hotline */}
              <a
                href="tel:+919100006020"
                className="profile-sheet-item"
              >
                <div className="profile-sheet-item-icon emerald">
                  <Phone size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <span className="profile-sheet-item-title">+91 9100006020</span>
                  <span className="profile-sheet-item-sub">24/7 Direct Telephone Support</span>
                </div>
                <span className="support-sheet-action-pill">Call Now</span>
              </a>

              {/* Email Support */}
              <a
                href="mailto:support@speshway.com?subject=Speshway%20Admin%20Dashboard%20Support"
                className="profile-sheet-item"
              >
                <div className="profile-sheet-item-icon blue">
                  <Mail size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <span className="profile-sheet-item-title">support@speshway.com</span>
                  <span className="profile-sheet-item-sub">Email response within 15 minutes</span>
                </div>
                <span className="support-sheet-action-pill email">
                  Email
                </span>
              </a>

              {/* Demo Inquiries & Tickets */}
              <NavLink
                to="/admin/inquiries"
                onClick={() => setShowMobileSupport(false)}
                className={({ isActive }) => `profile-sheet-item ${isActive ? 'active' : ''}`}
              >
                <div className="profile-sheet-item-icon purple">
                  <Inbox size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="profile-sheet-item-title">Inbound Inquiries &amp; Leads</span>
                    {unreadCount > 0 && <span className="profile-sheet-count-pill">{unreadCount} New</span>}
                  </div>
                  <span className="profile-sheet-item-sub">Review user demo requests &amp; inquiries</span>
                </div>
                <ArrowRight size={15} className="profile-sheet-item-arrow" />
              </NavLink>

              {/* Help Center & FAQs */}
              <Link
                to="/faq"
                onClick={() => setShowMobileSupport(false)}
                className="profile-sheet-item"
              >
                <div className="profile-sheet-item-icon amber">
                  <HelpCircle size={18} />
                </div>
                <div className="profile-sheet-item-text">
                  <span className="profile-sheet-item-title">Help Center &amp; FAQs</span>
                  <span className="profile-sheet-item-sub">Documentation &amp; troubleshooting guides</span>
                </div>
                <ArrowRight size={15} className="profile-sheet-item-arrow" />
              </Link>
            </div>

            <div className="profile-sheet-divider" />

            {/* Quick Summary Cards */}
            <div className="admin-support-info-box">
              <div className="admin-support-info-row">
                <span className="admin-support-info-label">Enterprise Headquarters</span>
                <span className="admin-support-info-val">T-Hub, Knowledge City Rd, Raidurgam, Hyderabad, Telangana 500032</span>
              </div>
              <div className="admin-support-info-row">
                <span className="admin-support-info-label">Availability &amp; Coverage</span>
                <span className="admin-support-info-val">24/7 Continuous Infrastructure Monitoring &amp; Engineering SLA</span>
              </div>
            </div>

            {/* Contact Page Link */}
            <div className="profile-sheet-actions-group" style={{ marginTop: '16px' }}>
              <Link
                to="/contact"
                onClick={() => setShowMobileSupport(false)}
                className="profile-sheet-action-link"
              >
                <LifeBuoy size={16} />
                <span>Open Full Help &amp; Contact Page</span>
              </Link>
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

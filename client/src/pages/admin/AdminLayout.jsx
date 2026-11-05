import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
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
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, loading, login, logout } = useAuth();
  const { modulesData } = useSocket();
  const navigate = useNavigate();

  // Admin login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notificationItems = [
    {
      id: 1,
      icon: <Sparkles size={15} className="text-emerald" />,
      text: 'Enterprise Project Catalog synchronized in real time',
      time: 'Just now',
      unread: !notificationsRead,
    },
    {
      id: 2,
      icon: <Inbox size={15} className="text-purple" />,
      text: modulesData?.demoRequests?.length > 0
        ? `New customer inquiry received from ${modulesData.demoRequests[0]?.fullName || modulesData.demoRequests[0]?.name || 'Prospective Client'}`
        : 'Customer demo inquiries queue active and listening',
      time: '5m ago',
      unread: !notificationsRead,
    },
    {
      id: 3,
      icon: <CheckCircle size={15} className="text-blue" />,
      text: 'MongoDB connection & WebSocket socket engine online',
      time: '15m ago',
      unread: false,
    },
  ];

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();
      await login({ email: cleanEmail, password: cleanPassword });
    } catch (err) {
      setLoginError(
        err.response?.data?.message || 'Invalid admin credentials. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    setEmail('');
    setPassword('');
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

  // 1. If not authenticated or not an admin, show the clean standalone Admin Login Portal
  if (!user || user.role !== 'admin') {
    return (
      <div className="pro-login-wrapper">
        <div className="pro-login-card">
          {/* Logo & Header */}
          <div className="pro-login-header">
            <div className="pro-logo-badge">
              <img src="/logo.png" alt="Speshway ERP Logo" className="pro-logo-img" />
            </div>
            <h1 className="pro-login-title">Admin Console</h1>
            <p className="pro-login-subtitle">
              Sign in with your administrator credentials to manage ERP operations
            </p>
          </div>

          {loginError && (
            <div className="pro-login-error">
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="pro-login-form">
            <div className="pro-input-group">
              <label htmlFor="admin-email" className="pro-label">
                Admin Email
              </label>
              <div className="pro-input-container">
                <span className="pro-input-icon">
                  <Mail size={18} />
                </span>
                <input
                  id="admin-email"
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pro-text-input"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="pro-input-group">
              <div className="pro-label-row">
                <label htmlFor="admin-password" className="pro-label">
                  Password
                </label>
              </div>
              <div className="pro-input-container">
                <span className="pro-input-icon">
                  <Lock size={18} />
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pro-text-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="pro-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`pro-submit-btn ${isSubmitting ? 'loading' : ''}`}
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Security Assurance */}
          <div className="pro-security-badge">
            <ShieldCheck size={16} className="text-emerald" />
            <span>256-bit SSL encrypted administrative connection</span>
          </div>

          {/* Back to public link */}
          <div className="pro-login-footer">
            <Link to="/" className="pro-back-link">
              <ArrowLeft size={14} /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Once authenticated as Admin, show strictly the Admin Dashboard Console
  return (
    <div className="admin-layout-container">
      {/* Dedicated Admin Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <img src="/logo.png" alt="Speshway Admin Logo" className="admin-sidebar-logo-img" />
          <div className="brand-text">
            <span className="brand-title">SPESHWAY</span>
            <span className="brand-subtitle">ADMIN CONSOLE</span>
          </div>
        </div>

        <nav className="admin-sidebar-menu">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <Package size={18} />
            <span>Projects Management</span>
          </NavLink>

          <NavLink
            to="/admin/home"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <Globe size={18} />
            <span>Home Page Options</span>
          </NavLink>

          <NavLink
            to="/admin/pricing"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <CreditCard size={18} />
            <span>Pricing Plans</span>
          </NavLink>

          <NavLink
            to="/admin/inquiries"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <Inbox size={18} />
            <span>Demo Inquiries</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
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
      <div className="admin-main-wrap">
        <header className="admin-topbar">
          <div className="topbar-left">
            <span className="topbar-title">Speshway Administrative Dashboard</span>
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
                {!notificationsRead && <span className="admin-bell-dot" />}
              </button>

              {showNotifications && (
                <div className="admin-notif-dropdown">
                  <div className="admin-notif-dropdown-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="admin-notif-dropdown-title">Notifications</span>
                      {!notificationsRead && (
                        <span className="admin-notif-badge-pill">2 New</span>
                      )}
                    </div>
                    {!notificationsRead && (
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

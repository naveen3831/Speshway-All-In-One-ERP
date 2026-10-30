import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  Globe,
  Users,
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
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  // Admin login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // 1. If not authenticated as Admin, show the Clean, Simple & Professional Admin Login Page
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
                  onClick={() => setShowPassword(!showPassword)}
                  className="pro-eye-toggle"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pro-security-row">
              <div className="pro-security-badge">
                <ShieldCheck size={14} />
                <span>256-bit Encrypted Session</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="pro-submit-btn"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

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
            <span>Products Management</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? 'admin-nav-item active' : 'admin-nav-item')}
          >
            <Users size={18} />
            <span>Users &amp; Staff</span>
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
          <button onClick={handleLogout} className="admin-btn-logout">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Content Screen */}
      <div className="admin-main-wrap">
        <header className="admin-topbar">
          <div className="topbar-left">
            <span className="topbar-title">Speshway Administrative Dashboard</span>
          </div>

          <div className="topbar-right">
            <div className="admin-profile-badge">
              <div className="admin-avatar">AD</div>
              <div className="admin-meta">
                <span className="name">{user.name || 'Administrator'}</span>
                <span className="email">{user.email || 'admin@gmail.com'}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="admin-content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

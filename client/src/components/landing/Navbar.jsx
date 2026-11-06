import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  const handleGetStarted = () => {
    if (onOpenGetStarted) {
      onOpenGetStarted();
    } else {
      navigate('/get-started');
    }
  };

  const isProjectsActive =
    location.pathname === '/projects' ||
    location.pathname === '/products' ||
    location.pathname.startsWith('/product/');

  const isContactActive =
    location.pathname === '/contact' || location.pathname === '/contact-us';

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        {/* Brand Logo with User Uploaded Logo Image */}
        <Link
          to="/"
          className="brand-logo"
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo(0, 0);
          }}
        >
          <div className="brand-logo-wrap">
            <img
              src="/logo.png"
              alt="Speshway All In One ERP Logo"
              className="brand-logo-img"
            />
          </div>
          <div className="brand-text">
            <span className="brand-title">SPESHWAY</span>
            <span className="brand-subtitle">ALL IN ONE ERP</span>
          </div>
        </Link>

        {/* Center Navigation Links - Desktop Only */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            onClick={() => window.scrollTo(0, 0)}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            HOME
          </NavLink>
          <NavLink
            to="/projects"
            onClick={() => window.scrollTo(0, 0)}
            className={({ isActive }) => (isActive || isProjectsActive ? 'nav-link active' : 'nav-link')}
          >
            PROJECTS
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={() => window.scrollTo(0, 0)}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            PRICING
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => window.scrollTo(0, 0)}
            className={({ isActive }) => (isActive || isContactActive ? 'nav-link active' : 'nav-link')}
          >
            CONTACT US
          </NavLink>
        </nav>

        {/* Right Side Action: Desktop Get Started & Mobile Hamburger Button */}
        <div className="nav-actions">
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="btn-navbar-logout desktop-only"
              title="Sign Out"
            >
              <LogOut size={15} />
              <span>Log Out</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleGetStarted}
            className="btn-get-started desktop-only"
          >
            Get Started <ArrowRight size={16} />
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <NavLink
            to="/"
            end
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
            className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
          >
            HOME
          </NavLink>
          <NavLink
            to="/projects"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
            className={({ isActive }) => (isActive || isProjectsActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
          >
            PROJECTS
          </NavLink>
          <NavLink
            to="/pricing"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
            className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
          >
            PRICING
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
            className={({ isActive }) => (isActive || isContactActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
          >
            CONTACT US
          </NavLink>

          <div className="mobile-drawer-cta">
            {user && (
              <div className="mobile-drawer-user-info">
                <div className="mobile-drawer-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
                </div>
                <div className="mobile-drawer-user-meta">
                  <span className="mobile-drawer-user-name">{user.name || 'Speshway User'}</span>
                  <span className="mobile-drawer-user-email">{user.email || ''}</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleGetStarted();
              }}
              className="btn-get-started mobile-drawer-btn"
            >
              Get Started <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="btn-drawer-logout"
            >
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

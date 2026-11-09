import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useSocket, DEFAULT_BRANDING } from '../../context/SocketContext';

export const Navbar = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { homeContent, branding } = useSocket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const brandTitle = currentBranding.brandTitle || 'SPESHWAY';
  const brandSubtitle = currentBranding.brandSubtitle || 'ALL IN ONE ERP';
  const logoUrl = currentBranding.logoUrl || '/logo.png';

  // Determine whether Pricing should be visible in navbar
  const [showPricing, setShowPricing] = useState(() => {
    const stored = localStorage.getItem('speshway_navbar_pricing_visible');
    if (stored !== null) return stored === 'true';
    if (homeContent?.navbar?.showPricing !== undefined) return Boolean(homeContent.navbar.showPricing);
    return true;
  });

  useEffect(() => {
    const syncVisibility = () => {
      const stored = localStorage.getItem('speshway_navbar_pricing_visible');
      if (stored !== null) {
        setShowPricing(stored === 'true');
      } else if (homeContent?.navbar?.showPricing !== undefined) {
        setShowPricing(Boolean(homeContent.navbar.showPricing));
      }
    };

    syncVisibility();
    window.addEventListener('speshway_navbar_pricing_changed', syncVisibility);
    window.addEventListener('storage', syncVisibility);
    return () => {
      window.removeEventListener('speshway_navbar_pricing_changed', syncVisibility);
      window.removeEventListener('storage', syncVisibility);
    };
  }, [homeContent?.navbar?.showPricing]);

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
        {/* Brand Logo with User Uploaded Logo Image & Brand Name */}
        <Link to="/" className="brand-logo" title={`${brandTitle} - Home`}>
          <div className="brand-logo-wrap">
            <img
              src={logoUrl}
              alt={`${brandTitle} Logo`}
              className="brand-logo-img"
            />
          </div>
          <div className="brand-text">
            <span className="brand-title">{brandTitle}</span>
            <span className="brand-subtitle">{brandSubtitle}</span>
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
          {showPricing && (
            <NavLink
              to="/pricing"
              onClick={() => window.scrollTo(0, 0)}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              PRICING
            </NavLink>
          )}
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
          {showPricing && (
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
          )}
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
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

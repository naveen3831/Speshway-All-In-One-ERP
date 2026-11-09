import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, MessageSquare } from 'lucide-react';
import { ContactCard } from './ContactCard';
import { useSocket, DEFAULT_BRANDING } from '../../context/SocketContext';

export const Navbar = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { homeContent, branding } = useSocket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactCardOpen, setContactCardOpen] = useState(false);
  const contactToggleRef = useRef(null);

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const brandTitle = currentBranding.brandTitle || 'SPESHWAY';
  const brandSubtitle = currentBranding.brandSubtitle || 'ALL IN ONE ERP';
  const logoUrl = currentBranding.logoUrl || '/logo.png';

  // Close mobile drawer & contact card when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setContactCardOpen(false);
  }, [location.pathname]);

  // Determine whether Pricing should be visible in navbar
  const [showPricing, setShowPricing] = useState(() => {
    const stored = localStorage.getItem('speshway_navbar_pricing_visible');
    if (stored !== null) return stored === 'true';
    if (homeContent?.navbar?.showPricing !== undefined) return Boolean(homeContent.navbar.showPricing);
    return true;
  });

  // Determine whether Products/Projects should be visible in navbar
  const [showProducts, setShowProducts] = useState(() => {
    const stored = localStorage.getItem('speshway_navbar_products_visible');
    if (stored !== null) return stored === 'true';
    if (homeContent?.navbar?.showProducts !== undefined) return Boolean(homeContent.navbar.showProducts);
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

    const syncProductsVisibility = () => {
      const stored = localStorage.getItem('speshway_navbar_products_visible');
      if (stored !== null) {
        setShowProducts(stored === 'true');
      } else if (homeContent?.navbar?.showProducts !== undefined) {
        setShowProducts(Boolean(homeContent.navbar.showProducts));
      }
    };

    syncVisibility();
    syncProductsVisibility();

    window.addEventListener('speshway_navbar_pricing_changed', syncVisibility);
    window.addEventListener('speshway_navbar_products_changed', syncProductsVisibility);
    window.addEventListener('storage', syncVisibility);
    window.addEventListener('storage', syncProductsVisibility);

    return () => {
      window.removeEventListener('speshway_navbar_pricing_changed', syncVisibility);
      window.removeEventListener('speshway_navbar_products_changed', syncProductsVisibility);
      window.removeEventListener('storage', syncVisibility);
      window.removeEventListener('storage', syncProductsVisibility);
    };
  }, [homeContent?.navbar?.showPricing, homeContent?.navbar?.showProducts]);

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

  const hasNavItems = Boolean(showProducts || showPricing);

  return (
    <>
      <header className="navbar-container">
        <div className={`navbar-content ${!hasNavItems ? 'is-brand-centered' : 'is-brand-left'}`}>
          {/* Unified Brand Unit (Logo + Vertical Divider + Brand Name & Tagline) */}
          <Link
            to="/"
            className={`navbar-brand-unit ${!hasNavItems ? 'is-centered' : 'is-left'}`}
            title={`${brandTitle} - ${brandSubtitle}`}
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            <div className="navbar-brand-logo-wrap">
              <img
                src={logoUrl}
                alt={`${brandTitle} Logo`}
                className="navbar-brand-logo-img"
              />
            </div>
            <div className="navbar-brand-divider" />
            <div className="navbar-brand-text">
              <span className="navbar-brand-title">{brandTitle}</span>
              <div className="navbar-brand-subtitle-row">
                <span className="navbar-brand-dash">—</span>
                <span className="navbar-brand-subtitle">{brandSubtitle}</span>
                <span className="navbar-brand-dash">—</span>
              </div>
            </div>
          </Link>

          {/* Center Navigation Links - Desktop Only (Rendered when Projects or Pricing is ON) */}
          {hasNavItems && (
            <nav className="nav-links">
              {showProducts && (
                <NavLink
                  to="/projects"
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) => (isActive || isProjectsActive ? 'nav-link active' : 'nav-link')}
                >
                  PROJECTS
                </NavLink>
              )}
              {showPricing && (
                <NavLink
                  to="/pricing"
                  onClick={() => window.scrollTo(0, 0)}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  PRICING
                </NavLink>
              )}
            </nav>
          )}

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
            {showProducts && (
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
            )}
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

      {/* Floating Contact Toggle on the Right Side of the Website */}
      <button
        type="button"
        ref={contactToggleRef}
        onClick={() => setContactCardOpen((prev) => !prev)}
        className={`floating-website-contact-btn ${contactCardOpen ? 'active' : ''}`}
        aria-label={contactCardOpen ? 'Close contact card' : 'Open contact card'}
        aria-expanded={contactCardOpen}
        title={contactCardOpen ? 'Close contact' : 'Contact Speshway'}
      >
        {contactCardOpen ? (
          <X size={22} />
        ) : (
          <>
            <MessageSquare size={22} strokeWidth={2.2} />
            <span className="contact-toggle-dot" />
          </>
        )}
      </button>

      {/* Contact Card Popover */}
      <ContactCard
        isOpen={contactCardOpen}
        onClose={() => setContactCardOpen(false)}
        onOpenDemo={onOpenDemo}
        toggleRef={contactToggleRef}
      />
    </>
  );
};

export default Navbar;

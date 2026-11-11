import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { WhatsAppIcon, getWhatsAppUrl } from '../common/WhatsAppIcon';
import { ContactCard } from './ContactCard';
import { useSocket, DEFAULT_BRANDING } from '../../context/SocketContext';

export const Navbar = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { homeContent, branding, contactInfo } = useSocket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactCardOpen, setContactCardOpen] = useState(false);
  const contactToggleRef = useRef(null);

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const brandTitle = currentBranding.brandTitle || 'SPESHWAY';
  const brandSubtitle = currentBranding.brandSubtitle || 'ALL IN ONE ERP';
  const logoUrl = currentBranding.logoUrl || '/logo.png';

  const whatsappNumber =
    contactInfo?.whatsapp ||
    contactInfo?.phoneRaw ||
    contactInfo?.phone ||
    homeContent?.contact?.whatsapp ||
    homeContent?.contact?.phoneRaw ||
    homeContent?.contact?.phone ||
    '+18005557737';

  const whatsappUrl = getWhatsAppUrl(
    whatsappNumber,
    'Hello! I would like to know more about Speshway ERP.'
  );

  // Close mobile drawer & contact card when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setContactCardOpen(false);
  }, [location.pathname]);

  // Listen for global custom event to open contact card from anywhere (e.g. Platform Solutions cards)
  useEffect(() => {
    const handleOpenContact = () => setContactCardOpen(true);
    window.addEventListener('speshway_open_contact_card', handleOpenContact);
    return () => {
      window.removeEventListener('speshway_open_contact_card', handleOpenContact);
    };
  }, []);

  // Auto-open Contact Card pop up ONLY when first opening the website (never on refresh or reload)
  useEffect(() => {
    if (location.pathname !== '/') return;

    try {
      // 1. Check if user refreshed the page (browser reload)
      const navEntries = performance.getEntriesByType?.('navigation') || [];
      const isReload =
        navEntries.length > 0
          ? navEntries[0].type === 'reload'
          : performance?.navigation?.type === 1;

      if (isReload) {
        sessionStorage.setItem('speshway_welcome_popup_shown', 'true');
        return;
      }

      // 2. Check if already shown in this browsing session
      const alreadyShown = sessionStorage.getItem('speshway_welcome_popup_shown');
      if (alreadyShown) {
        return;
      }

      // 3. Mark as shown and pop up smoothly after 700ms on first website open
      sessionStorage.setItem('speshway_welcome_popup_shown', 'true');
      const timer = setTimeout(() => {
        setContactCardOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    } catch (e) {
      // Fallback in case of restricted environment
    }
  }, []);

  // Helper to determine boolean visibility with homeContent as primary source of truth, localStorage as fallback
  const getPricingVisible = () => {
    if (homeContent?.navbar?.showPricing !== undefined) return Boolean(homeContent.navbar.showPricing);
    const stored = localStorage.getItem('speshway_navbar_pricing_visible');
    if (stored !== null) return stored === 'true';
    return false;
  };

  const getProductsVisible = () => {
    if (homeContent?.navbar?.showProducts !== undefined) return Boolean(homeContent.navbar.showProducts);
    const stored = localStorage.getItem('speshway_navbar_products_visible');
    if (stored !== null) return stored === 'true';
    return false;
  };

  const [showPricing, setShowPricing] = useState(getPricingVisible);
  const [showProducts, setShowProducts] = useState(getProductsVisible);

  // Synchronize on homeContent updates
  useEffect(() => {
    setShowPricing(getPricingVisible());
  }, [homeContent?.navbar?.showPricing]);

  useEffect(() => {
    setShowProducts(getProductsVisible());
  }, [homeContent?.navbar?.showProducts]);

  // Synchronize on cross-tab storage and window events
  useEffect(() => {
    const handleSync = () => {
      setShowPricing(getPricingVisible());
      setShowProducts(getProductsVisible());
    };

    window.addEventListener('speshway_navbar_pricing_changed', handleSync);
    window.addEventListener('speshway_navbar_products_changed', handleSync);
    window.addEventListener('speshway_navbar_visibility_changed', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('speshway_navbar_pricing_changed', handleSync);
      window.removeEventListener('speshway_navbar_products_changed', handleSync);
      window.removeEventListener('speshway_navbar_visibility_changed', handleSync);
      window.removeEventListener('storage', handleSync);
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
              <NavLink
                to="/"
                end
                onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                HOME
              </NavLink>
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

          {/* Right Side Action: Get Started Button (Desktop & Mobile) */}
          <div className="nav-actions">
            <button
              type="button"
              onClick={handleGetStarted}
              className="btn-get-started"
            >
              Get Started <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            {hasNavItems && (
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
            )}
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

      {/* Floating WhatsApp Action Button on Bottom-Right of Website */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-website-contact-btn floating-website-whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
        title={`Chat with Speshway on WhatsApp: ${contactInfo?.phone || whatsappNumber}`}
      >
        <WhatsAppIcon size={28} color="#ffffff" />
        <span className="contact-toggle-dot" />
      </a>

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

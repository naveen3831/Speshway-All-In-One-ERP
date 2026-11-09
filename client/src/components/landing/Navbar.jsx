import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, PhoneCall } from 'lucide-react';
import { ContactCard } from './ContactCard';

export const Navbar = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactCardOpen, setContactCardOpen] = useState(false);
  const contactToggleRef = useRef(null);

  // Close mobile drawer & contact card when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setContactCardOpen(false);
  }, [location.pathname]);

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
    <>
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
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setContactCardOpen(true);
              }}
              className={`mobile-nav-link mobile-contact-trigger-btn ${contactCardOpen || isContactActive ? 'active' : ''}`}
            >
              CONTACT US
            </button>

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
          <>
            <X size={16} />
            <span>Close</span>
          </>
        ) : (
          <>
            <PhoneCall size={16} />
            <span>Contact</span>
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

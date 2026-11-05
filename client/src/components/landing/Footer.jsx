import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, CheckCircle2, Globe, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { useSocket, DEFAULT_BRANDING } from '../../context/SocketContext';

export const Footer = ({ onOpenGetStarted, onOpenDemo }) => {
  const { homeContent, branding } = useSocket();

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const brandTitle = currentBranding.brandTitle || 'SPESHWAY';
  const brandSubtitle = currentBranding.brandSubtitle || 'ALL IN ONE ERP';
  const logoUrl = currentBranding.logoUrl || '/logo.png';

  // Pricing visibility state
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pro-footer">
      {/* Top Footer Section with 4-Column Grid */}
      <div className="pro-footer-container">
        <div className="pro-footer-grid">
          {/* Column 1: Brand & Bio */}
          <div className="pro-footer-brand-col">
            <Link to="/" className="brand-logo footer-brand-logo" title={`${brandTitle} - Home`}>
              <div className="brand-logo-wrap footer-logo-wrap">
                <img
                  src={logoUrl}
                  alt={`${brandTitle} Logo`}
                  className="brand-logo-img"
                />
              </div>
              <div className="brand-text">
                <span className="brand-title footer-brand-title">{brandTitle}</span>
                <span className="brand-subtitle footer-brand-subtitle">{brandSubtitle}</span>
              </div>
            </Link>

            <p className="footer-tagline">
              Unified enterprise resource planning suite connecting personnel, payroll, project milestones, and client pipelines in real time.
            </p>

            {/* Live System Status Pill */}
            <div className="footer-status-pill">
              <span className="status-pulse-dot"></span>
              <span className="status-text">All Systems Operational &middot; 99.9% SLA</span>
            </div>

            {/* Security Assurance Tag */}
            <div className="footer-security-tag">
              <ShieldCheck size={14} className="text-emerald" />
              <span>256-Bit Bank-Grade Encryption &middot; SOC-2 Type II</span>
            </div>
          </div>

          {/* Column 2: Products & Modules */}
          <div className="pro-footer-col">
            <h4 className="footer-col-title">ERP Applications</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/product/speshway-hrms/dashboard" className="footer-link">
                  Speshway HRMS &amp; Payroll
                </Link>
              </li>
              <li>
                <Link to="/product/dairy-erp/dashboard" className="footer-link">
                  Natural Milk Dairy ERP
                </Link>
              </li>
              <li>
                <Link to="/product/nexora-ecommerce/dashboard" className="footer-link">
                  Nexora E-Commerce Suite
                </Link>
              </li>
              <li>
                <Link to="/product/aneera-sarees/dashboard" className="footer-link">
                  Aneera Sarees Admin
                </Link>
              </li>
              <li>
                <Link to="/projects" className="footer-link-highlight">
                  View All 17+ Systems &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="pro-footer-col">
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links-list">
              {showPricing && (
                <li>
                  <Link to="/pricing" className="footer-link">
                    Pricing &amp; Plans
                  </Link>
                </li>
              )}
              <li>
                {onOpenDemo ? (
                  <button
                    type="button"
                    onClick={onOpenDemo}
                    className="footer-btn-link"
                  >
                    Request Live Demo
                  </button>
                ) : (
                  <Link to="/contact" className="footer-link">
                    Request Live Demo
                  </Link>
                )}
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  24/7 Enterprise Help Desk
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Sales Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (matching Image 2) */}
          <div className="pro-footer-col footer-contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={18} className="footer-contact-icon" />
                <span className="footer-contact-text">
                  T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd, panmaktha, Hyderabad, Serilingampalle (M), Telangana 500032
                </span>
              </div>
              <a href="tel:+919100006020" className="footer-contact-item footer-contact-link">
                <Phone size={18} className="footer-contact-icon" />
                <span className="footer-contact-text">+91 9100006020</span>
              </a>
              <a href="mailto:info@speshway.com" className="footer-contact-item footer-contact-link">
                <Mail size={18} className="footer-contact-icon" />
                <span className="footer-contact-text">info@speshway.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="pro-footer-bottom">
        <div className="pro-footer-bottom-inner">
          <div className="footer-copyright">
            <span>&copy; {new Date().getFullYear()} {brandTitle} All In One ERP. All rights reserved.</span>
          </div>

          <div className="footer-legal-links">
            <span className="footer-meta-tag">Enterprise Cloud Infrastructure</span>
            <span className="footer-divider">&bull;</span>
            <span className="footer-meta-tag">Hyderabad, India</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            title="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';

export const Footer = ({ onOpenGetStarted, onOpenDemo }) => {
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
            <Link to="/" className="brand-logo footer-brand-logo">
              <div className="brand-logo-wrap footer-logo-wrap">
                <img
                  src="/logo.png"
                  alt="Speshway All In One ERP Logo"
                  className="brand-logo-img"
                />
              </div>
              <div className="brand-text">
                <span className="brand-title footer-brand-title">SPESHWAY</span>
                <span className="brand-subtitle footer-brand-subtitle">ALL IN ONE ERP</span>
              </div>
            </Link>

            <p className="footer-tagline">
              Delivering innovative IT solutions and driving digital transformation for businesses worldwide.
            </p>

            {/* Social Media Links */}
            <div className="footer-social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="X (formerly Twitter)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Products & Modules */}
          <div className="pro-footer-col">
            <h4 className="footer-col-title">ERP Applications</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/product/hrms" className="footer-link">
                  HRMS &amp; Attendance
                </Link>
              </li>
              <li>
                <Link to="/product/payroll" className="footer-link">
                  Payroll &amp; Tax Automation
                </Link>
              </li>
              <li>
                <Link to="/product/projects" className="footer-link">
                  Project &amp; Milestone Hub
                </Link>
              </li>
              <li>
                <Link to="/product/crm" className="footer-link">
                  Client &amp; Deal CRM
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link footer-link-highlight">
                  View All ERP Products &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Solutions */}
          <div className="pro-footer-col">
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/pricing" className="footer-link">
                  Pricing &amp; Plans
                </Link>
              </li>
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
            </ul>
          </div>

          {/* Column 4: Portals & Company */}
          <div className="pro-footer-col">
            <h4 className="footer-col-title">Portals &amp; Support</h4>
            <ul className="footer-links-list">
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
        </div>
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="pro-footer-bottom">
        <div className="pro-footer-bottom-container">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Speshway All In One ERP. Built for modern enterprise operations.
          </div>

          <div className="footer-legal-links">
            <Link to="/contact" className="legal-link">
              Privacy Policy
            </Link>
            <span className="legal-sep">&bull;</span>
            <Link to="/contact" className="legal-link">
              Terms of Service
            </Link>
            <span className="legal-sep">&bull;</span>
            <Link to="/contact" className="legal-link">
              Security Compliance
            </Link>
            <span className="legal-sep">&bull;</span>
            <Link to="/contact" className="legal-link">
              SLA Status
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-back-to-top"
            title="Back to Top"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

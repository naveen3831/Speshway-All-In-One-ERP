import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ShieldCheck, CheckCircle2, Globe, Heart } from 'lucide-react';

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
                <Link to="/features" className="footer-link">
                  Key Capabilities
                </Link>
              </li>
              <li>
                <Link to="/why-us" className="footer-link">
                  Why Choose Speshway
                </Link>
              </li>
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
              <li>
                <Link to="/features" className="footer-link">
                  Real-Time Synchronization
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Portals & Company */}
          <div className="pro-footer-col">
            <h4 className="footer-col-title">Portals &amp; Support</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/admin" className="footer-link">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link to="/login" className="footer-link">
                  Employee Staff Login
                </Link>
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

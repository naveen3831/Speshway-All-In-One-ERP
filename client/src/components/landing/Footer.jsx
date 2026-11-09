import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { useSocket, DEFAULT_BRANDING, DEFAULT_SOCIAL_LINKS } from '../../context/SocketContext';

export const Footer = ({ onOpenGetStarted, onOpenDemo }) => {
  const { homeContent, branding, socialLinks } = useSocket();

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const brandTitle = currentBranding.brandTitle || 'SPESHWAY';
  const brandSubtitle = currentBranding.brandSubtitle || 'ALL IN ONE ERP';
  const logoUrl = currentBranding.logoUrl || '/logo.png';
  const currentSocial = socialLinks || homeContent?.socialLinks || DEFAULT_SOCIAL_LINKS;

  // Pricing visibility state
  const [showPricing, setShowPricing] = useState(() => {
    const stored = localStorage.getItem('speshway_navbar_pricing_visible');
    if (stored !== null) return stored === 'true';
    if (homeContent?.navbar?.showPricing !== undefined) return Boolean(homeContent.navbar.showPricing);
    return true;
  });

  // Products visibility state
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
              Delivering innovative IT solutions and driving digital transformation for businesses worldwide.
            </p>

            {/* Social Media Links with dynamic URLs and authentic brand hover styles */}
            <div className="footer-social-links">
              <a
                href={currentSocial.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn social-btn-facebook"
                aria-label="Facebook"
                title="Follow us on Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href={currentSocial.twitter || 'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn social-btn-x"
                aria-label="X (formerly Twitter)"
                title="Follow us on X (Twitter)"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={currentSocial.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn social-btn-linkedin"
                aria-label="LinkedIn"
                title="Connect with us on LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={currentSocial.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn social-btn-instagram"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={currentSocial.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn social-btn-youtube"
                aria-label="YouTube"
                title="Subscribe to our YouTube Channel"
              >
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Products & Modules */}
          <div className="pro-footer-col">
            <h4 className="footer-col-title">ERP Applications</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/product/speshway-hrms" className="footer-link">
                  Speshway HRMS &amp; Payroll
                </Link>
              </li>
              <li>
                <Link to="/product/natural-milk-dairy" className="footer-link">
                  Natural Milk Dairy ERP
                </Link>
              </li>
              <li>
                <Link to="/product/e-commerce" className="footer-link">
                  Nexora E-Commerce Suite
                </Link>
              </li>
              <li>
                <Link to="/product/aneera-silks" className="footer-link">
                  Aneera Sarees Admin
                </Link>
              </li>
              {showProducts && (
                <li>
                  <Link to="/projects" className="footer-link-highlight">
                    View All 17+ Systems &rarr;
                  </Link>
                </li>
              )}
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
                <Link to="/admin" className="footer-link">
                  Admin Console Portal
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

          {/* Column 4: Contact (matching Image 2) */}
          <div className="pro-footer-col footer-contact-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <MapPin size={15} className="footer-contact-icon" />
                <span className="footer-contact-text">
                  T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam, Knowledge City Rd, panmaktha, Hyderabad, Serilingampalle (M), Telangana 500032
                </span>
              </div>
              <a href="tel:+919100006020" className="footer-contact-item footer-contact-link">
                <Phone size={15} className="footer-contact-icon" />
                <span className="footer-contact-text">+91 9100006020</span>
              </a>
              <a href="mailto:info@speshway.com" className="footer-contact-item footer-contact-link">
                <Mail size={15} className="footer-contact-icon" />
                <span className="footer-contact-text">info@speshway.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="pro-footer-bottom">
        <div className="pro-footer-bottom-container">
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
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

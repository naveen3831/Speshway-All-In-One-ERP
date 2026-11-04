import React from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Navbar = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
        <Link to="/" className="brand-logo">
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

        {/* Center Navigation Links - HOME, PROJECTS, PRICING, CONTACT US */}
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

        {/* Right Side Action: Get Started Button */}
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
    </header>
  );
};

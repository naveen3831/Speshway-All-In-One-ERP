import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export const Navbar = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (onOpenGetStarted) {
      onOpenGetStarted();
    } else {
      navigate('/get-started');
    }
  };

  const handleOpenDemo = () => {
    if (onOpenDemo) {
      onOpenDemo();
    } else {
      navigate('/contact');
    }
  };

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

        {/* Center Navigation Links - Clean without lines */}
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Products
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Features
          </NavLink>
          <NavLink
            to="/why-us"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Why Us
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Pricing
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Side Actions: Request a Demo + Get Started */}
        <div className="nav-actions">
          <button
            type="button"
            onClick={handleOpenDemo}
            className="btn-nav-demo"
          >
            Request a Demo
          </button>
          <button
            type="button"
            onClick={handleGetStarted}
            className="btn-get-started"
          >
            Get Started &rarr;
          </button>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import {
  Search,
  Home,
  Users,
  CreditCard,
  FolderKanban,
  DollarSign,
  BarChart2,
  Settings,
  FileText,
  Clock,
} from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

export const Hero = ({ onOpenGetStarted, onOpenDemo }) => {
  const { stats } = useSocket();

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left Column: Hero Text */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-text">
              &mdash; ONE PLATFORM FOR YOUR BUSINESS &mdash;
            </span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-heading-dark">SPESHWAY</span>
            <span className="hero-heading-green">ALL IN ONE ERP</span>
          </h1>

          <p className="hero-subtitle">
            Manage Employees, Projects, HR, Payroll, Clients, Finance and more in
            one simple and powerful platform.
          </p>

          <div className="hero-cta-group">
            <button onClick={onOpenDemo} className="btn-hero-primary">
              Request a Demo
            </button>
          </div>
        </div>

        {/* Right Column: Realistic 3D Laptop & Mobile Mockup with Potted Plant */}
        <div className="hero-mockup-wrapper">
          <div className="mockup-backdrop-glow"></div>

          <div className="devices-stage">
            {/* Potted Plant */}
            <div className="potted-plant left-plant-desk">
              <svg viewBox="0 0 100 130" className="plant-svg">
                <path d="M50 85 C30 50 15 20 25 10 C35 5 45 40 50 85" fill="#15803d" />
                <path d="M50 85 C40 40 45 10 55 5 C62 5 65 35 50 85" fill="#16a34a" />
                <path d="M50 85 C65 60 85 30 75 20 C65 15 55 50 50 85" fill="#22c55e" />
                <path d="M50 85 C20 70 10 50 18 42 C26 38 40 65 50 85" fill="#166534" />
                <path d="M50 85 C80 75 90 60 82 52 C74 48 60 70 50 85" fill="#15803d" />
                <polygon points="35,85 65,85 60,120 40,120" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                <ellipse cx="50" cy="85" rx="15" ry="3" fill="#e2e8f0" />
              </svg>
            </div>

            {/* Laptop Device */}
            <div className="laptop-device">
              <div className="laptop-screen">
                <div className="screen-camera"></div>
                <div className="screen-inner-display">
                  {/* Laptop Sidebar */}
                  <div className="laptop-erp-sidebar">
                    <div className="sidebar-brand-mini">
                      <img src="/logo.png" alt="Logo" className="mini-brand-img" />
                      <span className="mini-brand-name">SPESHWAY</span>
                    </div>

                    <div className="sidebar-menu">
                      <div className="menu-row active">
                        <Home size={10} />
                        <span>Home</span>
                      </div>
                      <div className="menu-row">
                        <Users size={10} />
                        <span>Employees</span>
                      </div>
                      <div className="menu-row">
                        <CreditCard size={10} />
                        <span>Payroll</span>
                      </div>
                      <div className="menu-row">
                        <FolderKanban size={10} />
                        <span>Projects</span>
                      </div>
                      <div className="menu-row">
                        <DollarSign size={10} />
                        <span>Finance</span>
                      </div>
                      <div className="menu-row">
                        <BarChart2 size={10} />
                        <span>Reports</span>
                      </div>
                      <div className="menu-row">
                        <Settings size={10} />
                        <span>Settings</span>
                      </div>
                    </div>
                  </div>

                  {/* Laptop Main Content */}
                  <div className="laptop-erp-main">
                    <div className="erp-topbar">
                      <div className="erp-search-box">
                        <Search size={10} color="#94a3b8" />
                        <span className="search-placeholder">Search...</span>
                      </div>
                      <div className="erp-user-profile">
                        <div className="erp-avatar">JD</div>
                        <div className="erp-user-meta">
                          <span className="user-name">John Doe</span>
                          <span className="user-role">Admin</span>
                        </div>
                      </div>
                    </div>

                    {/* Welcome Banner with growth curve */}
                    <div className="erp-welcome-banner">
                      <div className="banner-left">
                        <span className="welcome-tag">Welcome to</span>
                        <h4 className="welcome-title">SPESHWAY</h4>
                        <span className="welcome-sub">ALL IN ONE ERP</span>
                      </div>
                      <div className="banner-chart-art">
                        <svg width="110" height="42" viewBox="0 0 110 42" fill="none">
                          <path
                            d="M2 35 C20 30 35 15 55 24 C75 32 90 8 108 12"
                            stroke="#10b981"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M2 35 C20 30 35 15 55 24 C75 32 90 8 108 12 L108 40 L2 40 Z"
                            fill="url(#greenGrad)"
                            opacity="0.2"
                          />
                          <defs>
                            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>

                    {/* 3 Metrics Cards inside Laptop */}
                    <div className="erp-metrics-row">
                      <div className="metric-box bg-m-green">
                        <div className="metric-icon-circ c-green">
                          <Users size={10} />
                        </div>
                        <div className="metric-val-wrap">
                          <span className="metric-m-title">Employees</span>
                          <span className="metric-m-num">{stats.activeEmployees || 120}</span>
                        </div>
                      </div>

                      <div className="metric-box bg-m-purple">
                        <div className="metric-icon-circ c-purple">
                          <FolderKanban size={10} />
                        </div>
                        <div className="metric-val-wrap">
                          <span className="metric-m-title">Projects</span>
                          <span className="metric-m-num">{stats.activeProjects || 45}</span>
                        </div>
                      </div>

                      <div className="metric-box bg-m-orange">
                        <div className="metric-icon-circ c-orange">
                          <Users size={10} />
                        </div>
                        <div className="metric-val-wrap">
                          <span className="metric-m-title">Clients</span>
                          <span className="metric-m-num">230</span>
                        </div>
                      </div>
                    </div>

                    {/* 3 Action Module buttons */}
                    <div className="erp-actions-row">
                      <div className="action-pill pill-pink">
                        <CreditCard size={10} color="#ec4899" />
                        <span>Payroll</span>
                      </div>
                      <div className="action-pill pill-blue">
                        <Clock size={10} color="#3b82f6" />
                        <span>Tasks</span>
                      </div>
                      <div className="action-pill pill-teal">
                        <FileText size={10} color="#0d9488" />
                        <span>Reports</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="laptop-base">
                <div className="laptop-notch"></div>
              </div>
              <div className="laptop-bottom-lip"></div>
            </div>

            {/* Smartphone Device on Right with uploaded logo */}
            <div className="phone-device-right">
              <div className="phone-screen-frame">
                <div className="phone-dynamic-island"></div>
                <div className="phone-screen-body">
                  <div className="phone-brand-centered">
                    <img
                      src="/logo.png"
                      alt="Speshway Phone Logo"
                      className="phone-brand-img"
                    />
                    <span className="phone-app-name">SPESHWAY</span>
                    <span className="phone-app-sub">ALL IN ONE ERP</span>
                  </div>
                </div>
                <div className="phone-bottom-bar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

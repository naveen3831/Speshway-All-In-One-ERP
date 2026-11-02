import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Building,
  Mail,
  User,
  Phone,
  Layers,
  Users,
  ShieldCheck,
  Star,
  Globe,
  Lock,
} from 'lucide-react';
import './GetStartedPage.css';

export const GetStartedPage = () => {
  const navigate = useNavigate();
  const { triggerRequestDemo } = useSocket();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [moduleInterest, setModuleInterest] = useState('All-In-One Complete Suite');
  const [teamSize, setTeamSize] = useState('11-50');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg('Please enter both your full name and work email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await triggerRequestDemo({
        name,
        email,
        company: company || 'Enterprise Client',
        phone: phone || '',
        module: moduleInterest,
        teamSize,
        source: 'get-started',
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setIsSubmitting(false);
      setErrorMsg('Something went wrong while submitting. Please try again.');
    }
  };

  return (
    <div className="getstarted-page-wrapper">
      {/* Top Navigation Bar */}
      <header className="getstarted-topbar">
        <div className="getstarted-topbar-content">
          <Link to="/" className="getstarted-brand">
            <img src="/logo.png" alt="Speshway ERP Logo" className="getstarted-logo-img" />
            <div className="getstarted-brand-text">
              <span className="brand-title">SPESHWAY</span>
              <span className="brand-subtitle">ALL IN ONE ERP</span>
            </div>
          </Link>

          <Link to="/" className="getstarted-back-link">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Full-Screen Split Layout */}
      <main className="getstarted-main-container">
        <div className="getstarted-grid">
          {/* Left Side: Brand Story & Trust Signals */}
          <div className="getstarted-left-pane">
            <div className="getstarted-badge">
              <Sparkles size={16} className="text-emerald" />
              <span>14-Day Free Enterprise Trial</span>
            </div>

            <h1 className="getstarted-hero-heading">
              Get Started with <span className="highlight-text">Speshway ERP</span>
            </h1>

            <p className="getstarted-hero-desc">
              Experience the next-generation, real-time enterprise management ecosystem. Streamline operations, empower your teams, and monitor your entire organization from a single pane of glass.
            </p>

            {/* Feature Highlights */}
            <div className="getstarted-features-list">
              <div className="feature-item">
                <div className="feature-icon-box">
                  <CheckCircle size={18} className="text-green-accent" />
                </div>
                <div>
                  <h4>All-Inclusive Industry Modules</h4>
                  <p>Instant access to Travel ERP, Retail POS, Healthcare, Manufacturing, and HRMS.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">
                  <CheckCircle size={18} className="text-green-accent" />
                </div>
                <div>
                  <h4>Live Real-Time Synchronization</h4>
                  <p>Built with WebSocket events and MongoDB Atlas persistence for zero-delay operations.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-box">
                  <CheckCircle size={18} className="text-green-accent" />
                </div>
                <div>
                  <h4>Zero Risk, No Credit Card Required</h4>
                  <p>Full enterprise workspace provisioned instantly with 24/7 dedicated support.</p>
                </div>
              </div>
            </div>

            {/* Testimonial / Credibility Card */}
            <div className="getstarted-quote-box">
              <div className="quote-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="quote-text">
                "Speshway unified our bookings, logistics, and payroll into one unified dashboard. It cut reporting friction in half within our first month."
              </p>
              <div className="quote-author">
                <div className="author-avatar">SC</div>
                <div>
                  <span className="author-name">Sarah Chen</span>
                  <span className="author-role">VP of Operations, Horizon Enterprises</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Full Screen Registration Form */}
          <div className="getstarted-right-pane">
            <div className="getstarted-card">
              {isSuccess ? (
                /* Success Screen */
                <div className="getstarted-success-view">
                  <div className="success-icon-wrap">
                    <CheckCircle size={56} className="text-green-accent" />
                  </div>
                  <h2 className="success-title">Trial Activated &amp; Lead Dispatched!</h2>
                  <p className="success-desc">
                    Thank you, <strong>{name}</strong>! Your inquiry for <strong>{company || 'your organization'}</strong> has been registered directly in the Speshway Admin Console and MongoDB Atlas database.
                  </p>

                  <div className="success-details-card">
                    <div className="detail-row">
                      <span className="detail-label">Work Email:</span>
                      <span className="detail-val">{email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Module Focus:</span>
                      <span className="detail-val">{moduleInterest}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Admin Status:</span>
                      <span className="detail-val status-badge-online">● Dispatched to Admin</span>
                    </div>
                  </div>

                  <div className="success-actions">
                    <Link to="/" className="btn-getstarted-primary">
                      Return to Website &rarr;
                    </Link>
                    <Link to="/products" className="btn-getstarted-secondary">
                      Explore Product Modules
                    </Link>
                  </div>
                </div>
              ) : (
                /* Main Form View */
                <>
                  <div className="getstarted-form-header">
                    <div className="header-icon-badge">
                      <Sparkles size={24} className="text-emerald" />
                    </div>
                    <div>
                      <h2 className="form-main-title">Get Started with Speshway ERP</h2>
                      <p className="form-sub-title">Experience full real-time enterprise management</p>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="getstarted-error-alert">
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="getstarted-form">
                    {/* Full Name */}
                    <div className="form-field-group">
                      <label htmlFor="fullname">
                        Full Name <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <User size={18} className="input-icon" />
                        <input
                          id="fullname"
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="getstarted-input"
                        />
                      </div>
                    </div>

                    {/* Work Email */}
                    <div className="form-field-group">
                      <label htmlFor="workemail">
                        Work Email <span className="req">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Mail size={18} className="input-icon" />
                        <input
                          id="workemail"
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="getstarted-input"
                        />
                      </div>
                    </div>

                    {/* Company / Organization */}
                    <div className="form-field-group">
                      <label htmlFor="company">Company / Organization</label>
                      <div className="input-with-icon">
                        <Building size={18} className="input-icon" />
                        <input
                          id="company"
                          type="text"
                          placeholder="Company Name"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="getstarted-input"
                        />
                      </div>
                    </div>

                    {/* Phone & Team Size (2-Column Row) */}
                    <div className="form-row-2col">
                      <div className="form-field-group">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="input-with-icon">
                          <Phone size={18} className="input-icon" />
                          <input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="getstarted-input"
                          />
                        </div>
                      </div>

                      <div className="form-field-group">
                        <label htmlFor="teamsize">Team Size</label>
                        <div className="input-with-icon">
                          <Users size={18} className="input-icon" />
                          <select
                            id="teamsize"
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                            className="getstarted-input select-input"
                          >
                            <option value="1-10">1 - 10 members</option>
                            <option value="11-50">11 - 50 members</option>
                            <option value="51-200">51 - 200 members</option>
                            <option value="201-1000">201 - 1,000 members</option>
                            <option value="1000+">1,000+ members</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Module Focus Dropdown */}
                    <div className="form-field-group">
                      <label htmlFor="modulefocus">Module Focus</label>
                      <div className="input-with-icon">
                        <Layers size={18} className="input-icon" />
                        <select
                          id="modulefocus"
                          value={moduleInterest}
                          onChange={(e) => setModuleInterest(e.target.value)}
                          className="getstarted-input select-input"
                        >
                          <option value="All-In-One Complete Suite">All-In-One Complete Suite</option>
                          <option value="Tours & Travels ERP">Tours &amp; Travels ERP</option>
                          <option value="Retail & POS Management">Retail &amp; Supermarket POS</option>
                          <option value="Healthcare & Clinic ERP">Healthcare &amp; Clinic ERP</option>
                          <option value="Manufacturing & Production">Manufacturing &amp; Production</option>
                          <option value="Education & Campus ERP">Education &amp; Campus ERP</option>
                          <option value="Logistics & Fleet Management">Logistics &amp; Fleet Management</option>
                          <option value="Hotel & Hospitality Suite">Hotel &amp; Hospitality Suite</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-launch-trial"
                    >
                      <span>{isSubmitting ? 'Submitting to Admin...' : 'Launch Free Trial →'}</span>
                      <ArrowRight size={18} />
                    </button>

                    <div className="form-footer-guarantee">
                      <Lock size={13} className="lock-icon" />
                      <span>256-bit SSL encrypted • Instant admin notification • No credit card</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStartedPage;

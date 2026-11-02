import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Building,
  Mail,
  User,
  Phone,
  Layers,
  Users,
  Lock,
} from 'lucide-react';
import './LandingGetStartedSection.css';

export const LandingGetStartedSection = () => {
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
        source: 'landing-card',
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
    <section className="landing-getstarted-section">
      <div className="landing-getstarted-container">
        {/* Section Title Header */}
        <div className="section-title-wrap">
          <div className="section-pill-badge">
            <Sparkles size={14} className="text-emerald" />
            <span>14-Day Free Enterprise Trial</span>
          </div>
          <h2 className="landing-section-heading">
            Get Started with <span className="highlight-text">Speshway ERP</span>
          </h2>
          <p className="landing-section-subtitle">
            Experience the next-generation, real-time enterprise management ecosystem. Streamline operations and monitor your business from a single pane of glass.
          </p>
        </div>

        {/* Embedded Card (Matching the exact /get-started card design) */}
        <div className="landing-card-wrapper">
          <div className="getstarted-card">
            {isSuccess ? (
              <div className="success-view-box">
                <div className="success-icon-badge">
                  <CheckCircle size={52} className="text-green-accent" />
                </div>
                <h3 className="success-title">Trial Activated &amp; Lead Dispatched!</h3>
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
                  <Link to="/products" className="btn-getstarted-primary">
                    Explore Product Catalog &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="getstarted-form-header">
                  <div className="header-icon-badge">
                    <Sparkles size={24} className="text-emerald" />
                  </div>
                  <div>
                    <h3 className="form-main-title">Get Started with Speshway ERP</h3>
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
                    <label htmlFor="landing-fullname">
                      Full Name <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <User size={18} className="input-icon" />
                      <input
                        id="landing-fullname"
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
                    <label htmlFor="landing-workemail">
                      Work Email <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={18} className="input-icon" />
                      <input
                        id="landing-workemail"
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
                    <label htmlFor="landing-company">Company / Organization</label>
                    <div className="input-with-icon">
                      <Building size={18} className="input-icon" />
                      <input
                        id="landing-company"
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
                      <label htmlFor="landing-phone">Phone Number</label>
                      <div className="input-with-icon">
                        <Phone size={18} className="input-icon" />
                        <input
                          id="landing-phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="getstarted-input"
                        />
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="landing-teamsize">Team Size</label>
                      <div className="input-with-icon">
                        <Users size={18} className="input-icon" />
                        <select
                          id="landing-teamsize"
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
                    <label htmlFor="landing-modulefocus">Module Focus</label>
                    <div className="input-with-icon">
                      <Layers size={18} className="input-icon" />
                      <select
                        id="landing-modulefocus"
                        value={moduleInterest}
                        onChange={(e) => setModuleInterest(e.target.value)}
                        className="getstarted-input select-input"
                      >
                        <option value="All-In-One Complete Suite">All-In-One Complete Suite</option>
                        <option value="Tours & Travels ERP">Tours &amp; Travels ERP</option>
                        <option value="Natural Milk Dairy Management">Natural Milk Dairy Management</option>
                        <option value="Speshway Hospitals & Health">Speshway Hospitals &amp; Healthcare</option>
                        <option value="Vexa Style Hub Fashion ERP">Vexa Style Hub Fashion ERP</option>
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
    </section>
  );
};

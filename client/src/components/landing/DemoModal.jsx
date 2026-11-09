import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  CheckCircle,
  Sparkles,
  User,
  Mail,
  Building,
  Phone,
  Users,
  Layers,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import './DemoModal.css';

export const DemoModal = ({ mode = 'get-started', onClose }) => {
  const navigate = useNavigate();
  const { triggerRequestDemo } = useSocket();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [teamSize, setTeamSize] = useState('11-50');
  const [moduleInterest, setModuleInterest] = useState('All-In-One Complete Suite');
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
        teamSize,
        module: moduleInterest,
        source: mode === 'demo' ? 'demo' : 'get-started',
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3500);
    } catch (err) {
      console.error('Submission failed:', err);
      setIsSubmitting(false);
      setErrorMsg('Something went wrong while submitting. Please try again.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="demo-modal-card-box" onClick={(e) => e.stopPropagation()}>
        {/* Top Close Button */}
        <div className="modal-top-actions">
          <button
            type="button"
            className="modal-close-icon-btn"
            onClick={onClose}
            title="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div className="demo-card-success">
            <div className="success-icon-badge">
              <CheckCircle size={44} className="text-green-accent" />
            </div>
            <h3 className="success-title">Trial Activated &amp; Lead Dispatched!</h3>
            <p className="success-desc">
              Thank you, <strong>{name}</strong>! Your inquiry for <strong>{company || 'your organization'}</strong> has been registered directly in the Speshway Admin Console and MongoDB database.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-card-submit"
              style={{ maxWidth: '200px' }}
            >
              Done &rarr;
            </button>
          </div>
        ) : (
          <>
            {/* Form Header with Sparkles Badge */}
            <div className="demo-modal-card-header">
              <div className="demo-header-icon-badge">
                <Sparkles size={24} className="text-emerald" />
              </div>
              <div>
                <h3 className="demo-form-main-title">
                  {mode === 'demo' ? 'Request a Live Demo' : 'Get Started with Speshway ERP'}
                </h3>
                <p className="demo-form-sub-title">Experience full real-time enterprise management</p>
              </div>
            </div>

            {errorMsg && (
              <div className="getstarted-error-alert" style={{ marginBottom: '14px' }}>
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="demo-card-form">
              {/* Full Name */}
              <div className="demo-field-group">
                <label htmlFor="modal-name">
                  Full Name <span className="req">*</span>
                </label>
                <div className="demo-input-wrap">
                  <User size={18} className="demo-input-icon" />
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="demo-card-input"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div className="demo-field-group">
                <label htmlFor="modal-email">
                  Work Email <span className="req">*</span>
                </label>
                <div className="demo-input-wrap">
                  <Mail size={18} className="demo-input-icon" />
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="demo-card-input"
                  />
                </div>
              </div>

              {/* Company / Organization */}
              <div className="demo-field-group">
                <label htmlFor="modal-company">Company / Organization</label>
                <div className="demo-input-wrap">
                  <Building size={18} className="demo-input-icon" />
                  <input
                    id="modal-company"
                    type="text"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="demo-card-input"
                  />
                </div>
              </div>

              {/* Phone & Team Size (2-Column Row) */}
              <div className="demo-row-2col">
                <div className="demo-field-group">
                  <label htmlFor="modal-phone">Phone Number</label>
                  <div className="demo-input-wrap">
                    <Phone size={18} className="demo-input-icon" />
                    <input
                      id="modal-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="demo-card-input"
                    />
                  </div>
                </div>

                <div className="demo-field-group">
                  <label htmlFor="modal-teamsize">Team Size</label>
                  <div className="demo-input-wrap">
                    <Users size={18} className="demo-input-icon" />
                    <select
                      id="modal-teamsize"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="demo-card-input select-input"
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
              <div className="demo-field-group">
                <label htmlFor="modal-module">Module Focus</label>
                <div className="demo-input-wrap">
                  <Layers size={18} className="demo-input-icon" />
                  <select
                    id="modal-module"
                    value={moduleInterest}
                    onChange={(e) => setModuleInterest(e.target.value)}
                    className="demo-card-input select-input"
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
                className="btn-card-submit"
              >
                <span>{isSubmitting ? 'Submitting to Admin...' : mode === 'demo' ? 'Confirm Demo Request →' : 'Launch Free Trial →'}</span>
                <ArrowRight size={18} />
              </button>

              <div className="demo-footer-guarantee">
                <Lock size={13} className="lock-icon" />
                <span>256-bit SSL encrypted • Instant admin notification • No credit card</span>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

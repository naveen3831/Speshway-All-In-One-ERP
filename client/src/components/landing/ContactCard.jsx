import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  X,
  Check,
  Copy,
  Send,
  Sparkles,
  ArrowRight,
  Headphones,
  CheckCircle2,
  PhoneCall,
  User,
  MessageSquare,
} from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import './ContactCard.css';

export const ContactCard = ({ isOpen, onClose, onOpenDemo, toggleRef }) => {
  const navigate = useNavigate();
  const socketContext = useSocket();
  const triggerRequestDemo = socketContext?.triggerRequestDemo;

  const cardRef = useRef(null);
  const [activeTab, setActiveTab] = useState('direct'); // 'direct' | 'message'
  const [copied, setCopied] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Click Outside or Escape Key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target) &&
        toggleRef?.current &&
        !toggleRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, toggleRef]);

  // Copy email to clipboard
  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText('support@speshway.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit quick inquiry message
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your name and work email.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      if (triggerRequestDemo) {
        await triggerRequestDemo({
          name: name.trim(),
          email: email.trim(),
          company: 'Quick Contact Inquiry',
          module: 'Contact Card Modal',
          message: message.trim(),
          source: 'contact-card-modal',
        });
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setEmail('');
        setMessage('');
        onClose();
      }, 2500);
    } catch (err) {
      console.error('Failed to dispatch contact inquiry:', err);
      setIsSubmitting(false);
      setErrorMsg('Could not send message. Please try calling or emailing us.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Blurred Backdrop */}
      <div className="contact-card-backdrop" onClick={onClose} />

      {/* Centered Modal Card */}
      <div
        ref={cardRef}
        className="contact-card-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Modal Top Header with Balanced Horizontal Flow */}
        <div className="contact-modal-header">
          <div className="contact-header-left-col">
            <div className="contact-modal-badge">
              <Headphones size={20} />
            </div>
            <div className="contact-header-info">
              <div className="contact-title-row">
                <h2 id="contact-modal-title" className="contact-modal-title">
                  Contact Speshway
                </h2>
                <div className="contact-live-status-pill">
                  <span className="contact-status-dot" />
                  <span>Online &bull; 24/7 Desk</span>
                </div>
              </div>
              <p className="contact-modal-subtitle">
                Connect directly with our solutions architects or dispatch a quick note.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="contact-modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="contact-modal-tabs">
          <button
            type="button"
            className={`contact-modal-tab ${activeTab === 'direct' ? 'active' : ''}`}
            onClick={() => setActiveTab('direct')}
          >
            <PhoneCall size={14} />
            <span>Direct Channels</span>
          </button>
          <button
            type="button"
            className={`contact-modal-tab ${activeTab === 'message' ? 'active' : ''}`}
            onClick={() => setActiveTab('message')}
          >
            <MessageSquare size={14} />
            <span>Send a Message</span>
          </button>
        </div>

        {/* TAB 1: Direct Channels (2x2 Interactive Grid) */}
        {activeTab === 'direct' && (
          <div className="contact-modal-body">
            <div className="contact-channels-grid">
              {/* Channel 1: Phone */}
              <div className="contact-channel-card">
                <div className="channel-card-top">
                  <div className="channel-icon-wrap emerald">
                    <Phone size={15} />
                  </div>
                  <a
                    href="tel:+18005557737"
                    className="channel-action-badge call"
                    title="Call Toll-Free"
                  >
                    <span>Call Now</span>
                    <ArrowRight size={11} />
                  </a>
                </div>
                <div className="channel-card-content">
                  <span className="channel-label">TOLL-FREE CALL (24/7)</span>
                  <a href="tel:+18005557737" className="channel-value-link">
                    +1 (800) 555-SPESH
                  </a>
                  <span className="channel-subtext">Immediate technical &amp; sales desk</span>
                </div>
              </div>

              {/* Channel 2: Email */}
              <div className="contact-channel-card">
                <div className="channel-card-top">
                  <div className="channel-icon-wrap emerald">
                    <Mail size={15} />
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="channel-action-badge copy"
                    title="Copy Email Address"
                  >
                    {copied ? <Check size={11} /> : <Copy size={11} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="channel-card-content">
                  <span className="channel-label">PRIORITY INBOX</span>
                  <a href="mailto:support@speshway.com" className="channel-value-link">
                    support@speshway.com
                  </a>
                  <span className="channel-subtext">Average reply under 15 minutes</span>
                </div>
              </div>

              {/* Channel 3: Headquarters */}
              <div className="contact-channel-card">
                <div className="channel-card-top">
                  <div className="channel-icon-wrap slate">
                    <MapPin size={15} />
                  </div>
                  <span className="channel-tag-pill">HQ &amp; Remote</span>
                </div>
                <div className="channel-card-content">
                  <span className="channel-label">GLOBAL HEADQUARTERS</span>
                  <span className="channel-value-text">Silicon Valley, CA</span>
                  <span className="channel-subtext">Serving clients worldwide</span>
                </div>
              </div>

              {/* Channel 4: Availability */}
              <div className="contact-channel-card">
                <div className="channel-card-top">
                  <div className="channel-icon-wrap slate">
                    <Clock size={15} />
                  </div>
                  <span className="channel-tag-pill active">365 Days</span>
                </div>
                <div className="channel-card-content">
                  <span className="channel-label">ENTERPRISE SLA</span>
                  <span className="channel-value-text">24 / 7 / 365 Support</span>
                  <span className="channel-subtext">Dedicated tier-1 engineering response</span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="contact-modal-footer">
              <button
                type="button"
                className="contact-primary-demo-btn"
                onClick={() => {
                  onClose();
                  if (onOpenDemo) onOpenDemo();
                  else navigate('/get-started');
                }}
              >
                <Sparkles size={14} />
                <span>Book a Live Demo</span>
              </button>

              <Link
                to="/contact"
                className="contact-full-page-link"
                onClick={() => {
                  onClose();
                  window.scrollTo(0, 0);
                }}
              >
                <span>Full Contact &amp; FAQs</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: Quick Message Form */}
        {activeTab === 'message' && (
          <div className="contact-modal-body">
            {isSuccess ? (
              <div className="contact-success-box">
                <div className="success-badge-circle">
                  <CheckCircle2 size={36} className="text-emerald" />
                </div>
                <h4 className="success-heading">Message Dispatched!</h4>
                <p className="success-copy">
                  Thank you, <strong>{name}</strong>! Your inquiry has been routed directly to our operations desk. A specialist will follow up shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="contact-primary-demo-btn"
                  style={{ marginTop: '10px', alignSelf: 'center' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitMessage} className="contact-modal-form">
                {errorMsg && <div className="contact-form-alert">{errorMsg}</div>}

                <div className="modal-input-field">
                  <label htmlFor="card-name">
                    Full Name <span className="req">*</span>
                  </label>
                  <div className="modal-input-wrapper">
                    <User size={15} className="modal-input-icon" />
                    <input
                      id="card-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-input-field">
                  <label htmlFor="card-email">
                    Work Email <span className="req">*</span>
                  </label>
                  <div className="modal-input-wrapper">
                    <Mail size={15} className="modal-input-icon" />
                    <input
                      id="card-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="modal-input-field">
                  <label htmlFor="card-message">
                    How can our team help your business?
                  </label>
                  <div className="modal-input-wrapper textarea-wrapper">
                    <textarea
                      id="card-message"
                      rows={2}
                      placeholder="Tell us about your industry, current workflow, or questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                <div className="contact-form-actions-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-submit-btn"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Sending inquiry...' : 'Send Message'}</span>
                  </button>

                  <span className="privacy-note">
                    🔒 Direct connection &bull; No spam guaranteed
                  </span>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

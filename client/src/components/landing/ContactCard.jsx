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
} from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import './ContactCard.css';

export const ContactCard = ({ isOpen, onClose, onOpenDemo, toggleRef }) => {
  const navigate = useNavigate();
  const socketContext = useSocket();
  const triggerRequestDemo = socketContext?.triggerRequestDemo;

  const cardRef = useRef(null);
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'message'
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
      setErrorMsg('Please enter your name and email address.');
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
          module: 'Contact Card Popover',
          message: message.trim(),
          source: 'contact-card',
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
      console.error('Failed to dispatch contact card inquiry:', err);
      setIsSubmitting(false);
      setErrorMsg('Could not send message. Please try calling or emailing us.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for click-away & mobile focus */}
      <div className="contact-card-backdrop" onClick={onClose} />

      <div
        ref={cardRef}
        className="contact-card-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-card-title"
      >
        {/* Top Header */}
        <div className="contact-card-header">
          <div className="contact-card-header-left">
            <div className="contact-header-badge">
              <Headphones size={18} />
            </div>
            <div>
              <h3 id="contact-card-title" className="contact-card-title">
                Contact Speshway
              </h3>
              <div className="contact-status-indicator">
                <span className="contact-status-dot" />
                <span className="contact-status-text">24/7 Enterprise Desk</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="contact-card-close-btn"
            onClick={onClose}
            aria-label="Close contact card"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="contact-card-tabs">
          <button
            type="button"
            className={`contact-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Direct Contacts
          </button>
          <button
            type="button"
            className={`contact-tab-btn ${activeTab === 'message' ? 'active' : ''}`}
            onClick={() => setActiveTab('message')}
          >
            Quick Message
          </button>
        </div>

        {/* TAB 1: Direct Contacts */}
        {activeTab === 'info' && (
          <div className="contact-card-body">
            {/* Phone Row */}
            <div className="contact-info-item">
              <div className="contact-info-icon bg-emerald">
                <Phone size={16} />
              </div>
              <div className="contact-info-content">
                <span className="contact-info-label">Call Support (24/7)</span>
                <a href="tel:+18005557737" className="contact-info-link">
                  +1 (800) 555-SPESH
                </a>
              </div>
              <a
                href="tel:+18005557737"
                className="contact-item-action-btn"
                title="Call toll-free"
              >
                Call
              </a>
            </div>

            {/* Email Row */}
            <div className="contact-info-item">
              <div className="contact-info-icon bg-emerald">
                <Mail size={16} />
              </div>
              <div className="contact-info-content">
                <span className="contact-info-label">Support &amp; Sales</span>
                <a href="mailto:support@speshway.com" className="contact-info-link">
                  support@speshway.com
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="contact-item-action-btn"
                title="Copy email address"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Location Row */}
            <div className="contact-info-item">
              <div className="contact-info-icon bg-slate">
                <MapPin size={16} />
              </div>
              <div className="contact-info-content">
                <span className="contact-info-label">Headquarters</span>
                <span className="contact-info-val">Silicon Valley &amp; Global Hubs</span>
              </div>
            </div>

            {/* Hours Row */}
            <div className="contact-info-item">
              <div className="contact-info-icon bg-slate">
                <Clock size={16} />
              </div>
              <div className="contact-info-content">
                <span className="contact-info-label">Availability</span>
                <span className="contact-info-val">24 Hours / 7 Days a Week</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="contact-card-footer">
              <button
                type="button"
                className="contact-footer-demo-btn"
                onClick={() => {
                  onClose();
                  if (onOpenDemo) onOpenDemo();
                  else navigate('/get-started');
                }}
              >
                <Sparkles size={14} />
                <span>Book Live Demo</span>
              </button>

              <Link
                to="/contact"
                className="contact-footer-full-link"
                onClick={() => {
                  onClose();
                  window.scrollTo(0, 0);
                }}
              >
                <span>Full Contact Page</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: Quick Message */}
        {activeTab === 'message' && (
          <div className="contact-card-body">
            {isSuccess ? (
              <div className="contact-message-success">
                <CheckCircle2 size={36} className="text-emerald" />
                <h4>Inquiry Received!</h4>
                <p>Our enterprise solutions team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitMessage} className="contact-quick-form">
                {errorMsg && <div className="contact-form-error">{errorMsg}</div>}

                <div className="contact-form-field">
                  <label htmlFor="card-input-name">Your Name</label>
                  <input
                    id="card-input-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="contact-form-field">
                  <label htmlFor="card-input-email">Work Email</label>
                  <input
                    id="card-input-email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="contact-form-field">
                  <label htmlFor="card-input-msg">Message / Requirements</label>
                  <textarea
                    id="card-input-msg"
                    rows={3}
                    placeholder="How can we assist your business today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-form-submit-btn"
                >
                  <Send size={14} />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, CheckCircle2, Phone, Mail } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import './ContactCard.css';

export const ContactCard = ({ isOpen, onClose, toggleRef }) => {
  const socketContext = useSocket();
  const triggerRequestDemo = socketContext?.triggerRequestDemo;

  const cardRef = useRef(null);

  // Form State matching screenshot fields & character limits
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

  // Submit quick inquiry message
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      if (triggerRequestDemo) {
        await triggerRequestDemo({
          name: name.trim(),
          email: email.trim(),
          company: 'Quick Contact Message',
          module: 'Contact Card',
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
      console.error('Failed to dispatch contact inquiry:', err);
      setIsSubmitting(false);
      setErrorMsg('Could not send message. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Blurred Backdrop */}
      <div className="contact-card-backdrop" onClick={onClose} />

      {/* Floating Contact Card Box matching screenshot */}
      <div
        ref={cardRef}
        className="contact-card-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-card-heading"
      >
        {/* Card Header matching Screenshot */}
        <div className="contact-card-header">
          <div className="contact-card-title-group">
            <Sparkles size={20} className="contact-sparkle-icon" />
            <h3 id="contact-card-heading" className="contact-card-title">
              Send Contact Message
            </h3>
          </div>
          <button
            type="button"
            className="contact-card-close-btn"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        <p className="contact-card-subtitle">
          Have an ERP query? Reach us directly or leave a message below.
        </p>

        {/* Quick Direct Contact Details */}
        <div className="contact-card-direct-bar">
          <a href="tel:+18005557737" className="contact-direct-chip" title="Call Speshway Support">
            <Phone size={13} className="direct-chip-icon" />
            <span>+1 (800) 555-SPESH</span>
          </a>
          <a href="mailto:support@speshway.com" className="contact-direct-chip" title="Email Speshway Support">
            <Mail size={13} className="direct-chip-icon" />
            <span>support@speshway.com</span>
          </a>
        </div>

        {isSuccess ? (
          <div className="contact-card-success">
            <div className="contact-success-icon-wrap">
              <CheckCircle2 size={36} />
            </div>
            <h4>Message Sent Successfully!</h4>
            <p>
              Thank you, <strong>{name}</strong>! We've received your query and our team will get back to you shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="contact-card-submit-btn"
              style={{ marginTop: '12px' }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitMessage} className="contact-card-form">
            {errorMsg && <div className="contact-card-alert">{errorMsg}</div>}

            {/* Field 1: Full Name */}
            <div className="contact-form-group">
              <div className="contact-field-header">
                <label htmlFor="card-fullname" className="contact-field-label">
                  Full Name <span className="req-star">*</span>
                </label>
                <span className="contact-char-count">{name.length}/50</span>
              </div>
              <input
                id="card-fullname"
                type="text"
                required
                maxLength={50}
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="contact-field-input"
              />
            </div>

            {/* Field 2: Email Address */}
            <div className="contact-form-group">
              <div className="contact-field-header">
                <label htmlFor="card-emailaddr" className="contact-field-label">
                  Email Address <span className="req-star">*</span>
                </label>
                <span className="contact-char-count">{email.length}/254</span>
              </div>
              <input
                id="card-emailaddr"
                type="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="contact-field-input"
              />
            </div>

            {/* Field 3: Your Message */}
            <div className="contact-form-group">
              <div className="contact-field-header">
                <label htmlFor="card-usermsg" className="contact-field-label">
                  Your Message <span className="req-star">*</span>
                </label>
                <span className="contact-char-count">{message.length}/1000</span>
              </div>
              <textarea
                id="card-usermsg"
                required
                rows={3}
                maxLength={1000}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-field-textarea"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-card-submit-btn"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </>
  );
};
export default ContactCard;

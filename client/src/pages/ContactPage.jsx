import React, { useState } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { useSocket } from '../context/SocketContext';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

export const ContactPage = () => {
  const { triggerRequestDemo } = useSocket();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    triggerRequestDemo({
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Inquiry Contact',
      module: 'Contact Page Inquiry',
      phone: formData.phone,
      message: formData.message,
    });

    setSubmitted(true);
  };

  return (
    <div className="landing-wrapper">
      <Navbar onOpenGetStarted={() => {}} />

      <main className="page-main-container">
        <section className="page-hero-header">
          <div className="section-badge">
            <span>Get In Touch</span>
          </div>
          <h1 className="page-hero-title">We'd Love to Hear From You</h1>
          <p className="page-hero-sub">
            Have questions about Speshway All-In-One ERP? Our product specialists are ready to help you plan your deployment.
          </p>
        </section>

        <section className="contact-content-section">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info-card">
              <h3>Direct Contacts</h3>
              <p>Reach out directly for enterprise architecture consultations or support inquiries.</p>

              <div className="info-item-row">
                <div className="info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="lbl">Email Us</span>
                  <a href="mailto:support@speshway.com" className="val">support@speshway.com</a>
                </div>
              </div>

              <div className="info-item-row">
                <div className="info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="lbl">Call Support (24/7)</span>
                  <span className="val">+1 (800) 555-SPESH</span>
                </div>
              </div>

              <div className="info-item-row">
                <div className="info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="lbl">Headquarters</span>
                  <span className="val">Silicon Valley &amp; Global Remote Hubs</span>
                </div>
              </div>

              <div className="info-item-row">
                <div className="info-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="lbl">Support Availability</span>
                  <span className="val">24 hours / 7 days a week</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-card">
              {submitted ? (
                <div className="contact-success-state">
                  <CheckCircle size={48} className="text-icon-green" />
                  <h3>Message Received!</h3>
                  <p>Our team will contact you shortly via email or phone.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-hero-primary" style={{ marginTop: '16px' }}>
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-inner">
                  <h3>Send Us a Message</h3>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Michael Scott"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="quick-input full-width"
                    />
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label>Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="michael@dundermifflin.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="quick-input full-width"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="quick-input full-width"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      placeholder="Your Organization"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="quick-input full-width"
                    />
                  </div>

                  <div className="form-group">
                    <label>How Can We Help?</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your team size, required modules, or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="quick-input full-width"
                    />
                  </div>

                  <button type="submit" className="btn-hero-primary full-width-btn">
                    <Send size={16} /> Submit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <CtaBanner onOpenGetStarted={() => {}} />
      </main>
    </div>
  );
};

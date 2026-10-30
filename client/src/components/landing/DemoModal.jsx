import React, { useState } from 'react';
import { X, CheckCircle, Sparkles } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';

export const DemoModal = ({ mode = 'demo', onClose }) => {
  const { triggerRequestDemo } = useSocket();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [moduleInterest, setModuleInterest] = useState('All-In-One Complete Suite');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    triggerRequestDemo({
      name,
      email,
      company: company || 'Enterprise Client',
      module: moduleInterest,
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="module-modal-box demo-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="brand-icon-box mini">
              <Sparkles size={20} className="text-icon-green" />
            </div>
            <div>
              <h3 className="modal-title">
                {mode === 'get-started' ? 'Get Started with Speshway ERP' : 'Request a Live Demo'}
              </h3>
              <p className="modal-subtitle">
                Experience full real-time enterprise management
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div className="demo-success-box">
              <CheckCircle size={48} className="text-green" />
              <h3>Thank You!</h3>
              <p>Your request has been broadcasted in real-time to the Speshway ERP console.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="demo-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="quick-input full-width"
                />
              </div>

              <div className="form-group">
                <label>Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="quick-input full-width"
                />
              </div>

              <div className="form-group">
                <label>Company / Organization</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="quick-input full-width"
                />
              </div>

              <div className="form-group">
                <label>Module Focus</label>
                <select
                  value={moduleInterest}
                  onChange={(e) => setModuleInterest(e.target.value)}
                  className="quick-select full-width"
                >
                  <option value="All-In-One Complete Suite">All-In-One Complete Suite</option>
                  <option value="HRMS & Payroll">HRMS &amp; Payroll</option>
                  <option value="Projects & Tasks">Projects &amp; Tasks</option>
                  <option value="Finance & Accounts">Finance &amp; Accounts</option>
                  <option value="Client CRM & Sales">Client CRM &amp; Sales</option>
                </select>
              </div>

              <button type="submit" className="btn-hero-primary full-width-btn">
                {mode === 'get-started' ? 'Launch Free Trial →' : 'Confirm Demo Request →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

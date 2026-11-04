import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { Check, Sparkles } from 'lucide-react';

export const PricingPage = () => {
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState(null);
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Starter',
      price: isAnnual ? '$29' : '$39',
      period: '/user /month',
      desc: 'Ideal for small businesses and growing teams needing core HR & Project tools.',
      features: [
        'Up to 25 Active Employees',
        'HRMS & Directory Portal',
        'Leave & Attendance Tracking',
        'Task & Project Boards',
        'Standard Email Support',
        'Continuous Cloud Backups',
      ],
      popular: false,
      btnText: 'Start 14-Day Free Trial',
    },
    {
      name: 'Professional',
      price: isAnnual ? '$69' : '$89',
      period: '/user /month',
      desc: 'Complete suite for scaling companies that need unified payroll, finance & CRM.',
      features: [
        'Up to 200 Employees',
        'Full Payroll & Tax Automation',
        'Finance, Invoicing & Expenses',
        'Client CRM & Deal Pipelines',
        'Asset Management & Devices',
        'Priority 24/7 Live Support',
      ],
      popular: true,
      btnText: 'Get Started with Pro',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'tailored quote',
      desc: 'For large organizations demanding custom SLAs, dedicated infrastructure & audit.',
      features: [
        'Unlimited Employees & Users',
        'Custom ERP Module Development',
        'Dedicated Cloud Instance / VPC',
        '24/7 Dedicated Account Manager',
        'SSO / SAML / Active Directory',
        'Custom Data Retention SLAs',
      ],
      popular: false,
      btnText: 'Contact Enterprise Sales',
    },
  ];

  return (
    <div className="landing-wrapper">
      <Navbar
        onOpenGetStarted={() => setModalMode('get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      <main className="page-main-container">
        <section className="page-hero-header">
          <div className="section-badge">
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="page-hero-title">Predictable Pricing for High-Growth Teams</h1>
          <p className="page-hero-sub">
            No hidden fees. Scale your ERP applications as your team and revenues grow.
          </p>

          <div className="billing-toggle">
            <span className={!isAnnual ? 'active' : ''}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`toggle-pill ${isAnnual ? 'annual' : ''}`}
            >
              <div className="toggle-thumb"></div>
            </button>
            <span className={isAnnual ? 'active' : ''}>
              Annual <span className="discount-tag">Save 25%</span>
            </span>
          </div>
        </section>

        <section className="pricing-cards-section">
          <div className="pricing-grid">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`pricing-card ${tier.popular ? 'popular-tier' : ''}`}
              >
                {tier.popular && (
                  <div className="popular-badge">
                    <Sparkles size={12} /> Most Popular
                  </div>
                )}
                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-desc">{tier.desc}</p>

                <div className="tier-price-row">
                  <span className="tier-price">{tier.price}</span>
                  <span className="tier-period">{tier.period}</span>
                </div>

                <button
                  onClick={() => navigate('/get-started')}
                  className={`btn-tier ${tier.popular ? 'btn-popular' : 'btn-outline'}`}
                >
                  {tier.btnText}
                </button>

                <div className="tier-features-list">
                  <span className="feat-included-label">What's included:</span>
                  {tier.features.map((f, i) => (
                    <div key={i} className="tier-feat-item">
                      <Check size={16} className="text-icon-green" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CtaBanner onOpenGetStarted={() => navigate('/get-started')} />
      </main>

      <Footer
        onOpenGetStarted={() => navigate('/get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      {modalMode && (
        <DemoModal mode={modalMode} onClose={() => setModalMode(null)} />
      )}
    </div>
  );
};

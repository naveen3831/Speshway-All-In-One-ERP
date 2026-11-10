import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../services/api';
import { useSocket } from '../context/SocketContext';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { Check, Sparkles, X } from 'lucide-react';

export const PricingPage = () => {
  const navigate = useNavigate();
  const { socket, homeContent } = useSocket();
  const [modalMode, setModalMode] = useState(null);
  const [isAnnual, setIsAnnual] = useState(true);
  const [livePlans, setLivePlans] = useState(null);

  // Pricing visibility derived from homeContent as source of truth
  const getPricingVisible = () => {
    if (homeContent?.navbar?.showPricing !== undefined) return Boolean(homeContent.navbar.showPricing);
    const stored = localStorage.getItem('speshway_navbar_pricing_visible');
    if (stored !== null) return stored === 'true';
    return false;
  };

  const [showPricing, setShowPricing] = useState(getPricingVisible);

  useEffect(() => {
    setShowPricing(getPricingVisible());
  }, [homeContent?.navbar?.showPricing]);

  useEffect(() => {
    const handleSync = () => setShowPricing(getPricingVisible());
    window.addEventListener('speshway_navbar_pricing_changed', handleSync);
    window.addEventListener('speshway_navbar_visibility_changed', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('speshway_navbar_pricing_changed', handleSync);
      window.removeEventListener('speshway_navbar_visibility_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [homeContent?.navbar?.showPricing]);

  useEffect(() => {
    let mounted = true;
    api.get('/pricing')
      .then((res) => {
        if (mounted && res.data && res.data.data && res.data.data.length > 0) {
          const hasOld = res.data.data.some(
            (p) =>
              p.slug === 'website' ||
              p.slug === 'mobile-app' ||
              p.slug === 'website-mobile-app' ||
              p.slug === 'starter' ||
              p.slug === 'professional'
          );
          if (!hasOld) {
            setLivePlans(res.data.data);
          }
        }
      })
      .catch((err) => console.warn('Using default pricing plans:', err.message));

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handlePricingUpdated = (updatedPlans) => {
      if (Array.isArray(updatedPlans) && updatedPlans.length > 0) {
        const hasOld = updatedPlans.some(
          (p) =>
            p.slug === 'website' ||
            p.slug === 'mobile-app' ||
            p.slug === 'website-mobile-app' ||
            p.slug === 'starter' ||
            p.slug === 'professional'
        );
        if (!hasOld) {
          setLivePlans(updatedPlans);
        }
      }
    };
    socket.on('pricing:updated', handlePricingUpdated);
    return () => {
      socket.off('pricing:updated', handlePricingUpdated);
    };
  }, [socket]);

  // If pricing is turned OFF by admin, hide the page and redirect to Home
  if (!showPricing) {
    return <Navigate to="/" replace />;
  }

  const defaultTiers = [
    {
      slug: 'subscriptions-plan',
      name: 'Subscriptions Plan',
      price: '48,000',
      period: 'Yearly Renewal',
      desc: 'Core ERP software subscription with single domain access and customer mobile app.',
      features: [
        'Permitted for Single domain',
        'Android Customer App',
        'Master Admin Panel',
        'Website',
        '3 Months Support',
        '✕ No Source Code Included',
        '✕ Payment Gateway Integration',
      ],
      popular: false,
      btnText: 'Get Started',
    },
    {
      slug: 'startup-plan',
      name: 'Startup Plan',
      price: '89,000',
      period: 'One-time payment',
      desc: 'Complete turnkey ecosystem with user, seller, and driver multi-app suite.',
      features: [
        'Permitted for Single domain',
        'Android & iOS Apps for Users',
        'Android & iOS Apps for Sellers',
        'Android & iOS Apps for Drivers',
        'Master Admin Panel',
        '6 Months Support',
        'Complete Web Panel',
        'Payment Gateway Integration',
      ],
      popular: true,
      btnText: 'Choose This Plan',
    },
    {
      slug: 'enterprise-plan',
      name: 'Enterprise Plan',
      price: '160,000',
      period: 'One-time payment',
      desc: 'Multi-domain enterprise deployment with analytics, custom branding, and SLA support.',
      features: [
        'Permitted for Multiple domain',
        'Everything in Startup Plan',
        'Advanced Analytics Dashboard',
        'Multi-language Support',
        '12 Months Support',
        'Custom Branding',
        'Priority Support',
      ],
      popular: false,
      btnText: 'Contact Sales',
    },
  ];

  const tiers = livePlans || defaultTiers;

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
                  {tier.features.map((f, i) => {
                    const isExcluded = typeof f === 'string' && (f.startsWith('✕ ') || f.startsWith('! ') || f.startsWith('[-] '));
                    const cleanF = typeof f === 'string' ? f.replace(/^([✕!]|\[-\]|\[x\])\s*/, '') : f;
                    return (
                      <div key={i} className="tier-feat-item" style={{ opacity: isExcluded ? 0.6 : 1 }}>
                        {isExcluded ? (
                          <X size={15} style={{ color: '#ef4444', flexShrink: 0 }} />
                        ) : (
                          <Check size={16} className="text-icon-green" style={{ flexShrink: 0 }} />
                        )}
                        <span style={{ color: isExcluded ? '#94a3b8' : undefined }}>{cleanF}</span>
                      </div>
                    );
                  })}
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

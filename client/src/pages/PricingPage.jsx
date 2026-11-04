import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useSocket } from '../context/SocketContext';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { Check, Sparkles, Globe, Smartphone, Layers } from 'lucide-react';

const DEFAULT_TIERS = [
  {
    slug: 'website',
    name: 'Website',
    icon: Globe,
    price: '₹80,000',
    period: '',
    desc: 'Complete responsive Web ERP application accessible on any browser, desktop, or tablet.',
    features: [
      'Full Web ERP Application',
      'Role-Based Admin & Staff Access',
      'Real-Time Cloud Synchronization',
      'Customer Portal & Lead Inquiries',
      'Reports, Analytics & Data Export',
      'Custom Domain & SSL Security',
    ],
    popular: false,
    btnText: 'Get Started with Website',
  },
  {
    slug: 'mobile-app',
    name: 'Mobile App',
    icon: Smartphone,
    price: '₹1,00,000',
    period: '',
    desc: 'Dedicated native Android and iOS mobile applications for your team and customers on the go.',
    features: [
      'Native Android & iOS Applications',
      'Push Notifications & Instant Alerts',
      'Offline Synchronization & Caching',
      'Camera QR & Barcode Scanner',
      'Biometric & Fingerprint Login',
      'Google Play & Apple Store Setup',
    ],
    popular: false,
    btnText: 'Get Started with Mobile App',
  },
  {
    slug: 'website-mobile-app',
    name: 'Website + Mobile App',
    icon: Layers,
    price: '₹1,30,000',
    period: '',
    desc: 'Complete unified omnichannel solution with synchronized Web ERP and Native Mobile Apps.',
    features: [
      'Complete Web ERP + Android & iOS Apps',
      'Seamless Cross-Platform Real-Time Sync',
      'Unified Admin Control Center',
      'Customer Booking & Ordering Suite',
      'Dedicated Cloud Architecture & API',
      '24/7 Priority Support & Maintenance',
    ],
    popular: true,
    btnText: 'Get Complete Suite',
  },
];

export const PricingPage = () => {
  const navigate = useNavigate();
  const [modalMode, setModalMode] = useState(null);
  const [tiers, setTiers] = useState(DEFAULT_TIERS);
  const { socket } = useSocket();

  useEffect(() => {
    let mounted = true;
    api.get('/pricing')
      .then((res) => {
        if (mounted && res.data && res.data.data && res.data.data.length > 0) {
          const mapped = res.data.data.map((item) => ({
            ...item,
            icon: item.slug === 'website' ? Globe : item.slug === 'mobile-app' ? Smartphone : Layers,
          }));
          setTiers(mapped);
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
        const mapped = updatedPlans.map((item) => ({
          ...item,
          icon: item.slug === 'website' ? Globe : item.slug === 'mobile-app' ? Smartphone : Layers,
        }));
        setTiers(mapped);
      }
    };
    socket.on('pricing:updated', handlePricingUpdated);
    return () => {
      socket.off('pricing:updated', handlePricingUpdated);
    };
  }, [socket]);

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {tier.icon && <tier.icon size={22} className={tier.popular ? 'text-icon-green' : 'text-icon-blue'} />}
                  <h3 className="tier-name" style={{ margin: 0 }}>{tier.name}</h3>
                </div>
                <p className="tier-desc">{tier.desc}</p>

                <div className="tier-price-row">
                  <span className="tier-price">{tier.price}</span>
                  {tier.period ? <span className="tier-period">{tier.period}</span> : null}
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

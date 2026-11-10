import React from 'react';
import { Check, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import './StartupPlans.css';

const STARTUP_PLANS = [
  {
    id: 'subscriptions',
    name: 'Subscriptions Plan',
    price: '48,000',
    currency: '₹',
    period: 'Yearly Renewal',
    isPopular: false,
    buttonText: 'Get Started',
    buttonVariant: 'light-green',
    actionType: 'get-started',
    features: [
      { text: 'Permitted for Single domain', included: true },
      { text: 'Android Customer App', included: true },
      { text: 'Master Admin Panel', included: true },
      { text: 'Website', included: true },
      { text: '3 Months Support', included: true },
      { text: 'No Source Code Included', included: false },
      { text: 'Payment Gateway Integration', included: false },
    ],
  },
  {
    id: 'startup',
    name: 'Startup Plan',
    price: '89,000',
    currency: '₹',
    period: 'One-time payment',
    isPopular: true,
    badgeText: 'Most Popular',
    buttonText: 'Choose This Plan',
    buttonVariant: 'green',
    actionType: 'get-started',
    features: [
      { text: 'Permitted for Single domain', included: true },
      { text: 'Android & iOS Apps for Users', included: true },
      { text: 'Android & iOS Apps for Sellers', included: true },
      { text: 'Android & iOS Apps for Drivers', included: true },
      { text: 'Master Admin Panel', included: true },
      { text: '6 Months Support', included: true },
      { text: 'Complete Web Panel', included: true },
      { text: 'Payment Gateway Integration', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: '160,000',
    currency: '₹',
    period: 'One-time payment',
    isPopular: false,
    buttonText: 'Contact Sales',
    buttonVariant: 'light-green',
    actionType: 'demo',
    features: [
      { text: 'Permitted for Multiple domain', included: true },
      { text: 'Everything in Startup Plan', included: true },
      { text: 'Advanced Analytics Dashboard', included: true },
      { text: 'Multi-language Support', included: true },
      { text: '12 Months Support', included: true },
      { text: 'Custom Branding', included: true },
      { text: 'Priority Support', included: true },
    ],
  },
];

export const StartupPlans = ({ onOpenGetStarted, onOpenDemo }) => {
  const handleButtonClick = (actionType) => {
    if (actionType === 'demo' && onOpenDemo) {
      onOpenDemo();
    } else if (onOpenGetStarted) {
      onOpenGetStarted();
    }
  };

  return (
    <section id="startup-plans" className="startup-plans-section">
      <div className="startup-plans-container">
        {/* Section Header matching Screenshot */}
        <div className="startup-plans-header">
          <h2 className="startup-plans-title">
            Choose Your <span className="title-highlight">Startup Plan</span>
          </h2>
          <p className="startup-plans-subtitle">
            Get everything you need to launch your million-dollar startup
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="startup-plans-grid">
          {STARTUP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`startup-plan-card ${plan.isPopular ? 'popular-card' : ''}`}
            >
              {/* Most Popular Floating Badge */}
              {plan.isPopular && (
                <div className="plan-popular-badge">
                  <span>{plan.badgeText}</span>
                </div>
              )}

              {/* Card Header */}
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price-row">
                  <span className="plan-currency">{plan.currency}</span>
                  <span className="plan-price-amount">{plan.price}</span>
                </div>
                <div className="plan-period">{plan.period}</div>
              </div>

              {/* Features List */}
              <ul className="plan-features-list">
                {plan.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className={`plan-feature-item ${feature.included ? 'included' : 'excluded'}`}
                  >
                    <span className={`feature-icon-wrapper ${feature.included ? 'check' : 'cross'}`}>
                      {feature.included ? (
                        <Check size={12} strokeWidth={2.6} />
                      ) : (
                        <X size={12} strokeWidth={2.6} />
                      )}
                    </span>
                    <span className="feature-item-text">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button */}
              <div className="plan-button-wrapper">
                <button
                  type="button"
                  className={`plan-cta-btn btn-${plan.buttonVariant}`}
                  onClick={() => handleButtonClick(plan.actionType)}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


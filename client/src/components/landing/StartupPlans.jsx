import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [activeIndex, setActiveIndex] = useState(1); // Default to middle "Startup Plan"
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = STARTUP_PLANS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Continuous auto-rotation matching Our Platform Solutions animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 1200); // Steady 1.2s cycle for smooth professional 3D carousel transitions
    return () => clearInterval(interval);
  }, [total]);

  const handleButtonClick = (e, actionType, isActive, index) => {
    if (e) e.stopPropagation();
    if (!isActive) {
      setActiveIndex(index);
      return;
    }
    if (actionType === 'demo' && onOpenDemo) {
      onOpenDemo();
    } else if (onOpenGetStarted) {
      onOpenGetStarted();
    }
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section id="startup-plans" className="startup-plans-section">
      <div className="startup-plans-container">
        {/* Section Header */}
        <div className="startup-plans-header">
          <h2 className="startup-plans-title">
            Choose Your <span className="title-highlight">Startup Plan</span>
          </h2>
          <p className="startup-plans-subtitle">
            Get everything you need to launch your million-dollar startup
          </p>
        </div>

        {/* 3D Coverflow Carousel Stage with outer navigation matching Platform Solutions */}
        <div className="coverflow-wrapper startup-plans-coverflow-wrapper">
          {/* Borderless Left Chevron Arrow */}
          <button
            type="button"
            className="coverflow-nav-btn prev startup-plans-nav-btn"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous startup plan"
            title="Previous"
          >
            <ChevronLeft size={32} strokeWidth={2.4} />
          </button>

          <div
            className="coverflow-stage startup-plans-stage"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="coverflow-track">
              {STARTUP_PLANS.map((plan, index) => {
                let offset = (index - activeIndex + total) % total;
                if (offset > total / 2) {
                  offset -= total;
                }

                const isActive = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

                const isVisible = isActive || isLeft || isRight;
                if (!isVisible) return null;

                let cardClass = `startup-plan-card ${plan.isPopular ? 'popular-card' : ''}`;
                if (isActive) cardClass += ' is-active';
                else if (isLeft) cardClass += ' is-left';
                else if (isRight) cardClass += ' is-right';

                return (
                  <div
                    key={plan.id}
                    className={cardClass}
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${plan.name} plan`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (!isActive) {
                          setActiveIndex(index);
                        }
                      }
                    }}
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
                        onClick={(e) => handleButtonClick(e, plan.actionType, isActive, index)}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Borderless Right Chevron Arrow */}
          <button
            type="button"
            className="coverflow-nav-btn next startup-plans-nav-btn"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next startup plan"
            title="Next"
          >
            <ChevronRight size={32} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </section>
  );
};

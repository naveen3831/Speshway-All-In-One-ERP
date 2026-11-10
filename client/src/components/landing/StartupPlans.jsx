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
  // Start with index 1 ("Startup Plan - Most Popular") in center
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const pauseTimerRef = useRef(null);
  const total = STARTUP_PLANS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const pauseAutoRotateTemporarily = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 6000);
  };

  // Continuous auto-rotation matching Platform Solutions (pauses during interaction)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const handleButtonClick = (actionType) => {
    if (actionType === 'demo' && onOpenDemo) {
      onOpenDemo();
    } else if (onOpenGetStarted) {
      onOpenGetStarted();
    }
  };

  // Touch swipe support matching Platform Solutions
  const handleTouchStart = (e) => {
    pauseAutoRotateTemporarily();
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
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

        {/* 3D Coverflow Stage with Outer Navigation on Mobile / 3-Col Grid on Desktop */}
        <div className="startup-coverflow-wrapper">
          {/* Borderless Left Chevron Arrow (Mobile responsive only) */}
          <button
            type="button"
            className="coverflow-nav-btn prev startup-coverflow-arrow"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
              pauseAutoRotateTemporarily();
            }}
            aria-label="Previous plan"
            title="Previous Plan"
          >
            <ChevronLeft size={30} strokeWidth={2.4} />
          </button>

          <div
            className="startup-coverflow-stage"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="startup-coverflow-track">
              {STARTUP_PLANS.map((plan, index) => {
                let offset = (index - activeIndex + total) % total;
                if (offset > total / 2) {
                  offset -= total;
                }

                const isActive = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

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
                        pauseAutoRotateTemporarily();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${plan.name} card`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (!isActive) {
                          setActiveIndex(index);
                          pauseAutoRotateTemporarily();
                        } else {
                          handleButtonClick(plan.actionType);
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleButtonClick(plan.actionType);
                        }}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Borderless Right Chevron Arrow (Mobile responsive only) */}
          <button
            type="button"
            className="coverflow-nav-btn next startup-coverflow-arrow"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
              pauseAutoRotateTemporarily();
            }}
            aria-label="Next plan"
            title="Next Plan"
          >
            <ChevronRight size={30} strokeWidth={2.4} />
          </button>
        </div>

        {/* Mobile Indicator Dots */}
        <div className="startup-plans-dots" aria-hidden="true">
          {STARTUP_PLANS.map((plan, idx) => (
            <button
              key={plan.id}
              type="button"
              className={`startup-plan-dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => {
                setActiveIndex(idx);
                pauseAutoRotateTemporarily();
              }}
              aria-label={`Go to ${plan.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


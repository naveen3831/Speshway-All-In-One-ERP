import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import './PlatformSolutions.css';

const PLATFORM_SOLUTIONS = [
  {
    id: 'on-demand',
    title: 'On-Demand Services',
    subtitle: 'Create an on-demand platform like Urban Clap for home services and maintenance.',
    features: [
      'Service Provider Network',
      'Booking Management',
      'Quality Control',
      'Service Tracking',
    ],
    badge: 'Home & Local Services',
  },
  {
    id: 'grocery',
    title: 'Grocery Platform',
    subtitle: 'Build a comprehensive grocery platform like Grofers with fresh delivery features.',
    features: [
      'Fresh Product Management',
      'Scheduled Delivery',
      'Subscription Services',
      'Quality Assurance',
    ],
    badge: 'Grocery & Fresh Goods',
  },
  {
    id: 'quick-commerce',
    title: 'Quick Commerce Platform',
    subtitle: 'Build your own quick commerce app like Blinkit & Zepto with instant delivery features.',
    features: [
      'Customer Mobile Apps (Android & iOS)',
      'Seller & Delivery Apps',
      'Master Admin Panel',
      'Web Platform',
    ],
    badge: '10-Min Delivery',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Telemedicine',
    subtitle: 'Launch a digital clinic with doctor consultations, prescription delivery, and appointment scheduling.',
    features: [
      'Video Doctor Consultations',
      'Digital Prescription Engine',
      'Lab Test Booking & Reports',
      'HIPAA Compliant Security',
    ],
    badge: 'Healthcare & MedTech',
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Hotel Booking',
    subtitle: 'Comprehensive hotel booking, room inventory, and guest management platform with automated check-in.',
    features: [
      'Multi-Property Management',
      'Real-time Room Availability',
      'Integrated Channel Manager',
      'Automated Guest Invoicing',
    ],
    badge: 'Hotels & Hospitality',
  },
  {
    id: 'logistics',
    title: 'Logistics & Fleet Mobility',
    subtitle: 'Real-time route optimization, driver dispatching, and live tracking for transport networks.',
    features: [
      'GPS Live Vehicle Tracking',
      'Smart Route Optimization',
      'Driver & Fleet Management',
      'Automated Billing & POD',
    ],
    badge: 'Logistics & Fleet',
  },
];

export const PlatformSolutions = ({ onOpenDemo }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = PLATFORM_SOLUTIONS.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play interval that pauses on hover/interaction
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch and drag swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Wheel horizontal navigation with throttle
  const lastWheelTime = useRef(0);
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 400) return;
    if (Math.abs(e.deltaX) > 25 || Math.abs(e.deltaY) > 40) {
      if (e.deltaX > 20 || (e.shiftKey && e.deltaY > 20)) {
        nextSlide();
        lastWheelTime.current = now;
      } else if (e.deltaX < -20 || (e.shiftKey && e.deltaY < -20)) {
        prevSlide();
        lastWheelTime.current = now;
      }
    }
  };

  return (
    <section
      id="platform-solutions"
      className="platform-solutions-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="platform-solutions-container">
        {/* Section Header */}
        <div className="platform-solutions-header">
          <div className="platform-solutions-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Multi-Industry Platforms</span>
          </div>
          <h2 className="platform-solutions-title">Our Platform Solutions</h2>
          <p className="platform-solutions-subtitle">
            End-to-end app development for every industry
          </p>
        </div>

        {/* 3D Coverflow Carousel Stage */}
        <div
          className="coverflow-stage"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            className="coverflow-nav-btn prev"
            onClick={prevSlide}
            aria-label="Previous platform solution"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards Track */}
          <div className="coverflow-track">
            {PLATFORM_SOLUTIONS.map((item, index) => {
              // Calculate circular offset relative to activeIndex
              let offset = (index - activeIndex + total) % total;
              if (offset > total / 2) {
                offset -= total;
              }

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isFarLeft = offset === -2;
              const isFarRight = offset === 2;
              const isHidden = Math.abs(offset) > 2;

              let cardClass = 'coverflow-card';
              if (isActive) cardClass += ' is-active';
              else if (isLeft) cardClass += ' is-left';
              else if (isRight) cardClass += ' is-right';
              else if (isFarLeft) cardClass += ' is-far-left';
              else if (isFarRight) cardClass += ' is-far-right';
              else if (isHidden) cardClass += ' is-hidden';

              return (
                <div
                  key={item.id}
                  className={cardClass}
                  style={{ '--offset': offset }}
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(index);
                    }
                  }}
                  onMouseEnter={() => {
                    // Mouse pick brings card to front
                    setActiveIndex(index);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${item.title} card`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <div className="coverflow-card-inner">
                    {/* Top Industry Badge */}
                    <div className="card-top-pill">{item.badge}</div>

                    {/* Card Title & Description */}
                    <h3 className="card-platform-title">{item.title}</h3>
                    <p className="card-platform-desc">{item.subtitle}</p>

                    {/* Features Checklist */}
                    <ul className="card-features-list">
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} className="card-feature-item">
                          <span className="check-icon-circle">
                            <Check size={14} strokeWidth={2.5} />
                          </span>
                          <span className="feature-text">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="card-cta-wrapper">
                      <button
                        type="button"
                        className="card-consultation-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenDemo) onOpenDemo();
                        }}
                      >
                        <span>BOOK FREE CONSULTATION</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="coverflow-nav-btn next"
            onClick={nextSlide}
            aria-label="Next platform solution"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="coverflow-dots">
          {PLATFORM_SOLUTIONS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`coverflow-dot ${dotIdx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

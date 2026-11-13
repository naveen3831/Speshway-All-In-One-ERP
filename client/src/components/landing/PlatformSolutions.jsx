import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import './PlatformSolutions.css';

// Ready-made platform solutions matching reference design (Masterstap)
const PLATFORM_SOLUTIONS_DATA = [
  {
    id: 'food-delivery',
    title: 'Food Delivery Platform',
    description:
      'Build a restaurant network platform like Swiggy and Zomato with seamless ordering.',
    features: [
      'Restaurant Management',
      'Real-time Order Tracking',
      'Delivery Boy Apps',
      'Rating & Review System',
    ],
  },
  {
    id: 'ride-sharing',
    title: 'Ride Sharing Platform',
    description:
      'Create a cab network platform like OLA & Uber with advanced booking features.',
    features: [
      'GPS Navigation Integration',
      'Driver Management System',
      'Dynamic Pricing',
      'Multi-payment Options',
    ],
  },
  {
    id: 'grocery-platform',
    title: 'Grocery Platform',
    description:
      'Build a comprehensive grocery platform like Grofers with fresh delivery features.',
    features: [
      'Fresh Product Management',
      'Scheduled Delivery',
      'Subscription Services',
      'Quality Assurance',
    ],
  },
  {
    id: 'ecommerce-retail',
    title: 'E-Commerce Retail Platform',
    description:
      'End-to-end multi-vendor shopping platform like Amazon with real-time tracking.',
    features: [
      'Multi-vendor Storefronts',
      'Secure Payment Gateways',
      'Real-Time Inventory Sync',
      'Advanced Sales Analytics',
    ],
  },
  {
    id: 'healthcare-telemedicine',
    title: 'Healthcare & Hospital Platform',
    description:
      'Comprehensive hospital management and telemedicine platform for modern clinics.',
    features: [
      'Doctor Appointment Booking',
      'Video Teleconsultation',
      'Digital Prescriptions & EHR',
      'Lab & Diagnostic Reports',
    ],
  },
  {
    id: 'logistics-fleet',
    title: 'Fleet & Logistics Platform',
    description:
      'Vehicle, ride, and fleet management platform with real-time telematics and dispatch.',
    features: [
      'Live GPS Fleet Tracking',
      'Automated Route Dispatch',
      'Driver & Trip Logging',
      'Digital Proof of Delivery',
    ],
  },
];

export const PlatformSolutions = ({ onOpenDemo, onOpenContact }) => {
  const cards = PLATFORM_SOLUTIONS_DATA;
  // Start with activeIndex 1 (Ride Sharing Platform) matching reference layout
  const [activeIndex, setActiveIndex] = useState(1);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = cards.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Continuous auto-scrolling: rotates card-to-card steadily and uninterrupted
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 1800);
    return () => clearInterval(interval);
  }, [total]);

  // Trigger the built-in contact details popup
  const handleOpenContactPopup = (e, item) => {
    if (e) e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent('speshway_open_contact_card', {
        detail: { service: item?.title },
      })
    );
    if (onOpenContact) {
      onOpenContact(item);
    } else if (onOpenDemo) {
      onOpenDemo(item);
    }
  };

  // Touch swipe support
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
    <section id="platform-solutions" className="platform-solutions-section">
      <div className="platform-solutions-container">
        {/* Section Header */}
        <div className="platform-solutions-header">
          <div className="platform-solutions-badge">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Enterprise Solutions</span>
          </div>
          <h2 className="platform-solutions-title">Our Platform Solutions</h2>
          <p className="platform-solutions-subtitle">
            End-to-end software, cloud, and engineering services tailored to scale modern businesses
          </p>
        </div>

        {/* Carousel Stage with Side Navigation Arrows */}
        <div className="coverflow-wrapper">
          {/* Circular Left Arrow */}
          <button
            type="button"
            className="coverflow-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous platform solution"
            title="Previous"
          >
            <ChevronLeft size={22} strokeWidth={2.4} />
          </button>

          <div
            className="coverflow-stage"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="coverflow-track">
              {cards.map((item, index) => {
                let offset = (index - activeIndex + total) % total;
                if (offset > total / 2) {
                  offset -= total;
                }

                const isActive = offset === 0;
                const isLeft = offset === -1;
                const isRight = offset === 1;

                // Render active and immediate side cards
                const isVisible = isActive || isLeft || isRight;
                if (!isVisible) return null;

                let cardClass = 'coverflow-card';
                if (isActive) cardClass += ' is-active';
                else if (isLeft) cardClass += ' is-left';
                else if (isRight) cardClass += ' is-right';

                return (
                  <div
                    key={item.id}
                    className={cardClass}
                    onClick={() => {
                      if (!isActive) {
                        // Clicking side card brings it to front
                        setActiveIndex(index);
                      } else {
                        // Clicking front active card opens contact popup
                        handleOpenContactPopup(null, item);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.title} card`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (!isActive) {
                          setActiveIndex(index);
                        } else {
                          handleOpenContactPopup(e, item);
                        }
                      }
                    }}
                  >
                    <div className="coverflow-card-inner">
                      {/* Card Title */}
                      <h3 className="card-platform-title">{item.title}</h3>

                      {/* Card Description */}
                      <p className="card-platform-desc">{item.description}</p>

                      {/* Feature Checklist with Checkmark Icons */}
                      <ul className="card-features-list">
                        {item.features.map((feat, fIdx) => (
                          <li key={fIdx} className="card-feature-item">
                            <span className="card-feature-check">✓</span>
                            <span className="card-feature-text">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Book Free Consultation Button */}
                      <div className="card-action-row">
                        <button
                          type="button"
                          className="card-book-consultation-btn"
                          onClick={(e) => handleOpenContactPopup(e, item)}
                        >
                          BOOK FREE CONSULTATION
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Circular Right Arrow */}
          <button
            type="button"
            className="coverflow-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next platform solution"
            title="Next"
          >
            <ChevronRight size={22} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </section>
  );
};

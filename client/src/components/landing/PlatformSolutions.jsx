import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Smartphone,
  Globe,
  Cloud,
  Database,
  Shield,
  Sparkles,
} from 'lucide-react';
import './PlatformSolutions.css';

// The 6 exact platform solutions requested by the user
const PLATFORM_SOLUTIONS_DATA = [
  {
    id: 'software-development',
    title: 'Software Development',
    description:
      'Custom enterprise software solutions tailored to your unique business needs, scaling legacy workflows seamlessly.',
    features: [
      'Custom CRM/ERP Systems',
      'Legacy Database Migration',
      'RESTful API Integration',
    ],
    icon: Code2,
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description:
      'High-performance iOS and Android applications built with modern frameworks to engage users globally.',
    features: [
      'React Native Cross-Platform',
      'Flutter Native Interfaces',
      'App Store & Play Store Handover',
    ],
    icon: Smartphone,
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Responsive and SEO-friendly corporate websites and web apps that drive conversions and scale indefinitely.',
    features: [
      'E-Commerce & Payments',
      'Corporate SaaS Platforms',
      'Fast Static Sites & Headless CMS',
    ],
    icon: Globe,
  },
  {
    id: 'cloud-solutions-devops',
    title: 'Cloud Solutions & DevOps',
    description:
      'Scalable cloud infrastructures, automated deployments, and continuous integration models to optimize stability.',
    features: [
      'AWS, Azure & GCP Architecting',
      'Secure Cloud Migrations',
      'CI/CD Deployment Automation',
    ],
    icon: Cloud,
  },
  {
    id: 'data-analytics-bi',
    title: 'Data Analytics & BI',
    description:
      'Transform raw scattered database states into sleek dashboard visualizations and actionable forecasts.',
    features: [
      'PowerBI & Tableau Boards',
      'Secure Data Warehousing',
      'Automated Business Reports',
    ],
    icon: Database,
  },
  {
    id: 'cyber-security-audits',
    title: 'Cyber Security & Audits',
    description:
      'Comprehensive security shielding, threat modeling, and compliance evaluations to secure modern businesses.',
    features: [
      'Vulnerability Audits',
      'Penetration Assessments',
      'Regulatory Compliance Guardrails',
    ],
    icon: Shield,
  },
];

export const PlatformSolutions = ({ onOpenDemo, onOpenContact }) => {
  const cards = PLATFORM_SOLUTIONS_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = cards.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Continuous uninterrupted auto-scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 2200);
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

                const IconComponent = item.icon;

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
                      {/* Top Icon Box */}
                      <div className="card-icon-box">
                        <IconComponent size={22} className="card-icon-svg" />
                      </div>

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

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
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import './PlatformSolutions.css';

// Exact 6 platform cards with distinct light pastel themes
const PLATFORM_SOLUTIONS_DATA = [
  {
    id: 'software-development',
    title: 'Software Development',
    description:
      'Custom enterprise software solutions tailored to your unique business needs, scaling legacy workflows seamlessly.',
    tags: [
      'CUSTOM CRM/ERP SYSTEMS',
      'LEGACY DATABASE MIGRATION',
      'RESTFUL API INTEGRATION',
    ],
    icon: Code2,
    themeClass: 'theme-emerald',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description:
      'High-performance iOS and Android applications built with modern frameworks to engage users globally.',
    tags: [
      'REACT NATIVE CROSS-PLATFORM',
      'FLUTTER NATIVE INTERFACES',
      'APP STORE & PLAY STORE HANDOVER',
    ],
    icon: Smartphone,
    themeClass: 'theme-violet',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'Responsive and SEO-friendly corporate websites and web apps that drive conversions and scale indefinitely.',
    tags: [
      'E-COMMERCE & PAYMENTS',
      'CORPORATE SAAS PLATFORMS',
      'FAST STATIC SITES & HEADLESS CMS',
    ],
    icon: Globe,
    themeClass: 'theme-blue',
  },
  {
    id: 'cloud-solutions-devops',
    title: 'Cloud Solutions & DevOps',
    description:
      'Scalable cloud infrastructures, automated deployments, and continuous integration models to optimize stability.',
    tags: [
      'AWS, AZURE & GCP ARCHITECTING',
      'SECURE CLOUD MIGRATIONS',
      'CI/CD DEPLOYMENT AUTOMATION',
    ],
    icon: Cloud,
    themeClass: 'theme-amber',
  },
  {
    id: 'data-analytics-bi',
    title: 'Data Analytics & BI',
    description:
      'Transform raw scattered database states into sleek dashboard visualizations and actionable forecasts.',
    tags: [
      'POWERBI & TABLEAU BOARDS',
      'SECURE DATA WAREHOUSING',
      'AUTOMATED BUSINESS REPORTS',
    ],
    icon: Database,
    themeClass: 'theme-rose',
  },
  {
    id: 'cyber-security-audits',
    title: 'Cyber Security & Audits',
    description:
      'Comprehensive security shielding, threat modeling, and compliance evaluations to secure modern businesses.',
    tags: [
      'VULNERABILITY AUDITS',
      'PENETRATION ASSESSMENTS',
      'REGULATORY COMPLIANCE GUARDRAILS',
    ],
    icon: Shield,
    themeClass: 'theme-teal',
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

  // Continuous auto-rotation: rotates card-to-card steadily whether mouse is on card or not
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 1200); // Steady 1.2s cycle for smooth professional carousel transitions
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

        {/* 3D Coverflow Carousel Stage with outer navigation */}
        <div className="coverflow-wrapper">
          {/* Borderless Left Chevron Arrow - Positioned completely outside the cards */}
          <button
            type="button"
            className="coverflow-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous service card"
            title="Previous"
          >
            <ChevronLeft size={32} strokeWidth={2.4} />
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

                let cardClass = `coverflow-card ${item.themeClass}`;
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
                        // Clicking side card brings it to front!
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

                      {/* Pill Tags */}
                      <div className="card-tags-list">
                        {item.tags.map((tag, tIdx) => (
                          <div key={tIdx} className="card-tag-pill">
                            {tag}
                          </div>
                        ))}
                      </div>

                      {/* Book Consultation Button */}
                      <div className="card-action-row">
                        <button
                          type="button"
                          className="card-book-consultation-btn"
                          onClick={(e) => handleOpenContactPopup(e, item)}
                        >
                          <span>Book Consultation</span>
                          <ArrowRight size={15} className="btn-arrow-icon" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Borderless Right Chevron Arrow - Positioned completely outside the cards */}
          <button
            type="button"
            className="coverflow-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next service card"
            title="Next"
          >
            <ChevronRight size={32} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </section>
  );
};

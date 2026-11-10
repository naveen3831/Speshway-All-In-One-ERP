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

// Exact 6 platform cards matching user's reference specification
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
  },
];

export const PlatformSolutions = ({ onOpenDemo, onOpenContact }) => {
  const cards = PLATFORM_SOLUTIONS_DATA;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = cards.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Professional automatic carousel rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Trigger the built-in contact details pop up
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

  // Wheel horizontal navigation with throttle
  const lastWheelTime = useRef(0);
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 350) return;
    if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 35) {
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
            <span>Enterprise Solutions</span>
          </div>
          <h2 className="platform-solutions-title">Our Platform Solutions</h2>
          <p className="platform-solutions-subtitle">
            End-to-end software, cloud, and engineering services tailored to scale modern businesses
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
          {/* Borderless Left Chevron Arrow */}
          <button
            type="button"
            className="coverflow-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous service"
            title="Previous"
          >
            <ChevronLeft size={36} strokeWidth={2.2} />
          </button>

          {/* Cards Track */}
          <div className="coverflow-track">
            {cards.map((item, index) => {
              let offset = (index - activeIndex + total) % total;
              if (offset > total / 2) {
                offset -= total;
              }

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              // Only render active and immediate side cards (no overlapping background clutter)
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
                      setActiveIndex(index);
                    } else {
                      // Clicking active card opens contact popup
                      handleOpenContactPopup(null, item);
                    }
                  }}
                  onMouseEnter={() => {
                    // Mouse pick brings card to front
                    if (!isActive) {
                      setActiveIndex(index);
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
                    {/* Top Icon Box matching reference */}
                    <div className="card-icon-box">
                      <IconComponent size={22} className="card-icon-svg" />
                    </div>

                    {/* Card Title */}
                    <h3 className="card-platform-title">{item.title}</h3>

                    {/* Card Description */}
                    <p className="card-platform-desc">{item.description}</p>

                    {/* Pill Tags matching reference */}
                    <div className="card-tags-list">
                      {item.tags.map((tag, tIdx) => (
                        <div key={tIdx} className="card-tag-pill">
                          {tag}
                        </div>
                      ))}
                    </div>

                    {/* Action Link / Button: Learn more -> */}
                    <div className="card-action-row">
                      <button
                        type="button"
                        className="card-learn-more-btn"
                        onClick={(e) => handleOpenContactPopup(e, item)}
                      >
                        <span>Learn more</span>
                        <ArrowRight size={16} className="arrow-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Borderless Right Chevron Arrow */}
          <button
            type="button"
            className="coverflow-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next service"
            title="Next"
          >
            <ChevronRight size={36} strokeWidth={2.2} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="coverflow-dots">
          {cards.map((_, dotIdx) => (
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

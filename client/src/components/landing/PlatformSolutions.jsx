import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import { filterAdminProjects, DEFAULT_ADMIN_PROJECTS } from '../../utils/adminProjects';
import './PlatformSolutions.css';

export const PlatformSolutions = ({ onOpenDemo, onOpenContact }) => {
  const { products } = useSocket();

  // Get real application projects from Admin Console / DB or fallback to DEFAULT_ADMIN_PROJECTS
  const cards = useMemo(() => {
    const list = filterAdminProjects(products);
    const source = list && list.length > 0 ? list : DEFAULT_ADMIN_PROJECTS;
    return source.map((p) => {
      // Clean, concise description for uniform card height
      let desc = p.description || p.longDescription || 'Enterprise-ready cloud ERP application built for modern businesses.';
      if (desc.length > 120) {
        desc = desc.slice(0, 117).trim() + '...';
      }

      // 4 key features
      const features = Array.isArray(p.features) && p.features.length > 0
        ? p.features.slice(0, 4)
        : [
            'Real-Time Telematics',
            'Role-Based Access Control',
            'Automated Invoicing & Billing',
            'Continuous Cloud Backups',
          ];

      return {
        id: p.id || p.slug,
        title: p.name,
        badge: (p.category || 'ENTERPRISE ERP').toUpperCase(),
        subtitle: desc,
        features,
        websiteUrl: p.websiteUrl,
      };
    });
  }, [products]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = cards.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic professional carousel scrolling one card after another
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2600); // Smooth 2.6s cadence for professional auto-scroll
    return () => clearInterval(interval);
  }, [isPaused, total, nextSlide]);

  // Open the built-in contact details pop up
  const handleOpenContactPopup = (e, item) => {
    if (e) e.stopPropagation();
    // Dispatch global custom event for the floating ContactCard popup
    window.dispatchEvent(
      new CustomEvent('speshway_open_contact_card', {
        detail: { project: item?.title },
      })
    );

    if (onOpenContact) {
      onOpenContact(item);
    } else if (onOpenDemo) {
      onOpenDemo(item);
    }
  };

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

  if (!cards || cards.length === 0) return null;

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
            <span>Speshway Enterprise Suite</span>
          </div>
          <h2 className="platform-solutions-title">Our Platform Solutions</h2>
          <p className="platform-solutions-subtitle">
            Industry-proven enterprise applications designed to run every business seamlessly
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
            aria-label="Previous platform solution"
            title="Previous"
          >
            <ChevronLeft size={34} strokeWidth={2.2} />
          </button>

          {/* Cards Track */}
          <div className="coverflow-track">
            {cards.map((item, index) => {
              // Calculate circular offset relative to activeIndex
              let offset = (index - activeIndex + total) % total;
              if (offset > total / 2) {
                offset -= total;
              }

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              // Only render the active card and immediate neighbors (no overlapping background clutter)
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
                      setActiveIndex(index);
                    } else {
                      // Clicking on active card opens contact popup
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
                  aria-label={`${item.title} application card`}
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
                    {/* Top Category Badge */}
                    <div className="card-top-pill">{item.badge}</div>

                    {/* Application Name & Description */}
                    <h3 className="card-platform-title">{item.title}</h3>
                    <p className="card-platform-desc">{item.subtitle}</p>

                    {/* 4 Application Features */}
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

                    {/* CTA Button - Opens Contact Details Popup */}
                    <div className="card-cta-wrapper">
                      <button
                        type="button"
                        className="card-consultation-btn"
                        onClick={(e) => handleOpenContactPopup(e, item)}
                      >
                        <span>BOOK FREE CONSULTATION</span>
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
            aria-label="Next platform solution"
            title="Next"
          >
            <ChevronRight size={34} strokeWidth={2.2} />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="coverflow-dots">
          {cards.slice(0, 10).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`coverflow-dot ${dotIdx === (activeIndex % 10) ? 'active' : ''}`}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import {
  filterAdminProjects,
  getDashboardRoute,
  getWebsiteUrl,
  getProjectIcon,
  getProjectColor,
} from '../../utils/adminProjects';

export const Hero = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();
  const { products, homeContent } = useSocket();
  const heroData = homeContent?.hero || {};

  const badgeText = heroData.badge || '— OUR ERP SOLUTIONS —';
  const titleDark = heroData.titleDark || 'SPESHWAY';
  const titleGreen = heroData.titleGreen || 'ALL IN ONE ERP';
  const subtitle = heroData.subtitle || 'A collection of industry-ready ERP solutions to manage your business, operations, and customers — all in one place.';
  const primaryBtnText = heroData.primaryBtnText || 'View All ERPs';
  const secondaryBtnText = heroData.secondaryBtnText || 'Request a Demo';

  // Strictly sync laptop mockup tiles with the Admin Dashboard projects
  const adminProjects = useMemo(() => {
    return filterAdminProjects(products);
  }, [products]);

  const handleCardClick = (prod) => {
    const websiteUrl = getWebsiteUrl(prod);
    if (websiteUrl) {
      if (/^https?:\/\//i.test(websiteUrl)) {
        window.open(websiteUrl, '_blank', 'noopener,noreferrer');
      } else {
        navigate(websiteUrl);
      }
    }
  };

  const handleScrollToSolutions = (e) => {
    if (e) e.preventDefault();
    const titleElement =
      document.getElementById('erp-solutions-heading') ||
      document.getElementById('solutions-title') ||
      document.querySelector('.our-erp-header-row') ||
      document.querySelector('.our-erp-title') ||
      document.getElementById('solutions');

    if (titleElement) {
      const navbar = document.querySelector('.navbar-container');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      // Scroll directly to "Our ERP Solutions" header so stats bar above is completely out of view
      const elementPosition = titleElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 16;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    } else {
      navigate('/projects');
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left Column: Hero Text */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-text">
              {badgeText}
            </span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-heading-dark">{titleDark} </span>
            <span className="hero-heading-green">{titleGreen}</span>
          </h1>

          <p className="hero-subtitle">
            {subtitle}
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              onClick={handleScrollToSolutions}
              className="btn-hero-primary"
              aria-label="View All ERP Solutions"
            >
              {primaryBtnText} <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onOpenDemo}
              className="btn-hero-secondary"
            >
              {secondaryBtnText}
            </button>
          </div>
        </div>

        {/* Right Column: Sleek 3D Laptop with Dynamic Admin ERP Tiles */}
        <div className="hero-mockup-wrapper">
          <div className="mockup-backdrop-glow"></div>

          <div className="devices-stage single-laptop-stage">
            {/* Laptop Device */}
            <div className="laptop-device hero-laptop-wide">
              <div className="laptop-screen">
                <div className="screen-camera"></div>
                <div className="screen-inner-display laptop-screen-erp-display">
                  <div className="laptop-erp-grid-canvas">
                    {adminProjects.map((prod) => {
                      const Icon = getProjectIcon(prod);
                      const color = getProjectColor(prod);

                      return (
                        <div
                          key={prod.id || prod.slug}
                          className="laptop-tile-card"
                          onClick={() => handleCardClick(prod)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleCardClick(prod);
                            }
                          }}
                          title={`Open ${prod.name} Website`}
                          aria-label={`Open ${prod.name} website`}
                        >
                          <div className={`laptop-tile-icon-box bg-tile-${color}`}>
                            {prod.imageUrl ? (
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                  if (e.currentTarget.nextSibling) {
                                    e.currentTarget.nextSibling.style.display = 'block';
                                  }
                                }}
                              />
                            ) : null}
                            <Icon
                              size={16}
                              className={`text-tile-${color}`}
                              style={{ display: prod.imageUrl ? 'none' : 'block' }}
                            />
                          </div>
                          <span className="laptop-tile-name">{prod.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="laptop-base">
                <div className="laptop-notch"></div>
              </div>
              <div className="laptop-bottom-lip"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

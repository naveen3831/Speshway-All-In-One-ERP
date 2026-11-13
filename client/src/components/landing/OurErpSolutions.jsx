import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Shield, ExternalLink, Search, X, SlidersHorizontal, Check, ChevronDown } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import {
  filterAdminProjects,
  getDashboardRoute,
  getProjectIcon,
  getProjectColor,
  getProjectCategory,
  getWebsiteUrl,
  PRIMARY_ERP_CATEGORIES,
  getPrimaryCategory,
  formatProjectTitle,
  getProjectShortDescription,
} from '../../utils/adminProjects';
import { getProductFallbackImage } from '../../utils/productImages';
import './OurErpSolutions.css';

export const OurErpSolutions = () => {
  const { products, homeContent } = useSocket();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const mobileFilterRef = useRef(null);
  const sectionTitle = homeContent?.solutions?.title || 'Our ERP Solutions';

  // Mobile detection for mobile-only card pagination (<= 768px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });
  const [visibleMobileCount, setVisibleMobileCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset pagination to 5 cards whenever category or search filter changes
  useEffect(() => {
    setVisibleMobileCount(5);
  }, [searchTerm, activeCategory]);

  const handleShowMore = () => {
    setVisibleMobileCount((prev) => prev + 5);
  };

  // Close mobile filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileFilterRef.current && !mobileFilterRef.current.contains(e.target)) {
        setShowMobileFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Filter ONLY projects managed in the Admin Dashboard (excludes generic modules)
  const adminProjects = useMemo(() => {
    return filterAdminProjects(products);
  }, [products]);

  // Clean 5 enterprise category groups (+ All) displayed on a single line
  const categories = PRIMARY_ERP_CATEGORIES;

  // Filter products by search term and active primary category
  const filteredProjects = useMemo(() => {
    return adminProjects.filter((prod) => {
      const term = searchTerm.toLowerCase().trim();
      const detailedCat = getProjectCategory(prod);
      const primaryCat = getPrimaryCategory(prod);

      const matchesSearch =
        !term ||
        (prod.name || '').toLowerCase().includes(term) ||
        (prod.description || '').toLowerCase().includes(term) ||
        (prod.features || []).some((f) => f.toLowerCase().includes(term)) ||
        detailedCat.toLowerCase().includes(term) ||
        primaryCat.toLowerCase().includes(term);

      const matchesCat = activeCategory === 'All' || primaryCat === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [adminProjects, searchTerm, activeCategory]);

  // For mobile response: initially show 5 cards, with "Show More" revealing +5 cards at a time.
  // For desktop (> 768px): always display all filtered cards without pagination.
  const displayedProjects = useMemo(() => {
    if (isMobile) {
      return filteredProjects.slice(0, visibleMobileCount);
    }
    return filteredProjects;
  }, [filteredProjects, isMobile, visibleMobileCount]);

  return (
    <section id="solutions" className="our-erp-section">
      <div className="our-erp-container">
        {/* Section Header with Design-Matched Badge & Subtitle */}
        <div id="erp-solutions-heading" className="our-erp-header-center">
          <div className="our-erp-top-badge">
            <span className="our-erp-badge-dash" />
            <span className="our-erp-badge-text">OUR PRODUCTS</span>
            <span className="our-erp-badge-dash" />
          </div>
          <h2 id="solutions-title" className="our-erp-title">{sectionTitle}</h2>
          <p className="our-erp-subtitle">
            Industry-specific ERP platforms to digitize, automate, and grow your business.
          </p>
        </div>

        {/* Search Bar & Category Filter Tabs */}
        <div className="our-erp-filter-container">
          <div className="catalog-search-filter-wrapper our-erp-search-filter-wrapper">
            <div className="catalog-search-bar our-erp-search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products by name or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="catalog-search-input our-erp-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="our-erp-clear-search-btn"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Mobile Responsive Only Filter Option Side of Search */}
            <div className="catalog-mobile-filter-wrap our-erp-mobile-filter-wrap" ref={mobileFilterRef}>
              <button
                type="button"
                onClick={() => setShowMobileFilter((prev) => !prev)}
                className={`catalog-mobile-filter-btn ${activeCategory !== 'All' ? 'is-active' : ''}`}
                title={`Filter by category${activeCategory !== 'All' ? `: ${activeCategory}` : ''}`}
                aria-label="Filter by category"
              >
                <SlidersHorizontal size={18} />
                {activeCategory !== 'All' && <span className="mobile-filter-active-dot" />}
              </button>

              {showMobileFilter && (
                <div className="catalog-mobile-filter-dropdown">
                  <div className="mobile-filter-dropdown-header">
                    <span>Category Filter</span>
                    {activeCategory !== 'All' && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategory('All');
                          setShowMobileFilter(false);
                        }}
                        className="mobile-filter-reset-btn"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="mobile-filter-options-list">
                    {categories.map((cat) => {
                      const isSelected = activeCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setActiveCategory(cat);
                            setShowMobileFilter(false);
                          }}
                          className={`mobile-filter-option-item ${isSelected ? 'active' : ''}`}
                        >
                          <span>{cat}</span>
                          {isSelected && <Check size={14} className="filter-check-icon" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Tabs - Shown on Desktop, Hidden on Mobile Responsive */}
          <div className="category-filter-tabs our-erp-category-tabs desktop-only-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Solutions Grid - Synchronized ONLY with Admin Dashboard Projects */}
        {filteredProjects.length === 0 ? (
          <div className="our-erp-empty-state">
            <p className="our-erp-empty-text">No ERP solutions found matching your search.</p>
            <button
              type="button"
              className="our-erp-clear-filters-btn"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('All');
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div id="erp-cards" className="our-erp-grid">
              {displayedProjects.map((prod) => {
                const Icon = getProjectIcon(prod);
                const color = getProjectColor(prod);
                const rawImg = prod.imageUrl && typeof prod.imageUrl === 'string' ? prod.imageUrl.trim() : '';
                const imgUrl = rawImg || getProductFallbackImage(prod.slug || prod.id || prod.name) || '';
                const detailRoute = `/product/${prod.slug || prod.id}`;
                const dashboardRoute = getDashboardRoute(prod);
                const displayTitle = formatProjectTitle(prod);
                const displayCategory = getProjectCategory(prod);
                const displayDesc = getProjectShortDescription(prod);

                return (
                  <div
                    key={prod.id || prod.slug}
                    className="our-erp-card"
                    onClick={() => navigate(detailRoute)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(detailRoute);
                      }
                    }}
                    title={`View ${displayTitle} Details`}
                  >
                    <div className="our-erp-img-banner">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={displayTitle}
                          className="our-erp-banner-img"
                          loading="lazy"
                          onError={(e) => {
                            const fallback = getProductFallbackImage(prod.slug || prod.id || prod.name);
                            if (fallback && e.target.src !== fallback) {
                              e.target.src = fallback;
                            }
                          }}
                        />
                      ) : (
                        <div className={`our-erp-icon-wrap icon-box-${color}`}>
                          <Icon size={24} />
                        </div>
                      )}
                    </div>

                    <div className="our-erp-card-body">
                      <div className="our-erp-category-tag">
                        <Icon size={11} className="our-erp-tag-icon" />
                        <span>{displayCategory}</span>
                      </div>

                      <h3 className="our-erp-card-title">{displayTitle}</h3>

                    <div className="our-erp-card-actions">
                      <button
                        type="button"
                        className="our-erp-btn-action our-erp-btn-website"
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = getWebsiteUrl(prod);
                          window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                        title={`Open live ${displayTitle} Website`}
                      >
                        <Globe size={11} className="our-erp-btn-icon" />
                        <span className="our-erp-btn-text">Website</span>
                      </button>

                      <button
                        type="button"
                        className="our-erp-btn-action our-erp-btn-erp"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(dashboardRoute);
                        }}
                        title={`Open live in-site ${displayTitle} ERP Dashboard`}
                      >
                        <span className="our-erp-btn-text">ERP</span>
                        <span className="our-erp-btn-arrow">↗</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Response Only: "Show More" option (5 cards initially, +5 on click) */}
            {isMobile && visibleMobileCount < filteredProjects.length && (
              <div className="our-erp-show-more-wrap">
                <button
                  type="button"
                  className="our-erp-show-more-btn"
                  onClick={handleShowMore}
                  aria-label="Show more solutions"
                >
                  <span>Show More</span>
                  <ChevronDown size={16} className="our-erp-show-more-icon" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Shield, ExternalLink, Search, X } from 'lucide-react';
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
} from '../../utils/adminProjects';
import { getProductFallbackImage } from '../../pages/ProductsPage';
import './OurErpSolutions.css';

export const OurErpSolutions = () => {
  const { products, homeContent } = useSocket();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionTitle = homeContent?.solutions?.title || 'Our ERP Solutions';

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

  return (
    <section id="solutions" className="our-erp-section">
      <div className="our-erp-container">
        {/* Section Header with Clean Dividers */}
        <div id="erp-solutions-heading" className="our-erp-header-row">
          <div className="our-erp-divider-line" />
          <h2 id="solutions-title" className="our-erp-title">{sectionTitle}</h2>
          <div className="our-erp-divider-line right" />
        </div>

        {/* Search Bar & Category Filter Tabs */}
        <div className="our-erp-filter-container">
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

          <div className="category-filter-tabs our-erp-category-tabs">
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
          <div id="erp-cards" className="our-erp-grid">
            {filteredProjects.map((prod) => {
              const Icon = getProjectIcon(prod);
              const color = getProjectColor(prod);
              const imgUrl = prod.imageUrl || getProductFallbackImage(prod.slug || prod.id || prod.name);
              const detailRoute = `/product/${prod.slug || prod.id}`;
              const dashboardRoute = getDashboardRoute(prod);

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
                  title={`View ${prod.name} Details`}
                >
                  {imgUrl ? (
                    <div className="our-erp-img-banner">
                      <img
                        src={imgUrl}
                        alt={prod.name}
                        className="our-erp-banner-img"
                        loading="lazy"
                        onError={(e) => {
                          const fallback = getProductFallbackImage(prod.slug || prod.id || prod.name);
                          if (fallback && e.target.src !== fallback) {
                            e.target.src = fallback;
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className={`our-erp-icon-wrap icon-box-${color}`}>
                      <Icon size={24} />
                    </div>
                  )}
                  <div className="our-erp-card-body">
                    <span className="our-erp-category-tag">{getProjectCategory(prod)}</span>
                    <h3 className="our-erp-card-title">{prod.name}</h3>

                    <div className="our-erp-card-actions">
                      <button
                        type="button"
                        className="our-erp-btn-action our-erp-btn-website"
                        onClick={(e) => {
                          e.stopPropagation();
                          const url = getWebsiteUrl(prod);
                          window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                        title={`Open live ${prod.name} Website`}
                      >
                        <Globe size={13} />
                        <span>Website</span>
                      </button>

                      <button
                        type="button"
                        className="our-erp-btn-action our-erp-btn-erp"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(dashboardRoute);
                        }}
                        title={`Open live in-site ${prod.name} Dashboard`}
                      >
                        <Shield size={13} />
                        <span>View ERP</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

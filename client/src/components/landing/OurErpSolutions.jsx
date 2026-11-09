import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Shield, ExternalLink } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import {
  filterAdminProjects,
  getDashboardRoute,
  getProjectIcon,
  getProjectColor,
  getProjectCategory,
  getWebsiteUrl,
} from '../../utils/adminProjects';
import { getProductFallbackImage } from '../../pages/ProductsPage';
import './OurErpSolutions.css';

export const OurErpSolutions = () => {
  const { products, homeContent } = useSocket();
  const navigate = useNavigate();
  const sectionTitle = homeContent?.solutions?.title || 'Our ERP Solutions';

  // Filter ONLY projects managed in the Admin Dashboard (excludes generic modules)
  const adminProjects = useMemo(() => {
    return filterAdminProjects(products);
  }, [products]);

  return (
    <section id="solutions" className="our-erp-section">
      <div className="our-erp-container">
        {/* Section Header with Clean Dividers */}
        <div className="our-erp-header-row">
          <div className="our-erp-divider-line" />
          <h2 className="our-erp-title">{sectionTitle}</h2>
          <div className="our-erp-divider-line right" />
        </div>

        {/* Dynamic Solutions Grid - Synchronized ONLY with Admin Dashboard Projects */}
        <div className="our-erp-grid">
          {adminProjects.map((prod) => {
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
                      <Globe size={14} />
                      <span>View Website</span>
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
                      <Shield size={14} />
                      <span>View ERP</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

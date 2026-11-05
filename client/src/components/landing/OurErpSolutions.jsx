import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import {
  filterAdminProjects,
  getDashboardRoute,
  getProjectIcon,
  getProjectColor,
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
            const route = getDashboardRoute(prod);
            const color = getProjectColor(prod);
            const imgUrl = prod.imageUrl || getProductFallbackImage(prod.slug || prod.id || prod.name);

            return (
              <div
                key={prod.id || prod.slug}
                className="our-erp-card"
                onClick={() => navigate(route)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(route);
                  }
                }}
                title={`Open live in-site ${prod.name} Dashboard`}
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
                <h3 className="our-erp-card-title">{prod.name}</h3>
                <span className="our-erp-card-sub">{prod.category || 'Enterprise ERP'}</span>
                <button
                  type="button"
                  className="btn-view-erp-pill"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(route);
                  }}
                >
                  View ERP <ExternalLink size={12} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

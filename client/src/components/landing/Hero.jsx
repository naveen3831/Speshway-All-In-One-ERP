import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import {
  filterAdminProjects,
  getDashboardRoute,
  getProjectIcon,
  getProjectColor,
} from '../../utils/adminProjects';

export const Hero = ({ onOpenGetStarted, onOpenDemo }) => {
  const navigate = useNavigate();
  const { products } = useSocket();

  // Strictly sync laptop mockup tiles with the Admin Dashboard projects
  const adminProjects = useMemo(() => {
    return filterAdminProjects(products);
  }, [products]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left Column: Hero Text */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-text">
              &mdash; OUR ERP SOLUTIONS &mdash;
            </span>
          </div>

          <h1 className="hero-heading">
            <span className="hero-heading-dark">SPESHWAY</span>
            <span className="hero-heading-green">ALL IN ONE ERP</span>
          </h1>

          <p className="hero-subtitle">
            A collection of industry-ready ERP solutions to manage your business, operations, and customers — all in one place.
          </p>

          <div className="hero-cta-group">
            <button onClick={() => navigate('/projects')} className="btn-hero-primary">
              View All ERPs <ArrowRight size={16} />
            </button>
            <button onClick={onOpenDemo} className="btn-hero-secondary">
              Request a Demo
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
                      const route = getDashboardRoute(prod);
                      const color = getProjectColor(prod);

                      return (
                        <div
                          key={prod.id || prod.slug}
                          className="laptop-tile-card"
                          onClick={() => navigate(route)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              navigate(route);
                            }
                          }}
                          title={`Open ${prod.name} Dashboard in this site`}
                        >
                          <div className={`laptop-tile-icon-box bg-tile-${color}`}>
                            {prod.imageUrl ? (
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                              />
                            ) : (
                              <Icon size={16} className={`text-tile-${color}`} />
                            )}
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

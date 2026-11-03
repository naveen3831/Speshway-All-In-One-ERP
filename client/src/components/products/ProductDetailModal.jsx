import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Shield,
  Check,
  Globe,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Database,
  Calendar,
  Activity,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductDetailModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'tech'

  if (!product) return null;

  const handleViewWebsite = () => {
    if (product.websiteUrl && product.websiteUrl.startsWith('http')) {
      window.open(product.websiteUrl, '_blank', 'noopener,noreferrer');
    } else {
      onClose();
      navigate(`/product/${product.slug || product.id}`);
    }
  };

  const handleViewAdminDashboard = () => {
    onClose();
    const slug = (product?.slug || product?.id || '').toLowerCase();
    if (
      slug === 'speshway-hospitals' ||
      slug === 'hospitals' ||
      slug.includes('hospital') ||
      product.name?.toLowerCase().includes('hospital') ||
      product.adminUrl?.toLowerCase().includes('hospital')
    ) {
      navigate('/dashboard/speshway-hospitals');
      return;
    }
    if (
      slug === 'aneera-silks' ||
      slug === 'aneera' ||
      slug.includes('aneera') ||
      slug.includes('silk') ||
      product.name?.toLowerCase().includes('aneera') ||
      product.name?.toLowerCase().includes('silk')
    ) {
      navigate('/product/aneera-silks/dashboard');
      return;
    }
    if (
      slug === 'e-commerce' ||
      slug === 'ecommerce' ||
      slug.includes('nexora') ||
      slug.includes('e-com') ||
      product.name?.toLowerCase().includes('e commerce') ||
      product.name?.toLowerCase().includes('ecommerce') ||
      product.name?.toLowerCase().includes('nexora')
    ) {
      navigate('/product/e-commerce/dashboard');
      return;
    }
    if (
      slug === 'fleet-management' ||
      slug === 'fleet' ||
      slug.includes('fleet') ||
      product.name?.toLowerCase().includes('fleet')
    ) {
      navigate('/product/fleet-management/dashboard');
      return;
    }
    if (
      slug === 'american-fitness-gym' ||
      slug === 'american-fitness' ||
      slug.includes('fitness') ||
      slug.includes('gym') ||
      product.name?.toLowerCase().includes('fitness') ||
      product.name?.toLowerCase().includes('gym')
    ) {
      navigate('/product/american-fitness-gym/dashboard');
      return;
    }
    if (
      slug === 'flavora-kitchen' ||
      slug === 'flavora' ||
      slug.includes('flavora') ||
      slug.includes('kitchen') ||
      product.name?.toLowerCase().includes('flavora') ||
      product.name?.toLowerCase().includes('kitchen')
    ) {
      navigate('/product/flavora-kitchen/dashboard');
      return;
    }
    if (
      slug === 'joy-events' ||
      slug === 'joy_events' ||
      slug === 'joy_event-s' ||
      slug.includes('joy') ||
      slug.includes('eventoza') ||
      product.name?.toLowerCase().includes('joy') ||
      product.name?.toLowerCase().includes('eventoza')
    ) {
      navigate('/product/joy-events/dashboard');
      return;
    }
    if (
      slug === 'speshway-hrms' ||
      slug === 'hrms' ||
      slug.includes('hrms') ||
      product.name?.toLowerCase().includes('hrms')
    ) {
      navigate('/product/speshway-hrms/dashboard');
      return;
    }
    if (
      slug === 'saloon' ||
      slug === 'salon' ||
      slug.includes('saloon') ||
      slug.includes('salon') ||
      slug.includes('spy-salon') ||
      product.name?.toLowerCase().includes('saloon') ||
      product.name?.toLowerCase().includes('salon')
    ) {
      navigate('/product/saloon/dashboard');
      return;
    }
    if (
      slug === 'natural-milk-dairy' ||
      slug === 'madhur-dairy' ||
      slug.includes('dairy') ||
      product.name?.toLowerCase().includes('dairy') ||
      product.name?.toLowerCase().includes('milk')
    ) {
      navigate('/dashboard/natural-milk-dairy');
      return;
    }
    if (slug === 'tours-and-travels' || slug.includes('tour') || slug.includes('travel')) {
      navigate('/dashboard/tours-and-travels');
      return;
    }
    if (slug === 'vexa-style-hub' || slug.includes('vexa') || slug.includes('style-hub')) {
      navigate('/dashboard/vexa-style-hub');
      return;
    }
    if (product.adminUrl && product.adminUrl.startsWith('/') && product.adminUrl !== '/admin/products') {
      navigate(product.adminUrl);
    } else {
      navigate('/dashboard');
    }
  };

  const handleOpenFullPage = () => {
    onClose();
    navigate(`/product/${product.slug || product.id}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="module-modal-box full-product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className={`app-icon-box bg-icon-${product.color || 'green'}`}>
              <Layers className={`app-icon text-icon-${product.color || 'green'}`} size={26} />
            </div>
            <div>
              <div className="modal-badge-row">
                <span className="product-category-tag">{product.category || 'ERP Module'}</span>
                <span className="badge-active">{product.status || 'Active'}</span>
                <span className="badge-pro-edition">Enterprise Suite</span>
              </div>
              <h3 className="modal-title" style={{ fontSize: '1.4rem' }}>{product.name}</h3>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-nav-tabs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            Overview &amp; Details
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`modal-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
          >
            Features &amp; Capabilities ({product.features?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`modal-tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
          >
            Technical &amp; Endpoints
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="modal-body">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="modal-tab-content">
              <div className="product-modal-desc">
                <h4 className="detail-section-heading">Executive Summary</h4>
                <p className="product-main-description">{product.description}</p>
                {product.longDescription && (
                  <p className="product-long-description">{product.longDescription}</p>
                )}
              </div>

              {/* Quick Highlight Metrics */}
              <div className="product-quick-metrics-grid">
                <div className="metric-highlight-card">
                  <Activity size={18} className="text-icon-green" />
                  <div>
                    <span className="m-val">Real-Time</span>
                    <span className="m-lbl">Live Synchronization</span>
                  </div>
                </div>

                <div className="metric-highlight-card">
                  <Shield size={18} className="text-icon-purple" />
                  <div>
                    <span className="m-val">RBAC Security</span>
                    <span className="m-lbl">Role-Based Access</span>
                  </div>
                </div>

                <div className="metric-highlight-card">
                  <Database size={18} className="text-icon-blue" />
                  <div>
                    <span className="m-val">MongoDB Core</span>
                    <span className="m-lbl">ACID Cloud Storage</span>
                  </div>
                </div>
              </div>

              {/* Endpoints Box */}
              <div className="product-endpoints-box" style={{ marginTop: '16px' }}>
                <div className="endpoint-row">
                  <span className="endpoint-label">Website URL:</span>
                  <a
                    href={product.websiteUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="endpoint-value link"
                  >
                    {product.websiteUrl || `https://speshway.com/${product.slug}`}
                    <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
                  </a>
                </div>
                <div className="endpoint-row">
                  <span className="endpoint-label">Admin Dashboard URL:</span>
                  <span className="endpoint-value">{product.adminUrl || '/admin/products'}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURES */}
          {activeTab === 'features' && (
            <div className="modal-tab-content">
              <h4 className="detail-section-heading">Included Core Capabilities</h4>
              <div className="features-grid-enhanced">
                {product.features?.map((feat, idx) => (
                  <div key={idx} className="feature-check-item-card">
                    <span className="feat-check-circ">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <div className="feat-content">
                      <strong className="feat-name">{feat}</strong>
                      <span className="feat-sub">Automated workflow with audit trail &amp; live sync</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TECHNICAL & URLS */}
          {activeTab === 'tech' && (
            <div className="modal-tab-content">
              <h4 className="detail-section-heading">Integration &amp; Deployment Specs</h4>
              <div className="tech-specs-table">
                <div className="tech-row">
                  <span className="tech-k">API Endpoint:</span>
                  <code className="tech-v">/api/products/{product.slug || product.id}</code>
                </div>
                <div className="tech-row">
                  <span className="tech-k">Public Landing Page:</span>
                  <span className="tech-v">{product.websiteUrl || `https://speshway.com/${product.slug}`}</span>
                </div>
                <div className="tech-row">
                  <span className="tech-k">Admin Management Route:</span>
                  <code className="tech-v">{product.adminUrl || '/admin/products'}</code>
                </div>
                <div className="tech-row">
                  <span className="tech-k">WebSocket Channels:</span>
                  <span className="tech-v">product:updated, activity:new, state:sync</span>
                </div>
                <div className="tech-row">
                  <span className="tech-k">Data Protection:</span>
                  <span className="tech-v">AES-256 at rest, TLS 1.3 in transit</span>
                </div>
              </div>
            </div>
          )}

          {/* PRIMARY ACTION BUTTONS REQUIRED BY USER */}
          <div className="product-modal-action-buttons" style={{ marginTop: '24px' }}>
            <button
              onClick={handleViewWebsite}
              className="btn-product-action btn-view-website"
            >
              <Globe size={18} />
              <span>View Website</span>
              <ExternalLink size={14} className="ml-auto" />
            </button>

            <button
              onClick={handleViewAdminDashboard}
              className="btn-product-action btn-view-admin"
            >
              <Shield size={18} />
              <span>View Admin Dashboard</span>
              <ArrowRight size={14} className="ml-auto" />
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '14px' }}>
            <button onClick={handleOpenFullPage} className="btn-open-full-page">
              Open Full Dedicated Page View &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

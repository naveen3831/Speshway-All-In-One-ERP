import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { useSocket } from '../context/SocketContext';
import {
  Globe,
  Shield,
  ArrowLeft,
  Check,
  ExternalLink,
  Layers,
  Sparkles,
  Cpu,
  Server,
  Zap,
  Lock,
  Database,
  Code2,
  Terminal,
  Activity,
  Edit2,
  ArrowRight,
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useSocket();
  const [modalMode, setModalMode] = useState(null);
  const navigate = useNavigate();

  const product = products.find((p) => p.slug === id || p.id === id);

  if (!product) {
    return (
      <div className="landing-wrapper">
        <Navbar onOpenGetStarted={() => setModalMode('get-started')} />
        <main className="page-main-container" style={{ textAlign: 'center', padding: '100px 20px', flex: '1 0 auto' }}>
          <h2>Product Not Found</h2>
          <p style={{ marginTop: '10px', color: '#64748b' }}>
            The requested ERP application could not be found in the catalog.
          </p>
          <Link to="/products" className="btn-hero-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
            &larr; Back to Products Catalog
          </Link>
        </main>
        <Footer
          onOpenGetStarted={() => setModalMode('get-started')}
          onOpenDemo={() => setModalMode('demo')}
        />
      </div>
    );
  }

  const handleOpenWebsite = () => {
    if (product.websiteUrl && product.websiteUrl.startsWith('http')) {
      window.open(product.websiteUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Website URL configured: ${product.websiteUrl || 'https://speshway.com/' + product.slug}`);
    }
  };

  const handleOpenAdminDashboard = () => {
    // Open in this site only as requested
    if (product.slug === 'tours-and-travels' || product.id === 'tours-and-travels') {
      navigate('/product/tours-and-travels/dashboard');
    } else if (product.slug === 'vexa-style-hub' || product.id === 'vexa-style-hub') {
      navigate('/product/vexa-style-hub/dashboard');
    } else if (product.adminUrl && product.adminUrl.startsWith('/')) {
      navigate(product.adminUrl);
    } else {
      navigate(`/product/${product.slug || product.id}/dashboard`);
    }
  };

  const technologies = product.technologies && product.technologies.length > 0
    ? product.technologies
    : ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'JWT Auth', 'REST API'];

  return (
    <div className="landing-wrapper">
      <Navbar onOpenGetStarted={() => setModalMode('get-started')} />

      <main className="product-page-detail-wrapper">
        <div className="detail-container">
          {/* Back button */}
          <Link to="/products" className="back-link-btn">
            <ArrowLeft size={16} /> Back to Products Catalog
          </Link>

          {/* Product Hero Banner */}
          <div className="product-detail-hero">
            <div className="detail-hero-left">
              <div className="modal-badge-row">
                <span className="product-category-tag">{product.category}</span>
                <span className="badge-active">{product.status || 'Active Product'}</span>
                <span className="badge-pro-edition">Enterprise Ready</span>
              </div>
              <h1 className="product-detail-h1">{product.name}</h1>
              <p className="product-detail-sub">{product.description}</p>

              {/* ACTION BUTTONS REQUIRED BY USER */}
              <div className="detail-actions-row">
                <button onClick={handleOpenWebsite} className="btn-product-action btn-view-website">
                  <Globe size={18} />
                  <span>View Website</span>
                  <ExternalLink size={14} />
                </button>

                <button
                  onClick={handleOpenAdminDashboard}
                  className="btn-product-action btn-view-admin"
                  title="Open Admin Dashboard in this site"
                >
                  <Shield size={18} />
                  <span>View Admin Dashboard</span>
                  <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </button>

                <button
                  onClick={() => navigate(`/admin/products/edit/${product.slug || product.id}`)}
                  className="btn-product-action btn-edit-admin-quick"
                  title="Edit this product in Admin"
                >
                  <Edit2 size={16} />
                  <span>Edit Product</span>
                </button>

                <button onClick={() => setModalMode('demo')} className="btn-hero-secondary">
                  Request Live Demo
                </button>
              </div>
            </div>

            <div className="detail-hero-right">
              <div className="product-hero-card-preview">
                <div className="preview-top-badge">
                  <Sparkles size={16} className="text-icon-green" />
                  <span>Enterprise Edition</span>
                </div>
                <div className="preview-icon-giant">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="product-hero-custom-img" />
                  ) : (
                    <Layers size={64} className="text-icon-green" />
                  )}
                </div>
                <h3>{product.name}</h3>
                <p>Real-Time Synchronized &bull; Role-Based Access</p>
                <div className="preview-stats-bar">
                  <div>
                    <span className="p-num">99.9%</span>
                    <span className="p-lbl">Uptime SLA</span>
                  </div>
                  <div>
                    <span className="p-num">256-bit</span>
                    <span className="p-lbl">AES Encryption</span>
                  </div>
                  <div>
                    <span className="p-num">&lt;50ms</span>
                    <span className="p-lbl">API Latency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION: TECHNOLOGIES USED (CRITICAL USER REQUIREMENT) */}
          <section className="tech-stack-deep-section">
            <div className="tech-stack-card">
              <div className="tech-stack-header">
                <div className="tech-header-left">
                  <div className="tech-icon-circ">
                    <Cpu size={24} className="text-icon-green" />
                  </div>
                  <div>
                    <h2 className="tech-card-title">Technologies &amp; Architecture Stack</h2>
                    <p className="tech-card-sub">
                      Modern, high-performance technology stack powering this ERP module
                    </p>
                  </div>
                </div>
                <span className="tech-badge-count">{technologies.length} Technologies</span>
              </div>

              <div className="tech-chips-grid">
                {technologies.map((tech, idx) => (
                  <div key={idx} className="tech-stack-badge-item">
                    <Code2 size={16} className="text-icon-green" />
                    <span className="tech-name-bold">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Detailed Features & Architecture */}
          <section className="detail-deep-dive">
            {/* Description & Overview */}
            <div className="dive-block">
              <div className="dive-title-row">
                <Terminal size={22} className="text-icon-green" />
                <h2>Project Overview &amp; Description</h2>
              </div>
              <p className="dive-desc-para">{product.longDescription || product.description}</p>
            </div>

            {/* Features Checklist */}
            <div className="dive-block">
              <div className="dive-title-row">
                <Zap size={22} className="text-icon-purple" />
                <h2>Key Capabilities &amp; Features ({product.features?.length || 0})</h2>
              </div>
              <div className="features-grid-deep">
                {product.features?.map((feat, idx) => (
                  <div key={idx} className="feat-box-deep">
                    <span className="feat-check-circ">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <div className="feat-text-wrap">
                      <strong className="feat-title">{feat}</strong>
                      <span className="feat-subtext">Enterprise workflow with real-time audit logging</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <CtaBanner onOpenGetStarted={() => navigate('/get-started')} />
      </main>

      <Footer
        onOpenGetStarted={() => navigate('/get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      {modalMode && (
        <DemoModal mode={modalMode} onClose={() => setModalMode(null)} />
      )}
    </div>
  );
};

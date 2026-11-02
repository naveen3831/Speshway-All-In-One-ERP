import React, { useState } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { useSocket } from '../context/SocketContext';
import {
  Search,
  Globe,
  Shield,
  Layers,
  Users,
  Wallet,
  FolderKanban,
  UserCheck,
  CalendarDays,
  UserPlus,
  ListTodo,
  BarChart3,
  Monitor,
  TrendingUp,
  PieChart,
  Handshake,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Users,
  Wallet,
  FolderKanban,
  UserCheck,
  CalendarDays,
  UserPlus,
  ListTodo,
  BarChart3,
  Monitor,
  TrendingUp,
  PieChart,
  Handshake,
  Layers,
};

export const ProductsPage = () => {
  const { products } = useSocket();
  const [modalMode, setModalMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const categories = [
    'All',
    'Human Resources',
    'Finance & HR',
    'Productivity',
    'Finance',
    'Sales & CRM',
    'Operations',
    'Business Intelligence',
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleCardClick = (prod) => {
    // Navigate directly to the dedicated full details page for this product
    navigate(`/product/${prod.slug || prod.id}`);
  };

  return (
    <div className="landing-wrapper">
      <Navbar onOpenGetStarted={() => setModalMode('get-started')} />

      <main className="page-main-container">
        {/* Header */}
        <section className="page-hero-header">
          <div className="section-badge">
            <span>Enterprise Product Catalog</span>
          </div>
          <h1 className="page-hero-title">Speshway ERP Applications &amp; Products</h1>
          <p className="page-hero-sub">
            Explore our comprehensive suite of modular, interconnected ERP applications. Click on any product to open its dedicated details, tech stack, and live features.
          </p>

          {/* Search Bar */}
          <div className="catalog-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products by name or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="catalog-search-input"
            />
          </div>

          {/* Category Tabs */}
          <div className="category-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Product Cards Grid - CLICKING A CARD NAVIGATES TO THE NEW DETAILS PAGE */}
        <section className="catalog-grid-section">
          <div className="catalog-grid">
            {filteredProducts.map((prod) => {
              const Icon = iconMap[prod.iconName] || Layers;
              return (
                <div
                  key={prod.id || prod.slug}
                  className="catalog-card clickable-catalog-card"
                  onClick={() => handleCardClick(prod)}
                  title={`Click to view full page details for ${prod.name}`}
                >
                  <div className="catalog-card-header">
                    <div className={`app-icon-box bg-icon-${prod.color || 'green'}`}>
                      {prod.imageUrl ? (
                        <img src={prod.imageUrl} alt={prod.name} className="app-icon-custom-img" />
                      ) : (
                        <Icon className={`app-icon text-icon-${prod.color || 'green'}`} size={24} />
                      )}
                    </div>
                    <span className="product-category-tag">{prod.category}</span>
                  </div>

                  {prod.imageUrl && (
                    <div className="catalog-card-image-wrap">
                      <img src={prod.imageUrl} alt={prod.name} className="catalog-card-preview-img" />
                    </div>
                  )}

                  <h3 className="catalog-product-name">{prod.name}</h3>
                  <p className="catalog-product-desc">{prod.description}</p>

                  {/* Technologies Preview Chips */}
                  {prod.technologies && prod.technologies.length > 0 && (
                    <div className="catalog-tech-pills">
                      <span className="tech-mini-label"><Cpu size={12} /> Tech:</span>
                      {prod.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-chip-small">{tech}</span>
                      ))}
                      {prod.technologies.length > 3 && (
                        <span className="tech-chip-more">+{prod.technologies.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* Core Features Preview */}
                  <div className="catalog-feature-mini-list">
                    {prod.features?.slice(0, 3).map((f, i) => (
                      <span key={i} className="mini-feat-tag">&bull; {f}</span>
                    ))}
                  </div>

                  {/* Quick Action Links inside card */}
                  <div className="catalog-card-footer">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (prod.websiteUrl && prod.websiteUrl.startsWith('http')) {
                          window.open(prod.websiteUrl, '_blank', 'noopener,noreferrer');
                        } else {
                          navigate(`/product/${prod.slug || prod.id}`);
                        }
                      }}
                      className="catalog-btn-link"
                      title="View Website"
                    >
                      <Globe size={14} /> View Website
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
const isHospital =
                          prod.slug === 'speshway-hospitals' ||
                          prod.slug === 'hospitals' ||
                          prod.slug?.includes('hospital') ||
                          prod.name?.toLowerCase().includes('hospital') ||
                          prod.adminUrl?.toLowerCase().includes('hospital');

                        let url;
                        if (isHospital) {
                          url = '/product/speshway-hospitals/dashboard';
                        } else if (prod.slug === 'tours-and-travels' || prod.id === 'tours-and-travels') {
                          url = '/product/tours-and-travels/dashboard';
                        } else {
                          url = prod.adminUrl && prod.adminUrl !== '/admin/products'
                            ? prod.adminUrl
                            : `/product/${prod.slug || prod.id}/dashboard`;
                        }
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }}
                      className="catalog-btn-link admin-color"
                      title="View Admin Dashboard"
                    >
                      <Shield size={14} /> Admin Dashboard
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

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

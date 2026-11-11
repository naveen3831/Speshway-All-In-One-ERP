import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/landing/Navbar';
import { CtaBanner } from '../components/landing/CtaBanner';
import { Footer } from '../components/landing/Footer';
import { DemoModal } from '../components/landing/DemoModal';
import { useSocket } from '../context/SocketContext';
import {
  normalizeProductCategory,
  PRIMARY_ERP_CATEGORIES,
  getPrimaryCategory,
} from '../utils/adminProjects';
import { getProductFallbackImage } from '../utils/productImages';
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
  Building2,
  Plane,
  Package,
  Store,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
  SlidersHorizontal,
  ChevronDown,
  Check,
  X,
} from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';

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
  Building2,
  Plane,
  Package,
  Store,
};

const EXCLUDED_SLUGS = new Set([
  'reports',
  'performance',
  'recruitment',
  'finance',
  'clients',
  'leave',
  'tasks',
  'assets',
  'payroll',
  'projects',
  'directory',
  'hrms',
]);

const EXCLUDED_NAMES = new Set([
  'reports & analytics',
  'performance management',
  'recruitment & ats',
  'finance & accounts',
  'client management (crm)',
  'client management',
  'leave & attendance',
  'task management',
  'asset management',
  'payroll system',
  'project management',
  'employee directory',
  'hrms portal',
]);

export const ProductsPage = () => {
  const { products, triggerUpdateProduct, homeContent } = useSocket();

  // Determine whether Products/Projects should be visible with homeContent as source of truth
  const getProductsVisible = () => {
    if (homeContent?.navbar?.showProducts !== undefined) return Boolean(homeContent.navbar.showProducts);
    const stored = localStorage.getItem('speshway_navbar_products_visible');
    if (stored !== null) return stored === 'true';
    return false;
  };

  const [showProducts, setShowProducts] = useState(getProductsVisible);

  useEffect(() => {
    setShowProducts(getProductsVisible());
  }, [homeContent?.navbar?.showProducts]);

  useEffect(() => {
    const handleSync = () => setShowProducts(getProductsVisible());
    window.addEventListener('speshway_navbar_products_changed', handleSync);
    window.addEventListener('speshway_navbar_visibility_changed', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('speshway_navbar_products_changed', handleSync);
      window.removeEventListener('speshway_navbar_visibility_changed', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [homeContent?.navbar?.showProducts]);

  // If products page is turned OFF by admin, hide the page and redirect to Home
  if (!showProducts) {
    return <Navigate to="/" replace />;
  }

  const handleDirectImageUpload = (prod, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('Image exceeds 10MB limit. Please choose a smaller image.');
      return;
    }
    const targetId = prod.slug || prod.id || prod._id;
    setUploadingSlug(targetId);

    const reader = new FileReader();
    reader.onload = () => {
      const rawData = reader.result;
      try {
        const img = new Image();
        img.onload = async () => {
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);
          if (triggerUpdateProduct) {
            await triggerUpdateProduct(targetId, { imageUrl: compressed });
          }
          setUploadingSlug(null);
          setToastMessage(`Photo for ${prod.name} uploaded to Cloudinary CDN & saved to database!`);
          setTimeout(() => setToastMessage(null), 4000);
        };
        img.onerror = async () => {
          if (triggerUpdateProduct) await triggerUpdateProduct(targetId, { imageUrl: rawData });
          setUploadingSlug(null);
        };
        img.src = rawData;
      } catch (err) {
        if (triggerUpdateProduct) triggerUpdateProduct(targetId, { imageUrl: rawData });
        setUploadingSlug(null);
      }
    };
    reader.readAsDataURL(file);
  };
  const [modalMode, setModalMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const mobileFilterRef = useRef(null);
  const [uploadingSlug, setUploadingSlug] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  // Close mobile filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileFilterRef.current && !mobileFilterRef.current.contains(e.target)) {
        setShowMobileFilter(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  // Filter out the 12 generic application modules
  const availableProducts = (products || [])
    .filter((p) => {
      const slug = (p.slug || p.id || '').toLowerCase();
      const name = (p.name || '').toLowerCase().trim();
      if (EXCLUDED_SLUGS.has(slug)) return false;
      if (EXCLUDED_NAMES.has(name)) return false;
      return true;
    })
    .map(normalizeProductCategory);

  const categories = PRIMARY_ERP_CATEGORIES;

  const filteredProducts = availableProducts.filter((p) => {
    const primaryCat = getPrimaryCategory(p);
    const matchesSearch =
      (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      primaryCat.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || primaryCat === activeCategory;
    return matchesSearch && matchesCat;
  });

  const handleCardClick = (prod) => {
    // Navigate directly to the dedicated full details page for this product
    navigate(`/product/${prod.slug || prod.id}`);
  };

  return (
    <div className="landing-wrapper">
      <Navbar
        onOpenGetStarted={() => setModalMode('get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      <main className="page-main-container">
        {/* Header */}
        <section className="page-hero-header">
          <h1 className="page-hero-title">Speshway ERP Applications &amp; Products</h1>
          <p className="page-hero-sub">
            Explore our comprehensive suite of modular, interconnected ERP applications. Click on any product to open its dedicated details, tech stack, and live features.
          </p>

          {/* Search & Filter Bar Container */}
          <div className="catalog-search-filter-wrapper">
            <div className="catalog-search-bar">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search products by name or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="catalog-search-input"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="catalog-search-clear-btn"
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Mobile Responsive Only Filter Option Side of Search */}
            <div className="catalog-mobile-filter-wrap" ref={mobileFilterRef}>
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

          {/* Category Tabs (Desktop Only) */}
          <div className="category-filter-tabs desktop-only-filter-tabs">
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
                      <Icon className={`app-icon text-icon-${prod.color || 'green'}`} size={24} />
                    </div>
                    <span className="product-category-tag">{prod.category}</span>
                  </div>

                  {(() => {
                    const rawImg = prod.imageUrl && typeof prod.imageUrl === 'string' ? prod.imageUrl.trim() : '';
                    const imgUrl = rawImg || getProductFallbackImage(prod.slug || prod.id || prod.name) || '';
                    return imgUrl ? (
                      <div className="catalog-card-image-wrap">
                        <img
                          src={imgUrl}
                          alt={prod.name}
                          className="catalog-card-preview-img"
                          onError={(e) => {
                            const fallback = getProductFallbackImage(prod.slug || prod.id || prod.name);
                            if (fallback && e.target.src !== fallback) {
                              e.target.src = fallback;
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <label
                        className="catalog-card-image-placeholder"
                        onClick={(e) => e.stopPropagation()}
                        title="Click to directly select and upload image for this project"
                        style={{ cursor: 'pointer' }}
                      >
                        <ImageIcon size={22} className="placeholder-icon" />
                        <span>+ Add Project Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleDirectImageUpload(prod, e)}
                        />
                      </label>
                    );
                  })()}

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
                      title="Website"
                    >
                      <Globe size={14} /> Website
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const s = (prod.slug || prod.id || '').toLowerCase();
                        let url = '/product/' + s + '/dashboard';

                        if (s.includes('savitri') || s.includes('saree')) url = '/product/savitri-sarees/dashboard';
                        else if (s.includes('sana') || s.includes('stayz')) url = '/product/sana-stayz/dashboard';
                        else if (s.includes('learn') || s.includes('lms')) url = '/product/learnhub/dashboard';
                        else if (s.includes('food')) url = '/product/foodway/dashboard';
                        else if (s.includes('tour') || s.includes('travel') || s.includes('bus')) url = '/product/tours-and-travels/dashboard';
                        else if (s.includes('hospital')) url = '/product/speshway-hospitals/dashboard';
                        else if (s.includes('dairy') || s.includes('milk')) url = '/product/natural-milk-dairy/dashboard';
                        else if (s.includes('aneera') || s.includes('silk')) url = '/product/aneera-silks/dashboard';
                        else if (s.includes('e-com') || s.includes('ecommerce') || s.includes('nexora')) url = '/product/e-commerce/dashboard';
                        else if (s.includes('fleet')) url = '/product/fleet-management/dashboard';
                        else if (s.includes('fitness') || s.includes('gym')) url = '/product/american-fitness-gym/dashboard';
                        else if (s.includes('flavora') || s.includes('kitchen')) url = '/product/flavora-kitchen/dashboard';
                        else if (s.includes('hrms')) url = '/product/speshway-hrms/dashboard';
                        else if (s.includes('ride') || s.includes('bike') || s.includes('flow')) url = '/product/ride-flow/dashboard';
                        else if (s.includes('joy') || s.includes('event')) url = '/product/joy-events/dashboard';
                        else if (s.includes('salon') || s.includes('saloon')) url = '/product/saloon/dashboard';
                        else if (s.includes('vexa') || s.includes('style-hub')) url = '/product/vexa-style-hub/dashboard';
                        else if (prod.adminUrl && prod.adminUrl.startsWith('/') && prod.adminUrl !== '/admin/products') url = prod.adminUrl;

                        navigate(url);
                      }}
                      className="catalog-btn-link admin-color"
                      title="View ERP"
                    >
                      <Shield size={14} /> View ERP
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

      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#064e3b',
          color: '#34d399',
          border: '1px solid #10b981',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          zIndex: 9999,
          fontSize: '13.5px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <CheckCircle size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

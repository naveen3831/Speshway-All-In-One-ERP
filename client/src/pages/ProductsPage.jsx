import React, { useState, useEffect } from 'react';
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
  Building2,
  Plane,
  Package,
  Store,
  Image as ImageIcon,
  Loader2,
  CheckCircle,
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

export const getProductFallbackImage = (slugOrIdOrName) => {
  const s = (slugOrIdOrName || '').toLowerCase();
  if (s.includes('savitri') || s.includes('saree')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793792633/speshway_products/savitri-sarees.jpg';
  if (s.includes('sana') || s.includes('stayz')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788538/speshway_products/sana-stayz.jpg';
  if (s.includes('learn') || s.includes('lms')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788535/speshway_products/learnhub.jpg';
  if (s.includes('food') || s.includes('kitchen-cloud')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788534/speshway_products/foodway.jpg';
  if (s.includes('joy') || s.includes('event')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788535/speshway_products/joy-events.jpg';
  if (s.includes('hrms')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788540/speshway_products/speshway-hrms.jpg';
  if (s.includes('flavora') || s.includes('kitchen') || s.includes('restaurant')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788532/speshway_products/flavora-kitchen.jpg';
  if (s.includes('fitness') || s.includes('gym')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788529/speshway_products/american-fitness-gym.jpg';
  if (s.includes('fleet')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788533/speshway_products/fleet-management.jpg';
  if (s.includes('ride') || s.includes('bike') || s.includes('flow')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788537/speshway_products/ride-flow.jpg';
  if (s.includes('salon') || s.includes('saloon') || s.includes('spy')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788538/speshway_products/saloon.jpg';
  if (s.includes('dairy') || s.includes('milk') || s.includes('madhur')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788536/speshway_products/natural-milk-dairy.jpg';
  if (s.includes('aneera') || s.includes('silk')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788531/speshway_products/aneera-silks.jpg';
  if (s.includes('e-com') || s.includes('ecommerce') || s.includes('e com') || s.includes('nexora')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788531/speshway_products/e-commerce.jpg';
  if (s.includes('hospital') || s.includes('hms')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788540/speshway_products/speshway-hospitals.jpg';
  if (s.includes('tour') || s.includes('travel') || s.includes('bus')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788542/speshway_products/tours-and-travels.jpg';
  if (s.includes('vexa') || s.includes('style')) return 'https://res.cloudinary.com/ddgjubbbx/image/upload/v1793788543/speshway_products/vexa-style-hub.png';
  return '';
};

export const ProductsPage = () => {
  const { products, triggerUpdateProduct } = useSocket();

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
  const [uploadingSlug, setUploadingSlug] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, []);

  // Filter out the 12 generic application modules
  const availableProducts = (products || []).filter((p) => {
    const slug = (p.slug || p.id || '').toLowerCase();
    const name = (p.name || '').toLowerCase().trim();
    if (EXCLUDED_SLUGS.has(slug)) return false;
    if (EXCLUDED_NAMES.has(name)) return false;
    return true;
  });

  const categories = [
    'All',
    ...Array.from(new Set(availableProducts.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProducts = availableProducts.filter((p) => {
    const matchesSearch =
      (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
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
                      <Icon className={`app-icon text-icon-${prod.color || 'green'}`} size={24} />
                    </div>
                    <span className="product-category-tag">{prod.category}</span>
                  </div>

                  {(() => {
                    const imgUrl = prod.imageUrl || getProductFallbackImage(prod.slug || prod.id || prod.name);
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
                      title="View Website"
                    >
                      <Globe size={14} /> View Website
                    </button>

                    <label
                      onClick={(e) => e.stopPropagation()}
                      className="catalog-btn-image-action"
                      title="Click to upload/change image directly from your computer"
                      style={{ cursor: 'pointer', margin: 0, position: 'relative' }}
                    >
                      <ImageIcon size={13} />
                      <span>{prod.imageUrl ? 'Change Image' : 'Add Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleDirectImageUpload(prod, e)}
                      />
                    </label>

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
                      <Shield size={14} /> View Admin Dashboard
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

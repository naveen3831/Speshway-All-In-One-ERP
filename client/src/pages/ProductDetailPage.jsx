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
  ArrowRight,
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useSocket();
  const [modalMode, setModalMode] = useState(null);
  const navigate = useNavigate();

  // Robust product lookup with instant fallback if socket/DB is still connecting
  const foundProduct = products && products.length > 0 ? products.find((p) => p.slug === id || p.id === id) : null;
  const product = foundProduct || (id === 'speshway-hospitals' || id === 'hospitals' || id?.includes('hospital') ? {
    id: 'speshway-hospitals',
    slug: 'speshway-hospitals',
    name: 'Speshway Hospitals',
    category: 'Human Resources',
    status: 'active',
    description: 'HMS Enterprise is a comprehensive Hospital Management System designed to streamline hospital operations, including patient management, appointments, EMR, billing, pharmacy, laboratory reports, inventory, and staff management — all through one centralized digital platform.',
    websiteUrl: 'https://speshway.com/hospitals',
    adminUrl: '/product/speshway-hospitals/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'REST API'],
    features: ['Diagnostic Lab Reports', 'Pathology & EMR', 'Appointments & Scheduling', 'Pharmacy & Blood Bank', 'Role-Based Access'],
  } : (id === 'natural-milk-dairy' || id === 'madhur-dairy' || id?.includes('dairy') || id?.includes('milk')) ? {
    id: 'natural-milk-dairy',
    slug: 'natural-milk-dairy',
    name: 'Natural Milk Dairy',
    category: 'Human Resources',
    status: 'active',
    description: 'Natural Milk Dairy is an all-in-one Dairy Management System that simplifies product management, customer orders, subscriptions, inventory, daily deliveries, and payments through a centralized admin dashboard.',
    websiteUrl: 'https://speshway.com/natural-milk-dairy',
    adminUrl: '/product/natural-milk-dairy/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'REST API'],
    features: ['Real-Time Orders', 'Role-Based Access', 'Daily Milk Subscriptions', 'Delivery Route Tracking', 'Inventory & Cold Storage', 'Revenue Analytics'],
  } : (id === 'aneera-silks' || id === 'aneera' || id?.includes('aneera') || id?.includes('silk')) ? {
    id: 'aneera-silks',
    slug: 'aneera-silks',
    name: 'Aneera Silks',
    category: 'Human Resources',
    status: 'active',
    description: 'Aneera Silks is a luxury online saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections, with beautiful product galleries, seamless shopping, secure payments, and convenient order management',
    websiteUrl: 'https://aneerasilks.com',
    adminUrl: '/product/aneera-silks/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Luxury Saree Catalog', 'Silk Mark Certification', 'Real-Time Order Tracking', 'Role-Based Access', 'Bridal Customization', 'Secure Payments'],
  } : (id === 'e-commerce' || id === 'ecommerce' || id?.includes('e-com') || id?.includes('nexora')) ? {
    id: 'e-commerce',
    slug: 'e-commerce',
    name: 'E commerce',
    category: 'Human Resources',
    status: 'active',
    description: 'Speshway Ecom is an all-in-one online shopping platform offering multiple product categories, seamless product browsing, wishlist, cart management, secure payments, and convenient order tracking.',
    websiteUrl: 'https://nexora.speshway.com',
    adminUrl: '/product/e-commerce/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Multi-Category Catalog', 'Real-Time Order Tracking', 'Role-Based Access', 'Cart & Wishlist Engine', 'Payment Gateway Integration', 'Inventory Stock Alerts'],
  } : (id === 'saloon' || id === 'salon' || id?.includes('salon') || id?.includes('saloon') || id?.includes('spy-salon')) ? {
    id: 'saloon',
    slug: 'saloon',
    name: 'Saloon',
    category: 'Business Intelligence',
    status: 'active',
    description: 'SPY Salon is a premium beauty and wellness studio offering professional hair styling, beauty treatments, skincare, grooming, and personalized salon services with convenient online appointment booking.',
    websiteUrl: 'https://spysalon.speshway.com',
    adminUrl: '/product/saloon/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Real-Time Appointments', 'Stylist & Chair Rostering', 'Service & Package Catalog', 'Loyalty & Membership Passes', 'POS & Split Billing', 'Inventory & Salon Consumables'],
  } : id === 'vexa-style-hub' ? {
    id: 'vexa-style-hub',
    slug: 'vexa-style-hub',
    name: 'Vexa Style Hub',
    category: 'Fashion & Apparel',
    status: 'Active Product',
    description: 'VEXA Style Hub is a modern clothing e-commerce platform that offers a seamless online shopping experience with stylish collections, easy product browsing, secure payments, and convenient order tracking.',
    websiteUrl: 'https://vexastylehub.com',
    adminUrl: '/product/vexa-style-hub/dashboard',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    features: ['Real-Time Orders', 'Role-Based Access', 'Apparel Inventory', 'Sales Tracking', 'Manufacturing Batches'],
  } : null);

  const handleOpenWebsite = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const url = product?.websiteUrl || `https://speshway.com/${product?.slug || id || ''}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error opening website:', err);
    }
  };

  const handleOpenAdminDashboard = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const targetSlug = (product?.slug || id || '').toLowerCase();
      if (targetSlug === 'speshway-hospitals' || targetSlug === 'hospitals' || targetSlug.includes('hospital')) {
        navigate('/dashboard/speshway-hospitals');
      } else if (targetSlug === 'natural-milk-dairy' || targetSlug === 'madhur-dairy' || targetSlug.includes('dairy') || targetSlug.includes('milk')) {
        navigate('/product/natural-milk-dairy/dashboard');
      } else if (targetSlug === 'aneera-silks' || targetSlug === 'aneera' || targetSlug.includes('aneera') || targetSlug.includes('silk')) {
        navigate('/product/aneera-silks/dashboard');
      } else if (targetSlug === 'e-commerce' || targetSlug === 'ecommerce' || targetSlug.includes('nexora') || targetSlug.includes('e-com') || targetSlug.includes('ecom')) {
        navigate('/product/e-commerce/dashboard');
      } else if (targetSlug === 'saloon' || targetSlug === 'salon' || targetSlug.includes('saloon') || targetSlug.includes('salon') || targetSlug.includes('spy-salon')) {
        navigate('/product/saloon/dashboard');
      } else if (targetSlug === 'tours-and-travels' || targetSlug.includes('tour') || targetSlug.includes('travel')) {
        navigate('/dashboard/tours-and-travels');
      } else if (targetSlug === 'vexa-style-hub' || targetSlug.includes('vexa') || targetSlug.includes('style-hub')) {
        navigate('/dashboard/vexa-style-hub');
      } else if (product?.adminUrl && product.adminUrl.startsWith('/') && product.adminUrl !== '/admin/products') {
        navigate(product.adminUrl);
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error opening admin dashboard:', err);
    }
  };

  if (!product) {
    return (
      <div className="landing-wrapper">
        <Navbar
          onOpenGetStarted={() => setModalMode('get-started')}
          onOpenDemo={() => setModalMode('demo')}
        />
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

  const technologies = product.technologies && product.technologies.length > 0
    ? product.technologies
    : ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'JWT Auth', 'REST API'];

  return (
    <div className="landing-wrapper">
      <Navbar
        onOpenGetStarted={() => setModalMode('get-started')}
        onOpenDemo={() => setModalMode('demo')}
      />

      <main className="product-page-detail-wrapper">
        <div className="detail-container">
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

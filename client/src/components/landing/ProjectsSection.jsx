import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Plane,
  Package,
  Store,
  Sparkles,
  ShoppingCart,
  Scissors,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';
import { useSocket } from '../../context/SocketContext';
import { getProductFallbackImage } from '../../pages/ProductsPage';
import { normalizeProductCategory } from '../../utils/adminProjects';
import './ProjectsSection.css';

const iconMap = {
  Building2,
  Plane,
  Package,
  Store,
  Sparkles,
  ShoppingCart,
  Scissors,
  Layers,
};

const DEFAULT_PROJECTS = [
  {
    id: 'speshway-hospitals',
    slug: 'speshway-hospitals',
    name: 'Speshway Hospitals',
    category: 'Healthcare & Hospitals',
    description: 'Enterprise Hospital Management System (HMS) automating inpatient admissions, OPD/IPD doctor scheduling, electronic health records (EHR), pathology lab reports, pharmacy inventory, and compliant billing.',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Diagnostic Lab Reports', 'Patient Admissions & OPD/IPD', 'EHR & Digital Records', 'Pharmacy Inventory & Billing'],
    iconName: 'Building2',
    color: 'green',
    status: 'Live Enterprise',
    adminUrl: '/dashboard/speshway-hospitals',
  },
  {
    id: 'tours-and-travels',
    slug: 'tours-and-travels',
    name: 'Tours & Travels ERP',
    category: 'Tours & Travels',
    description: 'Comprehensive travel agency software for booking itineraries, flight and hotel vouchers, customer lead CRM pipeline, supplier accounts, and automated travel invoicing.',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Lead & CRM Pipeline', 'Holiday Package Builder', 'Flight & Hotel Registry', 'Supplier Accounts & Invoicing'],
    iconName: 'Plane',
    color: 'cyan',
    status: 'Active ERP',
    adminUrl: '/product/tours-and-travels/dashboard',
  },
  {
    id: 'natural-milk-dairy',
    slug: 'natural-milk-dairy',
    name: 'Natural Milk Dairy',
    category: 'Dairy & Agriculture',
    description: 'All-in-one Dairy ERP simplifying farm-to-door deliveries, recurring daily milk subscriptions, cold storage temperature logging, route tracking, and revenue analytics.',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Daily Milk Subscriptions', 'Delivery Route Tracking', 'Cold Storage & Inventory', 'Revenue Analytics'],
    iconName: 'Package',
    color: 'emerald',
    status: 'Active ERP',
    adminUrl: '/product/natural-milk-dairy/dashboard',
  },
  {
    id: 'vexa-style-hub',
    slug: 'vexa-style-hub',
    name: 'Vexa Style Hub',
    category: 'Fashion & Retail',
    description: 'Premier fashion apparel ERP with inventory, size matrix management, omnichannel order processing, boutique showroom POS, and supply chain tracking.',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Variant & Size Matrix', 'Showroom POS Integration', 'Material Supply Chain', 'Sales Analytics'],
    iconName: 'Store',
    color: 'purple',
    status: 'Live Enterprise',
    adminUrl: '/product/vexa-style-hub/dashboard',
  },
  {
    id: 'aneera-silks',
    slug: 'aneera-silks',
    name: 'Aneera Silks',
    category: 'Fashion & Luxury',
    description: 'Luxury saree online destination featuring Banarasi, Kanchipuram, and designer collections, with Silk Mark verification, bridal customizations, and real-time order fulfillment.',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Luxury Saree Catalog', 'Silk Mark Certification', 'Real-Time Order Tracking', 'Secure Payment Gateway'],
    iconName: 'Sparkles',
    color: 'rose',
    status: 'Live Enterprise',
    adminUrl: '/product/aneera-silks/dashboard',
  },
  {
    id: 'e-commerce',
    slug: 'e-commerce',
    name: 'Nexora Online Store',
    category: 'E-Commerce & Retail',
    description: 'Enterprise multi-category retail e-commerce platform with real-time catalog syncing, wishlist & cart engine, coupon discounts, inventory alerts, and payment gateways.',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Tailwind/CSS'],
    features: ['Multi-Category Catalog', 'Cart & Wishlist Engine', 'Inventory Stock Alerts', 'Payment Gateway Integration'],
    iconName: 'ShoppingCart',
    color: 'red',
    status: 'Active ERP',
    adminUrl: '/product/e-commerce/dashboard',
  },
  {
    id: 'saloon',
    slug: 'saloon',
    name: 'SPY Salon Luxury Studio',
    category: 'Beauty & Wellness',
    description: 'High-end salon management ERP providing real-time online appointment scheduling, stylist chair rostering, beauty package catalogs, loyalty passes, and split POS till billing.',
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    features: ['Real-Time Appointments', 'Stylist Chair Rostering', 'Loyalty & Membership Passes', 'POS Split Billing'],
    iconName: 'Scissors',
    color: 'amber',
    status: 'Live Studio',
    adminUrl: '/product/saloon/dashboard',
  },
];

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

export const ProjectsSection = ({ onSelectProduct }) => {
  const { products } = useSocket();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter socket products or fallback to default projects
  const activeProducts = React.useMemo(() => {
    const list = Array.isArray(products) && products.length > 0 ? products : DEFAULT_PROJECTS;
    const filtered = list.filter((p) => {
      const slug = (p.slug || p.id || '').toLowerCase();
      return !EXCLUDED_SLUGS.has(slug);
    });
    return (filtered.length > 0 ? filtered : DEFAULT_PROJECTS).map(normalizeProductCategory);
  }, [products]);

  const categories = React.useMemo(() => {
    const set = new Set();
    activeProducts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [activeProducts]);

  const displayProjects = React.useMemo(() => {
    if (selectedCategory === 'All') return activeProducts;
    return activeProducts.filter((p) => p.category === selectedCategory);
  }, [activeProducts, selectedCategory]);

  const handleCardClick = (prod) => {
    if (onSelectProduct) {
      onSelectProduct(prod);
    } else {
      navigate(`/product/${prod.slug || prod.id}`);
    }
  };

  const handleAdminClick = (e, prod) => {
    e.stopPropagation();
    const adminTarget = prod.adminUrl || `/product/${prod.slug || prod.id}/dashboard`;
    navigate(adminTarget);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        {/* Section Header */}
        <div className="projects-header">
          <div className="projects-badge">
            <Sparkles size={14} />
            <span>Featured Enterprise Projects</span>
          </div>
          <h2 className="projects-title">
            Explore Our Industry-Ready <span className="highlight">ERP Projects</span>
          </h2>
          <p className="projects-subtitle">
            Explore live, interconnected enterprise applications built for modern businesses. Click any project to inspect its architecture, tech stack, and live dashboards.
          </p>
        </div>

        {/* Category Filters */}
        <div className="projects-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`project-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {displayProjects.map((prod) => {
            const Icon = iconMap[prod.iconName] || Layers;
            const targetSlug = prod.slug || prod.id;
            return (
              <div
                key={targetSlug}
                className="project-card"
                onClick={() => handleCardClick(prod)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(prod);
                  }
                }}
              >
                {/* Top: Icon & Category */}
                <div className="project-card-header">
                  <div className={`project-icon-box bg-icon-${prod.color || 'green'}`}>
                    {(() => {
                      const displayImg = prod.imageUrl || getProductFallbackImage(prod.slug || prod.id || prod.name);
                      return displayImg ? (
                        <img src={displayImg} alt={prod.name} className="app-icon-custom-img" />
                      ) : (
                        <Icon className={`app-icon text-icon-${prod.color || 'green'}`} size={24} />
                      );
                    })()}
                  </div>
                  <div className="project-badges">
                    <span className="project-category-tag">{prod.category}</span>
                    <span className="project-status-tag">
                      <span className="project-status-dot" />
                      {prod.status || 'Active ERP'}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="project-card-name">{prod.name}</h3>
                <p className="project-card-desc">{prod.description}</p>

                {/* Bullet Features Preview */}
                {prod.features && prod.features.length > 0 && (
                  <div className="project-features-list">
                    {prod.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="project-feat-item">
                        <CheckCircle2 size={13} className="project-feat-icon" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Preview */}
                {prod.technologies && prod.technologies.length > 0 && (
                  <div className="project-tech-bar">
                    {prod.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="project-tech-chip">
                        {tech}
                      </span>
                    ))}
                    {prod.technologies.length > 3 && (
                      <span className="project-tech-chip">+{prod.technologies.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="project-card-actions">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(prod);
                    }}
                    className="btn-project-primary"
                  >
                    Explore Project <ArrowRight size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleAdminClick(e, prod)}
                    className="btn-project-secondary"
                    title="Open Live ERP Dashboard"
                  >
                    Live ERP
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA / View All */}
        <div className="projects-bottom-cta">
          <p className="projects-bottom-text">
            Looking for customized modules, internal dashboards, or tailored enterprise systems?
          </p>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="btn-view-all-projects"
          >
            View All Products &amp; Projects <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};


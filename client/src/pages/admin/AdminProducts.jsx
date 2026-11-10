import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Globe,
  Shield,
  CheckCircle,
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
  LayoutGrid,
  List,
  Eye,
  EyeOff,
  Check,
  X,
  Building2,
  Plane,
  Package,
  Store,
  Sparkles,
  ShoppingCart,
  Scissors,
  Wrench,
  Home,
  GraduationCap,
  Factory,
  ChevronDown,
  ChevronUp,
  Folder,
} from 'lucide-react';
import {
  DEFAULT_ADMIN_PROJECTS,
  PRIMARY_ERP_CATEGORIES,
  getPrimaryCategory,
} from '../../utils/adminProjects';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';

const CATEGORY_META = {
  // 5 Primary Enterprise Categories (matching Home Page)
  'Human Resources': { icon: Users, color: 'emerald', bgClass: 'bg-icon-emerald', textClass: 'text-icon-emerald' },
  'Retail & E-Commerce': { icon: ShoppingCart, color: 'blue', bgClass: 'bg-icon-blue', textClass: 'text-icon-blue' },
  'Hospitality & Services': { icon: Home, color: 'indigo', bgClass: 'bg-icon-indigo', textClass: 'text-icon-indigo' },
  'Logistics & Mobility': { icon: Package, color: 'orange', bgClass: 'bg-icon-orange', textClass: 'text-icon-orange' },
  'Healthcare & Wellness': { icon: Building2, color: 'rose', bgClass: 'bg-icon-rose', textClass: 'text-icon-rose' },

  // Detailed sub-category fallbacks
  'Fashion & Luxury': { icon: Sparkles, color: 'pink', bgClass: 'bg-icon-pink', textClass: 'text-icon-pink' },
  'Hospitality & Hotels': { icon: Home, color: 'indigo', bgClass: 'bg-icon-indigo', textClass: 'text-icon-indigo' },
  'Education & LMS': { icon: GraduationCap, color: 'sky', bgClass: 'bg-icon-sky', textClass: 'text-icon-sky' },
  'Bus & Travel Booking': { icon: Plane, color: 'amber', bgClass: 'bg-icon-amber', textClass: 'text-icon-amber' },
  'Food Delivery & Kitchen': { icon: Factory, color: 'orange', bgClass: 'bg-icon-orange', textClass: 'text-icon-orange' },
  'Automotive & Mobility': { icon: Wrench, color: 'blue', bgClass: 'bg-icon-blue', textClass: 'text-icon-blue' },
  'Event Management': { icon: CalendarDays, color: 'purple', bgClass: 'bg-icon-purple', textClass: 'text-icon-purple' },
  'Restaurant & Dining': { icon: Store, color: 'rose', bgClass: 'bg-icon-rose', textClass: 'text-icon-rose' },
  'Fitness & Wellness': { icon: Monitor, color: 'cyan', bgClass: 'bg-icon-cyan', textClass: 'text-icon-cyan' },
  'Logistics & Fleet': { icon: Package, color: 'green', bgClass: 'bg-icon-green', textClass: 'text-icon-green' },
  'Beauty & Wellness': { icon: Scissors, color: 'pink', bgClass: 'bg-icon-pink', textClass: 'text-icon-pink' },
  'E-Commerce Retail': { icon: ShoppingCart, color: 'blue', bgClass: 'bg-icon-blue', textClass: 'text-icon-blue' },
  'Dairy & Agriculture': { icon: Building2, color: 'amber', bgClass: 'bg-icon-amber', textClass: 'text-icon-amber' },
  'Fashion & Apparel': { icon: Sparkles, color: 'rose', bgClass: 'bg-icon-rose', textClass: 'text-icon-rose' },
  'Healthcare & Hospitals': { icon: Building2, color: 'emerald', bgClass: 'bg-icon-emerald', textClass: 'text-icon-emerald' },
};

const getCategoryMetadata = (catName) => {
  if (catName && CATEGORY_META[catName]) return CATEGORY_META[catName];
  return { icon: FolderKanban, color: 'emerald', bgClass: 'bg-icon-emerald', textClass: 'text-icon-emerald' };
};

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
  Sparkles,
  ShoppingCart,
  Scissors,
  Wrench,
  Home,
  GraduationCap,
  Factory,
};

const parseTechList = (tech) => {
  if (!tech) return [];
  if (Array.isArray(tech)) {
    return tech
      .map((t) => {
        if (!t) return '';
        if (typeof t === 'string') return t.trim();
        if (typeof t === 'object') return String(t.name || t.label || t.title || JSON.stringify(t)).trim();
        return String(t).trim();
      })
      .filter(Boolean);
  }
  if (typeof tech === 'string' && tech.trim()) {
    return tech.split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
};

export const AdminProducts = () => {
  const { products, triggerDeleteProduct, refreshProducts, homeContent, updateNavbarVisibility } = useSocket();
  const navigate = useNavigate();

  // Single source of truth for Navbar & Page Products Visibility
  const isProductsActive = homeContent?.navbar?.showProducts !== undefined
    ? Boolean(homeContent.navbar.showProducts)
    : (localStorage.getItem('speshway_navbar_products_visible') !== null
        ? localStorage.getItem('speshway_navbar_products_visible') === 'true'
        : false);

  const [toggleUpdating, setToggleUpdating] = useState(false);
  const [toggleNotice, setToggleNotice] = useState('');

  const handleToggleProductsOption = async () => {
    const nextVal = !isProductsActive;
    setToggleUpdating(true);
    setToggleNotice(
      nextVal
        ? 'Projects option & /projects page are now VISIBLE and ACTIVE'
        : 'Projects option & /projects page are now completely HIDDEN'
    );
    setTimeout(() => setToggleNotice(''), 3500);

    try {
      if (updateNavbarVisibility) {
        await updateNavbarVisibility({ showProducts: nextVal });
      }
    } catch (err) {
      console.warn('API sync warning for products toggle:', err.message);
    } finally {
      setToggleUpdating(false);
    }
  };

  useEffect(() => {
    if (refreshProducts) {
      refreshProducts();
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusMsg, setStatusMsg] = useState('');
  const [viewMode, setViewMode] = useState('categories');
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategoryExpand = (catName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const displayProducts = useMemo(() => {
    const list = Array.isArray(products) && products.length > 0 ? products : DEFAULT_ADMIN_PROJECTS;
    return list.filter((p) => p && typeof p === 'object' && (p.name || p.slug || p.id));
  }, [products]);

  // Strictly use the exact 5 Enterprise Categories matching the Home Page
  const categories = PRIMARY_ERP_CATEGORIES;

  const categoryGroups = useMemo(() => {
    const primaryCatNames = PRIMARY_ERP_CATEGORIES.filter((c) => c !== 'All');
    const groupMap = new Map();

    primaryCatNames.forEach((catName) => {
      groupMap.set(catName, []);
    });

    displayProducts.forEach((prod) => {
      if (!prod || typeof prod !== 'object') return;
      const primaryCat = getPrimaryCategory(prod);
      if (!groupMap.has(primaryCat)) {
        groupMap.set(primaryCat, []);
      }
      groupMap.get(primaryCat).push(prod);
    });

    const groups = [];
    groupMap.forEach((projs, catName) => {
      if (projs.length > 0) {
        groups.push({
          name: catName,
          projects: projs,
          meta: getCategoryMetadata(catName),
        });
      }
    });

    return groups;
  }, [displayProducts]);

  const filteredCategoryGroups = useMemo(() => {
    const term = String(searchTerm || '').toLowerCase().trim();

    return categoryGroups
      .filter((group) => {
        if (selectedCategory !== 'All' && group.name !== selectedCategory) {
          return false;
        }
        if (!term) return true;
        const catMatches = group.name.toLowerCase().includes(term);
        const projMatches = group.projects.some((p) => {
          const pName = typeof p.name === 'string' ? p.name.toLowerCase() : '';
          const pUrl = typeof p.websiteUrl === 'string' ? p.websiteUrl.toLowerCase() : '';
          const pCat = typeof p.category === 'string' ? p.category.toLowerCase() : '';
          return pName.includes(term) || pUrl.includes(term) || pCat.includes(term);
        });
        return catMatches || projMatches;
      })
      .map((group) => {
        if (!term) return group;
        const catMatches = group.name.toLowerCase().includes(term);
        if (catMatches) return group;
        return {
          ...group,
          projects: group.projects.filter((p) => {
            const pName = typeof p.name === 'string' ? p.name.toLowerCase() : '';
            const pUrl = typeof p.websiteUrl === 'string' ? p.websiteUrl.toLowerCase() : '';
            const pCat = typeof p.category === 'string' ? p.category.toLowerCase() : '';
            return pName.includes(term) || pUrl.includes(term) || pCat.includes(term);
          }),
        };
      });
  }, [categoryGroups, searchTerm, selectedCategory]);

  const handleEditProduct = (prod, e) => {
    if (e) e.stopPropagation();
    navigate(`/admin/products/edit/${prod.slug || prod.id}`);
  };

  const handleAddNewProduct = () => {
    navigate('/admin/products/new');
  };

  const handleDelete = async (id, name, e) => {
    if (e) e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${name}"? This will delete it across the home page and public catalog immediately.`)) {
      try {
        await triggerDeleteProduct(id);
        setStatusMsg(`Project "${name}" deleted in real-time.`);
        setTimeout(() => setStatusMsg(''), 4000);
      } catch (err) {
        alert('Error deleting project');
      }
    }
  };

  const filtered = useMemo(() => {
    return displayProducts.filter((p) => {
      if (!p || typeof p !== 'object') return false;
      const name = typeof p.name === 'string' ? p.name.toLowerCase() : '';
      const detailedCat = typeof p.category === 'string' ? p.category.toLowerCase() : '';
      const primaryCat = getPrimaryCategory(p);
      const url = typeof p.websiteUrl === 'string' ? p.websiteUrl.toLowerCase() : '';
      const term = String(searchTerm || '').toLowerCase().trim();
      const matchesSearch =
        !term ||
        name.includes(term) ||
        detailedCat.includes(term) ||
        primaryCat.toLowerCase().includes(term) ||
        url.includes(term);

      const matchesCat = selectedCategory === 'All' || primaryCat === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [displayProducts, searchTerm, selectedCategory]);

  return (
    <div className="admin-page-view">
      {/* Header Row - Matching Pricing Page Layout Exactly with Toggle at Top Right Corner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '26px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <h1 className="admin-heading" style={{ margin: '0 0 6px 0' }}>
            Categories &amp; Module Management (CRUD)
          </h1>
          <p className="admin-subtext" style={{ margin: 0 }}>
            Manage ERP categories, drill down into projects, edit technologies &amp; URLs, and control modules in real-time.
          </p>
        </div>

        {/* Top Right Corner Toggle Button (Identical to Pricing Page) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', marginLeft: 'auto' }}>
          <div
            role="button"
            tabIndex={0}
            onClick={handleToggleProductsOption}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleProductsOption();
              }
            }}
            className={`admin-navbar-toggle-btn ${isProductsActive ? 'is-active' : 'is-inactive'}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 14px',
              borderRadius: '10px',
              backgroundColor: isProductsActive ? '#ecfdf5' : '#f8fafc',
              border: isProductsActive ? '1.5px solid #10b981' : '1.5px solid #cbd5e1',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isProductsActive
                ? '0 3px 12px rgba(16, 185, 129, 0.15)'
                : '0 2px 6px rgba(15, 23, 42, 0.05)',
              userSelect: 'none',
              outline: 'none',
            }}
            title={
              isProductsActive
                ? 'Click to turn OFF: hide Projects option and /projects page'
                : 'Click to turn ON: show Projects option and /projects page'
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  backgroundColor: isProductsActive ? '#d1fae5' : '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isProductsActive ? '#059669' : '#64748b',
                  transition: 'all 0.2s ease',
                }}
              >
                {isProductsActive ? <Eye size={16} /> : <EyeOff size={16} />}
              </div>
              <span
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: isProductsActive ? '#065f46' : '#475569',
                  whiteSpace: 'nowrap',
                }}
              >
                Projects: {isProductsActive ? 'ON' : 'OFF'}
              </span>
            </div>

            {/* Switch Slider */}
            <div
              style={{
                width: '38px',
                height: '20px',
                borderRadius: '9999px',
                backgroundColor: isProductsActive ? '#059669' : '#cbd5e1',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.2s ease',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transform: isProductsActive ? 'translateX(18px)' : 'translateX(0px)',
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>
          </div>

          {toggleNotice && (
            <span
              style={{
                fontSize: '0.78rem',
                color: isProductsActive ? '#059669' : '#dc2626',
                fontWeight: 600,
                marginTop: '1px',
                transition: 'all 0.2s ease',
              }}
            >
              ✓ {toggleNotice}
            </span>
          )}
        </div>
      </div>

      {statusMsg && (
        <div className="modal-alert-success">
          <CheckCircle size={16} />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Filter & Controls Bar */}
      <div className="admin-card-controls-bar">
        <div className="admin-controls-top-row">
          <div className="admin-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search projects by name, category, or URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="admin-search-clear-btn"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleAddNewProduct}
              className="btn-hero-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                fontSize: '0.88rem',
                whiteSpace: 'nowrap',
              }}
            >
              <Plus size={16} /> Add New Project
            </button>

            <div className="view-toggle-wrap">
              <button
                onClick={() => setViewMode('categories')}
                className={`view-mode-btn ${viewMode === 'categories' ? 'active' : ''}`}
                title="Category Cards View"
              >
                <Folder size={16} />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`view-mode-btn ${viewMode === 'cards' ? 'active' : ''}`}
                title="Project Cards View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`view-mode-btn ${viewMode === 'table' ? 'active' : ''}`}
                title="Table View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="category-scroll-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CATEGORIES VIEW (DEFAULT) */}
      {viewMode === 'categories' && (
        <div className="admin-products-card-grid">
          {filteredCategoryGroups.map((group) => {
            const meta = group.meta || getCategoryMetadata(group.name);
            const CatIcon = meta.icon || FolderKanban;
            const isExpanded = Boolean(expandedCategories[group.name]);

            return (
              <div key={group.name} className="admin-category-card">
                {/* Category Card Header */}
                <div className="admin-cat-card-header">
                  <div className="admin-cat-header-left">
                    <div className={`admin-cat-icon-box ${meta.bgClass}`}>
                      <CatIcon className={meta.textClass} size={22} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 className="admin-cat-title" title={group.name}>
                        {group.name}
                      </h3>
                      <span className="admin-cat-badge-count">
                        {group.projects.length} {group.projects.length === 1 ? 'ERP System' : 'ERP Systems'}
                      </span>
                    </div>
                  </div>
                  <span className="admin-cat-status-pill">Active</span>
                </div>

                {/* Category Card Body with Projects List */}
                <div className="admin-cat-body">
                  <div className="admin-cat-section-label">
                    Configured ERP Systems ({group.projects.length})
                  </div>

                  <div className="admin-cat-projects-list">
                    {group.projects.map((prod, pIdx) => {
                      if (!prod || typeof prod !== 'object') return null;
                      const pId = String(prod.id || prod.slug || prod._id || `grp-p-${pIdx}`);
                      const pName = typeof prod.name === 'string' ? prod.name : String(prod.name || 'ERP Project');
                      const pSlug = String(prod.slug || prod.id || prod._id || pId);
                      const pUrl = typeof prod.websiteUrl === 'string' ? prod.websiteUrl : '';
                      const ProjIcon = (prod.iconName && iconMap[prod.iconName]) ? iconMap[prod.iconName] : Layers;
                      const pColor = typeof prod.color === 'string' ? prod.color : 'green';

                      return (
                        <div key={pId} className="admin-cat-project-item">
                          <div className="admin-cat-proj-left">
                            {prod.imageUrl && typeof prod.imageUrl === 'string' && prod.imageUrl.trim() ? (
                              <img src={prod.imageUrl} alt={pName} className="admin-cat-proj-thumb" />
                            ) : (
                              <div className={`admin-cat-proj-icon-fallback bg-icon-${pColor}`}>
                                <ProjIcon size={14} className={`text-icon-${pColor}`} />
                              </div>
                            )}
                            <div className="admin-cat-proj-info">
                              <span
                                className="admin-cat-proj-name"
                                onClick={() => navigate(`/product/${pSlug}`)}
                                title={`View public details for ${pName}`}
                              >
                                {pName}
                              </span>
                              <span className="admin-cat-proj-meta">
                                {pUrl ? pUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Configured in ERP'}
                              </span>
                            </div>
                          </div>

                          <div className="admin-cat-proj-actions">
                            <button
                              type="button"
                              className="admin-cat-proj-btn"
                              onClick={() => navigate(`/product/${pSlug}`)}
                              title="View Project Details"
                            >
                              <Eye size={13} />
                            </button>
                            {pUrl && (
                              <a
                                href={pUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="admin-cat-proj-btn"
                                title="Open Live Website"
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                            <button
                              type="button"
                              className="admin-cat-proj-btn edit"
                              onClick={(e) => handleEditProduct(prod, e)}
                              title="Edit Project"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              className="admin-cat-proj-btn delete"
                              onClick={(e) => handleDelete(prod.id || prod.slug || prod._id || pSlug, pName, e)}
                              title="Delete Project"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Expandable Box with Tech & Descriptions */}
                  {isExpanded && (
                    <div className="admin-cat-expanded-box">
                      {group.projects.map((p, idx) => {
                        const techList = parseTechList(p.technologies);
                        return (
                          <div
                            key={idx}
                            style={{
                              borderBottom: idx < group.projects.length - 1 ? '1px dashed #cbd5e1' : 'none',
                              paddingBottom: '8px',
                            }}
                          >
                            <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: '2px', fontSize: '0.78rem' }}>
                              {p.name}
                            </div>
                            {p.description && (
                              <div style={{ color: '#64748b', marginBottom: '6px', fontSize: '0.74rem', lineHeight: 1.35 }}>
                                {p.description}
                              </div>
                            )}
                            {techList.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {techList.slice(0, 5).map((tech, tIdx) => (
                                  <span key={tIdx} className="card-tech-chip" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Category Card Footer */}
                <div className="admin-cat-card-footer">
                  <button
                    type="button"
                    className="admin-cat-add-btn"
                    onClick={() => navigate(`/admin/products/new?category=${encodeURIComponent(group.name)}`)}
                    title={`Add new project in ${group.name}`}
                  >
                    <Plus size={13} /> Add Project
                  </button>

                  <button
                    type="button"
                    className="admin-cat-expand-btn"
                    onClick={() => toggleCategoryExpand(group.name)}
                    title={isExpanded ? 'Collapse details' : 'Expand technologies and details'}
                  >
                    {isExpanded ? (
                      <>
                        <span>Less info</span>
                        <ChevronUp size={13} />
                      </>
                    ) : (
                      <>
                        <span>Tech &amp; Details</span>
                        <ChevronDown size={13} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CARDS VIEW */}
      {viewMode === 'cards' && (
        <div className="admin-products-card-grid">
          {filtered.map((prod, pIdx) => {
            if (!prod || typeof prod !== 'object') return null;
            const pId = String(prod.id || prod.slug || prod._id || `proj-${pIdx}`);
            const pName = typeof prod.name === 'string' ? prod.name : String(prod.name || 'ERP Project');
            const pCategory = typeof prod.category === 'string' ? prod.category : 'General ERP';
            const pDesc = typeof prod.description === 'string' ? prod.description : '';
            const pStatus = typeof prod.status === 'string' ? prod.status : 'active';
            const pColor = typeof prod.color === 'string' ? prod.color : 'green';
            const pUrl = typeof prod.websiteUrl === 'string' ? prod.websiteUrl : '';
            const pSlug = String(prod.slug || prod.id || prod._id || pId);
            const Icon = (prod.iconName && iconMap[prod.iconName]) ? iconMap[prod.iconName] : Layers;
            const techList = parseTechList(prod.technologies);

            return (
              <div
                key={pId}
                className="admin-product-card"
              >
                <div className="admin-prod-card-top">
                  <div className={`admin-card-icon-box bg-icon-${pColor}`}>
                    {prod.imageUrl && typeof prod.imageUrl === 'string' && prod.imageUrl.trim() ? (
                      <img src={prod.imageUrl} alt={pName} className="admin-card-custom-img" />
                    ) : (
                      <Icon className={`text-icon-${pColor}`} size={22} />
                    )}
                  </div>
                  <div className="admin-prod-card-badges">
                    <span className="prod-badge-category">{pCategory}</span>
                    <span className={`prod-badge-status ${pStatus}`}>
                      {pStatus}
                    </span>
                  </div>
                </div>

                <div className="admin-prod-card-body">
                  <h3
                    className="admin-prod-card-title"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${pSlug}`)}
                    title={`View public page for ${pName}`}
                  >
                    {pName}
                  </h3>
                  <p className="admin-prod-card-desc">{pDesc}</p>
                </div>

                <div className="admin-prod-card-footer">
                  <button
                    onClick={(e) => handleDelete(prod.id || prod.slug || prod._id || pSlug, pName, e)}
                    className="card-btn-delete"
                    title="Delete Product"
                  >
                    <Trash2 size={14} /> Delete Product
                  </button>
                  <button
                    onClick={(e) => handleEditProduct(prod, e)}
                    className="card-btn-edit"
                    title="Edit Project, Tech Stack, & URLs in New Page"
                  >
                    <Edit2 size={14} /> Edit Project
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="admin-card table-card">
          <div className="table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Project Name &amp; Category</th>
                  <th>Technologies</th>
                  <th>Website URL</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((prod, pIdx) => {
                  if (!prod || typeof prod !== 'object') return null;
                  const pId = String(prod.id || prod.slug || prod._id || `tbl-${pIdx}`);
                  const pName = typeof prod.name === 'string' ? prod.name : String(prod.name || 'ERP Project');
                  const pCategory = typeof prod.category === 'string' ? prod.category : 'General ERP';
                  const pStatus = typeof prod.status === 'string' ? prod.status : 'active';
                  const pColor = typeof prod.color === 'string' ? prod.color : 'green';
                  const pUrl = typeof prod.websiteUrl === 'string' ? prod.websiteUrl : '';
                  const pSlug = String(prod.slug || prod.id || prod._id || pId);
                  const techList = parseTechList(prod.technologies);

                  return (
                    <tr
                      key={pId}
                      onClick={() => navigate(`/product/${pSlug}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>
                        <div className="table-prod-info">
                          <div className={`table-prod-icon bg-icon-${pColor}`}>
                            {prod.imageUrl && typeof prod.imageUrl === 'string' && prod.imageUrl.trim() ? (
                              <img src={prod.imageUrl} alt={pName} className="admin-table-custom-img" />
                            ) : (
                              <Layers size={18} className={`text-icon-${pColor}`} />
                            )}
                          </div>
                          <div>
                            <strong className="prod-table-name">{pName}</strong>
                            <span className="prod-table-cat">{pCategory}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '200px' }}>
                          {techList.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="card-tech-chip">{String(t)}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <a
                          href={pUrl || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="table-url-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe size={13} />
                          <span>{pUrl || 'Not configured'}</span>
                          <ExternalLink size={11} />
                        </a>
                      </td>
                      <td>
                        <span className={`badge-status ${pStatus}`}>
                          {pStatus}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions-cell" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleEditProduct(prod, e)}
                            className="btn-action-icon edit"
                            title="Edit in New Page"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={(e) => handleDelete(pSlug, pName, e)}
                            className="btn-action-icon delete"
                            title="Delete Project"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {((viewMode === 'categories' && filteredCategoryGroups.length === 0) ||
        (viewMode !== 'categories' && filtered.length === 0)) && (
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px dashed #cbd5e1',
          margin: '24px 0',
        }}>
          <Package size={40} style={{ color: '#94a3b8', margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
            No Categories or Projects Found
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '16px' }}>
            No ERP items match your search criteria. Try a different search term or add a new project.
          </p>
          <button onClick={handleAddNewProduct} className="btn-hero-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
            <Plus size={16} /> Add New Project
          </button>
        </div>
      )}
    </div>
  );
};

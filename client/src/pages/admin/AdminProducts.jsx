import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
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
  Cpu,
} from 'lucide-react';

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

export const AdminProducts = () => {
  const { products, triggerDeleteProduct } = useSocket();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusMsg, setStatusMsg] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' is the default!

  const categories = [
    'All',
    'Human Resources',
    'Finance & HR',
    'Finance',
    'Productivity',
    'Sales & CRM',
    'Operations',
    'Business Intelligence',
  ];

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
        setStatusMsg(`Product "${name}" deleted in real-time.`);
        setTimeout(() => setStatusMsg(''), 4000);
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.websiteUrl?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="admin-page-view">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">Products &amp; Module Management (CRUD)</h1>
          <p className="admin-subtext">
            Add new ERP products in dedicated pages, edit technologies &amp; URLs, and control modules in real-time.
          </p>
        </div>
        <div className="admin-header-actions">
          <button onClick={handleAddNewProduct} className="btn-hero-primary">
            <Plus size={16} /> Add New Product
          </button>
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
        <div className="admin-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search products by name, category, or URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div className="category-scroll-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cat-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="view-toggle-wrap">
          <button
            onClick={() => setViewMode('cards')}
            className={`view-mode-btn ${viewMode === 'cards' ? 'active' : ''}`}
            title="Cards View"
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

      {/* ====================================================================
          CARDS VIEW (DEFAULT)
          ==================================================================== */}
      {viewMode === 'cards' && (
        <div className="admin-products-card-grid">
          {filtered.map((prod) => {
            const Icon = iconMap[prod.iconName] || Layers;
            return (
              <div
                key={prod.id || prod.slug}
                className="admin-product-card"
              >
                {/* Card Top: Icon, Category & Actions (Single Delete button at top-right) */}
                <div className="admin-prod-card-top">
                  <div className={`admin-card-icon-box bg-icon-${prod.color || 'green'}`}>
                    {prod.imageUrl ? (
                      <img src={prod.imageUrl} alt={prod.name} className="admin-card-custom-img" />
                    ) : (
                      <Icon className={`text-icon-${prod.color || 'green'}`} size={22} />
                    )}
                  </div>
                  <div className="admin-prod-card-badges">
                    <span className="prod-badge-category">{prod.category}</span>
                    <span className={`prod-badge-status ${prod.status || 'active'}`}>
                      {prod.status || 'Active'}
                    </span>
                  </div>
                  <div className="admin-prod-card-actions">
                    <button
                      onClick={(e) => handleDelete(prod.id || prod.slug, prod.name, e)}
                      className="card-action-icon delete"
                      title="Delete Product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Card Content: Title & Description */}
                <div className="admin-prod-card-body">
                  <h3 className="admin-prod-card-title">{prod.name}</h3>
                  <p className="admin-prod-card-desc">{prod.description}</p>
                </div>

                {/* Technologies Chips on Card */}
                {prod.technologies && prod.technologies.length > 0 && (
                  <div className="card-tech-chips-row">
                    <span className="card-tech-label"><Cpu size={11} /> Tech:</span>
                    {prod.technologies.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="card-tech-chip">{t}</span>
                    ))}
                    {prod.technologies.length > 3 && (
                      <span className="card-tech-more">+{prod.technologies.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Card URL Box - Website URL only (Admin dashboard URL removed from admin view) */}
                <div className="admin-prod-urls-box">
                  <div className="card-url-item">
                    <div className="url-item-label">
                      <Globe size={13} className="text-icon-green" />
                      <span>Website URL</span>
                    </div>
                    <a
                      href={prod.websiteUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="url-item-link"
                      title={prod.websiteUrl}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{prod.websiteUrl || 'Not configured'}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>

                {/* Card Footer Buttons - Single Edit & View Details */}
                <div className="admin-prod-card-footer">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${prod.slug || prod.id}`);
                    }}
                    className="card-btn-view-details"
                    title="Open dedicated public page"
                  >
                    <Eye size={14} /> Full Details
                  </button>
                  <button
                    onClick={(e) => handleEditProduct(prod, e)}
                    className="card-btn-edit"
                    title="Edit Product, Tech Stack, & URLs in New Page"
                  >
                    <Edit2 size={14} /> Edit Product
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ====================================================================
          TABLE VIEW
          ==================================================================== */}
      {viewMode === 'table' && (
        <div className="admin-card table-card">
          <div className="table-responsive">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Product Name &amp; Category</th>
                  <th>Technologies</th>
                  <th>Website URL</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((prod) => (
                  <tr
                    key={prod.id || prod.slug}
                    onClick={() => navigate(`/product/${prod.slug || prod.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div className="table-prod-info">
                        <div className={`table-prod-icon bg-icon-${prod.color || 'green'}`}>
                          {prod.imageUrl ? (
                            <img src={prod.imageUrl} alt={prod.name} className="admin-table-custom-img" />
                          ) : (
                            <Layers size={18} className={`text-icon-${prod.color || 'green'}`} />
                          )}
                        </div>
                        <div>
                          <strong className="prod-table-name">{prod.name}</strong>
                          <span className="prod-table-cat">{prod.category}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '200px' }}>
                        {prod.technologies?.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="card-tech-chip">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <a
                        href={prod.websiteUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="table-url-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe size={13} />
                        <span>{prod.websiteUrl || 'Not configured'}</span>
                        <ExternalLink size={11} />
                      </a>
                    </td>
                    <td>
                      <span className={`badge-status ${prod.status || 'active'}`}>
                        {prod.status || 'active'}
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
                          onClick={(e) => handleDelete(prod.id || prod.slug, prod.name, e)}
                          className="btn-action-icon delete"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

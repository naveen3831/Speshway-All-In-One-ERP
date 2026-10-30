import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { ProductDetailModal } from '../../components/products/ProductDetailModal';
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
  X,
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
  const { products, triggerAddProduct, triggerUpdateProduct, triggerDeleteProduct } =
    useSocket();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' is the default!

  // Form State for CRUD Operations
  const [formData, setFormData] = useState({
    name: '',
    category: 'Human Resources',
    description: '',
    longDescription: '',
    features: '',
    technologies: '',
    websiteUrl: '',
    adminUrl: '/admin/products',
    color: 'green',
    status: 'active',
  });

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

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Human Resources',
      description: '',
      longDescription: '',
      features: 'Automated Workflows, Role-Based Access, Real-Time Sync, PDF Export',
      technologies: 'React 18, Node.js, Express.js, MongoDB Atlas, Socket.IO, JWT Auth, Tailwind CSS',
      websiteUrl: 'https://speshway.com/',
      adminUrl: '/admin/products',
      color: 'green',
      status: 'active',
    });
    setModalOpen(true);
  };

  const openEditModal = (prod, e) => {
    if (e) e.stopPropagation();
    setEditingProduct(prod);
    setFormData({
      name: prod.name || '',
      category: prod.category || 'Human Resources',
      description: prod.description || '',
      longDescription: prod.longDescription || '',
      features: Array.isArray(prod.features) ? prod.features.join(', ') : '',
      technologies: Array.isArray(prod.technologies) ? prod.technologies.join(', ') : '',
      websiteUrl: prod.websiteUrl || '',
      adminUrl: prod.adminUrl || '/admin/products',
      color: prod.color || 'green',
      status: prod.status || 'active',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.description) {
      alert('Please fill in the Product Name and Short Description');
      return;
    }

    try {
      const payload = {
        ...formData,
        features: Array.isArray(formData.features)
          ? formData.features
          : typeof formData.features === 'string'
          ? formData.features.split(',').map((f) => f.trim()).filter(Boolean)
          : [],
        technologies: Array.isArray(formData.technologies)
          ? formData.technologies
          : typeof formData.technologies === 'string'
          ? formData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : ['React', 'Node.js', 'Express', 'MongoDB'],
      };

      if (editingProduct) {
        await triggerUpdateProduct(editingProduct.id || editingProduct.slug, payload);
        setStatusMsg(`Product "${formData.name}" updated successfully!`);
      } else {
        await triggerAddProduct(payload);
        setStatusMsg(`New product "${formData.name}" added successfully!`);
      }

      setModalOpen(false);
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (err) {
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id, name, e) => {
    if (e) e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await triggerDeleteProduct(id);
        setStatusMsg(`Product "${name}" deleted.`);
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
            Add new ERP products, edit technologies, update website landing URLs, configure admin routes, and delete modules in real-time.
          </p>
        </div>
        <div className="admin-header-actions">
          <button onClick={openAddModal} className="btn-hero-primary">
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
                    <Icon className={`text-icon-${prod.color || 'green'}`} size={22} />
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

                {/* Card URLs Box */}
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

                  <div className="card-url-item">
                    <div className="url-item-label">
                      <Shield size={13} className="text-icon-purple" />
                      <span>Admin Dashboard URL</span>
                    </div>
                    <span className="url-item-admin-path">
                      {prod.adminUrl || '/admin/products'}
                    </span>
                  </div>
                </div>

                {/* Card Footer Buttons - One Single Edit button & Full Details */}
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
                    onClick={(e) => openEditModal(prod, e)}
                    className="card-btn-edit"
                    title="Edit Product, Tech Stack, & URLs"
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
                  <th>Admin Dashboard URL</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((prod) => (
                  <tr
                    key={prod.id || prod.slug}
                    onClick={() => setSelectedDetailProduct(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div className="table-prod-info">
                        <div className={`table-prod-icon bg-icon-${prod.color || 'green'}`}>
                          <Layers size={18} className={`text-icon-${prod.color || 'green'}`} />
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
                      <span className="table-admin-path">
                        <Shield size={13} />
                        <span>{prod.adminUrl || '/admin/products'}</span>
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status ${prod.status || 'active'}`}>
                        {prod.status || 'active'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions-cell" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => openEditModal(prod, e)}
                          className="btn-action-icon edit"
                          title="Edit Product, Technologies &amp; URLs"
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

      {/* FULL PRODUCT DETAILS MODAL */}
      {selectedDetailProduct && (
        <ProductDetailModal
          product={selectedDetailProduct}
          onClose={() => setSelectedDetailProduct(null)}
        />
      )}

      {/* ADD / EDIT MODAL (CRUD OPERATIONS) */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="module-modal-box admin-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <Layers size={20} className="text-icon-green" />
                <h3 className="modal-title">
                  {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Add New ERP Product'}
                </h3>
              </div>
              <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="form-row-2col">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Warehouse Inventory Pro"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="quick-input full-width"
                  />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="quick-select full-width"
                  >
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance & HR">Finance &amp; HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Sales & CRM">Sales &amp; CRM</option>
                    <option value="Operations">Operations</option>
                    <option value="Business Intelligence">Business Intelligence</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Short Description *</label>
                <input
                  type="text"
                  required
                  placeholder="Summary for product cards..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="quick-input full-width"
                />
              </div>

              <div className="form-group">
                <label>Detailed Architecture Description</label>
                <textarea
                  rows={3}
                  placeholder="Comprehensive description for the dedicated details page..."
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="quick-input full-width"
                />
              </div>

              {/* TECHNOLOGIES INPUT (CRUD REQUIREMENT) */}
              <div className="form-group">
                <label>
                  <Cpu size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  Technologies &amp; Architecture Stack (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React 18, Node.js, Express.js, MongoDB Atlas, Socket.IO, JWT Auth, Docker"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="quick-input full-width"
                />
              </div>

              {/* FEATURES INPUT */}
              <div className="form-group">
                <label>Key Features (comma-separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="Feature 1, Feature 2, Feature 3..."
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="quick-input full-width"
                />
              </div>

              {/* WEBSITE URL & ADMIN DASHBOARD URL */}
              <div className="form-row-2col">
                <div className="form-group">
                  <label>
                    <Globe size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    Product Website URL *
                  </label>
                  <input
                    type="url"
                    placeholder="https://speshway.com/your-product"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="quick-input full-width"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Shield size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    Admin Dashboard URL / Path *
                  </label>
                  <input
                    type="text"
                    placeholder="/admin/products or /admin"
                    value={formData.adminUrl}
                    onChange={(e) => setFormData({ ...formData, adminUrl: e.target.value })}
                    className="quick-input full-width"
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label>Color Theme</label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="quick-select full-width"
                  >
                    <option value="green">Emerald Green</option>
                    <option value="blue">Royal Blue</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                    <option value="red">Ruby Red</option>
                    <option value="teal">Teal</option>
                    <option value="yellow">Amber Yellow</option>
                    <option value="indigo">Indigo</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="quick-select full-width"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="beta">Beta (Preview)</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-hero-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-hero-primary">
                  {editingProduct ? 'Save & Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

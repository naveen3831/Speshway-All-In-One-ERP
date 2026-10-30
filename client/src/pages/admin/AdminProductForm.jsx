import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import {
  ArrowLeft,
  Save,
  Globe,
  Shield,
  Layers,
  Cpu,
  CheckCircle,
  ExternalLink,
  Sparkles,
  Zap,
  Info,
  Trash2,
} from 'lucide-react';

export const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, triggerAddProduct, triggerUpdateProduct, triggerDeleteProduct } =
    useSocket();

  const isEditMode = Boolean(id);
  const existingProduct = isEditMode
    ? products.find((p) => p.id === id || p.slug === id)
    : null;

  const [formData, setFormData] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [savedSlug, setSavedSlug] = useState('');

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        category: existingProduct.category || 'Human Resources',
        description: existingProduct.description || '',
        longDescription: existingProduct.longDescription || existingProduct.description || '',
        features: Array.isArray(existingProduct.features)
          ? existingProduct.features.join(', ')
          : existingProduct.features || '',
        technologies: Array.isArray(existingProduct.technologies)
          ? existingProduct.technologies.join(', ')
          : existingProduct.technologies || '',
        websiteUrl: existingProduct.websiteUrl || '',
        adminUrl: existingProduct.adminUrl || '/admin/products',
        color: existingProduct.color || 'green',
        status: existingProduct.status || 'active',
      });
      setSavedSlug(existingProduct.slug || existingProduct.id);
    }
  }, [isEditMode, existingProduct]);

  const techList = (formData.technologies || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const featList = (formData.features || '')
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Product Name and Short Description are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        features: featList,
        technologies: techList.length > 0 ? techList : ['React', 'Node.js', 'Express', 'MongoDB'],
      };

      let targetSlug = savedSlug;
      if (isEditMode) {
        await triggerUpdateProduct(id, payload);
        targetSlug = existingProduct?.slug || id;
        setSuccessMsg(`Product "${formData.name}" updated successfully across all public and admin pages!`);
      } else {
        const res = await triggerAddProduct(payload);
        targetSlug = res.data?.slug || res.data?.id || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        setSavedSlug(targetSlug);
        setSuccessMsg(`New product "${formData.name}" published successfully in real-time!`);
      }

      setTimeout(() => {
        navigate('/admin/products');
      }, 1800);
    } catch (err) {
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCurrent = async () => {
    if (!isEditMode) return;
    if (window.confirm(`Are you sure you want to permanently delete "${formData.name}"? This will delete it across the home page and public catalog immediately.`)) {
      try {
        await triggerDeleteProduct(id);
        navigate('/admin/products');
      } catch (err) {
        alert('Failed to delete product: ' + err.message);
      }
    }
  };

  return (
    <div className="admin-page-view product-form-page-view">
      {/* Top Breadcrumb & Navigation */}
      <div className="admin-page-header form-page-header">
        <div>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="back-link-btn"
          >
            <ArrowLeft size={16} /> Back to Products Management
          </button>
          <h1 className="admin-heading">
            {isEditMode ? `Edit Product: ${formData.name || 'Module'}` : 'Add New ERP Application'}
          </h1>
          <p className="admin-subtext">
            {isEditMode
              ? 'Update module information, tech stack, landing URLs, and administrative access paths in real-time.'
              : 'Register and publish a new application into the Speshway ERP catalog.'}
          </p>
        </div>

        {isEditMode && (
          <div className="admin-header-actions">
            <button
              type="button"
              onClick={handleDeleteCurrent}
              className="btn-delete-product"
              title="Delete this product"
            >
              <Trash2 size={16} /> Delete Product
            </button>
          </div>
        )}
      </div>

      {successMsg && (
        <div className="modal-alert-success form-alert-banner">
          <CheckCircle size={18} />
          <div className="alert-content">
            <strong>{successMsg}</strong>
            <span className="alert-sub">Syncing to Home page and Products catalog now...</span>
          </div>
        </div>
      )}

      {/* Main Form Form */}
      <form onSubmit={handleSubmit} className="product-form-layout">
        <div className="product-form-columns">
          {/* LEFT COLUMN: Main Details */}
          <div className="form-col-main">
            {/* Card 1: Core Info */}
            <div className="admin-card form-section-card">
              <div className="form-section-title-row">
                <Layers size={18} className="text-icon-green" />
                <h3>Application Overview</h3>
              </div>

              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Warehouse Inventory Management"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="quick-input full-width"
                />
              </div>

              <div className="form-group">
                <label>Short Description (Shown on Home page &amp; Catalog cards) *</label>
                <input
                  type="text"
                  required
                  placeholder="Concise 1-2 sentence overview..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="quick-input full-width"
                />
              </div>

              <div className="form-group">
                <label>Detailed Architecture Description (Shown on dedicated product details page)</label>
                <textarea
                  rows={4}
                  placeholder="Comprehensive description of capabilities, system architecture, and enterprise value..."
                  value={formData.longDescription}
                  onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                  className="quick-input full-width"
                />
              </div>
            </div>

            {/* Card 2: Technologies & Architecture Stack */}
            <div className="admin-card form-section-card">
              <div className="form-section-title-row">
                <Cpu size={18} className="text-icon-green" />
                <h3>Technologies &amp; Architecture Stack</h3>
              </div>
              <p className="form-section-sub">
                Specify technologies separated by commas. These render as interactive badges on the product details page.
              </p>

              <div className="form-group">
                <label>Technologies (comma-separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React 18, Node.js, Express.js, MongoDB Atlas, Socket.IO, JWT Auth, Tailwind CSS"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="quick-input full-width"
                />
              </div>

              {/* Real-time Tech Chips Preview */}
              <div className="tech-preview-container">
                <span className="preview-label">Live Preview ({techList.length}):</span>
                <div className="tech-chips-row-preview">
                  {techList.length === 0 ? (
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>No technologies typed yet</span>
                  ) : (
                    techList.map((t, idx) => (
                      <span key={idx} className="card-tech-chip">
                        {t}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Card 3: Capabilities & Features */}
            <div className="admin-card form-section-card">
              <div className="form-section-title-row">
                <Zap size={18} className="text-icon-purple" />
                <h3>Key Capabilities &amp; Features</h3>
              </div>
              <p className="form-section-sub">
                Enter core capabilities separated by commas. These render in the feature checklist.
              </p>

              <div className="form-group">
                <label>Features (comma-separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Automated Salary Calculations, Instant PDF Payslip Generation, Tax & Compliance Reports"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="quick-input full-width"
                />
              </div>

              {/* Real-time Features Preview */}
              <div className="features-preview-container">
                <span className="preview-label">Features Checklist ({featList.length}):</span>
                <div className="feat-chips-preview">
                  {featList.map((f, idx) => (
                    <span key={idx} className="feat-pill-preview">
                      &bull; {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Settings & Endpoints (CRITICAL USER REQUIREMENT) */}
          <div className="form-col-side">
            {/* Card 4: Product Website Landing URL */}
            <div className="admin-card form-section-card">
              <div className="form-section-title-row">
                <Globe size={18} className="text-icon-blue" />
                <h3>Product Website URL</h3>
              </div>
              <p className="form-section-sub">
                Configure or update the live landing and destination URL for this application.
              </p>

              <div className="form-group">
                <label>
                  <Globe size={13} style={{ marginRight: '4px' }} />
                  Website URL (Public Landing / Live Portal) *
                </label>
                <input
                  type="url"
                  placeholder="https://speshway.com/hrms"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  className="quick-input full-width"
                />
                <span className="input-hint">Website visitors click "View Website" to access this destination.</span>
              </div>
            </div>

            {/* Card 5: Classification & Visuals */}
            <div className="admin-card form-section-card">
              <div className="form-section-title-row">
                <Sparkles size={18} className="text-icon-green" />
                <h3>Classification &amp; Styling</h3>
              </div>

              <div className="form-group">
                <label>Business Category *</label>
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

              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Card Color Accent</label>
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

              <div className="form-group" style={{ marginTop: '12px' }}>
                <label>Publish Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="quick-select full-width"
                >
                  <option value="active">Active (Visible Publicly)</option>
                  <option value="beta">Beta (Preview)</option>
                  <option value="coming_soon">Coming Soon</option>
                </select>
              </div>
            </div>

            {/* Card 6: Quick Link to Details */}
            {isEditMode && existingProduct && (
              <div className="admin-card form-section-card link-preview-card">
                <h4>Public Presentation Preview</h4>
                <p>Verify how this product appears to customers and website visitors.</p>
                <Link
                  to={`/product/${existingProduct.slug || existingProduct.id}`}
                  target="_blank"
                  className="btn-preview-link"
                >
                  <span>Open Public Product Page</span>
                  <ExternalLink size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="form-sticky-action-bar">
          <div className="sticky-action-inner">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="btn-hero-secondary"
            >
              Cancel &amp; Return
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-hero-primary"
              style={{ minWidth: '180px' }}
            >
              <Save size={16} />
              <span>{isSubmitting ? 'Saving Changes...' : isEditMode ? 'Update Product' : 'Publish Product'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

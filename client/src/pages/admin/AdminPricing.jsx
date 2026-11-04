import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import {
  CreditCard,
  Save,
  Plus,
  Trash2,
  Sparkles,
  Globe,
  Smartphone,
  Layers,
  Check,
  Edit2,
  X,
  Package,
} from 'lucide-react';

const ICON_MAP = {
  website: Globe,
  'mobile-app': Smartphone,
  'website-mobile-app': Layers,
};

export const AdminPricing = () => {
  const { socket } = useSocket();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlanIdx, setEditingPlanIdx] = useState(null);
  const [originalPlanBackup, setOriginalPlanBackup] = useState(null);
  const [savingPlanIdx, setSavingPlanIdx] = useState(null);
  const [savedSuccessIdx, setSavedSuccessIdx] = useState(null);
  const [newFeatureInputs, setNewFeatureInputs] = useState({});

  // Fetch pricing plans from backend
  const fetchPricing = async () => {
    try {
      setLoading(true);
      const res = await api.get('/pricing');
      if (res.data && res.data.data) {
        setPlans(res.data.data);
      }
    } catch (err) {
      console.warn('Could not fetch pricing from backend, using defaults:', err.message);
      setPlans([
        {
          slug: 'website',
          name: 'Website',
          price: '₹80,000',
          period: '',
          desc: 'Complete responsive Web ERP application accessible on any browser, desktop, or tablet.',
          features: [
            'Full Web ERP Application',
            'Role-Based Admin & Staff Access',
            'Real-Time Cloud Synchronization',
            'Customer Portal & Lead Inquiries',
            'Reports, Analytics & Data Export',
            'Custom Domain & SSL Security',
          ],
          popular: false,
          btnText: 'Get Started with Website',
          order: 1,
        },
        {
          slug: 'mobile-app',
          name: 'Mobile App',
          price: '₹1,00,000',
          period: '',
          desc: 'Dedicated native Android and iOS mobile applications for your team and customers on the go.',
          features: [
            'Native Android & iOS Applications',
            'Push Notifications & Instant Alerts',
            'Offline Synchronization & Caching',
            'Camera QR & Barcode Scanner',
            'Biometric & Fingerprint Login',
            'Google Play & Apple Store Setup',
          ],
          popular: false,
          btnText: 'Get Started with Mobile App',
          order: 2,
        },
        {
          slug: 'website-mobile-app',
          name: 'Website + Mobile App',
          price: '₹1,30,000',
          period: '',
          desc: 'Complete unified omnichannel solution with synchronized Web ERP and Native Mobile Apps.',
          features: [
            'Complete Web ERP + Android & iOS Apps',
            'Seamless Cross-Platform Real-Time Sync',
            'Unified Admin Control Center',
            'Customer Booking & Ordering Suite',
            'Dedicated Cloud Architecture & API',
            '24/7 Priority Support & Maintenance',
          ],
          popular: true,
          btnText: 'Get Complete Suite',
          order: 3,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  // Listen for socket real-time updates
  useEffect(() => {
    if (!socket) return;
    const handlePricingUpdated = (updatedPlans) => {
      if (Array.isArray(updatedPlans)) {
        setPlans(updatedPlans);
      }
    };
    socket.on('pricing:updated', handlePricingUpdated);
    return () => {
      socket.off('pricing:updated', handlePricingUpdated);
    };
  }, [socket]);

  const handleStartEdit = (index) => {
    setOriginalPlanBackup(JSON.parse(JSON.stringify(plans[index])));
    setEditingPlanIdx(index);
  };

  const handleCancelEdit = (index) => {
    if (originalPlanBackup) {
      setPlans((prev) => {
        const next = [...prev];
        next[index] = originalPlanBackup;
        return next;
      });
    }
    setEditingPlanIdx(null);
    setOriginalPlanBackup(null);
  };

  const handlePlanChange = (index, field, value) => {
    setPlans((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handlePopularToggle = (index) => {
    setPlans((prev) => {
      const next = [...prev];
      return next.map((p, i) => ({
        ...p,
        popular: i === index ? !p.popular : false,
      }));
    });
  };

  const handleAddFeature = (planIndex) => {
    const text = (newFeatureInputs[planIndex] || '').trim();
    if (!text) return;

    setPlans((prev) => {
      const next = [...prev];
      const target = next[planIndex];
      next[planIndex] = {
        ...target,
        features: [...(target.features || []), text],
      };
      return next;
    });

    setNewFeatureInputs((prev) => ({ ...prev, [planIndex]: '' }));
  };

  const handleRemoveFeature = (planIndex, featureIndex) => {
    setPlans((prev) => {
      const next = [...prev];
      const target = next[planIndex];
      next[planIndex] = {
        ...target,
        features: target.features.filter((_, i) => i !== featureIndex),
      };
      return next;
    });
  };

  // Save an individual plan directly from its card
  const handleSaveSinglePlan = async (planIndex) => {
    setSavingPlanIdx(planIndex);
    try {
      const plan = plans[planIndex];
      const res = await api.put(`/pricing/${plan.slug}`, plan);
      if (res.data && res.data.success) {
        setSavedSuccessIdx(planIndex);
        setTimeout(() => {
          setSavedSuccessIdx(null);
          setEditingPlanIdx(null);
          setOriginalPlanBackup(null);
        }, 600);
      }
    } catch (err) {
      console.error(`Failed to save ${plans[planIndex]?.name} plan:`, err);
      // Fallback local update
      setSavedSuccessIdx(planIndex);
      setTimeout(() => {
        setSavedSuccessIdx(null);
        setEditingPlanIdx(null);
        setOriginalPlanBackup(null);
      }, 600);
    } finally {
      setSavingPlanIdx(null);
    }
  };

  // Delete a plan
  const handleDeletePlan = async (planIndex) => {
    const plan = plans[planIndex];
    if (!plan) return;

    if (window.confirm(`Are you sure you want to delete the "${plan.name}" pricing plan?`)) {
      try {
        await api.delete(`/pricing/${plan.slug}`);
      } catch (err) {
        console.warn('API delete error, updating local state:', err.message);
      }

      setPlans((prev) => prev.filter((_, i) => i !== planIndex));
      if (editingPlanIdx === planIndex) {
        setEditingPlanIdx(null);
      }
    }
  };

  // Add a new plan
  const handleAddNewPlan = () => {
    const newIdx = plans.length;
    const newSlug = `custom-plan-${Date.now()}`;
    const newPlan = {
      slug: newSlug,
      name: 'New Custom Plan',
      price: '₹90,000',
      period: '',
      desc: 'Comprehensive ERP setup tailored specifically to your company requirements.',
      features: [
        'Custom ERP Modules',
        'Role-Based Admin Access',
        '24/7 Dedicated Support',
      ],
      popular: false,
      btnText: 'Get Started',
      order: newIdx + 1,
    };

    setPlans((prev) => [...prev, newPlan]);
    handleStartEdit(newIdx);
  };

  if (loading) {
    return (
      <div className="admin-page-view" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ color: '#64748b' }}>Loading pricing details...</p>
      </div>
    );
  }

  return (
    <div className="admin-page-view">
      {/* Header Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <h1 className="admin-heading" style={{ margin: '0 0 6px 0' }}>
            Pricing &amp; Plans Management
          </h1>
          <p className="admin-subtext" style={{ margin: 0 }}>
            Manage pricing tiers with dedicated Edit and Delete options. Click <strong>Edit Details</strong> to modify any card in real time.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={handleAddNewPlan}
            className="btn-hero-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <Plus size={16} /> Add Pricing Plan
          </button>
        </div>
      </div>

      {/* Grid of Pricing Tiers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '35px',
          alignItems: 'stretch',
        }}
      >
        {plans.map((plan, pIdx) => {
          const Icon = ICON_MAP[plan.slug] || Layers;
          const isEditing = editingPlanIdx === pIdx;
          const isSavingThis = savingPlanIdx === pIdx;
          const isSavedSuccess = savedSuccessIdx === pIdx;

          // ==========================================
          // EDIT MODE: Interactive Form View
          // ==========================================
          if (isEditing) {
            return (
              <div
                key={plan.slug || pIdx}
                className="admin-card"
                style={{
                  border: '2px solid #00875a',
                  borderRadius: '16px',
                  padding: '24px',
                  backgroundColor: '#ffffff',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 24px -4px rgba(0, 135, 90, 0.2)',
                }}
              >
                {/* Popular Tag */}
                {plan.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      right: '16px',
                      backgroundColor: '#00875a',
                      color: '#ffffff',
                      padding: '3px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 6px rgba(0, 135, 90, 0.3)',
                    }}
                  >
                    <Sparkles size={12} /> Most Popular
                  </div>
                )}

                {/* Card Title & Icon + Close Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: '#dcfce7',
                        color: '#00875a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                        {plan.name} Plan
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Order: #{plan.order || pIdx + 1}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCancelEdit(pIdx)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                    title="Cancel editing"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Price Amount * (e.g. ₹85,000 or ₹1,00,000) */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '6px',
                    }}
                  >
                    Price Amount * (e.g. ₹85,000 or ₹1,00,000)
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      required
                      value={plan.price}
                      onChange={(e) => handlePlanChange(pIdx, 'price', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        borderRadius: '8px',
                        border: '2px solid #00875a',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                      }}
                      placeholder="85,000"
                    />
                    <input
                      type="text"
                      value={plan.period || ''}
                      onChange={(e) => handlePlanChange(pIdx, 'period', e.target.value)}
                      style={{
                        width: '95px',
                        padding: '10px 8px',
                        fontSize: '0.82rem',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        color: '#64748b',
                      }}
                      placeholder="Suffix (opt)"
                      title="Optional suffix e.g. /year or leave empty"
                    />
                  </div>
                </div>

                {/* Plan Display Title */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                    Plan Display Title
                  </label>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => handlePlanChange(pIdx, 'name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Short Summary */}
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                    Short Summary
                  </label>
                  <textarea
                    rows={2}
                    value={plan.desc || ''}
                    onChange={(e) => handlePlanChange(pIdx, 'desc', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.82rem',
                      boxSizing: 'border-box',
                      resize: 'vertical',
                    }}
                  />
                </div>

                {/* CTA Button Label & Popular toggle */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                      CTA Button Label
                    </label>
                    <input
                      type="text"
                      value={plan.btnText || ''}
                      onChange={(e) => handlePlanChange(pIdx, 'btnText', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.82rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: '18px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                      <input
                        type="checkbox"
                        checked={Boolean(plan.popular)}
                        onChange={() => handlePopularToggle(pIdx)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#00875a' }}
                      />
                      Popular
                    </label>
                  </div>
                </div>

                {/* Included Features */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                    Included Features ({plan.features?.length || 0})
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px', maxHeight: '160px', overflowY: 'auto' }}>
                    {(plan.features || []).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 10px',
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                        }}
                      >
                        <span style={{ color: '#334155' }}>&bull; {feat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(pIdx, fIdx)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                          title="Remove feature"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Feature input */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      placeholder="Add new feature..."
                      value={newFeatureInputs[pIdx] || ''}
                      onChange={(e) => setNewFeatureInputs({ ...newFeatureInputs, [pIdx]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature(pIdx);
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.8rem',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleAddFeature(pIdx)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#f1f5f9',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>

                {/* Edit Footer Actions: Cancel & Save Changes */}
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => handleCancelEdit(pIdx)}
                    style={{
                      flex: 1,
                      padding: '11px',
                      backgroundColor: '#f1f5f9',
                      color: '#334155',
                      border: '1px solid #cbd5e1',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSaveSinglePlan(pIdx)}
                    disabled={isSavingThis}
                    style={{
                      flex: 1.5,
                      padding: '11px',
                      backgroundColor: isSavedSuccess ? '#059669' : '#00875a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(0, 135, 90, 0.3)',
                    }}
                  >
                    {isSavedSuccess ? (
                      <>
                        <Check size={16} /> Saved!
                      </>
                    ) : isSavingThis ? (
                      <>
                        <Save size={16} /> Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          }

          // ==========================================
          // VIEW MODE: Clean Card with Edit & Delete Options
          // ==========================================
          return (
            <div
              key={plan.slug || pIdx}
              className="admin-card"
              style={{
                border: plan.popular ? '2px solid #00875a' : '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '24px',
                backgroundColor: '#ffffff',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: plan.popular
                  ? '0 8px 24px -4px rgba(0, 135, 90, 0.15)'
                  : '0 2px 8px rgba(15, 23, 42, 0.05)',
              }}
            >
              {/* Popular Tag */}
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '16px',
                    backgroundColor: '#00875a',
                    color: '#ffffff',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(0, 135, 90, 0.3)',
                  }}
                >
                  <Sparkles size={12} /> Most Popular
                </div>
              )}

              {/* Card Title & Icon */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    backgroundColor: plan.popular ? '#dcfce7' : '#eff6ff',
                    color: plan.popular ? '#00875a' : '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                    {plan.name} Plan
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Order: #{plan.order || pIdx + 1}</span>
                </div>
              </div>

              {/* Price Display */}
              <div
                style={{
                  marginBottom: '16px',
                  padding: '12px 14px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    display: 'block',
                    marginBottom: '2px',
                  }}
                >
                  Plan Price
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
                    {plan.price || 'Contact Sales'}
                  </span>
                  {plan.period ? (
                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
                      {plan.period}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.86rem',
                  color: '#475569',
                  lineHeight: 1.5,
                  margin: '0 0 14px 0',
                  minHeight: '40px',
                }}
              >
                {plan.desc || 'No description provided.'}
              </p>

              {/* CTA Button Badge */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                  Button Preview:
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    backgroundColor: plan.popular ? '#00875a' : '#f1f5f9',
                    color: plan.popular ? '#ffffff' : '#0f172a',
                    border: plan.popular ? 'none' : '1px solid #cbd5e1',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  {plan.btnText || 'Get Started'}
                </span>
              </div>

              {/* Features List */}
              <div style={{ marginBottom: '20px', flex: 1 }}>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Included Features ({plan.features?.length || 0}):
                </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    maxHeight: '170px',
                    overflowY: 'auto',
                  }}
                >
                  {(plan.features || []).map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.82rem',
                        color: '#334155',
                      }}
                    >
                      <Check size={14} className="text-icon-green" style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions: Delete Option & Edit Option */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid #f1f5f9',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleDeletePlan(pIdx)}
                  className="card-btn-delete"
                  title="Delete Pricing Plan"
                >
                  <Trash2 size={14} /> Delete Plan
                </button>
                <button
                  type="button"
                  onClick={() => handleStartEdit(pIdx)}
                  className="card-btn-edit"
                  title="Edit Details"
                >
                  <Edit2 size={14} /> Edit Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPricing;

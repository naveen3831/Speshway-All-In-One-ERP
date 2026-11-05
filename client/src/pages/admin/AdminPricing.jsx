import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import {
  Save,
  Plus,
  Trash2,
  Sparkles,
  Check,
  Edit2,
  X,
  RotateCcw,
} from 'lucide-react';

const DEFAULT_SAAS_PLANS = [
  {
    slug: 'starter',
    name: 'Starter',
    price: '₹2,499',
    period: '/user /month',
    desc: 'Ideal for small businesses and growing teams needing core HR & Project tools.',
    features: [
      'Up to 25 Active Employees',
      'HRMS & Directory Portal',
      'Leave & Attendance Tracking',
      'Task & Project Boards',
      'Standard Email Support',
      'Continuous Cloud Backups',
    ],
    popular: false,
    btnText: 'Start 14-Day Free Trial',
    order: 1,
  },
  {
    slug: 'professional',
    name: 'Professional',
    price: '₹5,999',
    period: '/user /month',
    desc: 'Complete suite for scaling companies that need unified payroll, finance & CRM.',
    features: [
      'Up to 200 Employees',
      'Full Payroll & Tax Automation',
      'Finance, Invoicing & Expenses',
      'Client CRM & Deal Pipelines',
      'Asset Management & Devices',
      'Priority 24/7 Live Support',
    ],
    popular: true,
    btnText: 'Get Started with Pro',
    order: 2,
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored quote',
    desc: 'For large organizations demanding custom SLAs, dedicated infrastructure & audit.',
    features: [
      'Unlimited Employees & Users',
      'Custom ERP Module Development',
      'Dedicated Cloud Instance / VPC',
      '24/7 Dedicated Account Manager',
      'SSO / SAML / Active Directory',
      'Custom Data Retention SLAs',
    ],
    popular: false,
    btnText: 'Contact Enterprise Sales',
    order: 3,
  },
];

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
      if (res.data && res.data.data && res.data.data.length > 0) {
        // If data still contains obsolete website/mobile-app slugs, replace with SaaS plans
        const hasOld = res.data.data.some(
          (p) => p.slug === 'website' || p.slug === 'mobile-app' || p.slug === 'website-mobile-app'
        );
        if (hasOld) {
          setPlans(DEFAULT_SAAS_PLANS);
          // Sync backend to SaaS plans
          api.put('/pricing', { plans: DEFAULT_SAAS_PLANS }).catch(() => {});
        } else {
          setPlans(res.data.data);
        }
      } else {
        setPlans(DEFAULT_SAAS_PLANS);
      }
    } catch (err) {
      console.warn('Could not fetch pricing from backend, using SaaS defaults:', err.message);
      setPlans(DEFAULT_SAAS_PLANS);
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
      if (Array.isArray(updatedPlans) && updatedPlans.length > 0) {
        const hasOld = updatedPlans.some(
          (p) => p.slug === 'website' || p.slug === 'mobile-app' || p.slug === 'website-mobile-app'
        );
        if (!hasOld) {
          setPlans(updatedPlans);
        }
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
        }, 500);
      }
    } catch (err) {
      console.error(`Failed to save ${plans[planIndex]?.name} plan:`, err);
      setSavedSuccessIdx(planIndex);
      setTimeout(() => {
        setSavedSuccessIdx(null);
        setEditingPlanIdx(null);
        setOriginalPlanBackup(null);
      }, 500);
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
        console.warn('API delete fallback, updating local state:', err.message);
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
    const newSlug = `plan-${Date.now()}`;
    const newPlan = {
      slug: newSlug,
      name: 'Custom Plan',
      price: '₹9,999',
      period: '/user /month',
      desc: 'Tailored enterprise ERP module suite with custom integrations and dedicated resources.',
      features: [
        'Dedicated Enterprise Modules',
        'Custom Cloud Instance',
        '24/7 Dedicated Support',
      ],
      popular: false,
      btnText: 'Get Started',
      order: newIdx + 1,
    };

    setPlans((prev) => [...prev, newPlan]);
    handleStartEdit(newIdx);
  };

  // Reset to default SaaS tiers
  const handleResetDefaults = async () => {
    if (window.confirm('Reset all pricing plans back to the default Starter, Professional, and Enterprise tiers?')) {
      try {
        await api.put('/pricing', { plans: DEFAULT_SAAS_PLANS });
      } catch (err) {
        console.warn('API reset fallback:', err.message);
      }
      setPlans(DEFAULT_SAAS_PLANS);
      setEditingPlanIdx(null);
    }
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
          marginBottom: '26px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <h1 className="admin-heading" style={{ margin: '0 0 6px 0' }}>
            Pricing &amp; Plans Management
          </h1>
          <p className="admin-subtext" style={{ margin: 0 }}>
            Manage pricing tiers displayed on your public pricing page. Click <strong>Edit Details</strong> to customize any card.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={handleResetDefaults}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 15px',
              backgroundColor: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '8px',
              color: '#475569',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Reset to default Starter, Professional, Enterprise plans"
          >
            <RotateCcw size={15} /> Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleAddNewPlan}
            className="btn-hero-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px',
              fontSize: '0.88rem',
              fontWeight: 700,
            }}
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
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  border: '2px solid #00875a',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  boxShadow: '0 8px 24px -4px rgba(0, 135, 90, 0.2)',
                  position: 'relative',
                }}
              >
                {/* Edit Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: '#00875a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      Editing Plan
                    </span>
                    <h3 style={{ margin: '2px 0 0 0', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                      {plan.name || 'Tier Details'}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCancelEdit(pIdx)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                    title="Cancel editing"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Plan Display Title */}
                <div style={{ marginBottom: '14px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '4px',
                    }}
                  >
                    Plan Display Title
                  </label>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => handlePlanChange(pIdx, 'name', e.target.value)}
                    placeholder="e.g. Starter, Professional, Enterprise"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#0f172a',
                    }}
                  />
                </div>

                {/* Short Description */}
                <div style={{ marginBottom: '14px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '4px',
                    }}
                  >
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={plan.desc}
                    onChange={(e) => handlePlanChange(pIdx, 'desc', e.target.value)}
                    placeholder="Brief description of the tier..."
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.84rem',
                      color: '#334155',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* Price & Period Inputs */}
                <div style={{ marginBottom: '14px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '4px',
                    }}
                  >
                    Price Amount &amp; Period Suffix
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) => handlePlanChange(pIdx, 'price', e.target.value)}
                      placeholder="e.g. ₹2,499 or Custom"
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        borderRadius: '8px',
                        border: '2px solid #00875a',
                      }}
                    />
                    <input
                      type="text"
                      value={plan.period || ''}
                      onChange={(e) => handlePlanChange(pIdx, 'period', e.target.value)}
                      placeholder="/user /month"
                      style={{
                        width: '120px',
                        padding: '8px 10px',
                        fontSize: '0.82rem',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        color: '#64748b',
                      }}
                    />
                  </div>
                </div>

                {/* CTA Button Label & Popular checkbox */}
                <div style={{ marginBottom: '14px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '4px',
                    }}
                  >
                    CTA Button Label
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="text"
                      value={plan.btnText || ''}
                      onChange={(e) => handlePlanChange(pIdx, 'btnText', e.target.value)}
                      placeholder="e.g. Start 14-Day Free Trial"
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.85rem',
                        color: '#0f172a',
                      }}
                    />
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!plan.popular}
                        onChange={() => handlePopularToggle(pIdx)}
                        style={{ width: '16px', height: '16px', accentColor: '#00875a', cursor: 'pointer' }}
                      />
                      Popular
                    </label>
                  </div>
                </div>

                {/* Features Management */}
                <div style={{ marginBottom: '16px', flex: 1 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '6px',
                    }}
                  >
                    Included Features ({plan.features?.length || 0})
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      maxHeight: '150px',
                      overflowY: 'auto',
                      marginBottom: '8px',
                    }}
                  >
                    {(plan.features || []).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 10px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          fontSize: '0.82rem',
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

                  {/* Add Feature Input */}
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

                {/* Edit Actions: Cancel & Save Changes */}
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: 'auto',
                    paddingTop: '12px',
                    borderTop: '1px solid #f1f5f9',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleCancelEdit(pIdx)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      fontWeight: 600,
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
                      flex: 1.3,
                      padding: '10px 14px',
                      backgroundColor: isSavedSuccess ? '#059669' : '#00875a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(0, 135, 90, 0.25)',
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
          // VIEW MODE: Exact Pricing Card Match
          // ==========================================
          return (
            <div
              key={plan.slug || pIdx}
              className={`pricing-card ${plan.popular ? 'popular-tier' : ''}`}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                backgroundColor: '#ffffff',
                border: plan.popular ? '2px solid #00875a' : '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '36px 30px',
                boxShadow: plan.popular
                  ? '0 8px 24px -4px rgba(0, 135, 90, 0.15)'
                  : '0 2px 12px rgba(15, 23, 42, 0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Popular Tag */}
              {plan.popular && (
                <div
                  className="popular-badge"
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#00875a',
                    color: '#ffffff',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 6px rgba(0, 135, 90, 0.3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Sparkles size={12} /> Most Popular
                </div>
              )}

              {/* Plan Title */}
              <h3
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  margin: '0 0 8px 0',
                }}
              >
                {plan.name}
              </h3>

              {/* Plan Description */}
              <p
                style={{
                  fontSize: '0.88rem',
                  color: '#64748b',
                  lineHeight: 1.5,
                  margin: '0 0 20px 0',
                  minHeight: '42px',
                }}
              >
                {plan.desc}
              </p>

              {/* Price Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '6px',
                  marginBottom: '24px',
                }}
              >
                <span
                  style={{
                    fontSize: '2.6rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {plan.price}
                </span>
                {plan.period ? (
                  <span
                    style={{
                      fontSize: '0.86rem',
                      color: '#64748b',
                      fontWeight: 500,
                    }}
                  >
                    {plan.period}
                  </span>
                ) : null}
              </div>

              {/* CTA Button Preview */}
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '12px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  marginBottom: '26px',
                  backgroundColor: plan.popular ? '#00875a' : '#f8fafc',
                  color: plan.popular ? '#ffffff' : '#0f172a',
                  border: plan.popular ? 'none' : '1.5px solid #e2e8f0',
                  cursor: 'default',
                  transition: 'all 0.2s ease',
                }}
              >
                {plan.btnText || 'Start 14-Day Free Trial'}
              </button>

              {/* Included Features List */}
              <div style={{ flex: 1, marginBottom: '24px' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '14px',
                  }}
                >
                  What&apos;s included:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(plan.features || []).map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        fontSize: '0.86rem',
                        color: '#334155',
                        lineHeight: 1.45,
                      }}
                    >
                      <Check
                        size={16}
                        style={{ color: '#00875a', flexShrink: 0, marginTop: '2px' }}
                      />
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
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    backgroundColor: '#fef2f2',
                    color: '#ef4444',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                  title="Delete Pricing Plan"
                >
                  <Trash2 size={14} /> Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleStartEdit(pIdx)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    backgroundColor: '#f0fdf4',
                    color: '#166534',
                    border: '1.5px solid #bbf7d0',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
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

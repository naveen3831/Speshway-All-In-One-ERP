import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  useSocket } from '../../context/SocketContext';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Sparkles,
  Check,
  Edit2,
  X,
  Eye,
  EyeOff,
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
  const { socket, homeContent, updateNavbarVisibility } = useSocket();

  // Single source of truth for Navbar Pricing Visibility
  const isPricingActive = homeContent?.navbar?.showPricing !== undefined
    ? Boolean(homeContent.navbar.showPricing)
    : (localStorage.getItem('speshway_navbar_pricing_visible') !== null
        ? localStorage.getItem('speshway_navbar_pricing_visible') === 'true'
        : true);

  const [toggleUpdating, setToggleUpdating] = useState(false);
  const [toggleNotice, setToggleNotice] = useState('');

  const handleToggleNavbarPricing = async () => {
    const nextVal = !isPricingActive;
    setToggleUpdating(true);
    setToggleNotice(
      nextVal
        ? 'Pricing option & /pricing page are now VISIBLE and ACTIVE'
        : 'Pricing option & /pricing page are now completely HIDDEN'
    );
    setTimeout(() => setToggleNotice(''), 3500);

    try {
      if (updateNavbarVisibility) {
        await updateNavbarVisibility({ showPricing: nextVal });
      }
    } catch (err) {
      console.warn('API sync warning for navbar pricing toggle:', err.message);
    } finally {
      setToggleUpdating(false);
    }
  };
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(null);
  const [isEditingInModal, setIsEditingInModal] = useState(false);
  const [modalDraft, setModalDraft] = useState(null);
  const [newModalFeatureInput, setNewModalFeatureInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch pricing plans from backend
  const fetchPricing = async () => {
    try {
      setLoading(true);
      const res = await api.get('/pricing');
      if (res.data && res.data.data && res.data.data.length > 0) {
        const hasOld = res.data.data.some(
          (p) => p.slug === 'website' || p.slug === 'mobile-app' || p.slug === 'website-mobile-app'
        );
        if (hasOld) {
          setPlans(DEFAULT_SAAS_PLANS);
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

  // Open Details Modal
  const handleOpenDetails = (index) => {
    setSelectedPlanIdx(index);
    setIsEditingInModal(false);
    setModalDraft(JSON.parse(JSON.stringify(plans[index])));
    setNewModalFeatureInput('');
    setSaveSuccess(false);
  };

  // Close Modal
  const handleCloseModal = () => {
    setSelectedPlanIdx(null);
    setIsEditingInModal(false);
    setModalDraft(null);
    setSaveSuccess(false);
  };

  // Edit in modal
  const handleDraftChange = (field, value) => {
    setModalDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDraftPopularToggle = () => {
    setModalDraft((prev) => ({
      ...prev,
      popular: !prev.popular,
    }));
  };

  const handleAddDraftFeature = () => {
    const text = (newModalFeatureInput || '').trim();
    if (!text) return;
    setModalDraft((prev) => ({
      ...prev,
      features: [...(prev.features || []), text],
    }));
    setNewModalFeatureInput('');
  };

  const handleRemoveDraftFeature = (featureIdx) => {
    setModalDraft((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== featureIdx),
    }));
  };

  // Save changes from Modal
  const handleSaveModalDraft = async () => {
    if (!modalDraft || selectedPlanIdx === null) return;
    setIsSaving(true);
    try {
      const res = await api.put(`/pricing/${modalDraft.slug}`, modalDraft);
      const updatedPlan = res.data?.data || modalDraft;

      setPlans((prev) => {
        const next = [...prev];
        next[selectedPlanIdx] = updatedPlan;
        return next;
      });

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditingInModal(false);
      }, 500);
    } catch (err) {
      console.error('Failed to save pricing plan:', err);
      // Fallback local update
      setPlans((prev) => {
        const next = [...prev];
        next[selectedPlanIdx] = modalDraft;
        return next;
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditingInModal(false);
      }, 500);
    } finally {
      setIsSaving(false);
    }
  };

  // Direct card action: Delete Plan
  const handleDeleteCardPlan = async (index, e) => {
    if (e) e.stopPropagation();
    const plan = plans[index];
    if (!plan) return;

    if (window.confirm(`Are you sure you want to delete the "${plan.name}" pricing plan?`)) {
      try {
        await api.delete(`/pricing/${plan.slug}`);
      } catch (err) {
        console.warn('API delete fallback, updating local state:', err.message);
      }

      setPlans((prev) => prev.filter((_, i) => i !== index));
      if (selectedPlanIdx === index) {
        handleCloseModal();
      }
    }
  };

  // Direct card action: Edit Details
  const handleOpenEdit = (index, e) => {
    if (e) e.stopPropagation();
    setSelectedPlanIdx(index);
    setIsEditingInModal(true);
    setModalDraft(JSON.parse(JSON.stringify(plans[index])));
    setNewModalFeatureInput('');
    setSaveSuccess(false);
  };

  // Delete Plan from Modal
  const handleDeletePlan = async () => {
    if (selectedPlanIdx === null) return;
    const plan = plans[selectedPlanIdx];
    if (!plan) return;

    if (window.confirm(`Are you sure you want to delete the "${plan.name}" pricing plan?`)) {
      try {
        await api.delete(`/pricing/${plan.slug}`);
      } catch (err) {
        console.warn('API delete fallback, updating local state:', err.message);
      }

      setPlans((prev) => prev.filter((_, i) => i !== selectedPlanIdx));
      handleCloseModal();
    }
  };

  if (loading) {
    return (
      <div className="admin-page-view" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ color: '#64748b' }}>Loading pricing details...</p>
      </div>
    );
  }

  const selectedPlan = selectedPlanIdx !== null ? plans[selectedPlanIdx] : null;

  return (
    <div className="admin-page-view">
      {/* Header Row */}
      <div
        className="admin-page-header-row"
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
            Click on any card to view its full details, edit pricing and features, or delete the plan.
          </p>
        </div>

        {/* Top Right Corner Toggle Button for Home Navbar Pricing Link */}
        <div
          className="admin-header-toggle-wrap"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '6px',
            marginLeft: 'auto',
          }}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={handleToggleNavbarPricing}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleNavbarPricing();
              }
            }}
            className={`admin-navbar-toggle-btn ${isPricingActive ? 'is-active' : 'is-inactive'}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '6px 14px',
              borderRadius: '10px',
              backgroundColor: isPricingActive ? '#ecfdf5' : '#f8fafc',
              border: isPricingActive ? '1.5px solid #10b981' : '1.5px solid #cbd5e1',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isPricingActive
                ? '0 3px 12px rgba(16, 185, 129, 0.15)'
                : '0 2px 6px rgba(15, 23, 42, 0.05)',
              userSelect: 'none',
              outline: 'none',
            }}
            title={
              isPricingActive
                ? 'Click to turn OFF: hide Pricing option and /pricing page'
                : 'Click to turn ON: show Pricing option and /pricing page'
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  backgroundColor: isPricingActive ? '#d1fae5' : '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isPricingActive ? '#059669' : '#64748b',
                  transition: 'all 0.2s ease',
                }}
              >
                {isPricingActive ? <Eye size={16} /> : <EyeOff size={16} />}
              </div>
              <span
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: isPricingActive ? '#065f46' : '#475569',
                  whiteSpace: 'nowrap',
                }}
              >
                Pricing: {isPricingActive ? 'ON' : 'OFF'}
              </span>
            </div>

            {/* Switch Slider */}
            <div
              style={{
                width: '38px',
                height: '20px',
                borderRadius: '9999px',
                backgroundColor: isPricingActive ? '#059669' : '#cbd5e1',
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
                  transform: isPricingActive ? 'translateX(18px)' : 'translateX(0px)',
                  transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>
          </div>

          {toggleNotice && (
            <span
              style={{
                fontSize: '0.78rem',
                color: isPricingActive ? '#059669' : '#dc2626',
                fontWeight: 600,
                marginTop: '1px',
                textAlign: 'right',
                transition: 'all 0.2s ease',
              }}
            >
              ✓ {toggleNotice}
            </span>
          )}
        </div>
      </div>

      {/* Grid of Pricing Tiers (Clean Compact Card View) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '18px',
          maxWidth: '1100px',
          marginBottom: '35px',
          alignItems: 'stretch',
        }}
      >
        {plans.map((plan, pIdx) => (
          <div
            key={plan.slug || pIdx}
            onClick={() => handleOpenDetails(pIdx)}
            className={`pricing-card ${plan.popular ? 'popular-tier' : ''}`}
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              backgroundColor: '#ffffff',
              border: plan.popular ? '2px solid #00875a' : '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '22px 20px',
              boxShadow: plan.popular
                ? '0 6px 18px -3px rgba(0, 135, 90, 0.15)'
                : '0 2px 8px rgba(15, 23, 42, 0.04)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
            }}
            title="Click to view details, edit or delete"
          >
            {/* Popular Tag */}
            {plan.popular && (
              <div
                className="popular-badge"
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#00875a',
                  color: '#ffffff',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 5px rgba(0, 135, 90, 0.3)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Sparkles size={11} /> Most Popular
              </div>
            )}

            {/* Plan Title */}
            <h3
              style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: '0 0 6px 0',
              }}
            >
              {plan.name}
            </h3>

            {/* Plan Description */}
            <p
              style={{
                fontSize: '0.8rem',
                color: '#64748b',
                lineHeight: 1.45,
                margin: '0 0 14px 0',
                minHeight: '36px',
              }}
            >
              {plan.desc}
            </p>

            {/* Price Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '5px',
                marginBottom: '16px',
              }}
            >
              <span
                style={{
                  fontSize: '1.9rem',
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
                    fontSize: '0.78rem',
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
                padding: '9px 14px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '18px',
                backgroundColor: plan.popular ? '#00875a' : '#f8fafc',
                color: plan.popular ? '#ffffff' : '#0f172a',
                border: plan.popular ? 'none' : '1.5px solid #e2e8f0',
                pointerEvents: 'none',
              }}
            >
              {plan.btnText || 'Start 14-Day Free Trial'}
            </button>

            {/* Included Features List */}
            <div style={{ flex: 1 }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '10px',
                }}
              >
                What&apos;s included:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {(plan.features || []).map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      fontSize: '0.8rem',
                      color: '#334155',
                      lineHeight: 1.4,
                    }}
                  >
                    <Check
                      size={14}
                      style={{ color: '#00875a', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Actions: Delete Option & Edit Details Option */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: 'auto',
                paddingTop: '16px',
                borderTop: '1px solid #f1f5f9',
                width: '100%',
              }}
            >
              <button
                type="button"
                onClick={(e) => handleDeleteCardPlan(pIdx, e)}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  backgroundColor: '#fef2f2',
                  color: '#ef4444',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fee2e2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                }}
                title={`Delete ${plan.name} Plan`}
              >
                <Trash2 size={14} /> Delete
              </button>
              <button
                type="button"
                onClick={(e) => handleOpenEdit(pIdx, e)}
                style={{
                  flex: 1.3,
                  padding: '9px 12px',
                  backgroundColor: '#f0fdf4',
                  color: '#166534',
                  border: '1.5px solid #bbf7d0',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#dcfce7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                }}
                title={`Edit ${plan.name} Details`}
              >
                <Edit2 size={14} /> Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Details & Edit Modal Dialog */}
      {selectedPlan && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          {/* Top Fullscreen Header Bar */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e2e8f0',
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexShrink: 0,
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e2e8f0';
                  e.currentTarget.style.color = '#0f172a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = '#334155';
                }}
                title="Back to Pricing Plans"
              >
                <ArrowLeft size={16} /> Back to Pricing Plans
              </button>

              <div style={{ height: '22px', width: '1px', backgroundColor: '#e2e8f0' }} />

              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#00875a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    display: 'block',
                    lineHeight: 1,
                  }}
                >
                  {isEditingInModal ? 'Editing Plan' : 'Plan Overview'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '3px' }}>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                    {isEditingInModal ? modalDraft?.name : selectedPlan.name} Plan
                  </h2>
                  {selectedPlan.popular && (
                    <span
                      style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        padding: '2px 9px',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Sparkles size={11} /> Most Popular
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Top Right Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isEditingInModal ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setModalDraft(JSON.parse(JSON.stringify(selectedPlan)));
                      setIsEditingInModal(false);
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#475569',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveModalDraft}
                    disabled={isSaving}
                    style={{
                      padding: '8px 20px',
                      backgroundColor: saveSuccess ? '#059669' : '#00875a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: isSaving ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(0, 135, 90, 0.25)',
                    }}
                  >
                    {isSaving ? (
                      'Saving...'
                    ) : saveSuccess ? (
                      <>
                        <Check size={16} /> Saved!
                      </>
                    ) : (
                      <>
                        <Save size={16} /> Save Plan Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleDeletePlan}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#fef2f2',
                      color: '#ef4444',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Trash2 size={14} /> Delete Plan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalDraft(JSON.parse(JSON.stringify(selectedPlan)));
                      setIsEditingInModal(true);
                    }}
                    style={{
                      padding: '8px 20px',
                      backgroundColor: '#00875a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.86rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Edit2 size={14} /> Edit Details
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '4px',
                }}
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Full-Screen Scrollable Content Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '32px 24px 60px 24px',
              backgroundColor: '#f8fafc',
            }}
          >
            <div
              style={{
                maxWidth: '860px',
                margin: '0 auto',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '36px',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
              }}
            >
            

            {/* Modal Content: EDIT MODE */}
            {isEditingInModal && modalDraft ? (
              <div>
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
                    value={modalDraft.name}
                    onChange={(e) => handleDraftChange('name', e.target.value)}
                    placeholder="e.g. Starter, Professional, Enterprise"
                    style={{
                      width: '100%',
                      padding: '9px 12px',
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
                    value={modalDraft.desc}
                    onChange={(e) => handleDraftChange('desc', e.target.value)}
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
                      value={modalDraft.price}
                      onChange={(e) => handleDraftChange('price', e.target.value)}
                      placeholder="e.g. ₹2,499 or Custom"
                      style={{
                        flex: 1,
                        padding: '9px 12px',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        borderRadius: '8px',
                        border: '2px solid #00875a',
                      }}
                    />
                    <input
                      type="text"
                      value={modalDraft.period || ''}
                      onChange={(e) => handleDraftChange('period', e.target.value)}
                      placeholder="/user /month"
                      style={{
                        width: '130px',
                        padding: '9px 10px',
                        fontSize: '0.84rem',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        color: '#64748b',
                      }}
                    />
                  </div>
                </div>

                {/* CTA Button Label & Popular checkbox */}
                <div style={{ marginBottom: '16px' }}>
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
                      value={modalDraft.btnText || ''}
                      onChange={(e) => handleDraftChange('btnText', e.target.value)}
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
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: '#1e293b',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!!modalDraft.popular}
                        onChange={handleDraftPopularToggle}
                        style={{ width: '16px', height: '16px', accentColor: '#00875a', cursor: 'pointer' }}
                      />
                      Most Popular
                    </label>
                  </div>
                </div>

                {/* Features Management */}
                <div style={{ marginBottom: '20px' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '6px',
                    }}
                  >
                    Included Features ({modalDraft.features?.length || 0})
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      maxHeight: '160px',
                      overflowY: 'auto',
                      marginBottom: '10px',
                    }}
                  >
                    {(modalDraft.features || []).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '7px 10px',
                          backgroundColor: '#f8fafc',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          fontSize: '0.84rem',
                        }}
                      >
                        <span style={{ color: '#334155' }}>&bull; {feat}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDraftFeature(fIdx)}
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
                      value={newModalFeatureInput}
                      onChange={(e) => setNewModalFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddDraftFeature();
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: '6px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.82rem',
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddDraftFeature}
                      style={{
                        padding: '7px 14px',
                        backgroundColor: '#f1f5f9',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
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
                    paddingTop: '16px',
                    borderTop: '1px solid #f1f5f9',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setModalDraft(JSON.parse(JSON.stringify(selectedPlan)));
                      setIsEditingInModal(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '11px 16px',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveModalDraft}
                    disabled={isSaving}
                    style={{
                      flex: 1.4,
                      padding: '11px 16px',
                      backgroundColor: saveSuccess ? '#059669' : '#00875a',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 8px rgba(0, 135, 90, 0.25)',
                    }}
                  >
                    {saveSuccess ? (
                      <>
                        <Check size={16} /> Saved!
                      </>
                    ) : isSaving ? (
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
            ) : (
              /* Modal Content: DETAILS VIEW */
              <div>
                {/* Price Display */}
                <div
                  style={{
                    marginBottom: '16px',
                    padding: '14px 18px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      display: 'block',
                      marginBottom: '2px',
                    }}
                  >
                    Plan Pricing
                  </span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a' }}>
                      {selectedPlan.price}
                    </span>
                    {selectedPlan.period ? (
                      <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
                        {selectedPlan.period}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '18px' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#64748b',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Description
                  </span>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.5 }}>
                    {selectedPlan.desc || 'No description provided.'}
                  </p>
                </div>

                {/* CTA Button Label */}
                <div style={{ marginBottom: '18px' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#64748b',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Button Label
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '6px 14px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      borderRadius: '9999px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      color: '#0f172a',
                    }}
                  >
                    {selectedPlan.btnText || 'Start 14-Day Free Trial'}
                  </span>
                </div>

                {/* Features List */}
                <div style={{ marginBottom: '24px' }}>
                  <span
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      color: '#0f172a',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                  >
                    What&apos;s included ({selectedPlan.features?.length || 0}):
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      maxHeight: '180px',
                      overflowY: 'auto',
                    }}
                  >
                    {(selectedPlan.features || []).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.86rem',
                          color: '#334155',
                        }}
                      >
                        <Check size={16} style={{ color: '#00875a', flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Actions: Delete Option & Edit Option */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    paddingTop: '16px',
                    borderTop: '1px solid #f1f5f9',
                  }}
                >
                  <button
                    type="button"
                    onClick={handleDeletePlan}
                    style={{
                      flex: 1,
                      padding: '11px 16px',
                      backgroundColor: '#fef2f2',
                      color: '#ef4444',
                      border: '1px solid #fecaca',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
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
                    <Trash2 size={15} /> Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModalDraft(JSON.parse(JSON.stringify(selectedPlan)));
                      setIsEditingInModal(true);
                    }}
                    style={{
                      flex: 1.3,
                      padding: '11px 16px',
                      backgroundColor: '#f0fdf4',
                      color: '#166534',
                      border: '1.5px solid #bbf7d0',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
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
                    <Edit2 size={15} /> Edit Details
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default AdminPricing;

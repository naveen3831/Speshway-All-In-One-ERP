import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSocket } from '../../context/SocketContext';
import {
  CreditCard,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Globe,
  Smartphone,
  Layers,
  Check,
  Eye,
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
  const [saving, setSaving] = useState(false);
  const [savingPlanIdx, setSavingPlanIdx] = useState(null);
  const [savedSuccessIdx, setSavedSuccessIdx] = useState(null);
  const [cardStatus, setCardStatus] = useState({});
  const [msg, setMsg] = useState(null); // { type: 'success' | 'error', text: '' }
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
    setCardStatus((prev) => ({ ...prev, [planIndex]: null }));
    setMsg(null);
    try {
      const plan = plans[planIndex];
      const res = await api.put(`/pricing/${plan.slug}`, plan);
      if (res.data && res.data.success) {
        setSavedSuccessIdx(planIndex);
        setCardStatus((prev) => ({
          ...prev,
          [planIndex]: { type: 'success', text: `Saved! ${plan.name} updated to ${plan.price}` },
        }));
        setMsg({
          type: 'success',
          text: `Saved ${plan.name} plan (${plan.price})! Updated on website live.`,
        });
        setTimeout(() => {
          setSavedSuccessIdx(null);
          setCardStatus((prev) => ({ ...prev, [planIndex]: null }));
        }, 4000);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || `Failed to save ${plans[planIndex]?.name} plan.`;
      setCardStatus((prev) => ({
        ...prev,
        [planIndex]: { type: 'error', text: errMsg },
      }));
      setMsg({
        type: 'error',
        text: errMsg,
      });
    } finally {
      setSavingPlanIdx(null);
      setTimeout(() => setMsg(null), 6000);
    }
  };

  // Save all plans in bulk
  const handleSaveAll = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const res = await api.put('/pricing', { plans });
      if (res.data && res.data.success) {
        setMsg({
          type: 'success',
          text: 'All pricing changes saved successfully! Updated across website in real-time.',
        });
      }
    } catch (err) {
      setMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to save pricing plans. Please try again.',
      });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 6000);
    }
  };

  const handleResetDefaults = async () => {
    if (!window.confirm('Reset all pricing plans to standard Speshway defaults (₹80,000 / ₹1,00,000 / ₹1,30,000)?')) {
      return;
    }
    setSaving(true);
    setMsg(null);
    try {
      const res = await api.post('/pricing/reset');
      if (res.data && res.data.data) {
        setPlans(res.data.data);
        setMsg({ type: 'success', text: 'Pricing plans reset to standard defaults!' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to reset pricing. Please try again.' });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 5000);
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
      {/* Header Row - RESPONSIVE & NEVER CUT OFF */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div style={{ flex: '1 1 300px' }}>
          <h1 className="admin-heading" style={{ margin: '0 0 6px 0' }}>
            Pricing &amp; Plans Management
          </h1>
          <p className="admin-subtext" style={{ margin: 0 }}>
            Change prices, features, or plan details below. Click <strong>Save Changes</strong> on any card to update the live website.
          </p>
        </div>
      </div>

      {/* Floating Global Toast Notification */}
      {msg && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 99999,
            padding: '14px 20px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: msg.type === 'success' ? '#065f46' : '#991b1b',
            color: '#ffffff',
            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.35)',
            fontWeight: 600,
            fontSize: '0.9rem',
            maxWidth: '450px',
          }}
        >
          {msg.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Inline Alert Notifications */}
      {msg && (
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: msg.type === 'success' ? '#ecfdf5' : '#fef2f2',
            border: `1px solid ${msg.type === 'success' ? '#a7f3d0' : '#fecaca'}`,
            color: msg.type === 'success' ? '#065f46' : '#991b1b',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          {msg.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span style={{ fontWeight: 600 }}>{msg.text}</span>
        </div>
      )}

      {/* Grid of Pricing Tiers for Editing */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '35px',
        }}
      >
        {plans.map((plan, pIdx) => {
          const Icon = ICON_MAP[plan.slug] || Layers;
          const isSavingThis = savingPlanIdx === pIdx;
          const isSavedSuccess = savedSuccessIdx === pIdx;

          return (
            <div
              key={plan.slug || pIdx}
              className="admin-card"
              style={{
                border: plan.popular ? '2px solid #00875a' : '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '22px',
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
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: plan.popular ? '#dcfce7' : '#eff6ff',
                    color: plan.popular ? '#00875a' : '#2563eb',
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

              {/* Price Field - PROMINENT & CLEAR */}
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
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: '#0f172a',
                      borderRadius: '8px',
                      border: '2px solid #00875a',
                      backgroundColor: '#f8fafc',
                      outline: 'none',
                    }}
                    placeholder="₹85,000"
                  />
                  <input
                    type="text"
                    value={plan.period || ''}
                    onChange={(e) => handlePlanChange(pIdx, 'period', e.target.value)}
                    style={{
                      width: '90px',
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

              {/* Plan Name Field */}
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

              {/* Description */}
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

              {/* Button Text & Popular Toggle */}
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

              {/* Features List Editor */}
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

              {/* PROMINENT "SAVE CHANGES" OPTION ON THIS CARD */}
              <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleSaveSinglePlan(pIdx)}
                  disabled={isSavingThis || saving}
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    backgroundColor: isSavedSuccess ? '#059669' : '#00875a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(0, 135, 90, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isSavedSuccess ? (
                    <>
                      <Check size={18} />
                      <span>Saved Successfully!</span>
                    </>
                  ) : isSavingThis ? (
                    <>
                      <Save size={18} />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>

                {cardStatus[pIdx] && (
                  <div
                    style={{
                      marginTop: '8px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: cardStatus[pIdx].type === 'success' ? '#ecfdf5' : '#fef2f2',
                      border: `1px solid ${cardStatus[pIdx].type === 'success' ? '#a7f3d0' : '#fecaca'}`,
                      color: cardStatus[pIdx].type === 'success' ? '#065f46' : '#991b1b',
                    }}
                  >
                    {cardStatus[pIdx].type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                    <span>{cardStatus[pIdx].text}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Action Bar */}
      <div
        style={{
          position: 'sticky',
          bottom: '20px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '14px 24px',
          borderRadius: '14px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
          zIndex: 50,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Eye size={18} style={{ color: '#34d399' }} />
          <span style={{ fontSize: '0.88rem' }}>
            Saving updates the live <a href="/pricing" target="_blank" rel="noreferrer" style={{ color: '#34d399', textDecoration: 'underline', fontWeight: 600 }}>/pricing</a> page in real time.
          </span>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          style={{
            backgroundColor: '#00875a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 24px',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 10px rgba(0, 135, 90, 0.4)',
          }}
        >
          <Save size={18} /> {saving ? 'Saving All...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default AdminPricing;

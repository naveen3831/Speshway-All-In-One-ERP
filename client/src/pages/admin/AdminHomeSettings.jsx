import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useSocket, DEFAULT_HOME_CONTENT } from '../../context/SocketContext';
import {
  Sparkles,
  BarChart3,
  Layers,
  Save,
  Check,
  Edit3,
  X,
} from 'lucide-react';

export const AdminHomeSettings = () => {
  const { homeContent, setHomeContent } = useSocket();
  const [savingSection, setSavingSection] = useState(null);
  const [savedSection, setSavedSection] = useState(null);

  // Hidden by default; revealed only when admin clicks Edit
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [isEditingStats, setIsEditingStats] = useState(false);
  const [isEditingSolutions, setIsEditingSolutions] = useState(false);

  const [form, setForm] = useState(() => ({
    hero: {
      badge: homeContent?.hero?.badge || DEFAULT_HOME_CONTENT.hero.badge,
      titleDark: homeContent?.hero?.titleDark || DEFAULT_HOME_CONTENT.hero.titleDark,
      titleGreen: homeContent?.hero?.titleGreen || DEFAULT_HOME_CONTENT.hero.titleGreen,
      subtitle: homeContent?.hero?.subtitle || DEFAULT_HOME_CONTENT.hero.subtitle,
      primaryBtnText: homeContent?.hero?.primaryBtnText || DEFAULT_HOME_CONTENT.hero.primaryBtnText,
      primaryBtnLink: homeContent?.hero?.primaryBtnLink || DEFAULT_HOME_CONTENT.hero.primaryBtnLink,
      secondaryBtnText: homeContent?.hero?.secondaryBtnText || DEFAULT_HOME_CONTENT.hero.secondaryBtnText,
    },
    stats: {
      stat1Number: homeContent?.stats?.stat1Number || DEFAULT_HOME_CONTENT.stats.stat1Number,
      stat1Label: homeContent?.stats?.stat1Label || DEFAULT_HOME_CONTENT.stats.stat1Label,
      stat2Number: homeContent?.stats?.stat2Number || DEFAULT_HOME_CONTENT.stats.stat2Number,
      stat2Label: homeContent?.stats?.stat2Label || DEFAULT_HOME_CONTENT.stats.stat2Label,
      stat3Number: homeContent?.stats?.stat3Number || DEFAULT_HOME_CONTENT.stats.stat3Number,
      stat3Label: homeContent?.stats?.stat3Label || DEFAULT_HOME_CONTENT.stats.stat3Label,
      stat4Number: homeContent?.stats?.stat4Number || DEFAULT_HOME_CONTENT.stats.stat4Number,
      stat4Label: homeContent?.stats?.stat4Label || DEFAULT_HOME_CONTENT.stats.stat4Label,
    },
    solutions: {
      title: homeContent?.solutions?.title || DEFAULT_HOME_CONTENT.solutions.title,
    },
    navbar: {
      showPricing: homeContent?.navbar?.showPricing !== undefined ? homeContent.navbar.showPricing : false,
      showProducts: homeContent?.navbar?.showProducts !== undefined ? homeContent.navbar.showProducts : false,
    },
    branding: homeContent?.branding || {
      logoUrl: '/logo.png',
      brandTitle: 'SPESHWAY',
      brandSubtitle: 'ALL IN ONE ERP',
    },
  }));

  // Sync if socket updates
  useEffect(() => {
    if (homeContent) {
      setForm((prev) => ({
        ...prev,
        hero: { ...prev.hero, ...(homeContent.hero || {}) },
        stats: { ...prev.stats, ...(homeContent.stats || {}) },
        solutions: { ...prev.solutions, ...(homeContent.solutions || {}) },
        navbar: { ...prev.navbar, ...(homeContent.navbar || {}) },
        branding: { ...prev.branding, ...(homeContent.branding || {}) },
      }));
    }
  }, [homeContent]);

  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleCancel = (sectionName) => {
    if (sectionName === 'hero') {
      setForm((prev) => ({
        ...prev,
        hero: {
          badge: homeContent?.hero?.badge || DEFAULT_HOME_CONTENT.hero.badge,
          titleDark: homeContent?.hero?.titleDark || DEFAULT_HOME_CONTENT.hero.titleDark,
          titleGreen: homeContent?.hero?.titleGreen || DEFAULT_HOME_CONTENT.hero.titleGreen,
          subtitle: homeContent?.hero?.subtitle || DEFAULT_HOME_CONTENT.hero.subtitle,
          primaryBtnText: homeContent?.hero?.primaryBtnText || DEFAULT_HOME_CONTENT.hero.primaryBtnText,
          primaryBtnLink: homeContent?.hero?.primaryBtnLink || DEFAULT_HOME_CONTENT.hero.primaryBtnLink,
          secondaryBtnText: homeContent?.hero?.secondaryBtnText || DEFAULT_HOME_CONTENT.hero.secondaryBtnText,
        },
      }));
      setIsEditingHero(false);
    } else if (sectionName === 'stats') {
      setForm((prev) => ({
        ...prev,
        stats: {
          stat1Number: homeContent?.stats?.stat1Number || DEFAULT_HOME_CONTENT.stats.stat1Number,
          stat1Label: homeContent?.stats?.stat1Label || DEFAULT_HOME_CONTENT.stats.stat1Label,
          stat2Number: homeContent?.stats?.stat2Number || DEFAULT_HOME_CONTENT.stats.stat2Number,
          stat2Label: homeContent?.stats?.stat2Label || DEFAULT_HOME_CONTENT.stats.stat2Label,
          stat3Number: homeContent?.stats?.stat3Number || DEFAULT_HOME_CONTENT.stats.stat3Number,
          stat3Label: homeContent?.stats?.stat3Label || DEFAULT_HOME_CONTENT.stats.stat3Label,
          stat4Number: homeContent?.stats?.stat4Number || DEFAULT_HOME_CONTENT.stats.stat4Number,
          stat4Label: homeContent?.stats?.stat4Label || DEFAULT_HOME_CONTENT.stats.stat4Label,
        },
      }));
      setIsEditingStats(false);
    } else if (sectionName === 'solutions') {
      setForm((prev) => ({
        ...prev,
        solutions: {
          title: homeContent?.solutions?.title || DEFAULT_HOME_CONTENT.solutions.title,
        },
      }));
      setIsEditingSolutions(false);
    }
  };

  const handleSave = async (sectionName) => {
    setSavingSection(sectionName);

    // 1. Instant local state update & localStorage persistence
    setHomeContent(form);
    try {
      localStorage.setItem('speshway_home_content', JSON.stringify(form));
    } catch (e) {}

    // 2. Persist to API & MongoDB Atlas
    try {
      const res = await api.put('/home', form);
      if (res.data?.data) {
        setHomeContent(res.data.data);
        try {
          localStorage.setItem('speshway_home_content', JSON.stringify(res.data.data));
        } catch (e) {}
      }
    } catch (err) {
      console.warn(`API save for ${sectionName} had warning, active in memory & local storage:`, err.message);
    } finally {
      setSavingSection(null);
      setSavedSection(sectionName);
      setTimeout(() => {
        setSavedSection(null);
        if (sectionName === 'hero') setIsEditingHero(false);
        if (sectionName === 'stats') setIsEditingStats(false);
        if (sectionName === 'solutions') setIsEditingSolutions(false);
      }, 1200);
    }
  };

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
            Home Page Options
          </h1>
          <p className="admin-subtext" style={{ margin: 0 }}>
            Customize the hero banner, live stats counter, and solution titles displayed on the public landing page.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* CARD 1: HERO SECTION */}
        <div
          className="admin-card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #cbd5e1',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          }}
        >
          {/* Card Header with Edit Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#dcfce7',
                  color: '#00875a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Hero Banner Section
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Main top title, promotional badge, headline parts, and action buttons.
                </span>
              </div>
            </div>

            {!isEditingHero ? (
              <button
                type="button"
                onClick={() => setIsEditingHero(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 18px',
                  backgroundColor: '#00875a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 135, 90, 0.25)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Edit3 size={15} />
                <span>Edit</span>
              </button>
            ) : (
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#00875a',
                  backgroundColor: '#dcfce7',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: '1px solid #bbf7d0',
                }}
              >
                Editing Mode
              </span>
            )}
          </div>

          {/* VIEW MODE: Clean Read-only Display (Form Inputs Hidden) */}
          {!isEditingHero ? (
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      color: '#00875a',
                      backgroundColor: '#dcfce7',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    {form.hero.badge || '— OUR ERP SOLUTIONS —'}
                  </span>
                </div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                  {form.hero.titleDark || 'SPESHWAY'}{' '}
                  <span style={{ color: '#00875a' }}>{form.hero.titleGreen || 'ALL IN ONE ERP'}</span>
                </h3>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, maxWidth: '850px' }}>
                  {form.hero.subtitle || 'A collection of industry-ready ERP solutions to manage your business, operations, and customers — all in one place.'}
                </p>
              </div>
            </div>
          ) : (
            /* EDIT MODE: Inputs & Save Changes Option */
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                    Top Badge Text
                  </label>
                  <input
                    type="text"
                    value={form.hero.badge}
                    onChange={(e) => handleChange('hero', 'badge', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                    }}
                    placeholder="— OUR ERP SOLUTIONS —"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                    Headline Dark Text
                  </label>
                  <input
                    type="text"
                    value={form.hero.titleDark}
                    onChange={(e) => handleChange('hero', 'titleDark', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                    }}
                    placeholder="SPESHWAY"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#00875a', marginBottom: '6px' }}>
                    Headline Green Accent Text
                  </label>
                  <input
                    type="text"
                    value={form.hero.titleGreen}
                    onChange={(e) => handleChange('hero', 'titleGreen', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '2px solid #00875a',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      boxSizing: 'border-box',
                    }}
                    placeholder="ALL IN ONE ERP"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  value={form.hero.subtitle}
                  onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.88rem',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                  placeholder="A collection of industry-ready ERP solutions..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={form.hero.primaryBtnText}
                    onChange={(e) => handleChange('hero', 'primaryBtnText', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                    }}
                    placeholder="View All ERPs"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={form.hero.secondaryBtnText}
                    onChange={(e) => handleChange('hero', 'secondaryBtnText', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      boxSizing: 'border-box',
                    }}
                    placeholder="Request a Demo"
                  />
                </div>
              </div>

              {/* SAVE & CANCEL BUTTONS FOR HERO */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleCancel('hero')}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSave('hero')}
                  disabled={savingSection === 'hero'}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: savedSection === 'hero' ? '#059669' : '#00875a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(0, 135, 90, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {savedSection === 'hero' ? (
                    <>
                      <Check size={18} />
                      <span>Saved!</span>
                    </>
                  ) : savingSection === 'hero' ? (
                    <>
                      <Save size={18} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CARD 2: STATS BAR SECTION */}
        <div
          className="admin-card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #cbd5e1',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          }}
        >
          {/* Card Header with Edit Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BarChart3 size={20} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Stats Bar Metrics
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  The 4 metric cards displayed directly below the hero section.
                </span>
              </div>
            </div>

            {!isEditingStats ? (
              <button
                type="button"
                onClick={() => setIsEditingStats(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 18px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Edit3 size={15} />
                <span>Edit</span>
              </button>
            ) : (
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  backgroundColor: '#eff6ff',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: '1px solid #bfdbfe',
                }}
              >
                Editing Mode
              </span>
            )}
          </div>

          {/* VIEW MODE: Clean Read-only Display */}
          {!isEditingStats ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00875a', marginBottom: '4px' }}>
                  {form.stats.stat1Number || '524+'}
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#64748b' }}>
                  {form.stats.stat1Label || 'Happy Businesses'}
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8b5cf6', marginBottom: '4px' }}>
                  {form.stats.stat2Number || '17+'}
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#64748b' }}>
                  {form.stats.stat2Label || 'ERP Solutions'}
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb', marginBottom: '4px' }}>
                  {form.stats.stat3Number || '99.9%'}
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#64748b' }}>
                  {form.stats.stat3Label || 'Uptime & Security'}
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7', marginBottom: '4px' }}>
                  {form.stats.stat4Number || '24/7'}
                </div>
                <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#64748b' }}>
                  {form.stats.stat4Label || 'Customer Support'}
                </div>
              </div>
            </div>
          ) : (
            /* EDIT MODE: Inputs & Save Changes Option */
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                {/* Stat 1 */}
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#00875a', display: 'block', marginBottom: '8px' }}>
                    Metric #1 (Happy Businesses)
                  </span>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '2px' }}>Value</label>
                    <input
                      type="text"
                      value={form.stats.stat1Number}
                      onChange={(e) => handleChange('stats', 'stat1Number', e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 700, boxSizing: 'border-box' }}
                      placeholder="524+"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '2px' }}>Label</label>
                    <input
                      type="text"
                      value={form.stats.stat1Label}
                      onChange={(e) => handleChange('stats', 'stat1Label', e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', boxSizing: 'border-box' }}
                      placeholder="Happy Businesses"
                    />
                  </div>
                </div>

                {/* Stat 2 */}
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#8b5cf6', display: 'block', marginBottom: '8px' }}>
                    Metric #2 (ERP Solutions)
                  </span>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '2px' }}>Value</label>
                    <input
                      type="text"
                      value={form.stats.stat2Number}
                      onChange={(e) => handleChange('stats', 'stat2Number', e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 700, boxSizing: 'border-box' }}
                      placeholder="17+"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '2px' }}>Label</label>
                    <input
                      type="text"
                      value={form.stats.stat2Label}
                      onChange={(e) => handleChange('stats', 'stat2Label', e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', boxSizing: 'border-box' }}
                      placeholder="ERP Solutions"
                    />
                  </div>
                </div>

                {/* Stat 3 */}
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#2563eb', display: 'block', marginBottom: '8px' }}>
                    Metric #3 (Uptime & Security)
                  </span>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '2px' }}>Value</label>
                    <input
                      type="text"
                      value={form.stats.stat3Number}
                      onChange={(e) => handleChange('stats', 'stat3Number', e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 700, boxSizing: 'border-box' }}
                      placeholder="99.9%"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '2px' }}>Label</label>
                    <input
                      type="text"
                      value={form.stats.stat3Label}
                      onChange={(e) => handleChange('stats', 'stat3Label', e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', boxSizing: 'border-box' }}
                      placeholder="Uptime & Security"
                    />
                  </div>
                </div>

                {/* Stat 4 */}
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0284c7', display: 'block', marginBottom: '8px' }}>
                    Metric #4 (Customer Support)
                  </span>
                  <div style={{ marginBottom: '8px' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '2px' }}>Value</label>
                    <input
                      type="text"
                      value={form.stats.stat4Number}
                      onChange={(e) => handleChange('stats', 'stat4Number', e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.88rem', fontWeight: 700, boxSizing: 'border-box' }}
                      placeholder="24/7"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginBottom: '2px' }}>Label</label>
                    <input
                      type="text"
                      value={form.stats.stat4Label}
                      onChange={(e) => handleChange('stats', 'stat4Label', e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.82rem', boxSizing: 'border-box' }}
                      placeholder="Customer Support"
                    />
                  </div>
                </div>
              </div>

              {/* SAVE & CANCEL BUTTONS FOR STATS */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleCancel('stats')}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSave('stats')}
                  disabled={savingSection === 'stats'}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: savedSection === 'stats' ? '#059669' : '#00875a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(0, 135, 90, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {savedSection === 'stats' ? (
                    <>
                      <Check size={18} />
                      <span>Saved!</span>
                    </>
                  ) : savingSection === 'stats' ? (
                    <>
                      <Save size={18} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CARD 3: OUR ERP SOLUTIONS SECTION */}
        <div
          className="admin-card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #cbd5e1',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          }}
        >
          {/* Card Header with Edit Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Layers size={20} />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  ERP Solutions Section Title
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  The main header above the live ERP solutions catalog cards.
                </span>
              </div>
            </div>

            {!isEditingSolutions ? (
              <button
                type="button"
                onClick={() => setIsEditingSolutions(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '8px 18px',
                  backgroundColor: '#d97706',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(217, 119, 6, 0.25)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Edit3 size={15} />
                <span>Edit</span>
              </button>
            ) : (
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#d97706',
                  backgroundColor: '#fef3c7',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: '1px solid #fde68a',
                }}
              >
                Editing Mode
              </span>
            )}
          </div>

          {/* VIEW MODE: Clean Read-only Display */}
          {!isEditingSolutions ? (
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '18px 20px',
              }}
            >
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '6px' }}>
                Current Public Section Title:
              </span>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                {form.solutions.title || 'Our ERP Solutions'}
              </h3>
            </div>
          ) : (
            /* EDIT MODE: Inputs & Save Changes Option */
            <div>
              <div style={{ maxWidth: '480px', marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                  Section Title
                </label>
                <input
                  type="text"
                  value={form.solutions.title}
                  onChange={(e) => handleChange('solutions', 'title', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    boxSizing: 'border-box',
                  }}
                  placeholder="Our ERP Solutions"
                />
              </div>

              {/* SAVE & CANCEL BUTTONS FOR SOLUTIONS */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleCancel('solutions')}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSave('solutions')}
                  disabled={savingSection === 'solutions'}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: savedSection === 'solutions' ? '#059669' : '#00875a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 2px 8px rgba(0, 135, 90, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {savedSection === 'solutions' ? (
                    <>
                      <Check size={18} />
                      <span>Saved!</span>
                    </>
                  ) : savingSection === 'solutions' ? (
                    <>
                      <Save size={18} />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHomeSettings;

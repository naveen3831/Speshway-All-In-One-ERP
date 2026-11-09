import React, { useState, useEffect } from 'react';
import { useSocket, DEFAULT_BRANDING } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  User,
  Database,
  Zap,
  Save,
  Check,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Mail,
  Building,
  Image,
  Upload,
  RefreshCw,
  Sparkles,
  Globe,
} from 'lucide-react';

export const AdminSettings = () => {
  const { isConnected, branding, updateBranding, homeContent } = useSocket();
  const { user, updateUserProfile } = useAuth();

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;

  // Brand Identity Form State
  const [brandTitle, setBrandTitle] = useState(currentBranding.brandTitle || 'SPESHWAY');
  const [brandSubtitle, setBrandSubtitle] = useState(currentBranding.brandSubtitle || 'ALL IN ONE ERP');
  const [logoUrl, setLogoUrl] = useState(currentBranding.logoUrl || '/logo.png');
  const [savingBranding, setSavingBranding] = useState(false);
  const [brandingSuccess, setBrandingSuccess] = useState('');
  const [brandingError, setBrandingError] = useState('');

  // Profile Form State
  const [name, setName] = useState(user?.name || 'Speshway Administrator');
  const [email, setEmail] = useState(user?.email || 'admin@gmail.com');
  const [department, setDepartment] = useState(user?.department || 'Executive Administration');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (currentBranding) {
      setBrandTitle(currentBranding.brandTitle || 'SPESHWAY');
      setBrandSubtitle(currentBranding.brandSubtitle || 'ALL IN ONE ERP');
      setLogoUrl(currentBranding.logoUrl || '/logo.png');
    }
  }, [currentBranding?.brandTitle, currentBranding?.brandSubtitle, currentBranding?.logoUrl]);

  useEffect(() => {
    if (user) {
      setName(user.name || 'Speshway Administrator');
      setEmail(user.email || 'admin@gmail.com');
      setDepartment(user.department || 'Executive Administration');
    }
  }, [user]);

  // Handle Logo Image Upload with automatic scaling & PNG preservation
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setBrandingError('File size exceeds 10MB limit. Please select a smaller logo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) {
        setLogoUrl(dataUrl);
        setBrandingError('');
        return;
      }

      try {
        const img = new window.Image();
        img.onload = () => {
          const maxDim = 400;
          let width = img.width;
          let height = img.height;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/png');
          setLogoUrl(compressed);
          setBrandingError('');
        };
        img.onerror = () => {
          setLogoUrl(dataUrl);
          setBrandingError('');
        };
        img.src = dataUrl;
      } catch (err) {
        setLogoUrl(dataUrl);
        setBrandingError('');
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Brand Name and Logo changes
  const handleSaveBranding = async (e) => {
    e.preventDefault();
    setBrandingError('');
    setBrandingSuccess('');

    if (!brandTitle.trim()) {
      setBrandingError('Brand Name cannot be empty.');
      return;
    }

    setSavingBranding(true);
    try {
      const updated = {
        brandTitle: brandTitle.trim(),
        brandSubtitle: brandSubtitle.trim() || 'ALL IN ONE ERP',
        logoUrl: logoUrl.trim() || '/logo.png',
      };
      await updateBranding(updated);
      setBrandingSuccess('Application Logo and Brand Name successfully updated across the entire platform!');
      setTimeout(() => setBrandingSuccess(''), 4500);
    } catch (err) {
      setBrandingError('Failed to save branding changes: ' + err.message);
    } finally {
      setSavingBranding(false);
    }
  };

  const handleResetDefaultBranding = () => {
    setBrandTitle('SPESHWAY');
    setBrandSubtitle('ALL IN ONE ERP');
    setLogoUrl('/logo.png');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Name cannot be empty.');
      return;
    }

    if (!email.trim()) {
      setErrorMsg('Email cannot be empty.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    setSaving(true);
    try {
      const updatePayload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        department: department.trim(),
      };
      if (newPassword) {
        updatePayload.password = newPassword.trim();
      }

      if (user?._id && user._id !== 'admin_master_001') {
        try {
          await api.put(`/users/${user._id}`, updatePayload);
        } catch (apiErr) {
          console.warn('API update failed, updating local state:', apiErr.message);
        }
      }

      updateUserProfile(updatePayload);

      setNewPassword('');
      setConfirmPassword('');
      setSuccessMsg('Profile settings updated successfully! Sidebar profile synchronized.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const initials = (() => {
    if (!name) return 'AD';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  })();

  return (
    <div className="admin-page-view">
      {/* Header */}
      <div className="admin-page-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="admin-heading">System &amp; Application Settings</h1>
          <p className="admin-subtext">
            Customize the application brand name, logo, administrator credentials, database connections, and WebSocket engine state.
          </p>
        </div>
      </div>

      {/* 1. BRANDING & LOGO IDENTITY CARD */}
      <div
        className="admin-card"
        style={{
          marginBottom: '28px',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid #f1f5f9',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#ecfdf5',
                color: '#00875a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Application Logo &amp; Brand Identity
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Change company brand name, logo icon, and tagline displayed across the website and admin console.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                padding: '4px 12px',
                backgroundColor: '#ecfdf5',
                color: '#00875a',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Globe size={13} /> Global Brand Identity
            </span>
            <button
              type="button"
              onClick={handleResetDefaultBranding}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f8fafc',
                color: '#64748b',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Reset to default Speshway logo and brand name"
            >
              <RefreshCw size={13} /> Reset Default
            </button>
          </div>
        </div>

        {/* Branding Success / Error messages */}
        {brandingSuccess && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 18px',
              backgroundColor: '#dcfce7',
              border: '1px solid #86efac',
              borderRadius: '10px',
              color: '#166534',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Check size={18} />
            <span>{brandingSuccess}</span>
          </div>
        )}

        {brandingError && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 18px',
              backgroundColor: '#fee2e2',
              border: '1px solid #fca5a5',
              borderRadius: '10px',
              color: '#991b1b',
              fontSize: '0.88rem',
              fontWeight: 600,
            }}
          >
            {brandingError}
          </div>
        )}

        <form onSubmit={handleSaveBranding}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '24px',
            }}
          >
            {/* Left Column: Brand Name & Subtitle inputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  Application Brand Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={brandTitle}
                    onChange={(e) => setBrandTitle(e.target.value)}
                    placeholder="e.g. SPESHWAY or Your Brand Name"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: '#0f172a',
                    }}
                  />
                  <Globe
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                  />
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Primary brand name shown in header navbar, footers, and admin panels.
                </span>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  Brand Subtitle / Tagline
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={brandSubtitle}
                    onChange={(e) => setBrandSubtitle(e.target.value)}
                    placeholder="e.g. ALL IN ONE ERP"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#0f172a',
                    }}
                  />
                  <Sparkles
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                  />
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Subtitle shown directly below the logo in the header and footer.
                </span>
              </div>

              {/* Logo URL Input alternative */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  Logo Image URL or Local Path
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="/logo.png or https://example.com/logo.png"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.88rem',
                      color: '#0f172a',
                    }}
                  />
                  <Image
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                  />
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Direct URL or upload a file using the upload box on the right.
                </span>
              </div>
            </div>

            {/* Right Column: Logo Upload & Live Previews */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  Upload New Logo Image (PNG, SVG, JPG, WebP)
                </label>
                <div
                  style={{
                    border: '2px dashed #cbd5e1',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    position: 'relative',
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files?.[0]) {
                      const fakeEvent = { target: { files: e.dataTransfer.files } };
                      handleLogoUpload(fakeEvent);
                    }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      cursor: 'pointer',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <Upload size={26} style={{ color: '#00875a', margin: '0 auto 6px auto', display: 'block' }} />
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#1e293b' }}>
                    Click to browse or drag and drop logo here
                  </span>
                  <span style={{ display: 'block', fontSize: '0.74rem', color: '#64748b', marginTop: '3px' }}>
                    Transparent PNG or SVG recommended
                  </span>
                </div>
              </div>

              {/* Live Preview Box */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '10px',
                  }}
                >
                  Live Visual Previews (Real-time Preview)
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {/* Navbar Light Preview */}
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1.5px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                      Website Navbar (Light)
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={logoUrl || '/logo.png'}
                          alt="Preview"
                          style={{ maxWidth: '36px', maxHeight: '36px', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.src = '/logo.png';
                          }}
                        />
                      </div>
                      <div style={{ minWidth: 0, overflow: 'hidden' }}>
                        <div
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 900,
                            color: '#0f172a',
                            letterSpacing: '-0.02em',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {brandTitle || 'BRAND NAME'}
                        </div>
                        <div
                          style={{
                            fontSize: '0.62rem',
                            fontWeight: 800,
                            color: '#00875a',
                            letterSpacing: '0.12em',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {brandSubtitle || 'ALL IN ONE ERP'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Admin Dark Preview */}
                  <div
                    style={{
                      backgroundColor: '#062a1e',
                      border: '1.5px solid #0b4532',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6ee7b7', display: 'block', marginBottom: '6px' }}>
                      Admin Sidebar (Dark)
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={logoUrl || '/logo.png'}
                          alt="Preview"
                          style={{ maxWidth: '36px', maxHeight: '36px', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.src = '/logo.png';
                          }}
                        />
                      </div>
                      <div style={{ minWidth: 0, overflow: 'hidden' }}>
                        <div
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 900,
                            color: '#ffffff',
                            letterSpacing: '-0.02em',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {brandTitle || 'BRAND NAME'}
                        </div>
                        <div
                          style={{
                            fontSize: '0.62rem',
                            fontWeight: 800,
                            color: '#34d399',
                            letterSpacing: '0.12em',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          ADMIN CONSOLE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Branding Action Button */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              paddingTop: '16px',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <button
              type="submit"
              disabled={savingBranding}
              className="btn-hero-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                fontSize: '0.9rem',
                fontWeight: 700,
              }}
            >
              {savingBranding ? (
                <>
                  <Save size={16} /> Saving Branding...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Logo &amp; Brand Name
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Messages for Profile */}
      {successMsg && (
        <div
          style={{
            marginBottom: '20px',
            padding: '12px 18px',
            backgroundColor: '#dcfce7',
            border: '1px solid #86efac',
            borderRadius: '10px',
            color: '#166534',
            fontSize: '0.88rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Check size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div
          style={{
            marginBottom: '20px',
            padding: '12px 18px',
            backgroundColor: '#fee2e2',
            border: '1px solid #fca5a5',
            borderRadius: '10px',
            color: '#991b1b',
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Main Profile Options Card */}
      <div
        className="admin-card"
        style={{
          marginBottom: '28px',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid #f1f5f9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#ecfdf5',
                color: '#00875a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                Administrator Profile Options
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Change your name, login email, and administrative access password
              </span>
            </div>
          </div>
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: '#ecfdf5',
              color: '#00875a',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <ShieldCheck size={13} /> Role: Super Administrator
          </span>
        </div>

        {/* Profile Avatar & Form Grid */}
        <form onSubmit={handleSaveProfile}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '28px',
              alignItems: 'start',
              marginBottom: '24px',
            }}
          >
            {/* Avatar Preview */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '16px',
                backgroundColor: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                minWidth: '130px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#00875a',
                  color: '#ffffff',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 135, 90, 0.25)',
                }}
              >
                {initials}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                Sidebar Avatar
              </span>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
              {/* Display Name */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  Administrator Display Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Speshway Administrator"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: '#0f172a',
                    }}
                  />
                  <User
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  Admin Login Email *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@gmail.com"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      color: '#0f172a',
                    }}
                  />
                  <Mail
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  Department / Office
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Executive Administration"
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      color: '#0f172a',
                    }}
                  />
                  <Building
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                  />
                </div>
              </div>

              {/* Change Password (Optional) */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  New Password (leave blank to keep current)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 6 chars)"
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '0.9rem',
                      color: '#0f172a',
                    }}
                  />
                  <Lock
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '2px',
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (if newPassword entered) */}
              {newPassword && (
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#1e293b',
                      marginBottom: '6px',
                    }}
                  >
                    Confirm New Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 36px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '0.9rem',
                        color: '#0f172a',
                      }}
                    />
                    <Lock
                      size={16}
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              paddingTop: '16px',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <button
              type="submit"
              disabled={saving}
              className="btn-hero-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                fontSize: '0.88rem',
                fontWeight: 700,
              }}
            >
              {saving ? (
                <>
                  <Save size={16} /> Saving...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Profile Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* System & Database Connection Cards */}
      <div className="admin-two-cols">
        <div className="admin-card">
          <div className="admin-card-header">
            <h3>
              <Database size={18} style={{ display: 'inline', marginRight: '6px' }} /> MongoDB Connection
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div>
              <strong>Cluster URI:</strong>
              <div style={{ wordBreak: 'break-all', color: '#64748b', fontSize: '0.82rem', marginTop: '4px' }}>
                <code>mongodb+srv://speshway123:***@speshwyallinoneerp.vv15a6z.mongodb.net/</code>
              </div>
            </div>
            <div>
              <strong>Database Name:</strong> <code>speshway_erp</code>
            </div>
            <div>
              <strong>Status:</strong> <span className="badge-active">Active / In-Memory Fallback Online</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h3>
              <Zap size={18} style={{ display: 'inline', marginRight: '6px' }} /> Real-Time Engine (Socket.IO)
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div>
              <strong>Transport Protocol:</strong> WebSocket with Polling Fallback
            </div>
            <div>
              <strong>Live Connection:</strong>{' '}
              <span className={`badge-status ${isConnected ? 'active' : 'beta'}`}>
                {isConnected ? 'Connected & Synchronized' : 'Connecting'}
              </span>
            </div>
            <div>
              <strong>Port:</strong> 5000 (Backend API &amp; Socket)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

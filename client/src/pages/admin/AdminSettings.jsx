import React, { useState, useEffect } from 'react';
import { useSocket, DEFAULT_BRANDING, DEFAULT_SOCIAL_LINKS } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import {
  User,
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
  Share2,
  ExternalLink,
  AlertCircle,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Clock,
  Edit3,
  X,
} from 'lucide-react';

// Platform detector helper
const detectPlatform = (urlStr) => {
  if (!urlStr || typeof urlStr !== 'string') return null;
  const s = urlStr.toLowerCase();
  if (s.includes('facebook.com') || s.includes('fb.com') || s.includes('fb.me')) return 'Facebook';
  if (s.includes('twitter.com') || s.includes('x.com')) return 'X (Twitter)';
  if (s.includes('linkedin.com')) return 'LinkedIn';
  if (s.includes('instagram.com') || s.includes('instagr.am')) return 'Instagram';
  if (s.includes('youtube.com') || s.includes('youtu.be')) return 'YouTube';
  return null;
};

// Strict Social URL Validator
const validateSocialUrl = (platformKey, url) => {
  if (!url || !url.trim()) {
    return { valid: true, error: null };
  }

  const trimmed = url.trim();
  const detected = detectPlatform(trimmed);

  let normalizedUrl = trimmed;
  if (!/^https?:\/\//i.test(normalizedUrl)) {
    normalizedUrl = 'https://' + normalizedUrl;
  }

  let parsed;
  try {
    parsed = new URL(normalizedUrl);
  } catch (e) {
    return {
      valid: false,
      error: 'Invalid URL format! Must be a complete web address (e.g. https://...).',
    };
  }

  const hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
  const pathname = parsed.pathname;

  switch (platformKey) {
    case 'facebook': {
      if (detected && detected !== 'Facebook') {
        return {
          valid: false,
          error: `Wrong Platform! You entered a ${detected} link. Only Facebook links are accepted.`,
        };
      }
      const isFbHost = ['facebook.com', 'fb.com', 'fb.me', 'm.facebook.com'].some(
        (h) => hostname === h || hostname.endsWith('.' + h)
      );
      if (!isFbHost) {
        return {
          valid: false,
          error: 'Wrong URL! Only official Facebook URLs (e.g. https://facebook.com/your-brand) are allowed.',
        };
      }
      if (!pathname || pathname === '/' || pathname.length < 2) {
        return {
          valid: false,
          error: 'Missing Facebook Page or Profile name! Example: https://facebook.com/speshway',
        };
      }
      return { valid: true, error: null, normalized: normalizedUrl };
    }

    case 'twitter': {
      if (detected && detected !== 'X (Twitter)') {
        return {
          valid: false,
          error: `Wrong Platform! You entered a ${detected} link. Only X / Twitter links are accepted.`,
        };
      }
      const isTwitterHost = ['x.com', 'twitter.com'].some(
        (h) => hostname === h || hostname.endsWith('.' + h)
      );
      if (!isTwitterHost) {
        return {
          valid: false,
          error: 'Wrong URL! Only official X / Twitter URLs (e.g. https://x.com/your-handle) are allowed.',
        };
      }
      if (!pathname || pathname === '/' || pathname.length < 2) {
        return {
          valid: false,
          error: 'Missing X / Twitter handle or username! Example: https://x.com/speshway',
        };
      }
      return { valid: true, error: null, normalized: normalizedUrl };
    }

    case 'linkedin': {
      if (detected && detected !== 'LinkedIn') {
        return {
          valid: false,
          error: `Wrong Platform! You entered a ${detected} link. Only LinkedIn links are accepted.`,
        };
      }
      const isLinkedinHost = ['linkedin.com'].some(
        (h) => hostname === h || hostname.endsWith('.' + h)
      );
      if (!isLinkedinHost) {
        return {
          valid: false,
          error: 'Wrong URL! Only official LinkedIn URLs (e.g. https://linkedin.com/company/your-company) are allowed.',
        };
      }
      if (!pathname || pathname === '/' || pathname.length < 2) {
        return {
          valid: false,
          error: 'Missing LinkedIn company or profile path! Example: https://linkedin.com/company/speshway',
        };
      }
      return { valid: true, error: null, normalized: normalizedUrl };
    }

    case 'instagram': {
      if (detected && detected !== 'Instagram') {
        return {
          valid: false,
          error: `Wrong Platform! You entered a ${detected} link. Only Instagram links are accepted.`,
        };
      }
      const isInstaHost = ['instagram.com', 'instagr.am'].some(
        (h) => hostname === h || hostname.endsWith('.' + h)
      );
      if (!isInstaHost) {
        return {
          valid: false,
          error: 'Wrong URL! Only official Instagram URLs (e.g. https://instagram.com/your-profile) are allowed.',
        };
      }
      if (!pathname || pathname === '/' || pathname.length < 2) {
        return {
          valid: false,
          error: 'Missing Instagram profile username! Example: https://instagram.com/speshway',
        };
      }
      return { valid: true, error: null, normalized: normalizedUrl };
    }

    case 'youtube': {
      if (detected && detected !== 'YouTube') {
        return {
          valid: false,
          error: `Wrong Platform! You entered a ${detected} link. Only YouTube links are accepted.`,
        };
      }
      const isYtHost = ['youtube.com', 'youtu.be', 'm.youtube.com'].some(
        (h) => hostname === h || hostname.endsWith('.' + h)
      );
      if (!isYtHost) {
        return {
          valid: false,
          error: 'Wrong URL! Only official YouTube URLs (e.g. https://youtube.com/@your-channel) are allowed.',
        };
      }
      if (!pathname || pathname === '/' || pathname.length < 2) {
        return {
          valid: false,
          error: 'Missing YouTube channel handle or ID! Example: https://youtube.com/@speshway',
        };
      }
      return { valid: true, error: null, normalized: normalizedUrl };
    }

    default:
      return { valid: true, error: null, normalized: normalizedUrl };
  }
};

export const AdminSettings = () => {
  const { branding, updateBranding, homeContent, socialLinks, updateSocialLinks } = useSocket();
  const { user, updateUserProfile, timeoutMinutes, updateSessionTimeout } = useAuth();

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const currentSocial = socialLinks || homeContent?.socialLinks || DEFAULT_SOCIAL_LINKS;

  // Session Timeout State
  const [selectedTimeout, setSelectedTimeout] = useState(timeoutMinutes || 10);
  const [savingTimeout, setSavingTimeout] = useState(false);
  const [timeoutSuccess, setTimeoutSuccess] = useState('');

  useEffect(() => {
    if (timeoutMinutes) {
      setSelectedTimeout(timeoutMinutes);
    }
  }, [timeoutMinutes]);

  const handleSaveTimeout = (e) => {
    e.preventDefault();
    setSavingTimeout(true);
    updateSessionTimeout(selectedTimeout);
    setTimeoutSuccess(`Session inactivity timeout successfully set to ${selectedTimeout} minutes!`);
    setIsEditingTimeout(false);
    setTimeout(() => {
      setSavingTimeout(false);
      setTimeout(() => setTimeoutSuccess(''), 4500);
    }, 300);
  };

  // Brand Identity Form State
  const [brandTitle, setBrandTitle] = useState(currentBranding.brandTitle || 'SPESHWAY');
  const [brandSubtitle, setBrandSubtitle] = useState(currentBranding.brandSubtitle || 'ALL IN ONE ERP');
  const [logoUrl, setLogoUrl] = useState(currentBranding.logoUrl || '/logo.png');
  const [savingBranding, setSavingBranding] = useState(false);
  const [brandingSuccess, setBrandingSuccess] = useState('');
  const [brandingError, setBrandingError] = useState('');

  // Social Links Form State
  const [socialForm, setSocialForm] = useState({
    facebook: currentSocial.facebook || 'https://facebook.com/speshway',
    twitter: currentSocial.twitter || 'https://x.com/speshway',
    linkedin: currentSocial.linkedin || 'https://linkedin.com/company/speshway',
    instagram: currentSocial.instagram || 'https://instagram.com/speshway',
    youtube: currentSocial.youtube || 'https://youtube.com/@speshway',
  });
  const [socialErrors, setSocialErrors] = useState({});
  const [savingSocial, setSavingSocial] = useState(false);
  const [socialSuccess, setSocialSuccess] = useState('');
  const [socialGeneralError, setSocialGeneralError] = useState('');

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

  // Card Editing States (Default to clean read-only view mode)
  const [isEditingBranding, setIsEditingBranding] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isEditingTimeout, setIsEditingTimeout] = useState(false);

  const handleCancelBranding = () => {
    setBrandTitle(currentBranding.brandTitle || 'SPESHWAY');
    setBrandSubtitle(currentBranding.brandSubtitle || 'ALL IN ONE ERP');
    setLogoUrl(currentBranding.logoUrl || '/logo.png');
    setBrandingError('');
    setIsEditingBranding(false);
  };

  const handleCancelProfile = () => {
    if (user) {
      setName(user.name || 'Speshway Administrator');
      setEmail(user.email || 'admin@gmail.com');
      setDepartment(user.department || 'Executive Administration');
    }
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setIsEditingProfile(false);
  };

  const handleCancelSocial = () => {
    setSocialForm({
      facebook: currentSocial.facebook || 'https://facebook.com/speshway',
      twitter: currentSocial.twitter || 'https://x.com/speshway',
      linkedin: currentSocial.linkedin || 'https://linkedin.com/company/speshway',
      instagram: currentSocial.instagram || 'https://instagram.com/speshway',
      youtube: currentSocial.youtube || 'https://youtube.com/@speshway',
    });
    setSocialErrors({});
    setSocialGeneralError('');
    setIsEditingSocial(false);
  };

  const handleCancelTimeout = () => {
    setSelectedTimeout(timeoutMinutes || 10);
    setIsEditingTimeout(false);
  };

  useEffect(() => {
    if (currentBranding) {
      setBrandTitle(currentBranding.brandTitle || 'SPESHWAY');
      setBrandSubtitle(currentBranding.brandSubtitle || 'ALL IN ONE ERP');
      setLogoUrl(currentBranding.logoUrl || '/logo.png');
    }
  }, [currentBranding?.brandTitle, currentBranding?.brandSubtitle, currentBranding?.logoUrl]);

  useEffect(() => {
    if (currentSocial) {
      setSocialForm({
        facebook: currentSocial.facebook || 'https://facebook.com/speshway',
        twitter: currentSocial.twitter || 'https://x.com/speshway',
        linkedin: currentSocial.linkedin || 'https://linkedin.com/company/speshway',
        instagram: currentSocial.instagram || 'https://instagram.com/speshway',
        youtube: currentSocial.youtube || 'https://youtube.com/@speshway',
      });
    }
  }, [
    currentSocial?.facebook,
    currentSocial?.twitter,
    currentSocial?.linkedin,
    currentSocial?.instagram,
    currentSocial?.youtube,
  ]);

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
      setIsEditingBranding(false);
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
      setIsEditingProfile(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Social Links Handlers
  const handleSocialChange = (key, value) => {
    setSocialForm((prev) => ({ ...prev, [key]: value }));
    const result = validateSocialUrl(key, value);
    setSocialErrors((prev) => ({
      ...prev,
      [key]: result.valid ? null : result.error,
    }));
  };

  const handleSaveSocial = async (e) => {
    e.preventDefault();
    setSocialSuccess('');
    setSocialGeneralError('');

    const keys = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'];
    const newErrors = {};
    let hasError = false;
    const normalizedPayload = {};

    keys.forEach((key) => {
      const val = socialForm[key] || '';
      const result = validateSocialUrl(key, val);
      if (!result.valid) {
        newErrors[key] = result.error;
        hasError = true;
      } else {
        newErrors[key] = null;
        normalizedPayload[key] = result.normalized || val.trim();
      }
    });

    setSocialErrors(newErrors);

    if (hasError) {
      setSocialGeneralError('Invalid URL detected! Please correct the highlighted social media links before saving.');
      return;
    }

    setSavingSocial(true);
    try {
      await updateSocialLinks(normalizedPayload);
      setSocialSuccess('Official social media account links saved successfully! Footer links are now synchronized.');
      setIsEditingSocial(false);
      setTimeout(() => setSocialSuccess(''), 4500);
    } catch (err) {
      setSocialGeneralError('Failed to save social media links: ' + err.message);
    } finally {
      setSavingSocial(false);
    }
  };

  const handleResetDefaultSocial = () => {
    setSocialForm(DEFAULT_SOCIAL_LINKS);
    setSocialErrors({});
    setSocialGeneralError('');
  };

  const SOCIAL_PLATFORMS = [
    {
      key: 'facebook',
      name: 'Facebook',
      exampleDomain: 'facebook.com / fb.com',
      brandColor: '#1877F2',
      badgeBg: 'rgba(24, 119, 242, 0.12)',
      badgeBorder: 'rgba(24, 119, 242, 0.3)',
      icon: <Facebook size={18} style={{ color: '#1877F2' }} />,
      placeholder: 'https://facebook.com/your-brand',
      example: 'https://facebook.com/speshway',
    },
    {
      key: 'twitter',
      name: 'X (formerly Twitter)',
      exampleDomain: 'x.com / twitter.com',
      brandColor: '#0f172a',
      badgeBg: 'rgba(15, 23, 42, 0.08)',
      badgeBorder: 'rgba(15, 23, 42, 0.25)',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0f172a">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      placeholder: 'https://x.com/your-handle',
      example: 'https://x.com/speshway',
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      exampleDomain: 'linkedin.com',
      brandColor: '#0A66C2',
      badgeBg: 'rgba(10, 102, 194, 0.12)',
      badgeBorder: 'rgba(10, 102, 194, 0.3)',
      icon: <Linkedin size={18} style={{ color: '#0A66C2' }} />,
      placeholder: 'https://linkedin.com/company/your-company',
      example: 'https://linkedin.com/company/speshway',
    },
    {
      key: 'instagram',
      name: 'Instagram',
      exampleDomain: 'instagram.com',
      brandColor: '#E1306C',
      badgeBg: 'rgba(225, 48, 108, 0.12)',
      badgeBorder: 'rgba(225, 48, 108, 0.3)',
      icon: <Instagram size={18} style={{ color: '#E1306C' }} />,
      placeholder: 'https://instagram.com/your-username',
      example: 'https://instagram.com/speshway',
    },
    {
      key: 'youtube',
      name: 'YouTube',
      exampleDomain: 'youtube.com / youtu.be',
      brandColor: '#FF0000',
      badgeBg: 'rgba(255, 0, 0, 0.12)',
      badgeBorder: 'rgba(255, 0, 0, 0.3)',
      icon: <Youtube size={18} style={{ color: '#FF0000' }} />,
      placeholder: 'https://youtube.com/@your-channel',
      example: 'https://youtube.com/@speshway',
    },
  ];

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
            Customize the application brand name, logo, and administrator credentials.
          </p>
        </div>
      </div>

      {/* 1. BRANDING & LOGO IDENTITY CARD */}
      <div
        className="admin-card admin-settings-card"
        style={{
          marginBottom: '28px',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          className="admin-settings-card-header"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid #f1f5f9',
            gap: '12px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: '1 1 auto', minWidth: 0 }}>
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
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <Sparkles size={20} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Application Logo &amp; Brand Identity
                </h3>
                <span
                  style={{
                    padding: '3px 10px',
                    backgroundColor: '#ecfdf5',
                    color: '#00875a',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Globe size={12} /> Global Brand Identity
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '4px', lineHeight: 1.4 }}>
                Change company brand name, logo icon, and tagline displayed across the website and admin console.
              </span>
            </div>
          </div>

          <div
            className="admin-settings-card-corner-action"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              flexShrink: 0,
              marginLeft: 'auto',
            }}
          >
            {!isEditingBranding ? (
              <button
                type="button"
                onClick={() => setIsEditingBranding(true)}
                className="btn-hero-primary admin-settings-edit-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 16px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 135, 90, 0.25)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Edit3 size={15} />
                <span>Edit</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
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
                    whiteSpace: 'nowrap',
                  }}
                  title="Reset to default Speshway logo and brand name"
                >
                  <RefreshCw size={13} /> Reset Default
                </button>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#00875a',
                    backgroundColor: '#dcfce7',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: '1px solid #bbf7d0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Editing Mode
                </span>
              </div>
            )}
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

        {/* VIEW MODE: Clean Read-only Display (Form Inputs Hidden) */}
        {!isEditingBranding ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Left Column: View Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  Application Brand Name
                </span>
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Globe size={16} style={{ color: '#00875a' }} />
                  <span>{brandTitle || 'SPESHWAY'}</span>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Primary brand name shown in header navbar, footers, and admin panels.
                </span>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  Brand Subtitle / Tagline
                </span>
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Sparkles size={16} style={{ color: '#00875a' }} />
                  <span>{brandSubtitle || 'ALL IN ONE ERP'}</span>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Subtitle shown directly below the logo in the header and footer.
                </span>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  Logo Image URL or Local Path
                </span>
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    wordBreak: 'break-all',
                  }}
                >
                  <Image size={16} style={{ color: '#00875a', flexShrink: 0 }} />
                  <span>{logoUrl || '/logo.png'}</span>
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Direct URL or active image asset.
                </span>
              </div>
            </div>

            {/* Right Column: Previews in View Mode */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px',
                  padding: '16px',
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
                  {/* Website Navbar (Light) */}
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
        ) : (
          /* EDIT MODE: Form Inputs & File Upload */
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

            {/* Save Branding Action Buttons (Cancel & Save) */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid #f1f5f9',
              }}
            >
              <button
                type="button"
                onClick={handleCancelBranding}
                className="btn-hero-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <X size={15} /> Cancel
              </button>
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
                  borderRadius: '8px',
                  cursor: 'pointer',
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
        )}
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
        className="admin-card admin-settings-card"
        style={{
          marginBottom: '28px',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          className="admin-settings-card-header"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid #f1f5f9',
            gap: '12px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: '1 1 auto', minWidth: 0 }}>
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
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <User size={20} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Administrator Profile Options
                </h3>
                <span
                  style={{
                    padding: '3px 10px',
                    backgroundColor: '#ecfdf5',
                    color: '#00875a',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShieldCheck size={12} /> Role: Super Administrator
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '4px', lineHeight: 1.4 }}>
                Change your name, login email, and administrative access password
              </span>
            </div>
          </div>

          <div
            className="admin-settings-card-corner-action"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              flexShrink: 0,
              marginLeft: 'auto',
            }}
          >
            {!isEditingProfile ? (
              <button
                type="button"
                onClick={() => setIsEditingProfile(true)}
                className="btn-hero-primary admin-settings-edit-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 16px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 135, 90, 0.25)',
                  whiteSpace: 'nowrap',
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
                  whiteSpace: 'nowrap',
                }}
              >
                Editing Mode
              </span>
            )}
          </div>
        </div>

        {/* VIEW MODE: Clean Read-only Display (Form Inputs Hidden) */}
        {!isEditingProfile ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '28px',
              alignItems: 'center',
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

            {/* Read-only Profile Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  Administrator Display Name
                </span>
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <User size={16} style={{ color: '#00875a' }} />
                  <span>{name || 'Speshway Administrator'}</span>
                </div>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  Login Email Address
                </span>
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Mail size={16} style={{ color: '#00875a' }} />
                  <span>{email || 'admin@gmail.com'}</span>
                </div>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  Department / Office
                </span>
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Building size={16} style={{ color: '#00875a' }} />
                  <span>{department || 'Executive Administration'}</span>
                </div>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
                  Account Password
                </span>
                <div
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Lock size={16} style={{ color: '#00875a' }} />
                  <span>•••••••••••• (Encrypted)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Profile Avatar & Form Grid */
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

          {/* Form Action Buttons: Cancel & Save */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: '16px',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <button
              type="button"
              onClick={handleCancelProfile}
              className="btn-hero-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <X size={15} /> Cancel
            </button>
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
                borderRadius: '8px',
                cursor: 'pointer',
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
      )}
      </div>

      {/* 3. SOCIAL MEDIA PROFILES & URL CONFIGURATION CARD */}
      <div
        className="admin-card admin-settings-card"
        style={{
          marginBottom: '28px',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          className="admin-settings-card-header"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid #f1f5f9',
            gap: '12px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: '1 1 auto', minWidth: 0 }}>
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
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <Share2 size={20} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Official Social Media Accounts &amp; Profile Links
                </h3>
                <span
                  style={{
                    padding: '3px 10px',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Share2 size={12} /> Public Header &amp; Footer
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '4px', lineHeight: 1.4 }}>
                Configure destination links for the footer social icons. Only authentic, matching platform URLs are accepted.
              </span>
            </div>
          </div>

          <div
            className="admin-settings-card-corner-action"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              flexShrink: 0,
              marginLeft: 'auto',
            }}
          >
            {!isEditingSocial ? (
              <button
                type="button"
                onClick={() => setIsEditingSocial(true)}
                className="btn-hero-primary admin-settings-edit-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 16px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 135, 90, 0.25)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Edit3 size={15} />
                <span>Edit</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleResetDefaultSocial}
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
                    whiteSpace: 'nowrap',
                  }}
                  title="Reset all social media links to default Speshway handles"
                >
                  <RefreshCw size={13} /> Reset Default Links
                </button>
                <span
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#00875a',
                    backgroundColor: '#dcfce7',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: '1px solid #bbf7d0',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Editing Mode
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Social Success / Error alerts */}
        {socialSuccess && (
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
            <span>{socialSuccess}</span>
          </div>
        )}

        {socialGeneralError && (
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
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={18} />
            <span>{socialGeneralError}</span>
          </div>
        )}

        {/* VIEW MODE: Clean Read-only Display (Form Inputs Hidden) */}
        {!isEditingSocial ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {SOCIAL_PLATFORMS.map((platform) => {
              const val = socialForm[platform.key] || '';
              return (
                <div
                  key={platform.key}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: platform.badgeBg,
                          border: `1px solid ${platform.badgeBorder}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {platform.icon}
                      </span>
                      <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{platform.name}</strong>
                    </div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#059669',
                        backgroundColor: '#d1fae5',
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Active
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      color: val ? '#2563eb' : '#94a3b8',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {val ? (
                      <a
                        href={val}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#2563eb',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{val}</span>
                        <ExternalLink size={12} style={{ flexShrink: 0 }} />
                      </a>
                    ) : (
                      'Not configured'
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleSaveSocial}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {SOCIAL_PLATFORMS.map((platform) => {
              const val = socialForm[platform.key] || '';
              const err = socialErrors[platform.key];
              const isFilled = Boolean(val.trim());
              const isValid = isFilled && !err;

              return (
                <div
                  key={platform.key}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: err
                      ? '1.5px solid #fca5a5'
                      : isValid
                      ? '1.5px solid #86efac'
                      : '1px solid #e2e8f0',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: platform.badgeBg,
                          border: `1px solid ${platform.badgeBorder}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {platform.icon}
                      </div>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                        {platform.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          color: '#64748b',
                          backgroundColor: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        Domain: <strong>{platform.exampleDomain}</strong>
                      </span>
                      {isValid && (
                        <a
                          href={val.startsWith('http') ? val : `https://${val}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            color: '#2563eb',
                            textDecoration: 'none',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: '#eff6ff',
                            border: '1px solid #bfdbfe',
                          }}
                          title={`Open ${platform.name} in a new tab`}
                        >
                          <ExternalLink size={12} /> Test Link
                        </a>
                      )}
                    </div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleSocialChange(platform.key, e.target.value)}
                      placeholder={platform.placeholder}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: err
                          ? '2px solid #ef4444'
                          : isValid
                          ? '2px solid #10b981'
                          : '1.5px solid #cbd5e1',
                        backgroundColor: '#ffffff',
                        fontSize: '0.9rem',
                        color: '#0f172a',
                        outline: 'none',
                        fontFamily: 'monospace, sans-serif',
                      }}
                    />
                  </div>

                  {/* Example link & Live Validation message */}
                  <div
                    style={{
                      marginTop: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        Required Format Example:
                      </span>
                      <code
                        style={{
                          fontSize: '0.75rem',
                          backgroundColor: '#e2e8f0',
                          padding: '2px 7px',
                          borderRadius: '4px',
                          color: '#334155',
                          fontFamily: 'monospace',
                        }}
                      >
                        {platform.example}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleSocialChange(platform.key, platform.example)}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '0 4px',
                          color: '#00875a',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        Use Example
                      </button>
                    </div>

                    {err && (
                      <div
                        style={{
                          color: '#dc2626',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          backgroundColor: '#fef2f2',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid #fecaca',
                        }}
                      >
                        <AlertCircle size={14} />
                        <span>{err}</span>
                      </div>
                    )}

                    {isValid && (
                      <div
                        style={{
                          color: '#16a34a',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          backgroundColor: '#f0fdf4',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid #bbf7d0',
                        }}
                      >
                        <Check size={14} />
                        <span>Verified authentic {platform.name} profile URL</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Save Action Buttons (Cancel & Save) */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: '20px',
              marginTop: '24px',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <button
              type="button"
              onClick={handleCancelSocial}
              className="btn-hero-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              <X size={15} /> Cancel
            </button>
            <button
              type="submit"
              disabled={savingSocial || Object.values(socialErrors).some(Boolean)}
              className="btn-hero-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 26px',
                fontSize: '0.9rem',
                fontWeight: 700,
                borderRadius: '8px',
                opacity: Object.values(socialErrors).some(Boolean) ? 0.6 : 1,
                cursor: Object.values(socialErrors).some(Boolean) ? 'not-allowed' : 'pointer',
              }}
            >
              {savingSocial ? (
                <>
                  <Save size={16} /> Saving Links...
                </>
              ) : (
                <>
                  <Save size={16} /> Save Social Media Links
                </>
              )}
            </button>
          </div>
        </form>
      )}
      </div>


      {/* 4. SESSION SECURITY & INACTIVITY TIMEOUT CARD */}
      <div
        className="admin-card admin-settings-card"
        style={{
          marginBottom: '28px',
          borderRadius: '16px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
          backgroundColor: '#ffffff',
          position: 'relative',
        }}
      >
        <div
          className="admin-settings-card-header"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid #f1f5f9',
            gap: '12px',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: '1 1 auto', minWidth: 0 }}>
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
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                  Session Security &amp; Inactivity Auto-Lock
                </h3>
                <span
                  style={{
                    padding: '3px 10px',
                    backgroundColor: '#ecfdf5',
                    color: '#00875a',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Check size={12} /> HTTP-Only Cookies Active
                </span>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginTop: '4px', lineHeight: 1.4 }}>
                Manage automatic idle timeout and secure HTTP-only cookie parameters for active administrators.
              </span>
            </div>
          </div>

          <div
            className="admin-settings-card-corner-action"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              flexShrink: 0,
              marginLeft: 'auto',
            }}
          >
            {!isEditingTimeout ? (
              <button
                type="button"
                onClick={() => setIsEditingTimeout(true)}
                className="btn-hero-primary admin-settings-edit-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '7px 16px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0, 135, 90, 0.25)',
                  whiteSpace: 'nowrap',
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
                  whiteSpace: 'nowrap',
                }}
              >
                Editing Mode
              </span>
            )}
          </div>
        </div>

        {timeoutSuccess && (
          <div
            style={{
              marginBottom: '20px',
              padding: '12px 16px',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '10px',
              color: '#065f46',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Check size={18} />
            {timeoutSuccess}
          </div>
        )}

        {/* VIEW MODE: Clean Read-only Display (Form Inputs Hidden) */}
        {!isEditingTimeout ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Inactivity Auto-Logout Duration
              </span>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px', lineHeight: 1.4 }}>
                If you leave the tab or stay idle for this duration, your session will automatically lock to safeguard company data.
              </p>
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Clock size={16} style={{ color: '#00875a' }} />
                <span>
                  {selectedTimeout === 5 && '5 Minutes (High Security Mode)'}
                  {selectedTimeout === 10 && '10 Minutes (Standard ERP - Recommended)'}
                  {selectedTimeout === 15 && '15 Minutes (Extended Workspace)'}
                  {selectedTimeout === 30 && '30 Minutes (Long Duration Session)'}
                  {![5, 10, 15, 30].includes(selectedTimeout) && `${selectedTimeout} Minutes`}
                </span>
              </div>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Sliding Session Engine
              </span>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '12px', lineHeight: 1.45 }}>
                • <strong>Active Browsing:</strong> Moving mouse, clicking, or typing refreshes your session continuously.
                <br />
                • <strong>Returning After Idle:</strong> Returning to the tab after {selectedTimeout} minutes will immediately ask for login.
                <br />
                • <strong>Security:</strong> Sessions are stored via HTTP-Only cookies to eliminate XSS risks.
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#059669',
                  backgroundColor: '#d1fae5',
                  padding: '4px 10px',
                  borderRadius: '6px',
                }}
              >
                <Clock size={13} /> Realtime Auto-Lock Engine Online
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveTimeout}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                  Inactivity Auto-Logout Duration
                </label>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '14px', lineHeight: 1.4 }}>
                  If you leave the tab or stay idle for this duration, your session will automatically lock to safeguard company data.
                </p>
                <select
                  value={selectedTimeout}
                  onChange={(e) => setSelectedTimeout(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value={5}>5 Minutes (High Security Mode)</option>
                  <option value={10}>10 Minutes (Standard ERP - Recommended)</option>
                  <option value={15}>15 Minutes (Extended Workspace)</option>
                  <option value={30}>30 Minutes (Long Duration Session)</option>
                </select>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                  Sliding Session Engine
                </label>
                <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '12px', lineHeight: 1.45 }}>
                  • <strong>Active Browsing:</strong> Moving mouse, clicking, or typing refreshes your session continuously.
                  <br />
                  • <strong>Returning After Idle:</strong> Returning to the tab after {selectedTimeout} minutes will immediately ask for login.
                  <br />
                  • <strong>Security:</strong> Sessions are stored via HTTP-Only cookies to eliminate XSS risks.
                </p>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#059669',
                    backgroundColor: '#d1fae5',
                    padding: '4px 10px',
                    borderRadius: '6px',
                  }}
                >
                  <Clock size={13} /> Realtime Auto-Lock Engine Online
                </div>
              </div>
            </div>

            {/* Action Buttons: Cancel & Save */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: '20px',
                borderTop: '1px solid #f1f5f9',
              }}
            >
              <button
                type="button"
                onClick={handleCancelTimeout}
                className="btn-hero-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <X size={15} /> Cancel
              </button>
              <button
                type="submit"
                disabled={savingTimeout}
                className="btn-hero-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 26px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <Save size={16} />
                {savingTimeout ? 'Saving Timeout...' : 'Save Inactivity Timeout'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket, DEFAULT_BRANDING } from '../../context/SocketContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  Clock,
} from 'lucide-react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    user,
    login,
    sessionExpired,
    sessionExpiredReason,
    dismissSessionExpired,
    timeoutMinutes,
  } = useAuth();
  const { branding, homeContent } = useSocket();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user && (user.role === 'admin' || !user.role)) {
      navigate('/admin/overview', { replace: true });
    }
  }, [user, navigate]);

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const brandTitle = currentBranding.brandTitle || 'SPESHWAY';
  const logoUrl = currentBranding.logoUrl || '/logo.png';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();
      const res = await login({ email: cleanEmail, password: cleanPassword });
      dismissSessionExpired();
      if (res?.data?.role === 'admin' || !res?.data?.role) {
        navigate('/admin/overview');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid administrator credentials. Please check your email and password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pro-login-wrapper">
      <div className="pro-login-card">
        {/* Logo & Header */}
        <div className="pro-login-header">
          <div className="pro-logo-badge">
            <img src={logoUrl} alt={`${brandTitle} Logo`} className="pro-logo-img" />
          </div>
          <h1 className="pro-login-title">{brandTitle} Admin Console</h1>
          <p className="pro-login-subtitle">
            Sign in with your administrator credentials to manage ERP operations
          </p>
        </div>

        {/* Inactivity Session Expiration Notice */}
        {sessionExpired && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '12px',
              backgroundColor: '#fffbeb',
              border: '1.5px solid #fde68a',
              color: '#92400e',
              marginBottom: '20px',
              fontSize: '0.88rem',
              lineHeight: 1.45,
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.08)',
            }}
          >
            <Clock size={20} style={{ color: '#d97706', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontSize: '0.92rem', marginBottom: '2px', color: '#b45309' }}>
                Session Expired Due to Inactivity
              </strong>
              <span>
                {sessionExpiredReason ||
                  `You were automatically signed out after ${timeoutMinutes} minutes of inactivity for your security. Please log in again to resume.`}
              </span>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="pro-login-error">
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="pro-login-form">
          <div className="pro-input-group">
            <label htmlFor="admin-email" className="pro-label">
              Admin Email
            </label>
            <div className="pro-input-container">
              <span className="pro-input-icon">
                <Mail size={18} />
              </span>
              <input
                id="admin-email"
                type="email"
                required
                placeholder="Enter your email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pro-text-input"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="pro-input-group">
            <div className="pro-label-row">
              <label htmlFor="admin-password" className="pro-label">
                Password
              </label>
            </div>
            <div className="pro-input-container">
              <span className="pro-input-icon">
                <Lock size={18} />
              </span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pro-text-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="pro-eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`pro-submit-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In as Admin</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Security Assurance */}
        <div className="pro-security-row" style={{ marginTop: '16px', marginBottom: '8px' }}>
          <div className="pro-security-badge">
            <ShieldCheck size={14} />
            <span>256-bit SSL encrypted administrative connection</span>
          </div>
        </div>

        {/* Back to public link */}
        <div className="pro-login-footer">
          <Link to="/" className="pro-back-link">
            <ArrowLeft size={14} /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
};


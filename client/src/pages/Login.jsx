import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket, DEFAULT_BRANDING } from '../context/SocketContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft, Clock } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, sessionExpired, sessionExpiredReason, dismissSessionExpired, timeoutMinutes } = useAuth();
  const { branding, homeContent } = useSocket();
  const navigate = useNavigate();

  const currentBranding = branding || homeContent?.branding || DEFAULT_BRANDING;
  const brandTitle = currentBranding.brandTitle || 'Speshway';
  const logoUrl = currentBranding.logoUrl || '/logo.png';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      dismissSessionExpired();
      if (res?.data?.role === 'admin') {
        navigate('/admin/overview');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
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
            <img src={logoUrl} alt={`${brandTitle} ERP Logo`} className="pro-logo-img" />
          </div>
          <h1 className="pro-login-title">Welcome to {brandTitle}</h1>
          <p className="pro-login-subtitle">
            Sign in to your enterprise account to access your workspace
          </p>
        </div>

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
                  `You were automatically signed out after ${timeoutMinutes} minutes of inactivity. Please log in again.`}
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="pro-login-error">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="pro-login-form">
          <div className="pro-input-group">
            <label htmlFor="login-email" className="pro-label">
              Email Address
            </label>
            <div className="pro-input-container">
              <span className="pro-input-icon">
                <Mail size={18} />
              </span>
              <input
                id="login-email"
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
              <label htmlFor="login-password" className="pro-label">
                Password
              </label>
            </div>
            <div className="pro-input-container">
              <span className="pro-input-icon">
                <Lock size={18} />
              </span>
              <input
                id="login-password"
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
                onClick={() => setShowPassword(!showPassword)}
                className="pro-eye-toggle"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pro-security-row">
            <div className="pro-security-badge">
              <ShieldCheck size={14} />
              <span>256-bit Encrypted Session</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="pro-submit-btn"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="pro-login-footer">
          <Link to="/" className="pro-back-link">
            <ArrowLeft size={14} /> Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
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
  RotateCcw,
  ShieldCheck,
  Mail,
  Building,
} from 'lucide-react';

export const AdminSettings = () => {
  const { isConnected } = useSocket();
  const { user, updateUserProfile } = useAuth();

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
    if (user) {
      setName(user.name || 'Speshway Administrator');
      setEmail(user.email || 'admin@gmail.com');
      setDepartment(user.department || 'Executive Administration');
    }
  }, [user]);

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

      // Try updating via backend if user ID exists
      if (user?._id && user._id !== 'admin_master_001') {
        try {
          await api.put(`/users/${user._id}`, updatePayload);
        } catch (apiErr) {
          console.warn('API update failed, updating local state:', apiErr.message);
        }
      }

      // Update in AuthContext & LocalStorage
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

  const handleReset = () => {
    setName(user?.name || 'Speshway Administrator');
    setEmail(user?.email || 'admin@gmail.com');
    setDepartment(user?.department || 'Executive Administration');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setSuccessMsg('');
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
          <h1 className="admin-heading">System &amp; Profile Settings</h1>
          <p className="admin-subtext">
            Update your administrator credentials, system profile, database connections, and WebSocket engine state.
          </p>
        </div>
      </div>

      {/* Success / Error Messages */}
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
              type="button"
              onClick={handleReset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                backgroundColor: '#f8fafc',
                border: '1.5px solid #cbd5e1',
                borderRadius: '8px',
                color: '#475569',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={15} /> Reset
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

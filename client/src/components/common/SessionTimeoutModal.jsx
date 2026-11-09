import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, ShieldAlert, LogOut, CheckCircle } from 'lucide-react';

export const SessionTimeoutModal = () => {
  const { countdownSeconds, stayLoggedIn, logout, timeoutMinutes } = useAuth();

  if (countdownSeconds === null || countdownSeconds === undefined) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid #f1f5f9',
          textAlign: 'center',
          animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#fef3c7',
            color: '#d97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px auto',
            boxShadow: '0 0 0 8px #fffbeb',
          }}
        >
          <Clock size={32} />
        </div>

        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em',
          }}
        >
          Inactivity Session Warning
        </h3>

        <p
          style={{
            fontSize: '0.92rem',
            color: '#64748b',
            lineHeight: 1.5,
            margin: '0 0 20px 0',
          }}
        >
          You have been idle for almost {timeoutMinutes} minutes. For your account security, your session will automatically lock in:
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#fff7ed',
            border: '1.5px solid #fdba74',
            color: '#c2410c',
            borderRadius: '12px',
            padding: '10px 24px',
            fontSize: '1.35rem',
            fontWeight: 800,
            marginBottom: '24px',
            letterSpacing: '0.03em',
          }}
        >
          <Clock size={20} />
          <span>{countdownSeconds}s</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={stayLoggedIn}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '12px',
              backgroundColor: '#059669',
              color: '#ffffff',
              fontSize: '0.92rem',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
              transition: 'all 0.15s ease',
            }}
          >
            <CheckCircle size={18} />
            Stay Logged In
          </button>

          <button
            type="button"
            onClick={() => logout(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px 18px',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              color: '#64748b',
              fontSize: '0.92rem',
              fontWeight: 600,
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

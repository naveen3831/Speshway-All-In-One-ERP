import React, { createContext, useState, useEffect, useContext, useRef, useCallback } from 'react';
import { authService } from '../services/authService';
import { safeJsonParse } from '../utils/jsonUtils';

const AuthContext = createContext(null);

export const DEFAULT_SESSION_TIMEOUT_MINUTES = 0; // 0 = Inactivity auto-logout disabled (session stays permanently active)
const STORAGE_TIMEOUT_KEY = 'speshway_session_timeout_mins';
const STORAGE_LAST_ACTIVITY_KEY = 'speshway_last_activity';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inactivity & Session state
  const [sessionExpired, setSessionExpired] = useState(false);
  const [sessionExpiredReason, setSessionExpiredReason] = useState('');
  const [countdownSeconds, setCountdownSeconds] = useState(null);
  const [timeoutMinutes, setTimeoutMinutes] = useState(() => {
    try {
      const migrated = localStorage.getItem('speshway_timeout_migrated_v2');
      if (!migrated) {
        // Clear legacy 10-minute auto-expiry from older builds
        localStorage.removeItem(STORAGE_TIMEOUT_KEY);
        localStorage.setItem('speshway_timeout_migrated_v2', 'true');
        return 0; // 0 = Never / Disabled
      }
      const saved = localStorage.getItem(STORAGE_TIMEOUT_KEY);
      const parsed = Number(saved);
      return !isNaN(parsed) && parsed > 0 ? parsed : 0;
    } catch (e) {
      return 0;
    }
  });

  const lastActivityRef = useRef(Date.now());
  const throttleTimerRef = useRef(null);

  // Helper to record user activity
  const recordActivity = useCallback(() => {
    const now = Date.now();
    lastActivityRef.current = now;
    try {
      localStorage.setItem(STORAGE_LAST_ACTIVITY_KEY, String(now));
    } catch (e) {
      // Ignore localStorage errors
    }
    // If in warning countdown, any interaction immediately clears warning
    setCountdownSeconds((prev) => (prev !== null ? null : prev));
  }, []);

  // Update session timeout duration (e.g. 0 for never, or 15, 30, 60 min)
  const updateSessionTimeout = useCallback((mins) => {
    const val = Number(mins) >= 0 ? Number(mins) : 0;
    setTimeoutMinutes(val);
    localStorage.setItem(STORAGE_TIMEOUT_KEY, String(val));
    recordActivity();
  }, [recordActivity]);

  // Log out user (handles normal or session expiration)
  const logout = useCallback(async (isExpired = false, reason = '') => {
    // Immediately clear local state synchronously for instant UI transition
    setUser(null);
    setCountdownSeconds(null);
    try {
      sessionStorage.removeItem('speshway_admin_authenticated');
      localStorage.removeItem('speshway_admin_authenticated');
    } catch (e) {}
    localStorage.removeItem('user');
    localStorage.removeItem(STORAGE_LAST_ACTIVITY_KEY);

    if (isExpired) {
      setSessionExpired(true);
      setSessionExpiredReason(
        reason || 'Your session expired. Please sign in again.'
      );
    } else {
      setSessionExpired(false);
      setSessionExpiredReason('');
    }

    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  // Stay logged in button clicked from modal
  const stayLoggedIn = useCallback(async () => {
    recordActivity();
    setCountdownSeconds(null);
    setSessionExpired(false);
    try {
      await authService.verifySession();
    } catch (e) {
      // ignore
    }
  }, [recordActivity]);

  // Dismiss session expired alert
  const dismissSessionExpired = useCallback(() => {
    setSessionExpired(false);
    setSessionExpiredReason('');
  }, []);

  // Login handler
  const login = async (credentials) => {
    const data = await authService.login({
      ...credentials,
      timeoutMinutes: timeoutMinutes > 0 ? timeoutMinutes : 30 * 24 * 60,
    });
    if (data?.data?.role === 'admin') {
      try {
        sessionStorage.setItem('speshway_admin_authenticated', 'true');
        localStorage.setItem('speshway_admin_authenticated', 'true');
      } catch (e) {}
    }
    setUser(data.data);
    setSessionExpired(false);
    setSessionExpiredReason('');
    recordActivity();
    return data;
  };

  // Register handler
  const register = async (userData) => {
    const data = await authService.register({
      ...userData,
      timeoutMinutes: timeoutMinutes > 0 ? timeoutMinutes : 30 * 24 * 60,
    });
    setUser(data.data);
    setSessionExpired(false);
    setSessionExpiredReason('');
    recordActivity();
    return data;
  };

  const updateUserProfile = (updatedData) => {
    const merged = { ...user, ...updatedData };
    setUser(merged);
    localStorage.setItem('user', JSON.stringify(merged));
    return merged;
  };

  // 1. Initial Session Load & Verification
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const parsed = safeJsonParse(savedUser, null);
    if (parsed) {
      try {
        const lastActive = Number(localStorage.getItem(STORAGE_LAST_ACTIVITY_KEY));
        const maxIdleMs = timeoutMinutes > 0 ? timeoutMinutes * 60 * 1000 : null;

        // If app is opened and last activity was already older than timeout (only when timeout > 0)
        if (maxIdleMs && lastActive && Date.now() - lastActive >= maxIdleMs) {
          logout(
            true,
            `Your previous session expired due to ${timeoutMinutes} minutes of inactivity. Please sign in again.`
          );
        } else {
          setUser(parsed);
          recordActivity();
          if (parsed.role === 'admin') {
            try {
              sessionStorage.setItem('speshway_admin_authenticated', 'true');
              localStorage.setItem('speshway_admin_authenticated', 'true');
            } catch (e) {}
          }
          // Verify session cookie with backend
          authService.verifySession().catch(() => {
            // If server invalidates cookie, protect middleware will signal 401
          });
        }
      } catch (err) {
        console.error('Failed to handle saved user credentials', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, [timeoutMinutes, logout, recordActivity]);

  // 2. Real-Time Activity Tracking & Inactivity Timeout Engine
  useEffect(() => {
    if (!user) return;

    // Periodic sliding cookie renewal with backend (every 4 minutes while active)
    const heartbeatInterval = setInterval(() => {
      authService.verifySession().catch(() => {});
    }, 4 * 60 * 1000);

    // If inactivity timeout is disabled (0), maintain active session and skip auto-logout listeners
    if (!timeoutMinutes || timeoutMinutes <= 0) {
      setCountdownSeconds(null);
      return () => {
        clearInterval(heartbeatInterval);
      };
    }

    const maxIdleMs = timeoutMinutes * 60 * 1000;
    const warningWindowMs = 60 * 1000; // 60 seconds warning before cutoff

    // Throttled activity listener
    const handleUserActivity = () => {
      if (!throttleTimerRef.current) {
        recordActivity();
        throttleTimerRef.current = setTimeout(() => {
          throttleTimerRef.current = null;
        }, 3000); // Record activity at most once every 3s to save CPU
      }
    };

    // Tab visibility & Window focus check ("when i go back and come again in after 5 or 10 min")
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible' || document.hasFocus()) {
        const last = Number(localStorage.getItem(STORAGE_LAST_ACTIVITY_KEY)) || lastActivityRef.current;
        const elapsed = Date.now() - last;

        if (maxIdleMs && elapsed >= maxIdleMs) {
          logout(
            true,
            `Your session expired due to ${timeoutMinutes} minutes of inactivity while away. Please sign in again to continue.`
          );
        } else {
          recordActivity();
        }
      }
    };

    // Attach interaction events
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    // Periodic check interval (runs every 2 seconds)
    const checkInterval = setInterval(() => {
      const last = Number(localStorage.getItem(STORAGE_LAST_ACTIVITY_KEY)) || lastActivityRef.current;
      const elapsed = Date.now() - last;

      if (maxIdleMs && elapsed >= maxIdleMs) {
        logout(
          true,
          `Your session expired due to ${timeoutMinutes} minutes of inactivity. Please sign in again to continue.`
        );
      } else if (maxIdleMs && elapsed >= maxIdleMs - warningWindowMs) {
        const remainingSec = Math.ceil((maxIdleMs - elapsed) / 1000);
        setCountdownSeconds(remainingSec > 0 ? remainingSec : 0);
      } else {
        setCountdownSeconds(null);
      }
    }, 2000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
      clearInterval(checkInterval);
      clearInterval(heartbeatInterval);
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current);
        throttleTimerRef.current = null;
      }
    };
  }, [user, timeoutMinutes, logout, recordActivity]);

  // 3. Listen for global 401 session expiration from Axios
  useEffect(() => {
    const handleServerSessionExpired = (e) => {
      const msg = e.detail?.message || 'Your session has expired on the server. Please sign in again.';
      logout(true, msg);
    };

    window.addEventListener('speshway:session-expired', handleServerSessionExpired);
    return () => window.removeEventListener('speshway:session-expired', handleServerSessionExpired);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
        sessionExpired,
        sessionExpiredReason,
        countdownSeconds,
        timeoutMinutes,
        updateSessionTimeout,
        stayLoggedIn,
        dismissSessionExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

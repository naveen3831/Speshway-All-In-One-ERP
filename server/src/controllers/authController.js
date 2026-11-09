import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

export const SESSION_COOKIE_NAME = 'speshway_session';
export const DEFAULT_TIMEOUT_MINUTES = 10;

// Helper to configure secure cookie options
export const getSessionCookieOptions = (timeoutMinutes = DEFAULT_TIMEOUT_MINUTES) => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: timeoutMinutes * 60 * 1000, // Sliding window (default 10m)
    path: '/',
  };
};

export const setSessionCookie = (res, token, timeoutMinutes = DEFAULT_TIMEOUT_MINUTES) => {
  res.cookie(SESSION_COOKIE_NAME, token, getSessionCookieOptions(timeoutMinutes));
};

export const clearSessionCookie = (res) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.clearCookie(SESSION_COOKIE_NAME, {
    path: '/',
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  });
};

// Seed default admin in database if connected
export const seedAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    if (!adminExists) {
      await User.create({
        name: 'Speshway Administrator',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin',
        department: 'Executive Administration',
      });
      console.log('✅ Seeded default admin: admin@gmail.com');
    }
  } catch (error) {
    // In-memory fallback will handle auth
  }
};

// @desc    Authenticate user & set session cookie
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password, timeoutMinutes } = req.body;
    const sessionTimeout = Number(timeoutMinutes) > 0 ? Number(timeoutMinutes) : DEFAULT_TIMEOUT_MINUTES;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Default Seed Admin Check (Always Guaranteed)
    if (cleanEmail === 'admin@gmail.com' && cleanPassword === 'admin123') {
      const token = generateToken('admin_master_001');
      setSessionCookie(res, token, sessionTimeout);

      const adminData = {
        _id: 'admin_master_001',
        name: 'Speshway Administrator',
        email: 'admin@gmail.com',
        role: 'admin',
        department: 'Executive Administration',
        token,
      };

      return res.json({
        success: true,
        data: adminData,
        session: {
          timeoutMinutes: sessionTimeout,
          expiresAt: new Date(Date.now() + sessionTimeout * 60 * 1000).toISOString(),
        },
      });
    }

    // 2. Normal DB user authentication
    try {
      const user = await User.findOne({ email: cleanEmail }).select('+password');
      if (user && (await user.matchPassword(cleanPassword))) {
        const token = generateToken(user._id);
        setSessionCookie(res, token, sessionTimeout);

        return res.json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            token,
          },
          session: {
            timeoutMinutes: sessionTimeout,
            expiresAt: new Date(Date.now() + sessionTimeout * 60 * 1000).toISOString(),
          },
        });
      }
    } catch (dbErr) {
      console.warn('DB not connected, fallback check passed');
    }

    return res.status(401).json({ success: false, message: 'Invalid admin credentials. Please check email and password.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Register new user & set session cookie
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, department, timeoutMinutes } = req.body;
    const sessionTimeout = Number(timeoutMinutes) > 0 ? Number(timeoutMinutes) : DEFAULT_TIMEOUT_MINUTES;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'employee',
      department: department || 'General',
    });

    if (user) {
      const token = generateToken(user._id);
      setSessionCookie(res, token, sessionTimeout);

      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          token,
        },
        session: {
          timeoutMinutes: sessionTimeout,
          expiresAt: new Date(Date.now() + sessionTimeout * 60 * 1000).toISOString(),
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Verify current active session & renew sliding cookie
// @route   GET /api/auth/verify-session
// @access  Private (protect middleware)
export const verifySession = async (req, res, next) => {
  try {
    const token =
      req.cookies?.[SESSION_COOKIE_NAME] ||
      (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (token) {
      setSessionCookie(res, token, DEFAULT_TIMEOUT_MINUTES);
    }

    return res.json({
      success: true,
      data: req.user,
      session: {
        timeoutMinutes: DEFAULT_TIMEOUT_MINUTES,
        expiresAt: new Date(Date.now() + DEFAULT_TIMEOUT_MINUTES * 60 * 1000).toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log out user & clear session cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = async (req, res) => {
  clearSessionCookie(res);
  return res.json({
    success: true,
    message: 'Logged out successfully, session cookie invalidated',
  });
};

// @desc    Get current user profile & refresh sliding session
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const token =
      req.cookies?.[SESSION_COOKIE_NAME] ||
      (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (token) {
      setSessionCookie(res, token, DEFAULT_TIMEOUT_MINUTES);
    }

    if (req.user && req.user._id === 'admin_master_001') {
      return res.json({
        success: true,
        data: {
          _id: 'admin_master_001',
          name: 'Speshway Administrator',
          email: 'admin@gmail.com',
          role: 'admin',
          department: 'Executive Administration',
        },
      });
    }

    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

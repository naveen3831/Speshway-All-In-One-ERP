import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

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

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Default Seed Admin Check (Always Guaranteed)
    if (cleanEmail === 'admin@gmail.com' && cleanPassword === 'admin123') {
      const adminData = {
        _id: 'admin_master_001',
        name: 'Speshway Administrator',
        email: 'admin@gmail.com',
        role: 'admin',
        department: 'Executive Administration',
        token: generateToken('admin_master_001'),
      };
      return res.json({
        success: true,
        data: adminData,
      });
    }

    // 2. Normal DB user authentication
    try {
      const user = await User.findOne({ email: cleanEmail }).select('+password');
      if (user && (await user.matchPassword(cleanPassword))) {
        return res.json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            token: generateToken(user._id),
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

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, department } = req.body;

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
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
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

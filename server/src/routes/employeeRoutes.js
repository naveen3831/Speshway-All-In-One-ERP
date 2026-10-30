import express from 'express';
import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import { getIO, liveState } from '../services/socketService.js';

const router = express.Router();

// Helper to find by MongoDB _id or string id
const getEmployeeQuery = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ _id: id }] };
  }
  return { _id: new mongoose.Types.ObjectId() }; // fallback dummy
};

// @desc    Get all employees/team members from MongoDB database
// @route   GET /api/employees
// @access  Public
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    if (employees && employees.length > 0) {
      // Keep liveState synced
      liveState.modulesData.hrms = employees.map((e) => ({
        id: e._id.toString(),
        name: e.name,
        email: e.email,
        role: e.role,
        dept: e.dept,
        status: e.status,
      }));
      return res.json({ success: true, count: employees.length, data: employees });
    }
    // Fallback if collection was empty
    res.json({ success: true, count: liveState.modulesData.hrms.length, data: liveState.modulesData.hrms });
  } catch (err) {
    console.warn('MongoDB fetch employees fallback to memory:', err.message);
    res.json({ success: true, count: liveState.modulesData.hrms.length, data: liveState.modulesData.hrms });
  }
});

// @desc    Create new employee directly in MongoDB database
// @route   POST /api/employees
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, role, dept, status } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const employeeEmail =
      email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@speshway.com`;

    let newEmployee;
    try {
      newEmployee = await Employee.create({
        name,
        email: employeeEmail,
        role: role || 'Software Engineer',
        dept: dept || 'Engineering',
        status: status || 'Active',
      });
    } catch (dbErr) {
      console.warn('Could not save employee to Mongo, falling back to local memory:', dbErr.message);
      newEmployee = {
        id: `emp-${Date.now()}`,
        name,
        email: employeeEmail,
        role: role || 'Software Engineer',
        dept: dept || 'Engineering',
        status: status || 'Active',
      };
    }

    const formattedEmp = {
      id: newEmployee._id ? newEmployee._id.toString() : newEmployee.id,
      name: newEmployee.name,
      email: newEmployee.email,
      role: newEmployee.role,
      dept: newEmployee.dept,
      status: newEmployee.status,
    };

    // Update liveState
    liveState.modulesData.hrms = [formattedEmp, ...liveState.modulesData.hrms.filter((e) => e.id !== formattedEmp.id)];
    liveState.stats.activeEmployees = liveState.modulesData.hrms.filter((e) => e.status === 'Active').length;

    const activity = {
      id: Date.now(),
      type: 'hrms',
      text: `New team member "${formattedEmp.name}" added to ${formattedEmp.dept}`,
      time: 'Just now',
    };
    liveState.recentActivity.unshift(activity);

    // Broadcast Real-Time Socket Events
    const io = getIO();
    if (io) {
      io.emit('hrms:updated', { employee: formattedEmp, stats: liveState.stats });
      io.emit('employee:added', formattedEmp);
      io.emit('activity:new', activity);
    }

    res.status(201).json({ success: true, data: formattedEmp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Update employee by ID
// @route   PUT /api/employees/:id
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, dept, status } = req.body;

    let updatedEmployee = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
          ...(name && { name }),
          ...(email && { email }),
          ...(role && { role }),
          ...(dept && { dept }),
          ...(status && { status }),
        },
        { new: true }
      );
    }

    const formattedEmp = updatedEmployee
      ? {
          id: updatedEmployee._id.toString(),
          name: updatedEmployee.name,
          email: updatedEmployee.email,
          role: updatedEmployee.role,
          dept: updatedEmployee.dept,
          status: updatedEmployee.status,
        }
      : {
          id,
          ...req.body,
        };

    // Update in liveState
    liveState.modulesData.hrms = liveState.modulesData.hrms.map((e) =>
      e.id === id || e._id === id ? { ...e, ...formattedEmp } : e
    );
    liveState.stats.activeEmployees = liveState.modulesData.hrms.filter((e) => e.status === 'Active').length;

    const activity = {
      id: Date.now(),
      type: 'hrms',
      text: `Team member "${formattedEmp.name}" status updated to ${formattedEmp.status}`,
      time: 'Just now',
    };
    liveState.recentActivity.unshift(activity);

    const io = getIO();
    if (io) {
      io.emit('hrms:member_updated', { employee: formattedEmp, stats: liveState.stats });
      io.emit('employee:updated', formattedEmp);
      io.emit('activity:new', activity);
    }

    res.json({ success: true, data: formattedEmp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @desc    Delete employee by ID
// @route   DELETE /api/employees/:id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      await Employee.findByIdAndDelete(id);
    }

    const empName = req.query.name || 'Team member';

    // Remove from liveState
    liveState.modulesData.hrms = liveState.modulesData.hrms.filter(
      (e) => e.id !== id && e._id !== id
    );
    liveState.stats.activeEmployees = Math.max(0, liveState.modulesData.hrms.filter((e) => e.status === 'Active').length);

    const activity = {
      id: Date.now(),
      type: 'hrms',
      text: `Team member "${empName}" removed from directory`,
      time: 'Just now',
    };
    liveState.recentActivity.unshift(activity);

    const io = getIO();
    if (io) {
      io.emit('hrms:deleted', { id, stats: liveState.stats });
      io.emit('employee:deleted', { id, name: empName });
      io.emit('activity:new', activity);
    }

    res.json({ success: true, message: 'Employee removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

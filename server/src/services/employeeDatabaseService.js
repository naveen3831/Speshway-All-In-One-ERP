import Employee from '../models/Employee.js';
import { liveState } from './socketService.js';

export const initialEmployees = [
  {
    name: 'Alex Rivera',
    email: 'alex.rivera@speshway.com',
    role: 'Lead Architect',
    dept: 'Engineering',
    status: 'Active',
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@speshway.com',
    role: 'HR Director',
    dept: 'Human Resources',
    status: 'Active',
  },
  {
    name: 'Marcus Chen',
    email: 'marcus.chen@speshway.com',
    role: 'Financial Controller',
    dept: 'Finance',
    status: 'On Leave',
  },
  {
    name: 'Emily Watson',
    email: 'emily.watson@speshway.com',
    role: 'Product Manager',
    dept: 'Product',
    status: 'Active',
  },
];

export const seedEmployeesDatabase = async () => {
  try {
    const count = await Employee.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial team members to MongoDB Atlas database...');
      const created = await Employee.insertMany(initialEmployees);
      console.log(`✅ Successfully seeded ${created.length} team members to MongoDB Atlas database!`);
      
      // Sync into liveState
      liveState.modulesData.hrms = created.map((e) => ({
        id: e._id.toString(),
        name: e.name,
        email: e.email,
        role: e.role,
        dept: e.dept,
        status: e.status,
      }));
      liveState.stats.activeEmployees = created.filter((e) => e.status === 'Active').length;
    } else {
      const all = await Employee.find().sort({ createdAt: -1 });
      liveState.modulesData.hrms = all.map((e) => ({
        id: e._id.toString(),
        name: e.name,
        email: e.email,
        role: e.role,
        dept: e.dept,
        status: e.status,
      }));
      liveState.stats.activeEmployees = all.filter((e) => e.status === 'Active').length;
      console.log(`📦 MongoDB team members loaded: ${count} active personnel in database.`);
    }
  } catch (err) {
    console.error('Error seeding/loading employees from database:', err.message);
    // Keep default in-memory hrms in liveState as fallback
    liveState.modulesData.hrms = initialEmployees.map((e, idx) => ({
      id: `emp-seed-${idx + 1}`,
      ...e,
    }));
  }
};

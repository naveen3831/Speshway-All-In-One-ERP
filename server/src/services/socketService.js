import { Server } from 'socket.io';
import mongoose from 'mongoose';
import Employee from '../models/Employee.js';

let io = null;

// Initial in-memory real-time state for ERP modules
export const liveState = {
  stats: {
    happyBusinesses: 524,
    activeEmployees: 148,
    activeProjects: 36,
    openTasks: 84,
    uptime: '99.9%',
    supportResponseMin: '< 5m',
  },
  recentActivity: [
    { id: 1, type: 'attendance', text: 'Sarah Jenkins checked in to Mumbai HQ', time: 'Just now' },
    { id: 2, type: 'task', text: 'Task "Q3 Financial Reconciliation" marked Completed', time: '2m ago' },
    { id: 3, type: 'payroll', text: 'Monthly payroll batch generated for Engineering Team', time: '5m ago' },
    { id: 4, type: 'client', text: 'New enterprise client "Apex Corp" onboarding initiated', time: '12m ago' },
  ],
  modulesData: {
    hrms: [
      { id: 1, name: 'Alex Rivera', role: 'Lead Architect', dept: 'Engineering', status: 'Active' },
      { id: 2, name: 'Priya Sharma', role: 'HR Director', dept: 'Human Resources', status: 'Active' },
      { id: 3, name: 'Marcus Chen', role: 'Financial Controller', dept: 'Finance', status: 'On Leave' },
      { id: 4, name: 'Emily Watson', role: 'Product Manager', dept: 'Product', status: 'Active' },
    ],
    tasks: [
      { id: 1, title: 'Deploy Speshway v2.4 Release', priority: 'High', status: 'In Progress', assignee: 'Alex Rivera' },
      { id: 2, title: 'Review Annual Tax Compliances', priority: 'Urgent', status: 'Pending', assignee: 'Marcus Chen' },
      { id: 3, title: 'Onboard 12 Engineering Interns', priority: 'Normal', status: 'Completed', assignee: 'Priya Sharma' },
    ],
    projects: [
      { id: 1, name: 'Global Supply Chain Sync', progress: 78, budget: '$45,000', manager: 'Emily Watson' },
      { id: 2, name: 'Automated Invoice Processing', progress: 92, budget: '$28,000', manager: 'Marcus Chen' },
      { id: 3, name: 'Mobile Field App Release', progress: 45, budget: '$60,000', manager: 'Alex Rivera' },
    ],
    clients: [
      { id: 1, company: 'Apex Global Logistics', contact: 'David Vance', status: 'Active Contract', value: '$85,000' },
      { id: 2, company: 'Nordic Retail Group', contact: 'Elena Rostova', status: 'Proposal Sent', value: '$120,000' },
      { id: 3, company: 'Solaria Energy Ltd', contact: 'Karthik Rao', status: 'Active Contract', value: '$64,000' },
    ],
    demoRequests: [
      { id: 1, name: 'Rahul Verma', email: 'rahul@technova.io', company: 'TechNova', module: 'All-In-One Suite', date: new Date().toISOString() },
    ]
  }
};

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    // Send full current live state upon connection
    socket.emit('state:sync', liveState);

    // Handle client ping or actions
    socket.on('action:add_activity', (item) => {
      const newActivity = {
        id: Date.now(),
        ...item,
        time: 'Just now',
      };
      liveState.recentActivity.unshift(newActivity);
      if (liveState.recentActivity.length > 20) liveState.recentActivity.pop();
      io.emit('activity:new', newActivity);
    });

    socket.on('action:add_employee', async (emp) => {
      let createdId = Date.now().toString();
      try {
        const doc = await Employee.create({
          name: emp.name,
          email: emp.email || `${emp.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@speshway.com`,
          role: emp.role || 'Software Engineer',
          dept: emp.dept || 'Engineering',
          status: emp.status || 'Active',
        });
        createdId = doc._id.toString();
      } catch (err) {
        console.warn('Socket add_employee Mongo fallback:', err.message);
      }

      const newEmp = { id: createdId, status: 'Active', ...emp };
      liveState.modulesData.hrms.unshift(newEmp);
      liveState.stats.activeEmployees += 1;
      
      const activity = {
        id: Date.now(),
        type: 'hrms',
        text: `New employee ${newEmp.name} added to ${newEmp.dept || 'Engineering'}`,
        time: 'Just now',
      };
      liveState.recentActivity.unshift(activity);

      io.emit('hrms:updated', { employee: newEmp, stats: liveState.stats });
      io.emit('employee:added', newEmp);
      io.emit('activity:new', activity);
    });

    socket.on('action:delete_employee', async ({ id, name }) => {
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          await Employee.findByIdAndDelete(id);
        }
      } catch (err) {
        console.warn('Socket delete_employee Mongo fallback:', err.message);
      }

      liveState.modulesData.hrms = liveState.modulesData.hrms.filter((e) => e.id !== id && e._id !== id);
      liveState.stats.activeEmployees = Math.max(0, liveState.stats.activeEmployees - 1);

      const activity = {
        id: Date.now(),
        type: 'hrms',
        text: `Team member ${name || 'Staff'} removed from directory`,
        time: 'Just now',
      };
      liveState.recentActivity.unshift(activity);

      io.emit('hrms:deleted', { id, stats: liveState.stats });
      io.emit('employee:deleted', { id, name });
      io.emit('activity:new', activity);
    });

    socket.on('action:update_employee', async (updatedEmp) => {
      try {
        if (mongoose.Types.ObjectId.isValid(updatedEmp.id)) {
          await Employee.findByIdAndUpdate(updatedEmp.id, updatedEmp);
        }
      } catch (err) {
        console.warn('Socket update_employee Mongo fallback:', err.message);
      }

      liveState.modulesData.hrms = liveState.modulesData.hrms.map((e) =>
        e.id === updatedEmp.id ? { ...e, ...updatedEmp } : e
      );

      const activity = {
        id: Date.now(),
        type: 'hrms',
        text: `Team member ${updatedEmp.name} profile updated`,
        time: 'Just now',
      };
      liveState.recentActivity.unshift(activity);

      io.emit('hrms:member_updated', { employee: updatedEmp, stats: liveState.stats });
      io.emit('employee:updated', updatedEmp);
      io.emit('activity:new', activity);
    });

    socket.on('action:add_task', (task) => {
      const newTask = { id: Date.now(), status: 'Pending', ...task };
      liveState.modulesData.tasks.unshift(newTask);
      liveState.stats.openTasks += 1;

      const activity = {
        id: Date.now(),
        type: 'task',
        text: `New task assigned: "${newTask.title}"`,
        time: 'Just now',
      };
      liveState.recentActivity.unshift(activity);

      io.emit('tasks:updated', { task: newTask, stats: liveState.stats });
      io.emit('activity:new', activity);
    });

    socket.on('action:request_demo', (demoData) => {
      const request = { id: Date.now(), ...demoData, date: new Date().toISOString() };
      liveState.modulesData.demoRequests.unshift(request);
      liveState.stats.happyBusinesses += 1;

      const activity = {
        id: Date.now(),
        type: 'demo',
        text: `New business inquiry from ${request.company || request.name}`,
        time: 'Just now',
      };
      liveState.recentActivity.unshift(activity);

      io.emit('demo:new', { request, stats: liveState.stats });
      io.emit('activity:new', activity);
    });
  });

  return io;
};

export const getIO = () => io;

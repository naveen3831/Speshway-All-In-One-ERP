import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';
import { DEFAULT_ADMIN_PROJECTS } from '../utils/adminProjects';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [stats, setStats] = useState({
    happyBusinesses: 500,
    activeEmployees: 120,
    activeProjects: 45,
    openTasks: 84,
    uptime: '99.9%',
    supportResponseMin: '24/7',
  });
  const [activities, setActivities] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const DEFAULT_TEAM_MEMBERS = [
    {
      id: 'emp-1',
      name: 'Alex Rivera',
      email: 'alex.rivera@speshway.com',
      role: 'Lead Architect',
      dept: 'Engineering',
      status: 'Active',
    },
    {
      id: 'emp-2',
      name: 'Priya Sharma',
      email: 'priya.sharma@speshway.com',
      role: 'HR Director',
      dept: 'Human Resources',
      status: 'Active',
    },
    {
      id: 'emp-3',
      name: 'Marcus Chen',
      email: 'marcus.chen@speshway.com',
      role: 'Financial Controller',
      dept: 'Finance',
      status: 'On Leave',
    },
    {
      id: 'emp-4',
      name: 'Emily Watson',
      email: 'emily.watson@speshway.com',
      role: 'Product Manager',
      dept: 'Product',
      status: 'Active',
    },
  ];

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('speshway_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const clean = parsed.filter((p) => p && typeof p === 'object' && (p.name || p.slug || p.id));
          if (clean.length > 0) return clean;
        }
      }
    } catch (e) {
      console.warn('Error reading speshway_products from localStorage:', e);
    }
    return DEFAULT_ADMIN_PROJECTS;
  });
  const [modulesData, setModulesData] = useState({
    hrms: DEFAULT_TEAM_MEMBERS,
    tasks: [],
    projects: [],
    clients: [],
    demoRequests: [],
  });

  const refreshProducts = async () => {
    try {
      const prodRes = await api.get('/products');
      if (prodRes.data?.data && Array.isArray(prodRes.data.data) && prodRes.data.data.length > 0) {
        const clean = prodRes.data.data.filter((p) => p && typeof p === 'object' && (p.name || p.slug || p.id));
        if (clean.length > 0) {
          setProducts(clean);
          try {
            localStorage.setItem('speshway_products', JSON.stringify(clean));
          } catch (e) {}
          return clean;
        }
      }
    } catch (err) {
      console.warn('Could not refresh products from API, maintaining active projects:', err.message);
    }
  };

  const refreshInquiries = async () => {
    try {
      const res = await api.get('/inquiries');
      if (res.data?.data && Array.isArray(res.data.data)) {
        setModulesData((prev) => ({
          ...prev,
          demoRequests: res.data.data,
        }));
      }
    } catch (err) {
      console.warn('Could not refresh inquiries from API:', err.message);
    }
  };

  // Fetch initial products, employees, and inquiries from MongoDB API
  useEffect(() => {
    const fetchInitialData = async () => {
      await refreshProducts();
      await refreshInquiries();

      try {
        const empRes = await api.get('/employees');
        if (empRes.data?.data && Array.isArray(empRes.data.data) && empRes.data.data.length > 0) {
          setModulesData((prev) => ({
            ...prev,
            hrms: empRes.data.data,
          }));
        }
      } catch (err) {
        console.warn('Could not fetch employees from API, using default team directory');
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace('/api', '')
      : 'http://localhost:5000';

    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 10,
    });

    newSocket.on('connect', () => {
      console.log('⚡ Connected to Realtime WebSocket');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Disconnected from WebSocket');
      setIsConnected(false);
    });

    // Initial state sync
    newSocket.on('state:sync', (data) => {
      if (data.stats) setStats(data.stats);
      if (data.recentActivity) setActivities(data.recentActivity);
      if (data.modulesData) setModulesData(data.modulesData);
    });

    // Real-time new activity
    newSocket.on('activity:new', (activity) => {
      setActivities((prev) => [activity, ...prev.slice(0, 19)]);
      setToastMessage(activity.text);
      setTimeout(() => setToastMessage(null), 4000);
    });

    // Product events
    newSocket.on('product:added', (newProduct) => {
      if (!newProduct || typeof newProduct !== 'object') return;
      setProducts((prev) => {
        const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
        const targetId = newProduct.id || newProduct._id;
        const targetSlug = newProduct.slug;
        const exists = safe.some(
          (p) =>
            (p.id && (p.id === targetId || p.id === targetSlug)) ||
            (p._id && (p._id === targetId || p._id === targetSlug)) ||
            (p.slug && p.slug === targetSlug)
        );
        if (exists) {
          const updatedList = safe.map((p) =>
            (p.id && (p.id === targetId || p.id === targetSlug)) ||
            (p._id && (p._id === targetId || p._id === targetSlug)) ||
            (p.slug && p.slug === targetSlug)
              ? { ...p, ...newProduct }
              : p
          );
          try {
            localStorage.setItem('speshway_products', JSON.stringify(updatedList));
          } catch (e) {}
          return updatedList;
        }
        const next = [newProduct, ...safe];
        try {
          localStorage.setItem('speshway_products', JSON.stringify(next));
        } catch (e) {}
        return next;
      });
      setToastMessage(`Product added: ${newProduct.name || 'New Module'}`);
      setTimeout(() => setToastMessage(null), 4000);
    });

    newSocket.on('product:updated', (updated) => {
      if (!updated || typeof updated !== 'object') return;
      setProducts((prev) => {
        const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
        const next = safe.map((p) => {
          const matchId =
            (p.id && (p.id === updated.id || p.id === updated._id || p.id === updated.slug)) ||
            (p._id && (p._id === updated.id || p._id === updated._id || p._id === updated.slug));
          const matchSlug = p.slug && (p.slug === updated.slug || p.slug === updated.id);
          return matchId || matchSlug ? { ...p, ...updated } : p;
        });
        try {
          localStorage.setItem('speshway_products', JSON.stringify(next));
        } catch (e) {}
        return next;
      });
      setToastMessage(`Product updated: ${updated.name || 'Module'}`);
      setTimeout(() => setToastMessage(null), 4000);
    });

    newSocket.on('product:deleted', (data) => {
      const targetId = data?.id;
      const targetSlug = data?.slug;
      setProducts((prev) => {
        const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
        const next = safe.filter((p) => {
          if (targetId && (p.id === targetId || p._id === targetId || p.slug === targetId)) return false;
          if (targetSlug && (p.slug === targetSlug || p.id === targetSlug)) return false;
          return true;
        });
        try {
          localStorage.setItem('speshway_products', JSON.stringify(next));
        } catch (e) {}
        return next;
      });
      setToastMessage(`Product removed from catalog`);
      setTimeout(() => setToastMessage(null), 4000);
    });

    // HRMS real-time updates
    newSocket.on('hrms:updated', ({ employee, stats: updatedStats }) => {
      setModulesData((prev) => ({
        ...prev,
        hrms: [employee, ...(prev.hrms || []).filter((e) => e.id !== employee.id)],
      }));
      if (updatedStats) setStats(updatedStats);
    });

    newSocket.on('employee:added', (employee) => {
      setModulesData((prev) => ({
        ...prev,
        hrms: [employee, ...(prev.hrms || []).filter((e) => e.id !== employee.id)],
      }));
    });

    newSocket.on('hrms:deleted', ({ id, stats: updatedStats }) => {
      setModulesData((prev) => ({
        ...prev,
        hrms: (prev.hrms || []).filter((e) => e.id !== id),
      }));
      if (updatedStats) setStats(updatedStats);
    });

    newSocket.on('employee:deleted', ({ id }) => {
      setModulesData((prev) => ({
        ...prev,
        hrms: (prev.hrms || []).filter((e) => e.id !== id),
      }));
    });

    newSocket.on('hrms:member_updated', ({ employee, stats: updatedStats }) => {
      setModulesData((prev) => ({
        ...prev,
        hrms: (prev.hrms || []).map((e) => (e.id === employee.id ? { ...e, ...employee } : e)),
      }));
      if (updatedStats) setStats(updatedStats);
    });

    newSocket.on('employee:updated', (employee) => {
      setModulesData((prev) => ({
        ...prev,
        hrms: (prev.hrms || []).map((e) => (e.id === employee.id ? { ...e, ...employee } : e)),
      }));
    });

    // Tasks real-time updates
    newSocket.on('tasks:updated', ({ task, stats: updatedStats }) => {
      setModulesData((prev) => ({
        ...prev,
        tasks: [task, ...(prev.tasks || [])],
      }));
      if (updatedStats) setStats(updatedStats);
    });

    // Demo requests real-time
    newSocket.on('demo:new', ({ request, stats: updatedStats }) => {
      setModulesData((prev) => ({
        ...prev,
        demoRequests: [
          request,
          ...(prev.demoRequests || []).filter(
            (d) => (d.id || d._id) !== (request.id || request._id)
          ),
        ],
      }));
      if (updatedStats) setStats(updatedStats);
    });

    newSocket.on('demo:deleted', ({ id }) => {
      setModulesData((prev) => ({
        ...prev,
        demoRequests: (prev.demoRequests || []).filter(
          (d) => d.id !== id && d._id?.toString() !== id
        ),
      }));
    });

    newSocket.on('demo:status_updated', ({ id, status }) => {
      setModulesData((prev) => ({
        ...prev,
        demoRequests: (prev.demoRequests || []).map((d) =>
          d.id === id || d._id?.toString() === id ? { ...d, status } : d
        ),
      }));
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const triggerAddProduct = async (productData) => {
    const tempId = productData.slug || `prod-${Date.now()}`;
    const optimisticProduct = {
      id: tempId,
      slug: tempId,
      status: 'active',
      ...productData,
    };

    // 1. Instant optimistic state update with 0ms delay
    setProducts((prev) => {
      const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
      const next = [optimisticProduct, ...safe];
      try {
        localStorage.setItem('speshway_products', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    // 2. Persist to API with timeout and non-blocking background refresh
    try {
      const res = await api.post('/products', productData, { timeout: 3500 });
      const newProduct = res.data?.data || optimisticProduct;
      const targetId = newProduct.id || newProduct._id;
      const targetSlug = newProduct.slug;

      setProducts((prev) => {
        const next = [
          newProduct,
          ...prev.filter(
            (p) =>
              !(
                (p.id && (p.id === targetId || p.id === tempId || p.id === targetSlug)) ||
                (p._id && (p._id === targetId || p._id === tempId || p._id === targetSlug)) ||
                (p.slug && (p.slug === targetSlug || p.slug === tempId))
              )
          ),
        ];
        try {
          localStorage.setItem('speshway_products', JSON.stringify(next));
        } catch (e) {}
        return next;
      });
      refreshProducts().catch(() => {});
      return res.data || { success: true, data: newProduct };
    } catch (err) {
      console.warn('API addProduct saved locally:', err.message);
      return { success: true, data: optimisticProduct };
    }
  };

  const triggerUpdateProduct = async (id, updates) => {
    const updated = { id, ...updates };

    // 1. Instantly update local state and localStorage with 0ms delay!
    setProducts((prev) => {
      const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
      const next = safe.map((p) => {
        const matchId =
          (p.id && (p.id === id || p.id === updates.slug)) ||
          (p._id && (p._id === id || p._id === updates.slug)) ||
          (p.slug && (p.slug === id || p.slug === updates.slug));
        return matchId ? { ...p, ...updates } : p;
      });
      try {
        localStorage.setItem('speshway_products', JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    // 2. Persist to API in background with quick timeout and non-blocking sync
    try {
      const res = await api.put(`/products/${id}`, updates, { timeout: 3500 });
      if (res.data?.data) {
        const serverData = res.data.data;
        setProducts((prev) => {
          const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
          const next = safe.map((p) => {
            const matchId =
              (p.id && (p.id === id || p.id === serverData.id || p.id === serverData.slug)) ||
              (p._id && (p._id === id || p._id === serverData._id || p._id === serverData.slug)) ||
              (p.slug && (p.slug === id || p.slug === serverData.slug));
            return matchId ? { ...p, ...serverData } : p;
          });
          try {
            localStorage.setItem('speshway_products', JSON.stringify(next));
          } catch (e) {}
          return next;
        });
      }
      refreshProducts().catch(() => {});
      return res.data || { success: true, data: updated };
    } catch (err) {
      console.warn('API updateProduct saved locally (server offline or delayed):', err.message);
      return { success: true, data: updated };
    }
  };

  const triggerDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (err) {
      console.warn('API deleteProduct error, updating local state:', err.message);
    }
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id && p._id !== id && p.slug !== id);
      localStorage.setItem('speshway_products', JSON.stringify(next));
      return next;
    });
    return { success: true };
  };

  const triggerAddEmployee = async (emp) => {
    // Optimistic local state update
    const tempId = `temp-${Date.now()}`;
    const optimisticEmp = { id: tempId, status: 'Active', ...emp };
    setModulesData((prev) => ({ ...prev, hrms: [optimisticEmp, ...prev.hrms] }));
    setStats((prev) => ({ ...prev, activeEmployees: prev.activeEmployees + 1 }));
    setToastMessage(`New employee ${emp.name} added`);
    setTimeout(() => setToastMessage(null), 4000);

    // Call REST API to persist in MongoDB database
    try {
      const res = await api.post('/employees', emp);
      if (res.data?.data) {
        setModulesData((prev) => ({
          ...prev,
          hrms: [res.data.data, ...prev.hrms.filter((e) => e.id !== tempId && e.id !== res.data.data.id)],
        }));
      }
    } catch (err) {
      console.warn('API add employee fallback, keeping optimistic entry:', err.message);
    }

    // Also emit socket event for real-time fallback
    if (socket && isConnected) {
      socket.emit('action:add_employee', emp);
    }
  };

  const triggerDeleteEmployee = async (id, name) => {
    // Optimistic local state update
    setModulesData((prev) => ({ ...prev, hrms: prev.hrms.filter((e) => e.id !== id) }));
    setStats((prev) => ({ ...prev, activeEmployees: Math.max(0, prev.activeEmployees - 1) }));
    setToastMessage(`Employee ${name || 'Staff'} removed`);
    setTimeout(() => setToastMessage(null), 4000);

    // Call REST API
    try {
      await api.delete(`/employees/${id}?name=${encodeURIComponent(name || '')}`);
    } catch (err) {
      console.warn('API delete employee error:', err.message);
    }

    if (socket && isConnected) {
      socket.emit('action:delete_employee', { id, name });
    }
  };

  const triggerUpdateEmployee = async (emp) => {
    // Optimistic local update
    setModulesData((prev) => ({
      ...prev,
      hrms: prev.hrms.map((e) => (e.id === emp.id ? { ...e, ...emp } : e)),
    }));
    setToastMessage(`Employee ${emp.name} updated`);
    setTimeout(() => setToastMessage(null), 4000);

    // Call REST API
    try {
      await api.put(`/employees/${emp.id}`, emp);
    } catch (err) {
      console.warn('API update employee error:', err.message);
    }

    if (socket && isConnected) {
      socket.emit('action:update_employee', emp);
    }
  };

  const triggerAddTask = (task) => {
    if (socket && isConnected) {
      socket.emit('action:add_task', task);
    } else {
      setModulesData((prev) => ({ ...prev, tasks: [task, ...prev.tasks] }));
      setStats((prev) => ({ ...prev, openTasks: prev.openTasks + 1 }));
      setToastMessage(`New task created: ${task.title}`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const triggerRequestDemo = async (demoData) => {
    try {
      const res = await api.post('/inquiries', demoData);
      const saved = res.data?.data;
      if (saved) {
        setModulesData((prev) => ({
          ...prev,
          demoRequests: [
            saved,
            ...(prev.demoRequests || []).filter(
              (d) => (d.id || d._id) !== (saved.id || saved._id)
            ),
          ],
        }));
      }
      setStats((prev) => ({ ...prev, happyBusinesses: prev.happyBusinesses + 1 }));
      setToastMessage(`Inquiry submitted from ${demoData.company || demoData.name}`);
      setTimeout(() => setToastMessage(null), 4000);
      return saved;
    } catch (err) {
      console.warn('API post inquiry error, falling back to socket:', err);
      if (socket && isConnected) {
        socket.emit('action:request_demo', demoData);
      } else {
        setStats((prev) => ({ ...prev, happyBusinesses: prev.happyBusinesses + 1 }));
        setToastMessage(`Inquiry received from ${demoData.company || demoData.name}`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        stats,
        activities,
        toastMessage,
        products,
        refreshProducts,
        refreshInquiries,
        modulesData,
        triggerAddProduct,
        triggerUpdateProduct,
        triggerDeleteProduct,
        triggerAddEmployee,
        triggerDeleteEmployee,
        triggerUpdateEmployee,
        triggerAddTask,
        triggerRequestDemo,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

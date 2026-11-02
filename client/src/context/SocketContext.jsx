import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';

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

  const [products, setProducts] = useState([]);
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
      if (prodRes.data?.data && Array.isArray(prodRes.data.data)) {
        setProducts(prodRes.data.data);
        return prodRes.data.data;
      }
    } catch (err) {
      console.warn('Could not refresh products from API:', err.message);
    }
  };

  // Fetch initial products and employees from MongoDB API
  useEffect(() => {
    const fetchInitialData = async () => {
      await refreshProducts();

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
      setProducts((prev) => {
        const targetId = newProduct.id || newProduct._id;
        const targetSlug = newProduct.slug;
        const exists = prev.some(
          (p) =>
            (p.id && (p.id === targetId || p.id === targetSlug)) ||
            (p._id && (p._id === targetId || p._id === targetSlug)) ||
            (p.slug && p.slug === targetSlug)
        );
        if (exists) {
          return prev.map((p) =>
            (p.id && (p.id === targetId || p.id === targetSlug)) ||
            (p._id && (p._id === targetId || p._id === targetSlug)) ||
            (p.slug && p.slug === targetSlug)
              ? newProduct
              : p
          );
        }
        return [newProduct, ...prev];
      });
      setToastMessage(`Product added: ${newProduct.name}`);
      setTimeout(() => setToastMessage(null), 4000);
      refreshProducts();
    });

    newSocket.on('product:updated', (updated) => {
      setProducts((prev) =>
        prev.map((p) => {
          const matchId =
            (p.id && (p.id === updated.id || p.id === updated._id)) ||
            (p._id && (p._id === updated.id || p._id === updated._id));
          const matchSlug = p.slug && p.slug === updated.slug;
          return matchId || matchSlug ? updated : p;
        })
      );
      setToastMessage(`Product updated: ${updated.name}`);
      setTimeout(() => setToastMessage(null), 4000);
      refreshProducts();
    });

    newSocket.on('product:deleted', (data) => {
      const targetId = data?.id;
      const targetSlug = data?.slug;
      setProducts((prev) =>
        prev.filter((p) => {
          if (targetId && (p.id === targetId || p._id === targetId || p.slug === targetId)) return false;
          if (targetSlug && (p.slug === targetSlug || p.id === targetSlug)) return false;
          return true;
        })
      );
      setToastMessage(`Product removed from catalog`);
      setTimeout(() => setToastMessage(null), 4000);
      refreshProducts();
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
        demoRequests: [request, ...(prev.demoRequests || [])],
      }));
      if (updatedStats) setStats(updatedStats);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const triggerAddProduct = async (productData) => {
    try {
      const res = await api.post('/products', productData);
      if (res.data?.data) {
        const newProduct = res.data.data;
        const targetId = newProduct.id || newProduct._id;
        const targetSlug = newProduct.slug;
        setProducts((prev) => [
          newProduct,
          ...prev.filter(
            (p) =>
              !(
                (p.id && (p.id === targetId || p.id === targetSlug)) ||
                (p._id && (p._id === targetId || p._id === targetSlug)) ||
                (p.slug && p.slug === targetSlug)
              )
          ),
        ]);
      }
      await refreshProducts();
      return res.data;
    } catch (err) {
      console.error('API addProduct error:', err);
      throw err;
    }
  };

  const triggerUpdateProduct = async (id, updates) => {
    try {
      const res = await api.put(`/products/${id}`, updates);
      if (res.data?.data) {
        const updated = res.data.data;
        setProducts((prev) =>
          prev.map((p) => {
            const matchId =
              (p.id && (p.id === id || p.id === updated.id || p.id === updated._id)) ||
              (p._id && (p._id === id || p._id === updated.id || p._id === updated._id));
            const matchSlug = p.slug && (p.slug === id || p.slug === updated.slug);
            return matchId || matchSlug ? updated : p;
          })
        );
      }
      await refreshProducts();
      return res.data;
    } catch (err) {
      console.error('API updateProduct error:', err);
      // Fallback local update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id || p.slug === id ? { ...p, ...updates } : p
        )
      );
      return { success: true, data: { id, ...updates } };
    }
  };

  const triggerDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) =>
        prev.filter((p) => p.id !== id && p._id !== id && p.slug !== id)
      );
      await refreshProducts();
      return { success: true };
    } catch (err) {
      console.error('API deleteProduct error:', err);
      setProducts((prev) =>
        prev.filter((p) => p.id !== id && p._id !== id && p.slug !== id)
      );
      return { success: true };
    }
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

  const triggerRequestDemo = (demoData) => {
    if (socket && isConnected) {
      socket.emit('action:request_demo', demoData);
    } else {
      setStats((prev) => ({ ...prev, happyBusinesses: prev.happyBusinesses + 1 }));
      setToastMessage(`Demo requested by ${demoData.company || demoData.name}`);
      setTimeout(() => setToastMessage(null), 4000);
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

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
  const [products, setProducts] = useState([]);
  const [modulesData, setModulesData] = useState({
    hrms: [],
    tasks: [],
    projects: [],
    clients: [],
    demoRequests: [],
  });

  // Fetch initial products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        if (res.data?.data) {
          setProducts(res.data.data);
        }
      } catch (err) {
        console.warn('Could not fetch products from API, using fallback store');
      }
    };
    fetchProducts();
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
      setProducts((prev) => [newProduct, ...prev.filter((p) => p.id !== newProduct.id)]);
      setToastMessage(`Product added: ${newProduct.name}`);
      setTimeout(() => setToastMessage(null), 4000);
    });

    newSocket.on('product:updated', (updated) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id || p.slug === updated.slug ? updated : p))
      );
      setToastMessage(`Product updated: ${updated.name}`);
      setTimeout(() => setToastMessage(null), 4000);
    });

    newSocket.on('product:deleted', ({ id }) => {
      setProducts((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
      setToastMessage(`Product removed from catalog`);
      setTimeout(() => setToastMessage(null), 4000);
    });

    // HRMS real-time updates
    newSocket.on('hrms:updated', ({ employee, stats: updatedStats }) => {
      setModulesData((prev) => ({
        ...prev,
        hrms: [employee, ...(prev.hrms || [])],
      }));
      if (updatedStats) setStats(updatedStats);
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
        setProducts((prev) => [res.data.data, ...prev.filter((p) => p.id !== res.data.data.id)]);
      }
      return res.data;
    } catch (err) {
      console.error('API addProduct error:', err);
      // Fallback local update if network blocked
      const fallbackProd = {
        id: productData.slug || `prod-${Date.now()}`,
        slug: productData.slug || `prod-${Date.now()}`,
        status: 'active',
        ...productData,
      };
      setProducts((prev) => [fallbackProd, ...prev]);
      return { success: true, data: fallbackProd };
    }
  };

  const triggerUpdateProduct = async (id, updates) => {
    try {
      const res = await api.put(`/products/${id}`, updates);
      if (res.data?.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id || p.slug === id ? res.data.data : p))
        );
      }
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
      setProducts((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
      return { success: true };
    } catch (err) {
      console.error('API deleteProduct error:', err);
      setProducts((prev) => prev.filter((p) => p.id !== id && p.slug !== id));
      return { success: true };
    }
  };

  const triggerAddEmployee = (emp) => {
    if (socket && isConnected) {
      socket.emit('action:add_employee', emp);
    } else {
      setModulesData((prev) => ({ ...prev, hrms: [emp, ...prev.hrms] }));
      setStats((prev) => ({ ...prev, activeEmployees: prev.activeEmployees + 1 }));
      setToastMessage(`New employee ${emp.name} added`);
      setTimeout(() => setToastMessage(null), 4000);
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
        modulesData,
        triggerAddProduct,
        triggerUpdateProduct,
        triggerDeleteProduct,
        triggerAddEmployee,
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

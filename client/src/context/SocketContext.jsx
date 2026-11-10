import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';
import { DEFAULT_ADMIN_PROJECTS, normalizeProductCategory } from '../utils/adminProjects';
import { DEFAULT_BRANDING, DEFAULT_SOCIAL_LINKS, DEFAULT_HOME_CONTENT } from '../constants/branding';

export { DEFAULT_BRANDING, DEFAULT_SOCIAL_LINKS, DEFAULT_HOME_CONTENT };

const SocketContext = createContext(null);

export const isSameProduct = (p, target) => {
  if (!p || !target) return false;
  const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (p === target) return true;
  if (p._id && target._id && String(p._id) === String(target._id)) return true;
  if (p.id && target.id && String(p.id) === String(target.id)) return true;
  if (p.slug && target.slug && String(p.slug) === String(target.slug)) return true;

  const normPId = norm(p.id);
  const normPSlug = norm(p.slug);
  const normPName = norm(p.name);

  const normTId = norm(target.id || target._id);
  const normTSlug = norm(target.slug);
  const normTName = norm(target.name);

  if (normPId && (normPId === normTId || normPId === normTSlug)) return true;
  if (normPSlug && (normPSlug === normTSlug || normPSlug === normTId)) return true;
  if (normPName && normTName && normPName === normTName) return true;
  if (normPName && (normPName === normTSlug || normPName === normTId)) return true;
  if (normTName && (normTName === normPSlug || normTName === normPId)) return true;

  return false;
};

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
          const clean = parsed
            .filter((p) => p && typeof p === 'object' && (p.name || p.slug || p.id))
            .map(normalizeProductCategory);
          if (clean.length > 0) return clean;
        }
      }
    } catch (e) {
      console.warn('Error reading speshway_products from localStorage:', e);
    }
    return DEFAULT_ADMIN_PROJECTS.map(normalizeProductCategory);
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
        const clean = prodRes.data.data
          .filter((p) => p && typeof p === 'object' && (p.name || p.slug || p.id))
          .map(normalizeProductCategory);
        if (clean.length > 0) {
          setProducts((prev) => {
            const safePrev = Array.isArray(prev) ? prev : [];
            const merged = clean.map((serverItem) => {
              const localMatch = safePrev.find((p) => isSameProduct(p, serverItem));
              if (localMatch) {
                return normalizeProductCategory({
                  ...localMatch,
                  ...serverItem,
                  // Keep latest valid image (whether from server or user edit)
                  imageUrl: serverItem.imageUrl || localMatch.imageUrl || '',
                });
              }
              return normalizeProductCategory(serverItem);
            });
            try {
              localStorage.setItem('speshway_products', JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
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

  const [homeContent, setHomeContent] = useState(() => {
    try {
      const saved = localStorage.getItem('speshway_home_content');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_HOME_CONTENT;
  });

    const [branding, setBranding] = useState(() => {
    try {
      const saved = localStorage.getItem('speshway_branding');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_BRANDING, ...parsed };
      }
    } catch (e) {}
    return DEFAULT_BRANDING;
  });

  const [socialLinks, setSocialLinks] = useState(() => {
    try {
      const saved = localStorage.getItem('speshway_social_links');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return { ...DEFAULT_SOCIAL_LINKS, ...parsed };
      }
    } catch (e) {}
    return DEFAULT_SOCIAL_LINKS;
  });

  const updateBranding = async (newBranding) => {
    const merged = { ...DEFAULT_BRANDING, ...(branding || {}), ...(newBranding || {}) };
    setBranding(merged);
    try {
      localStorage.setItem('speshway_branding', JSON.stringify(merged));
      window.dispatchEvent(new Event('speshway_branding_changed'));
    } catch (e) {}

    try {
      const updatedHome = {
        ...(homeContent || {}),
        branding: merged,
      };
      setHomeContent(updatedHome);
      try {
        localStorage.setItem('speshway_home_content', JSON.stringify(updatedHome));
      } catch (e) {}
      await api.put('/home', updatedHome);
    } catch (err) {
      console.warn('Could not persist branding to API:', err.message);
    }
    return merged;
  };

  const updateSocialLinks = async (newSocialLinks) => {
    const merged = { ...DEFAULT_SOCIAL_LINKS, ...(socialLinks || {}), ...(newSocialLinks || {}) };
    setSocialLinks(merged);
    try {
      localStorage.setItem('speshway_social_links', JSON.stringify(merged));
      window.dispatchEvent(new Event('speshway_social_links_changed'));
    } catch (e) {}

    try {
      const updatedHome = {
        ...(homeContent || {}),
        socialLinks: merged,
      };
      setHomeContent(updatedHome);
      try {
        localStorage.setItem('speshway_home_content', JSON.stringify(updatedHome));
      } catch (e) {}
      await api.put('/home', updatedHome);
    } catch (err) {
      console.warn('Could not persist social links to API:', err.message);
    }
    return merged;
  };

  useEffect(() => {
    if (homeContent?.branding) {
      setBranding((prev) => {
        const next = { ...DEFAULT_BRANDING, ...(prev || {}), ...homeContent.branding };
        try {
          localStorage.setItem('speshway_branding', JSON.stringify(next));
          window.dispatchEvent(new Event('speshway_branding_changed'));
        } catch (e) {}
        return next;
      });
    }
  }, [homeContent?.branding]);

  useEffect(() => {
    if (homeContent?.socialLinks) {
      setSocialLinks((prev) => {
        const next = { ...DEFAULT_SOCIAL_LINKS, ...(prev || {}), ...homeContent.socialLinks };
        try {
          localStorage.setItem('speshway_social_links', JSON.stringify(next));
          window.dispatchEvent(new Event('speshway_social_links_changed'));
        } catch (e) {}
        return next;
      });
    }
  }, [homeContent?.socialLinks]);

  const updateNavbarVisibility = async (partialUpdates = {}) => {
    const currentNavbar = homeContent?.navbar || { showPricing: true, showProducts: true };
    const nextNavbar = {
      showPricing: partialUpdates.showPricing !== undefined
        ? Boolean(partialUpdates.showPricing)
        : Boolean(currentNavbar.showPricing ?? true),
      showProducts: partialUpdates.showProducts !== undefined
        ? Boolean(partialUpdates.showProducts)
        : Boolean(currentNavbar.showProducts ?? true),
    };

    const updatedHome = {
      ...(homeContent || DEFAULT_HOME_CONTENT),
      navbar: nextNavbar,
    };

    // 1. Immediately update React state for instant UI response
    setHomeContent(updatedHome);

    // 2. Persist to localStorage for fallback and offline persistence
    try {
      localStorage.setItem('speshway_home_content', JSON.stringify(updatedHome));
      localStorage.setItem('speshway_navbar_pricing_visible', nextNavbar.showPricing ? 'true' : 'false');
      localStorage.setItem('speshway_navbar_products_visible', nextNavbar.showProducts ? 'true' : 'false');
    } catch (e) {}

    // 3. Dispatch events to notify any listeners
    window.dispatchEvent(new Event('speshway_navbar_pricing_changed'));
    window.dispatchEvent(new Event('speshway_navbar_products_changed'));
    window.dispatchEvent(new Event('speshway_navbar_visibility_changed'));

    // 4. Persist to backend and let WebSocket broadcast to other clients
    try {
      const res = await api.put('/home', updatedHome);
      return res.data?.data || updatedHome;
    } catch (err) {
      console.warn('Could not persist navbar visibility to API:', err.message);
      return updatedHome;
    }
  };

  const refreshHomeContent = async () => {
    try {
      const res = await api.get('/home');
      if (res.data?.data) {
        setHomeContent(res.data.data);
        try {
          localStorage.setItem('speshway_home_content', JSON.stringify(res.data.data));
          if (res.data.data.navbar) {
            if (res.data.data.navbar.showPricing !== undefined) {
              localStorage.setItem('speshway_navbar_pricing_visible', res.data.data.navbar.showPricing ? 'true' : 'false');
            }
            if (res.data.data.navbar.showProducts !== undefined) {
              localStorage.setItem('speshway_navbar_products_visible', res.data.data.navbar.showProducts ? 'true' : 'false');
            }
          }
        } catch (e) {}
        window.dispatchEvent(new Event('speshway_navbar_pricing_changed'));
        window.dispatchEvent(new Event('speshway_navbar_products_changed'));
        window.dispatchEvent(new Event('speshway_navbar_visibility_changed'));
        return res.data.data;
      }
    } catch (err) {
      console.warn('Could not refresh home content from API:', err.message);
    }
  };

  // Fetch initial products, employees, inquiries, and home content from MongoDB API
  useEffect(() => {
    const fetchInitialData = async () => {
      await refreshProducts();
      await refreshInquiries();
      await refreshHomeContent();

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
      const uId = String(updated.id || '').trim().toLowerCase();
      const uMongoId = String(updated._id || '').trim().toLowerCase();
      const uSlug = String(updated.slug || '').trim().toLowerCase();
      const uName = String(updated.name || '').trim().toLowerCase();

      setProducts((prev) => {
        const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
        let matched = false;
        const next = safe.map((p) => {
          const pId = String(p.id || '').trim().toLowerCase();
          const pMongoId = String(p._id || '').trim().toLowerCase();
          const pSlug = String(p.slug || '').trim().toLowerCase();
          const pName = String(p.name || '').trim().toLowerCase();

          const isMatch =
            isSameProduct(p, updated) ||
            (uId && (pId === uId || pMongoId === uId || pSlug === uId)) ||
            (uMongoId && (pId === uMongoId || pMongoId === uMongoId || pSlug === uMongoId)) ||
            (uSlug && (pId === uSlug || pMongoId === uSlug || pSlug === uSlug)) ||
            (uName && pName === uName);

          if (isMatch) {
            matched = true;
            return { ...p, ...updated };
          }
          return p;
        });
        const finalList = matched ? next : [updated, ...next];
        try {
          localStorage.setItem('speshway_products', JSON.stringify(finalList));
        } catch (e) {}
        return finalList;
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

    // Demo & Contact Inquiries real-time
    const handleNewInquiry = ({ request, stats: updatedStats }) => {
      if (!request) return;
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
    };

    newSocket.on('demo:new', handleNewInquiry);
    newSocket.on('inquiry:new', handleNewInquiry);

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

    // Home page content real-time updates
    newSocket.on('home:updated', (updatedHome) => {
      if (updatedHome) {
        setHomeContent(updatedHome);
        try {
          localStorage.setItem('speshway_home_content', JSON.stringify(updatedHome));
          if (updatedHome.navbar) {
            if (updatedHome.navbar.showPricing !== undefined) {
              localStorage.setItem('speshway_navbar_pricing_visible', updatedHome.navbar.showPricing ? 'true' : 'false');
            }
            if (updatedHome.navbar.showProducts !== undefined) {
              localStorage.setItem('speshway_navbar_products_visible', updatedHome.navbar.showProducts ? 'true' : 'false');
            }
          }
        } catch (e) {}
        window.dispatchEvent(new Event('speshway_navbar_pricing_changed'));
        window.dispatchEvent(new Event('speshway_navbar_products_changed'));
        window.dispatchEvent(new Event('speshway_navbar_visibility_changed'));
      }
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

    // 2. Persist to API with generous 60s timeout for Cloudinary image uploads
    try {
      const res = await api.post('/products', productData, { timeout: 60000 });
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
      return res.data || { success: true, data: newProduct };
    } catch (err) {
      console.warn('API addProduct saved locally:', err.message);
      return { success: true, data: optimisticProduct };
    }
  };

  const triggerUpdateProduct = async (id, updates) => {
    const cleanId = String(id || '').trim().toLowerCase();
    const cleanSlug = String(updates.slug || '').trim().toLowerCase();
    const cleanName = String(updates.name || '').trim().toLowerCase();

    const isMatch = (p) => {
      if (!p || typeof p !== 'object') return false;
      const pId = String(p.id || '').trim().toLowerCase();
      const pMongoId = String(p._id || '').trim().toLowerCase();
      const pSlug = String(p.slug || '').trim().toLowerCase();
      const pName = String(p.name || '').trim().toLowerCase();

      return (
        isSameProduct(p, { id, slug: updates.slug || id, ...updates }) ||
        (cleanId && (pId === cleanId || pMongoId === cleanId || pSlug === cleanId)) ||
        (cleanSlug && (pId === cleanSlug || pMongoId === cleanSlug || pSlug === cleanSlug)) ||
        (cleanName && pName === cleanName)
      );
    };

    const targetObj = { id, slug: updates.slug || id, ...updates };

    // 1. Optimistic update: instantly update React state and localStorage so all UI reflects the new image immediately
    setProducts((prev) => {
      const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
      let found = false;
      const next = safe.map((p) => {
        if (isMatch(p)) {
          found = true;
          return { ...p, ...updates };
        }
        return p;
      });
      const finalList = found ? next : [targetObj, ...next];
      try {
        localStorage.setItem('speshway_products', JSON.stringify(finalList));
      } catch (e) {}
      return finalList;
    });

    // 2. Persist to MongoDB Atlas & Cloudinary CDN with 60s timeout
    try {
      const res = await api.put(`/products/${encodeURIComponent(id)}`, updates, { timeout: 60000 });
      const serverData = res.data?.data || targetObj;

      setProducts((prev) => {
        const safe = Array.isArray(prev) ? prev.filter((p) => p && typeof p === 'object') : [];
        let found = false;
        const next = safe.map((p) => {
          if (
            isMatch(p) ||
            (serverData.id && String(p.id) === String(serverData.id)) ||
            (serverData._id && String(p._id) === String(serverData._id)) ||
            (serverData.slug && String(p.slug).toLowerCase() === String(serverData.slug).toLowerCase())
          ) {
            found = true;
            return { ...p, ...serverData };
          }
          return p;
        });
        const finalList = found ? next : [serverData, ...next];
        try {
          localStorage.setItem('speshway_products', JSON.stringify(finalList));
        } catch (e) {}
        return finalList;
      });

      return res.data || { success: true, data: serverData };
    } catch (err) {
      console.warn('API updateProduct saved locally (server offline or delayed):', err.message);
      return { success: true, data: targetObj };
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
        homeContent,
        refreshHomeContent,
        setHomeContent,
        updateNavbarVisibility,
        branding,
        setBranding,
        updateBranding,
        socialLinks,
        setSocialLinks,
        updateSocialLinks,
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

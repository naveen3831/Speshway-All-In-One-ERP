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


  const DEFAULT_CATALOG_PRODUCTS = [
    {
      id: 'joy-event-s',
      slug: 'joy-event-s',
      name: "JOY_EVENT'S",
      category: 'Human Resources',
      description: 'Joy Events is a modern event management platform designed to simplify event planning, bookings, and vendor coordination. From weddings and birthday parties to corporate events and celebrations, manage event requirements through one centralized platform.',
      websiteUrl: 'https://joyevents.speshway.site/',
      adminUrl: '/product/joy-events/dashboard',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/joy-events.jpg',
      features: ['Event Bookings & Scheduling', 'Multi-Category Packages', 'Vendor & Caterer Coordination', 'Real-Time Revenue Analytics', 'Automated Invoices & Payments', 'Role-Based Staff Access'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    },
    {
      id: 'speshway-hrms',
      slug: 'speshway-hrms',
      name: 'SPESHWAY-HRMS',
      category: 'Human Resources',
      description: 'Speshway HRMS is an all-in-one Human Resource Management System designed to simplify workforce management and automate daily HR operations. Manage employees, attendance, leave requests, payroll, recruitment, and performance through a centralized platform.',
      websiteUrl: 'https://speshwayhrms.com/',
      adminUrl: '/product/speshway-hrms/dashboard',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/speshway-hrms.jpg',
      features: ['Biometric Shift Punch Logs', 'Leave & Attendance Engine', 'Automated Payroll & Tax Slips', 'Applicant Tracking (ATS)', 'Employee Self-Service (ESS)', 'Performance Appraisals'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    },
    {
      id: 'flavora-kitchen',
      slug: 'flavora-kitchen',
      name: 'FLAVORA KITCHEN',
      category: 'Human Resources',
      description: 'Flavora Kitchen is an enterprise cloud kitchen and restaurant management system that streamlines live orders, online deliveries, dining table reservations, recipe costings, kitchen display systems (KDS), and inventory through a centralized digital platform.',
      websiteUrl: 'https://restaurant.speshway.site/',
      adminUrl: '/product/flavora-kitchen/dashboard',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/flavora-kitchen.jpg',
      features: ['Live Kitchen Display (KDS)', 'Table Reservation Engine', 'Thermal KOT Printing', 'Menu & Recipe Costing', 'Digital POS Settlements', 'Customer Loyalty & Reviews'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    },
    {
      id: 'american-fitness-gym',
      slug: 'american-fitness-gym',
      name: 'AMERICAN FITNESS GYM',
      category: 'Human Resources',
      description: 'American Fitness Gym is a modern fitness platform designed to help fitness enthusiasts achieve their health and fitness goals. Explore gym services, workout programs, professional trainers, membership plans, and schedules through a user-friendly website.',
      websiteUrl: 'https://speshway.com/',
      adminUrl: '/product/american-fitness-gym/dashboard',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/american-fitness-gym.jpg',
      features: ['Biometric Turnstile Check-In', 'PT & Class Scheduling', 'Membership Subscription Tiers', 'Attendance Streak Tracking', 'Supplement Bar POS', 'Revenue Analytics'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    },
    {
      id: 'fleet-management',
      slug: 'fleet-management',
      name: 'Fleet Management',
      category: 'Human Resources',
      description: 'A smart Fleet Management System designed to simplify vehicle operations, monitor fleet activities, manage drivers and trips, and improve operational efficiency. Track fleet performance, organize vehicle records, and manage transportation operations through one centralized platform.',
      websiteUrl: 'https://fleet.speshway.site/',
      adminUrl: '/product/fleet-management/dashboard',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/fleet-management.jpg',
      features: ['Real-Time GPS Telematics', 'Driver & Vehicle Rostering', 'Fuel Dispensation Audits', 'Waybill & Route Tracking', 'Preventive Maintenance Logs', 'Geofence Perimeter Security'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    },
    {
      id: 'ride-flow',
      slug: 'ride-flow',
      name: 'RIDE FLOW',
      category: 'Human Resources',
      description: 'RideFlow is a modern two-wheeler platform designed to help customers explore bikes, compare models, discover attractive offers, and connect with dealers. It provides a convenient and user-friendly experience for finding the right bike.',
      websiteUrl: 'https://bike.speshway.site/',
      adminUrl: '/product/ride-flow/dashboard',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/ride-flow.jpg',
      features: ['Bike Listings', 'Bike Comparison', 'Offers & Deals', 'Dealer Directory', 'Service Support'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind CSS'],
    },
    {
      id: 'saloon',
      slug: 'saloon',
      name: 'Saloon',
      category: 'Business Intelligence',
      description: 'SPY Salon is a premium beauty and wellness studio offering professional hair styling, beauty treatments, skincare, grooming, and personalized salon services with convenient online appointment booking.',
      websiteUrl: 'https://hairsalon.speshway.site/',
      adminUrl: '/product/saloon/dashboard',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/saloon.jpg',
      features: ['Real-Time Appointments', 'Stylist & Chair Rostering', 'Service & Package Catalog', 'Loyalty & Membership Passes', 'POS & Split Billing', 'Inventory & Salon Consumables'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    },
    {
      id: 'e-commerce',
      slug: 'e-commerce',
      name: 'E commerce',
      category: 'Human Resources',
      description: 'Speshway Ecom is an all-in-one online shopping platform offering multiple product categories, seamless product browsing, wishlist, cart management, secure payments, and convenient order tracking.',
      websiteUrl: 'https://ecom.speshway.site/',
      adminUrl: '/product/e-commerce/dashboard',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/e-commerce.jpg',
      features: ['Multi-Category Catalog', 'Real-Time Order Tracking', 'Role-Based Access', 'Cart & Wishlist Engine', 'Payment Gateway Integration', 'Inventory Stock Alerts'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    },
    {
      id: 'aneera-silks',
      slug: 'aneera-silks',
      name: 'Aneera Silks',
      category: 'Fashion & Luxury',
      description: 'Aneera Silks is a luxury online saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections, with beautiful product galleries, seamless shopping, secure payments, and convenient order management',
      websiteUrl: 'https://aneerasilks.com',
      adminUrl: '/dashboard/aneera-silks',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/aneera-silks.jpg',
      features: ['Luxury Saree Catalog', 'Silk Mark Certification', 'Real-Time Order Tracking', 'Role-Based Access', 'Bridal Customization', 'Secure Payments'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    },
    {
      id: 'natural-milk-dairy',
      slug: 'natural-milk-dairy',
      name: 'Natural Milk Dairy',
      category: 'Dairy & Agriculture',
      description: 'Natural Milk Dairy is an all-in-one Dairy Management System that simplifies product management, customer orders, subscriptions, inventory, daily deliveries, and payments through a centralized admin dashboard.',
      websiteUrl: 'https://dairy.speshway.site/',
      adminUrl: '/product/natural-milk-dairy/dashboard',
      status: 'active',
      popularity: 98,
      imageUrl: '/images/products/natural-milk-dairy.jpg',
      features: ['Real-Time Orders', 'Role-Based Access', 'Daily Milk Subscriptions', 'Delivery Route Tracking', 'Inventory & Cold Storage', 'Revenue Analytics'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    },
    {
      id: 'vexa-style-hub',
      slug: 'vexa-style-hub',
      name: 'Vexa Style Hub',
      category: 'Fashion & Apparel',
      description: 'Premier fashion apparel ERP with inventory, size matrix management, omnichannel order processing, POS, and supply chain tracking.',
      websiteUrl: 'https://speshway.com/vexa-style-hub',
      adminUrl: '/dashboard/vexa-style-hub',
      status: 'active',
      popularity: 98,
      imageUrl: '/images/products/vexa-style-hub.png',
      features: ['Variant & Size Matrix', 'Omnichannel Orders', 'Showroom POS Integration', 'Fabric & Material Supply Chain', 'Seasonal Sales Analytics'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    },
    {
      id: 'speshway-hospitals',
      slug: 'speshway-hospitals',
      name: 'Speshway Hospitals',
      category: 'Healthcare & Hospitals',
      description: 'HMS Enterprise is a comprehensive Hospital Management System designed to streamline hospital operations, including patient management, appointments, EMR, billing, pharmacy, laboratory reports, inventory, and staff management — all through one centralized digital platform.',
      websiteUrl: 'https://speshway.com/hospitals',
      adminUrl: '/dashboard/speshway-hospitals',
      status: 'active',
      popularity: 99,
      imageUrl: '/images/products/speshway-hospitals.jpg',
      features: ['Diagnostic Lab Reports & Pathology', 'Patient Admissions & Inpatient Directory', 'OPD / IPD Doctor Scheduling', 'Real-Time Bed & Ward Occupancy', 'Pharmacy & Blood Bank Inventory', 'EHR & Digital Health Records'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'JWT Auth', 'REST API'],
    },
    {
      id: 'tours-and-travels',
      slug: 'tours-and-travels',
      name: 'Tours and Travels',
      category: 'Tours & Travels',
      description: 'Comprehensive travel agency software for booking itineraries, ticketing, holiday packages, lead management, accounts, and supplier vouchers.',
      websiteUrl: 'https://tour.speshway.site/',
      adminUrl: '/product/tours-and-travels/dashboard',
      status: 'active',
      popularity: 97,
      imageUrl: '/images/products/tours-and-travels.jpg',
      features: ['Lead & CRM Management', 'Holiday Package Itinerary Builder', 'Hotel & Flight Booking Registry', 'Supplier & Vendor Accounts', 'Receivables & Invoice Generator'],
      technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    },
  ];

  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('speshway_products_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed.map(enrichProductWithImage);
      }
    } catch (e) {}
    return DEFAULT_CATALOG_PRODUCTS;
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
      if (prodRes.data?.data && Array.isArray(prodRes.data.data)) {
        setProducts(prodRes.data.data.map(enrichProductWithImage));
        return prodRes.data.data;
      }
    } catch (err) {
      console.warn('Could not refresh products from API:', err.message);
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

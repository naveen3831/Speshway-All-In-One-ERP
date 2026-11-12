import {
  Building2,
  Plane,
  Package,
  Store,
  Sparkles,
  ShoppingCart,
  Scissors,
  Wrench,
  BriefcaseMedical,
  Home,
  GraduationCap,
  Layers,
  Factory,
  Utensils,
  Bike,
  Calendar,
  Dumbbell,
  Truck,
  BookOpen,
  Bed,
} from 'lucide-react';

export const iconMap = {
  Building2,
  Plane,
  Package,
  Store,
  Sparkles,
  ShoppingCart,
  Scissors,
  Wrench,
  BriefcaseMedical,
  Home,
  GraduationCap,
  Layers,
  Factory,
  Utensils,
  Bike,
  Calendar,
  Dumbbell,
  Truck,
  BookOpen,
  Bed,
};

export const EXCLUDED_SLUGS = new Set([
  'reports',
  'performance',
  'recruitment',
  'finance',
  'clients',
  'leave',
  'tasks',
  'assets',
  'payroll',
  'projects',
  'directory',
  'hrms',
  'savitri-sarees',
]);

export const EXCLUDED_NAMES = new Set([
  'reports & analytics',
  'performance management',
  'recruitment & ats',
  'finance & accounts',
  'client management (crm)',
  'client management',
  'leave & attendance',
  'task management',
  'asset management',
  'payroll system',
  'project management',
  'employee directory',
  'hrms portal',
  'savitri sarees',
]);

// Full default enterprise ERP projects managed in the Admin Dashboard
export const DEFAULT_ADMIN_PROJECTS = [
  {
    id: 'sana-stayz',
    slug: 'sana-stayz',
    name: 'Sana Stayz',
    category: 'Hospitality & Hotels',
    description: 'Sana Stayz is a modern hotel and accommodation booking platform designed to streamline room reservations, front desk check-in/out, housekeeping, and guest management through an intuitive digital portal.',
    longDescription: 'End-to-end hospitality property management ERP providing real-time room occupancy grids, keyless check-in, banquet sales, housekeeping rosters, and room service settlements.',
    features: ['Room Reservations Grid', 'Express Check-In/Out', 'Live Occupancy Telematics', 'Housekeeping Roster', 'Billing & Folio Invoicing'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://hotel.speshway.site/',
    adminUrl: '/product/sana-stayz/dashboard',
    imageUrl: '/images/products/sana-stayz.jpg',
    iconName: 'Bed',
    color: 'emerald',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'learnhub',
    slug: 'learnhub',
    name: 'LearnHub',
    category: 'Education & LMS',
    description: 'LearnHub is a modern online learning management platform designed to help students enroll in industry courses, attend live interactive batches, complete assignments, and receive accredited certificates.',
    longDescription: 'Enterprise EdTech and online academy ERP featuring interactive live batch schedules, digital grade books, automated fee invoices, quiz modules, and blockchain credentials.',
    features: ['Course Management & Video Lectures', 'Student Enrollment Pipeline', 'Live Interactive Classrooms', 'Automated Quizzes & Exams', 'Blockchain Certificates'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://lms.speshway.site/',
    adminUrl: '/product/learnhub/dashboard',
    imageUrl: '/images/products/learnhub.jpg',
    iconName: 'GraduationCap',
    color: 'emerald',
    status: 'active',
    popularity: 98,
  },
  {
    id: 'foodway',
    slug: 'foodway',
    name: 'FOODWAY',
    category: 'Food Delivery & Kitchen',
    description: 'FoodWay is a modern online food ordering platform that helps customers explore nearby partner kitchens, customize dishes, track live deliveries, and order delicious meals seamlessly.',
    longDescription: 'Next-gen cloud kitchen and food delivery ERP with thermal KOT kitchen display systems, rider telematics dispatch, menu 86 inventory control, and multi-outlet settlements.',
    features: ['Live Kitchen Display (KDS)', 'Online Food Delivery Workflow', 'Rider Telematics Tracking', 'Multi-Kitchen Settlements', 'Digital POS Invoices'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://foody.speshway.site/',
    adminUrl: '/product/foodway/dashboard',
    imageUrl: '/images/products/foodway.jpg',
    iconName: 'Utensils',
    color: 'emerald',
    status: 'active',
    popularity: 98,
  },
  {
    id: 'tours-and-travels',
    slug: 'tours-and-travels',
    name: 'TOURS & TRAVELS',
    category: 'Bus & Travel Booking',
    description: 'STAR TOURS & TRAVELS is an online bus ticket booking platform designed to make travel easy with quick bus searches, seat selection, secure online ticketing, and real-time travel updates.',
    longDescription: 'Interstate passenger transit and bus fleet ERP covering seat layout matrix, online booking dispatch, route rostering, GPS bus tracking, and passenger manifests.',
    features: ['Online Bus Ticketing Engine', 'Seat Selection Matrix', 'Fleet GPS Telematics', 'Interstate Route Rosters', 'Automated Boarding Passes'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://bus.speshway.site/',
    adminUrl: '/product/tours-and-travels/dashboard',
    imageUrl: '/images/products/tours-and-travels.jpg',
    iconName: 'Plane',
    color: 'cyan',
    status: 'active',
    popularity: 97,
  },
  {
    id: 'ride-flow',
    slug: 'ride-flow',
    name: 'RIDE FLOW',
    category: 'Automotive & Mobility',
    description: 'RideFlow is a modern two-wheeler platform designed to help customers explore bikes, compare models, discover attractive offers, and connect with dealers.',
    longDescription: 'RideFlow Two-Wheeler ERP provides digital bike showroom management, dealership networks, online test ride and bike bookings, customer inquiries, and sales analytics.',
    features: ['Bike Listings', 'Bike Categories', 'Bike Comparison', 'Offers & Deals', 'Dealer Directory', 'Service Support'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind CSS'],
    websiteUrl: 'https://bike.speshway.site/',
    adminUrl: '/product/ride-flow/dashboard',
    imageUrl: '/images/products/ride-flow.jpg',
    iconName: 'Bike',
    color: 'emerald',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'speshway-hospitals',
    slug: 'speshway-hospitals',
    name: 'Speshway Hospitals',
    category: 'Healthcare & Hospitals',
    description: 'HMS Enterprise is a comprehensive Hospital Management System designed to streamline hospital operations, including patient management, appointments, EMR, billing, pharmacy, laboratory reports, inventory, and staff management.',
    longDescription: 'Speshway Hospitals transforms healthcare delivery with end-to-end clinical and administrative automation: inpatient admissions, electronic health records (EHR), dynamic doctor scheduling, diagnostic laboratory testing, pharmacy dispense tracking, and NABH-compliant billing.',
    features: ['Diagnostic Lab Reports & Pathology', 'Patient Admissions & Inpatient Directory', 'OPD / IPD Doctor Scheduling', 'Real-Time Bed & Ward Occupancy', 'Pharmacy & Blood Bank Inventory', 'EHR & Digital Health Records'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'JWT Auth'],
    websiteUrl: 'https://speshway.com/hospitals',
    adminUrl: '/product/speshway-hospitals/dashboard',
    imageUrl: '/images/products/speshway-hospitals.jpg',
    iconName: 'Building2',
    color: 'rose',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'natural-milk-dairy',
    slug: 'natural-milk-dairy',
    name: 'Natural Milk Dairy',
    category: 'Dairy & Agriculture',
    description: 'Natural Milk Dairy is an all-in-one Dairy Management System that simplifies product management, customer orders, subscriptions, inventory, daily deliveries, and payments through a centralized admin dashboard.',
    longDescription: 'Complete dairy operations ERP providing farm-to-door delivery tracking, automated daily subscriptions, real-time inventory for milk and milk byproducts, temperature-controlled warehouse logging, and seamless payments.',
    features: ['Real-Time Orders', 'Role-Based Access', 'Daily Milk Subscriptions', 'Delivery Route Tracking', 'Inventory & Cold Storage', 'Revenue Analytics'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://dairy.speshway.site/',
    adminUrl: '/product/natural-milk-dairy/dashboard',
    imageUrl: '/images/products/natural-milk-dairy.jpg',
    iconName: 'Package',
    color: 'emerald',
    status: 'active',
    popularity: 98,
  },
  {
    id: 'vexa-style-hub',
    slug: 'vexa-style-hub',
    name: 'Vexa Style Hub',
    category: 'Fashion & Apparel',
    description: 'Premier fashion apparel ERP with inventory, size matrix management, omnichannel order processing, POS, and supply chain tracking.',
    longDescription: 'Unified retail and manufacturing ERP for fashion brands: manages SKUs, variants, warehouse stock, vendor procurement, and boutique showroom sales.',
    features: ['Variant & Size Matrix', 'Omnichannel Orders', 'Showroom POS Integration', 'Fabric & Material Supply Chain', 'Seasonal Sales Analytics'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/vexa-style-hub',
    adminUrl: '/product/vexa-style-hub/dashboard',
    imageUrl: '/images/products/vexa-style-hub.png',
    iconName: 'Store',
    color: 'purple',
    status: 'active',
    popularity: 98,
  },
  {
    id: 'aneera-silks',
    slug: 'aneera-silks',
    name: 'Aneera Silks',
    category: 'Fashion & Luxury',
    description: 'Luxury saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections with seamless shopping and order management.',
    longDescription: 'Aneera Silks is a luxury online saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections, with beautiful product galleries, seamless shopping, secure payments, and convenient order management.',
    features: ['Luxury Saree Catalog', 'Silk Mark Certification', 'Real-Time Order Tracking', 'Role-Based Access', 'Bridal Customization', 'Secure Payments'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://aneerasilks.com',
    adminUrl: '/product/aneera-silks/dashboard',
    imageUrl: '/images/products/aneera-silks.jpg',
    iconName: 'Sparkles',
    color: 'rose',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'e-commerce',
    slug: 'e-commerce',
    name: 'Nexora Store',
    category: 'E-Commerce Retail',
    description: 'All-in-one online shopping platform offering multiple product categories, seamless product browsing, wishlist, cart management, secure payments, and convenient order tracking.',
    longDescription: 'Nexora Online Store is an enterprise multi-category retail e-commerce ERP providing centralized catalog synchronization, inventory tracking, coupon marketing, customer loyalty programs, and high-volume order fulfillment.',
    features: ['Multi-Category Catalog', 'Real-Time Order Tracking', 'Role-Based Access', 'Cart & Wishlist Engine', 'Payment Gateway Integration', 'Inventory Stock Alerts'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://nexora.speshway.com',
    adminUrl: '/product/e-commerce/dashboard',
    imageUrl: '/images/products/e-commerce.jpg',
    iconName: 'ShoppingCart',
    color: 'blue',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'saloon',
    slug: 'saloon',
    name: 'SPY Salon Studio',
    category: 'Beauty & Wellness',
    description: 'SPY Salon is a premium beauty and wellness studio offering professional hair styling, beauty treatments, skincare, grooming, and personalized salon services with convenient online appointment booking.',
    longDescription: 'SPY Salon Jubilee Hills Studio ERP provides end-to-end luxury salon appointment scheduling, stylist chair allocation, beauty packages, client loyalty passes, and till billing.',
    features: ['Real-Time Appointments', 'Stylist & Chair Rostering', 'Service & Package Catalog', 'Loyalty & Membership Passes', 'POS & Split Billing', 'Inventory & Salon Consumables'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://spysalon.speshway.com',
    adminUrl: '/product/saloon/dashboard',
    imageUrl: '/images/products/saloon.jpg',
    iconName: 'Scissors',
    color: 'amber',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'fleet-management',
    slug: 'fleet-management',
    name: 'Fleet Management',
    category: 'Logistics & Fleet',
    description: 'A smart Fleet Management System designed to simplify vehicle operations, monitor fleet activities, manage drivers and trips, and improve operational efficiency.',
    longDescription: 'Track fleet performance, organize vehicle records, fuel dispensation audits, and manage transportation operations through one centralized platform.',
    features: ['Real-Time GPS Telematics', 'Driver & Vehicle Rostering', 'Fuel Dispensation Audits', 'Waybill & Route Tracking', 'Preventive Maintenance Logs', 'Geofence Perimeter Security'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    websiteUrl: 'https://fleet.speshway.site/',
    adminUrl: '/product/fleet-management/dashboard',
    imageUrl: '/images/products/fleet-management.jpg',
    iconName: 'Truck',
    color: 'emerald',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'american-fitness-gym',
    slug: 'american-fitness-gym',
    name: 'AMERICAN FITNESS GYM',
    category: 'Fitness & Wellness',
    description: 'American Fitness Gym is a modern fitness platform designed to help fitness enthusiasts achieve their health and fitness goals.',
    longDescription: 'Explore gym services, workout programs, professional trainers, membership plans, and schedules through a user-friendly website.',
    features: ['Biometric Turnstile Check-In', 'PT & Class Scheduling', 'Membership Subscription Tiers', 'Attendance Streak Tracking', 'Supplement Bar POS', 'Revenue Analytics'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    websiteUrl: 'https://speshway.com/',
    adminUrl: '/product/american-fitness-gym/dashboard',
    imageUrl: '/images/products/american-fitness-gym.jpg',
    iconName: 'Dumbbell',
    color: 'emerald',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'flavora-kitchen',
    slug: 'flavora-kitchen',
    name: 'FLAVORA KITCHEN',
    category: 'Restaurant & Kitchen',
    description: 'Flavora Kitchen is an enterprise cloud kitchen and restaurant management system that streamlines live orders, online deliveries, dining table reservations, recipe costings, kitchen display systems (KDS), and inventory through a centralized digital platform.',
    longDescription: 'Full-stack restaurant POS, automated thermal KOT routing, ingredient consumption logs, and multi-aggregator food delivery dispatch.',
    features: ['Live Kitchen Display (KDS)', 'Table Reservation Engine', 'Thermal KOT Printing', 'Menu & Recipe Costing', 'Digital POS Settlements', 'Customer Loyalty & Reviews'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    websiteUrl: 'https://restaurant.speshway.site/',
    adminUrl: '/product/flavora-kitchen/dashboard',
    imageUrl: '/images/products/flavora-kitchen.jpg',
    iconName: 'Utensils',
    color: 'emerald',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'speshway-hrms',
    slug: 'speshway-hrms',
    name: 'SPESHWAY-HRMS',
    category: 'Human Resources',
    description: 'Speshway HRMS is an all-in-one Human Resource Management System designed to simplify workforce management and automate daily HR operations.',
    longDescription: 'Manage employees, attendance, leave requests, payroll, recruitment, and performance through a centralized platform.',
    features: ['Biometric Shift Punch Logs', 'Leave & Attendance Engine', 'Automated Payroll & Tax Slips', 'Applicant Tracking (ATS)', 'Employee Self-Service (ESS)', 'Performance Appraisals'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    websiteUrl: 'https://speshwayhrms.com/',
    adminUrl: '/product/speshway-hrms/dashboard',
    imageUrl: '/images/products/speshway-hrms.jpg',
    iconName: 'Layers',
    color: 'emerald',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'joy-events',
    slug: 'joy-events',
    name: "JOY_EVENT'S",
    category: 'Event Management',
    description: 'Joy Events is a modern event management platform designed to simplify event planning, bookings, and vendor coordination.',
    longDescription: 'From weddings and birthday parties to corporate events and celebrations, manage event requirements through one centralized platform.',
    features: ['Event Bookings & Scheduling', 'Multi-Category Packages', 'Vendor & Caterer Coordination', 'Real-Time Revenue Analytics', 'Automated Invoices & Payments', 'Role-Based Staff Access'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    websiteUrl: 'https://joyevents.speshway.site/',
    adminUrl: '/product/joy-events/dashboard',
    imageUrl: '/images/products/joy-events.jpg',
    iconName: 'Calendar',
    color: 'emerald',
    status: 'active',
    popularity: 99,
  },
];

/**
 * Canonical industry category mapping for each ERP project.
 * Ensures each project has its distinct, specialized category.
 */
export const PROJECT_CATEGORY_MAP = {
  'savitri-sarees': 'Fashion & Luxury',
  'sana-stayz': 'Hospitality & Hotels',
  'hotel-erp': 'Hospitality & Hotels',
  'learnhub': 'Education & LMS',
  'school-erp': 'Education & Academics',
  'foodway': 'Food Delivery & Kitchen',
  'flavora-kitchen': 'Restaurant & Dining',
  'tours-and-travels': 'Bus & Travel Booking',
  'ride-flow': 'Automotive & Mobility',
  'speshway-hospitals': 'Healthcare & Hospitals',
  'natural-milk-dairy': 'Dairy & Agriculture',
  'vexa-style-hub': 'Fashion & Apparel',
  'aneera-silks': 'Fashion & Luxury',
  'e-commerce': 'E-Commerce Retail',
  'saloon': 'Beauty & Wellness',
  'fleet-management': 'Logistics & Fleet',
  'american-fitness-gym': 'Fitness & Wellness',
  'joy-events': 'Event Management',
  'speshway-hrms': 'Human Resources',
  'service-center': 'Automotive & Services',
  'real-estate': 'Real Estate & Housing',
};

/**
 * Filter projects to strictly include ONLY the projects managed in the Admin Dashboard.
 */
export const filterAdminProjects = (products) => {
  const source = Array.isArray(products) && products.length > 0 ? products : DEFAULT_ADMIN_PROJECTS;

  const valid = source.filter((p) => {
    if (!p || typeof p !== 'object') return false;
    const slug = String(p.slug || p.id || '').toLowerCase().trim();
    const name = String(p.name || '').toLowerCase().trim();
    if (!slug && !name) return false;
    if (EXCLUDED_SLUGS.has(slug)) return false;
    if (EXCLUDED_NAMES.has(name)) return false;
    return true;
  });

  const list = valid.length > 0 ? valid : DEFAULT_ADMIN_PROJECTS;

  // Preserve canonical display order matching reference catalog layout
  const orderMap = new Map();
  DEFAULT_ADMIN_PROJECTS.forEach((item, index) => {
    orderMap.set(String(item.slug || '').toLowerCase(), index);
    orderMap.set(String(item.id || '').toLowerCase(), index);
  });

  const sorted = [...list].sort((a, b) => {
    const aSlug = String(a.slug || a.id || '').toLowerCase();
    const bSlug = String(b.slug || b.id || '').toLowerCase();
    const aIdx = orderMap.has(aSlug) ? orderMap.get(aSlug) : 999;
    const bIdx = orderMap.has(bSlug) ? orderMap.get(bSlug) : 999;
    return aIdx - bIdx;
  });

  return sorted.map(normalizeProductCategory);
};

/**
 * Maps a project to its in-site dashboard route (opens in the same site, not external).
 */
export const getDashboardRoute = (prod) => {
  if (prod.adminUrl && prod.adminUrl !== '/admin/products' && prod.adminUrl.startsWith('/')) {
    return prod.adminUrl;
  }
  const slug = (prod.slug || prod.id || '').toLowerCase().trim();
  return `/product/${slug}/dashboard`;
};

/**
 * Resolves the Lucide icon component for an admin project.
 */
export const getProjectIcon = (prod) => {
  if (prod.iconName && iconMap[prod.iconName]) {
    return iconMap[prod.iconName];
  }
  const slug = (prod.slug || prod.id || '').toLowerCase();
  const cat = (prod.category || '').toLowerCase();
  if (slug.includes('saree') || slug.includes('silk') || slug.includes('aneera')) return Sparkles;
  if (slug.includes('hotel') || slug.includes('stayz')) return Bed;
  if (slug.includes('learn') || slug.includes('lms') || cat.includes('education')) return GraduationCap;
  if (slug.includes('food') || slug.includes('kitchen')) return Utensils;
  if (slug.includes('ride') || slug.includes('bike')) return Bike;
  if (slug.includes('joy') || slug.includes('event')) return Calendar;
  if (slug.includes('gym') || slug.includes('fitness')) return Dumbbell;
  if (slug.includes('fleet') || slug.includes('truck')) return Truck;
  if (slug.includes('hospital') || cat.includes('health')) return Building2;
  if (slug.includes('travel') || slug.includes('tour') || cat.includes('travel')) return Plane;
  if (slug.includes('dairy') || slug.includes('milk')) return Package;
  if (slug.includes('vexa') || cat.includes('fashion')) return Store;
  if (slug.includes('e-com') || slug.includes('store')) return ShoppingCart;
  if (slug.includes('salon') || slug.includes('saloon')) return Scissors;
  if (slug.includes('service')) return Wrench;
  if (slug.includes('hrms')) return Layers;
  return Layers;
};

/**
 * Resolves the theme color name for an admin project.
 */
export const getProjectColor = (prod) => {
  const c = (prod.color || '').toLowerCase();
  if (['blue', 'rose', 'green', 'purple', 'amber', 'cyan', 'indigo', 'emerald', 'teal', 'orange'].includes(c)) {
    return c;
  }
  return 'emerald';
};

/**
 * Resolves the clean, accurate industry category for an admin project.
 * Corrects legacy default labels like generic 'Human Resources' or 'Operations' on non-HR products.
 */
export const getProjectCategory = (prod) => {
  if (!prod) return 'Enterprise ERP';
  const slug = String(prod.slug || prod.id || '').toLowerCase().trim();
  const name = String(prod.name || '').toLowerCase().trim();

  // 1. Exact match in canonical industry category map
  if (PROJECT_CATEGORY_MAP[slug]) return PROJECT_CATEGORY_MAP[slug];
  if (prod.id && PROJECT_CATEGORY_MAP[String(prod.id).toLowerCase()]) {
    return PROJECT_CATEGORY_MAP[String(prod.id).toLowerCase()];
  }

  // 2. Exact keyword matching for recognized projects
  if (slug.includes('saree') || slug.includes('silk') || slug.includes('savitri') || name.includes('saree') || name.includes('silk')) return 'Fashion & Luxury';
  if (slug.includes('hotel') || slug.includes('stayz') || slug.includes('sana') || name.includes('stayz') || name.includes('hotel')) return 'Hospitality & Hotels';
  if (slug.includes('learn') || slug.includes('lms') || name.includes('learnhub') || name.includes('lms')) return 'Education & LMS';
  if (slug.includes('school') || name.includes('school')) return 'Education & Academics';
  if (slug.includes('flavora') || name.includes('flavora')) return 'Restaurant & Dining';
  if (slug.includes('kitchen') || slug.includes('food') || name.includes('foodway') || name.includes('kitchen')) return 'Food Delivery & Kitchen';
  if (slug.includes('bus') || slug.includes('tour') || slug.includes('travel') || name.includes('travel') || name.includes('tour')) return 'Bus & Travel Booking';
  if (slug.includes('bike') || slug.includes('ride') || name.includes('ride flow') || name.includes('bike')) return 'Automotive & Mobility';
  if (slug.includes('hospital') || slug.includes('clinic') || name.includes('hospital') || name.includes('clinic')) return 'Healthcare & Hospitals';
  if (slug.includes('dairy') || slug.includes('milk') || name.includes('dairy') || name.includes('milk')) return 'Dairy & Agriculture';
  if (slug.includes('vexa') || slug.includes('apparel') || name.includes('vexa')) return 'Fashion & Apparel';
  if (slug.includes('aneera') || name.includes('aneera')) return 'Fashion & Luxury';
  if (slug.includes('e-com') || slug.includes('nexora') || slug.includes('store') || name.includes('nexora') || name.includes('commerce')) return 'E-Commerce Retail';
  if (slug.includes('salon') || slug.includes('saloon') || slug.includes('spy') || name.includes('salon') || name.includes('saloon')) return 'Beauty & Wellness';
  if (slug.includes('fleet') || slug.includes('truck') || name.includes('fleet')) return 'Logistics & Fleet';
  if (slug.includes('gym') || slug.includes('fitness') || name.includes('american fitness') || name.includes('gym')) return 'Fitness & Wellness';
  if (slug.includes('event') || slug.includes('joy') || name.includes('joy event')) return 'Event Management';
  if (slug.includes('service') || name.includes('service center')) return 'Automotive & Services';
  if (slug.includes('estate') || slug.includes('real') || name.includes('real estate')) return 'Real Estate & Housing';
  if (slug.includes('hrms') || name.includes('hrms') || name.includes('human resources')) return 'Human Resources';

  // 3. Fallback to existing product category only if it is NOT a generic placeholder
  const cat = String(prod.category || '').trim();
  const genericDefaults = ['human resources', 'business operations', 'operations', 'productivity', 'business intelligence', 'general erp', 'enterprise erp'];
  if (cat && !genericDefaults.includes(cat.toLowerCase())) {
    return cat;
  }

  return 'Enterprise ERP';
};

/**
 * Ensures an ERP product object carries its verified industry category.
 */
export const normalizeProductCategory = (prod) => {
  if (!prod || typeof prod !== 'object') return prod;
  return {
    ...prod,
    category: getProjectCategory(prod),
  };
};

/**
 * 5 High-Level Enterprise ERP Category Groups for Clean Single-Line Filter Tabs
 */
export const PRIMARY_ERP_CATEGORIES = [
  'All',
  'Human Resources',
  'Retail & E-Commerce',
  'Hospitality & Services',
  'Logistics & Mobility',
  'Healthcare & Wellness',
];

/**
 * Maps any detailed project/industry to one of the 5 primary umbrella categories.
 */
export const getPrimaryCategory = (prod) => {
  if (!prod) return 'Retail & E-Commerce';
  const rawCat = (prod.category || '').toLowerCase();
  const name = (prod.name || '').toLowerCase();
  const slug = (prod.slug || prod.id || '').toLowerCase();

  // 1. Human Resources (all workforce, HRMS, learning, training, education related)
  if (
    rawCat.includes('human') ||
    rawCat.includes('hrms') ||
    rawCat.includes('education') ||
    rawCat.includes('lms') ||
    slug.includes('hrms') ||
    slug.includes('learn') ||
    name.includes('hrms') ||
    name.includes('human') ||
    name.includes('learn')
  ) {
    return 'Human Resources';
  }

  // 2. Retail & E-Commerce (fashion, sarees, silks, dairy, retail, shopping, commerce)
  if (
    rawCat.includes('retail') ||
    rawCat.includes('commerce') ||
    rawCat.includes('fashion') ||
    rawCat.includes('luxury') ||
    rawCat.includes('apparel') ||
    rawCat.includes('dairy') ||
    rawCat.includes('agriculture') ||
    slug.includes('saree') ||
    slug.includes('silk') ||
    slug.includes('nexora') ||
    slug.includes('dairy') ||
    slug.includes('vexa') ||
    name.includes('savitri') ||
    name.includes('aneera') ||
    name.includes('nexora') ||
    name.includes('dairy') ||
    name.includes('vexa')
  ) {
    return 'Retail & E-Commerce';
  }

  // 3. Hospitality & Services (hotels, dining, food delivery, travel, events)
  if (
    rawCat.includes('hospitality') ||
    rawCat.includes('hotel') ||
    rawCat.includes('food') ||
    rawCat.includes('dining') ||
    rawCat.includes('restaurant') ||
    rawCat.includes('kitchen') ||
    rawCat.includes('travel') ||
    rawCat.includes('booking') ||
    rawCat.includes('event') ||
    slug.includes('stay') ||
    slug.includes('hotel') ||
    slug.includes('food') ||
    slug.includes('kitchen') ||
    slug.includes('travel') ||
    slug.includes('tour') ||
    slug.includes('event') ||
    name.includes('sana') ||
    name.includes('foodway') ||
    name.includes('flavora') ||
    name.includes('travel') ||
    name.includes('tour') ||
    name.includes('joy')
  ) {
    return 'Hospitality & Services';
  }

  // 4. Logistics & Mobility (fleet, bikes, automotive, transport)
  if (
    rawCat.includes('logistics') ||
    rawCat.includes('fleet') ||
    rawCat.includes('automotive') ||
    rawCat.includes('mobility') ||
    slug.includes('fleet') ||
    slug.includes('bike') ||
    slug.includes('ride') ||
    name.includes('fleet') ||
    name.includes('ride')
  ) {
    return 'Logistics & Mobility';
  }

  // 5. Healthcare & Wellness (hospitals, gym, fitness, salon, beauty)
  if (
    rawCat.includes('health') ||
    rawCat.includes('hospital') ||
    rawCat.includes('wellness') ||
    rawCat.includes('fitness') ||
    rawCat.includes('gym') ||
    rawCat.includes('beauty') ||
    rawCat.includes('salon') ||
    slug.includes('hospital') ||
    slug.includes('care') ||
    slug.includes('gym') ||
    slug.includes('fitness') ||
    slug.includes('salon') ||
    name.includes('hospital') ||
    name.includes('fitness') ||
    name.includes('gym') ||
    name.includes('salon')
  ) {
    return 'Healthcare & Wellness';
  }

  return 'Retail & E-Commerce';
};


/**
 * Resolves the public website URL for an ERP product so visitors can open its live website.
 */
export const getWebsiteUrl = (prod) => {
  if (!prod) return 'https://speshway.com';

  // 1. Direct websiteUrl / liveUrl / landingUrl / url property
  const directUrl = prod.websiteUrl || prod.liveUrl || prod.landingUrl || prod.url;
  if (directUrl && typeof directUrl === 'string' && directUrl.trim()) {
    const trimmed = directUrl.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith('/')) return trimmed;
    return `https://${trimmed}`;
  }

  // 2. Smart fallbacks based on slug, id, or name
  const slug = (prod.slug || prod.id || '').toLowerCase();
  const name = (prod.name || '').toLowerCase();

  if (slug.includes('bike') || slug.includes('ride') || name.includes('ride flow')) return 'https://bike.speshway.site/';
  if (slug.includes('joy') || slug.includes('event') || name.includes('joy')) return 'https://joyevents.speshway.site';
  if (slug.includes('food') || name.includes('foodway')) return 'https://foodway.speshway.site';
  if (slug.includes('hrms') || name.includes('hrms')) return 'https://hrms.speshway.com';
  if (slug.includes('flavora') || slug.includes('kitchen') || name.includes('flavora')) return 'https://flavorakitchen.speshway.com';
  if (slug.includes('gym') || slug.includes('fitness') || name.includes('fitness') || name.includes('american')) return 'https://americanfitness.speshway.com';
  if (slug.includes('fleet') || name.includes('fleet')) return 'https://fleet.speshway.com';
  if (slug.includes('hospital') || name.includes('hospital')) return 'https://speshway.com/hospitals';
  if (slug.includes('travel') || slug.includes('tour') || name.includes('travel')) return 'https://speshway.com/tours-and-travels';
  if (slug.includes('dairy') || slug.includes('milk') || name.includes('dairy')) return 'https://speshway.com/natural-milk-dairy';
  if (slug.includes('vexa') || slug.includes('style') || name.includes('vexa')) return 'https://speshway.com/vexa-style-hub';
  if (slug.includes('aneera') || slug.includes('silk') || name.includes('aneera')) return 'https://aneerasilks.com';
  if (slug.includes('salon') || slug.includes('saloon') || slug.includes('spy') || name.includes('salon')) return 'https://spysalon.speshway.com';
  if (slug.includes('nexora') || slug.includes('commerce') || name.includes('nexora')) return 'https://nexora.speshway.com';
  if (slug.includes('service') || name.includes('service')) return 'https://speshway.com/service-center';
  if (slug.includes('estate') || slug.includes('real') || name.includes('real estate')) return 'https://speshway.com/real-estate';
  if (slug.includes('school') || name.includes('school')) return 'https://speshway.com/school-erp';
  if (slug.includes('hotel') || name.includes('hotel')) return 'https://speshway.com/hotel-erp';

  return `https://speshway.com/${slug}`;
};

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
]);

// Full default enterprise ERP projects managed in the Admin Dashboard
export const DEFAULT_ADMIN_PROJECTS = [
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
    adminUrl: '/dashboard/speshway-hospitals',
    iconName: 'Building2',
    color: 'rose',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'tours-and-travels',
    slug: 'tours-and-travels',
    name: 'Tours & Travels ERP',
    category: 'Tours & Travels',
    description: 'Comprehensive travel agency software for booking itineraries, ticketing, holiday packages, lead management, accounts, and supplier vouchers.',
    longDescription: 'End-to-end ERP for travel agencies and tour operators: itinerary planning, flight and hotel vouchers, customer lead pipeline, and automated accounts.',
    features: ['Lead & CRM Management', 'Holiday Package Itinerary Builder', 'Hotel & Flight Booking Registry', 'Supplier & Vendor Accounts', 'Receivables & Invoice Generator'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/tours-and-travels',
    adminUrl: '/dashboard/tours-and-travels',
    iconName: 'Plane',
    color: 'cyan',
    status: 'active',
    popularity: 97,
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
    websiteUrl: 'https://speshway.com/natural-milk-dairy',
    adminUrl: '/dashboard/natural-milk-dairy',
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
    adminUrl: '/dashboard/vexa-style-hub',
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
    adminUrl: '/dashboard/aneera-silks',
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
    adminUrl: '/dashboard/e-commerce',
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
    adminUrl: '/dashboard/saloon',
    iconName: 'Scissors',
    color: 'amber',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'service-center',
    slug: 'service-center',
    name: 'Service Center ERP',
    category: 'Operations',
    description: 'Dedicated appliance and electronics repair management suite covering service tickets, technician dispatches, warranty tracking, spare parts inventory, and invoicing.',
    longDescription: 'End-to-end Service Center operations suite featuring live technician dispatching, customer job card generation, spare parts stock control, and SLA monitoring.',
    features: ['Job Card & Ticket Registry', 'Technician Dispatch Board', 'Spare Parts Inventory', 'Warranty & AMC Tracking', 'Customer Invoice Generator'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/service-center',
    adminUrl: '/dashboard/service-center',
    iconName: 'Wrench',
    color: 'emerald',
    status: 'active',
    popularity: 96,
  },
  {
    id: 'real-estate',
    slug: 'real-estate',
    name: 'Real Estate ERP',
    category: 'Operations',
    description: 'Unified property management and construction ERP for real estate developers, leasing agencies, tenant accounts, unit inventories, and payment milestones.',
    longDescription: 'Complete real estate development and asset management ERP: project phase monitoring, unit availability matrix, lead CRM, and automated tenant billing.',
    features: ['Property & Unit Matrix', 'Tenant Leasing & Contracts', 'Payment Milestone Tracker', 'Maintenance Work Orders', 'Commission & Brokerage Logs'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/real-estate',
    adminUrl: '/dashboard/real-estate',
    iconName: 'Home',
    color: 'green',
    status: 'active',
    popularity: 95,
  },
  {
    id: 'school-erp',
    slug: 'school-erp',
    name: 'School ERP',
    category: 'Productivity',
    description: 'Modern campus and school management ERP for student enrollments, attendance, timetables, examinations, fee collection, and parent-teacher communication.',
    longDescription: 'Cloud-first education management ERP providing student information systems (SIS), dynamic timetable generation, grade books, automated fee invoices, and campus alerts.',
    features: ['Student Admissions & SIS', 'Biometric Attendance Logging', 'Fee Schedules & Online Payments', 'Exam Gradebook & Report Cards', 'Parent Portal Notifications'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/school-erp',
    adminUrl: '/dashboard/school-erp',
    iconName: 'GraduationCap',
    color: 'blue',
    status: 'active',
    popularity: 94,
  },
  {
    id: 'hotel-erp',
    slug: 'hotel-erp',
    name: 'Hotel ERP',
    category: 'Operations',
    description: 'Hospitality and resort property management system (PMS) covering room reservations, front desk check-in/out, housekeeping, restaurant POS, and banquet bookings.',
    longDescription: 'Comprehensive hotel management ERP: real-time room occupancy grid, guest check-in automation, housekeeping status, restaurant POS integration, and night audit reporting.',
    features: ['Front Desk Check-in / Check-out', 'Room Reservation Grid', 'Housekeeping Roster', 'Restaurant & Room Service POS', 'Billing & Folio Management'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/hotel-erp',
    adminUrl: '/dashboard/hotel-erp',
    iconName: 'Building2',
    color: 'amber',
    status: 'active',
    popularity: 95,
  },
];

/**
 * Filter projects to strictly include ONLY the projects managed in the Admin Dashboard.
 */
export const filterAdminProjects = (products) => {
  if (!Array.isArray(products) || products.length === 0) {
    return DEFAULT_ADMIN_PROJECTS;
  }
  const filtered = products.filter((p) => {
    const slug = (p.slug || p.id || '').toLowerCase();
    const name = (p.name || '').toLowerCase().trim();
    return !EXCLUDED_SLUGS.has(slug) && !EXCLUDED_NAMES.has(name);
  });
  return filtered.length > 0 ? filtered : DEFAULT_ADMIN_PROJECTS;
};

/**
 * Maps a project to its in-site dashboard route (opens in the same site, not external).
 */
export const getDashboardRoute = (prod) => {
  if (prod.adminUrl && prod.adminUrl !== '/admin/products' && prod.adminUrl.startsWith('/')) {
    return prod.adminUrl;
  }
  const slug = (prod.slug || prod.id || '').toLowerCase();
  if (slug.includes('hospital')) return '/dashboard/speshway-hospitals';
  if (slug.includes('travel') || slug.includes('tour')) return '/dashboard/tours-and-travels';
  if (slug.includes('dairy') || slug.includes('milk')) return '/dashboard/natural-milk-dairy';
  if (slug.includes('vexa') || slug.includes('style') || slug.includes('fashion') || slug.includes('apparel')) {
    return '/dashboard/vexa-style-hub';
  }
  if (slug.includes('aneera') || slug.includes('silk')) return '/dashboard/aneera-silks';
  if (slug.includes('e-com') || slug.includes('nexora') || slug.includes('store')) return '/dashboard/e-commerce';
  if (slug.includes('salon') || slug.includes('saloon')) return '/dashboard/saloon';
  if (slug.includes('service')) return '/dashboard/service-center';
  if (slug.includes('estate') || slug.includes('real')) return '/dashboard/real-estate';
  if (slug.includes('school')) return '/dashboard/school-erp';
  if (slug.includes('hotel') || slug.includes('resort')) return '/dashboard/hotel-erp';
  return `/dashboard/${slug}`;
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
  if (slug.includes('hospital') || cat.includes('health') || cat.includes('hospital')) return Building2;
  if (slug.includes('travel') || slug.includes('tour') || cat.includes('travel')) return Plane;
  if (slug.includes('dairy') || slug.includes('milk') || cat.includes('dairy')) return Package;
  if (slug.includes('vexa') || cat.includes('fashion') || cat.includes('apparel')) return Store;
  if (slug.includes('aneera') || slug.includes('silk')) return Sparkles;
  if (slug.includes('e-com') || slug.includes('nexora') || cat.includes('commerce')) return ShoppingCart;
  if (slug.includes('salon') || slug.includes('saloon') || cat.includes('beauty')) return Scissors;
  if (slug.includes('service') || cat.includes('repair')) return Wrench;
  if (slug.includes('estate') || cat.includes('property')) return Home;
  if (slug.includes('school') || cat.includes('education')) return GraduationCap;
  if (slug.includes('hotel') || cat.includes('hospitality')) return Building2;
  return Layers;
};

/**
 * Resolves the theme color name for an admin project.
 */
export const getProjectColor = (prod) => {
  const c = (prod.color || '').toLowerCase();
  if (['blue', 'rose', 'green', 'purple', 'amber', 'cyan', 'indigo', 'emerald', 'teal'].includes(c)) {
    return c;
  }
  const slug = (prod.slug || prod.id || '').toLowerCase();
  if (slug.includes('hospital')) return 'rose';
  if (slug.includes('travel')) return 'cyan';
  if (slug.includes('dairy')) return 'emerald';
  if (slug.includes('vexa')) return 'purple';
  if (slug.includes('aneera')) return 'rose';
  if (slug.includes('e-com')) return 'blue';
  if (slug.includes('salon')) return 'amber';
  if (slug.includes('service')) return 'emerald';
  if (slug.includes('estate')) return 'green';
  if (slug.includes('school')) return 'blue';
  if (slug.includes('hotel')) return 'amber';
  return 'emerald';
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

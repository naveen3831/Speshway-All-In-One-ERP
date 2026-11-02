export const initialProducts = [
  {
    id: 'speshway-hospitals',
    name: 'Speshway Hospitals',
    slug: 'speshway-hospitals',
    category: 'Healthcare & Hospitals',
    description: 'HMS Enterprise is a comprehensive Hospital Management System designed to streamline hospital operations, including patient management, appointments, EMR, billing, pharmacy, laboratory reports, inventory, and staff management — all through one centralized digital platform.',
    longDescription: 'Speshway Hospitals transforms healthcare delivery with end-to-end clinical and administrative automation: inpatient admissions, electronic health records (EHR), dynamic doctor scheduling, diagnostic laboratory testing, pharmacy dispense tracking, and NABH-compliant billing.',
    features: ['Diagnostic Lab Reports & Pathology', 'Patient Admissions & Inpatient Directory', 'OPD / IPD Doctor Scheduling', 'Real-Time Bed & Ward Occupancy', 'Pharmacy & Blood Bank Inventory', 'EHR & Digital Health Records'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'JWT Auth', 'REST API'],
    websiteUrl: 'https://speshway.com/hospitals',
    adminUrl: '/product/speshway-hospitals/dashboard',
    imageUrl: '',
    iconName: 'Building2',
    color: 'green',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'tours-and-travels',
    name: 'Tours & Travels ERP',
    slug: 'tours-and-travels',
    category: 'Tours & Travels',
    description: 'Comprehensive travel agency software for booking itineraries, ticketing, holiday packages, lead management, accounts, and supplier vouchers.',
    longDescription: 'End-to-end ERP for travel agencies and tour operators: itinerary planning, flight and hotel vouchers, customer lead pipeline, and automated accounts.',
    features: ['Lead & CRM Management', 'Holiday Package Itinerary Builder', 'Hotel & Flight Booking Registry', 'Supplier & Vendor Accounts', 'Receivables & Invoice Generator'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/tours-and-travels',
    adminUrl: '/product/tours-and-travels/dashboard',
    imageUrl: '',
    iconName: 'Plane',
    color: 'cyan',
    status: 'active',
    popularity: 97,
  },
  {
    id: 'natural-milk-dairy',
    name: 'Natural Milk Dairy',
    slug: 'natural-milk-dairy',
    category: 'Dairy & Agriculture',
    description: 'Natural Milk Dairy is an all-in-one Dairy Management System that simplifies product management, customer orders, subscriptions, inventory, daily deliveries, and payments through a centralized admin dashboard.',
    longDescription: 'Complete dairy operations ERP providing farm-to-door delivery tracking, automated daily subscriptions, real-time inventory for milk and milk byproducts, temperature-controlled warehouse logging, and seamless payments.',
    features: ['Real-Time Orders', 'Role-Based Access', 'Daily Milk Subscriptions', 'Delivery Route Tracking', 'Inventory & Cold Storage', 'Revenue Analytics'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/natural-milk-dairy',
    adminUrl: '/product/natural-milk-dairy/dashboard',
    imageUrl: '',
    iconName: 'Package',
    color: 'emerald',
    status: 'active',
    popularity: 98,
  },
  {
    id: 'vexa-style-hub',
    name: 'Vexa Style Hub',
    slug: 'vexa-style-hub',
    category: 'Fashion & Apparel',
    description: 'Premier fashion apparel ERP with inventory, size matrix management, omnichannel order processing, POS, and supply chain tracking.',
    longDescription: 'Unified retail and manufacturing ERP for fashion brands: manages SKUs, variants, warehouse stock, vendor procurement, and boutique showroom sales.',
    features: ['Variant & Size Matrix', 'Omnichannel Orders', 'Showroom POS Integration', 'Fabric & Material Supply Chain', 'Seasonal Sales Analytics'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://speshway.com/vexa-style-hub',
    adminUrl: '/product/vexa-style-hub/dashboard',
    imageUrl: '',
    iconName: 'Store',
    color: 'purple',
    status: 'active',
    popularity: 98,
  },
  {
    id: 'aneera-silks',
    name: 'Aneera Silks',
    slug: 'aneera-silks',
    category: 'Fashion & Luxury',
    description: 'Aneera Silks is a luxury online saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections, with beautiful product galleries, seamless shopping, secure payments, and convenient order management',
    longDescription: 'Aneera Silks is a luxury online saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections, with beautiful product galleries, seamless shopping, secure payments, and convenient order management',
    features: ['Luxury Saree Catalog', 'Silk Mark Certification', 'Real-Time Order Tracking', 'Role-Based Access', 'Bridal Customization', 'Secure Payments'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
    websiteUrl: 'https://aneerasilks.com',
    adminUrl: '/product/aneera-silks/dashboard',
    imageUrl: '',
    iconName: 'Sparkles',
    color: 'rose',
    status: 'active',
    popularity: 99,
  },
  {
    id: 'e-commerce',
    name: 'E commerce',
    slug: 'e-commerce',
    category: 'Human Resources',
    description: 'Speshway Ecom is an all-in-one online shopping platform offering multiple product categories, seamless product browsing, wishlist, cart management, secure payments, and convenient order tracking.',
    longDescription: 'Nexora Online Store is an enterprise multi-category retail e-commerce ERP providing centralized catalog synchronization, inventory tracking, coupon marketing, customer loyalty programs, and high-volume order fulfillment.',
    features: ['Multi-Category Catalog', 'Real-Time Order Tracking', 'Role-Based Access', 'Cart & Wishlist Engine', 'Payment Gateway Integration', 'Inventory Stock Alerts'],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
    websiteUrl: 'https://nexora.speshway.com',
    adminUrl: '/product/e-commerce/dashboard',
    imageUrl: '',
    iconName: 'ShoppingCart',
    color: 'red',
    status: 'active',
    popularity: 99,
  },
];

let productsMemory = [...initialProducts];

export const getProducts = () => productsMemory;

export const getProductById = (id) =>
  productsMemory.find((p) => p.id === id || p.slug === id);

export const addProduct = (productData) => {
  const newProduct = {
    id: productData.slug || `prod-${Date.now()}`,
    slug: productData.slug || `prod-${Date.now()}`,
    status: 'active',
    popularity: 90,
    technologies: Array.isArray(productData.technologies)
      ? productData.technologies
      : ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    features: Array.isArray(productData.features) ? productData.features : [],
    ...productData,
  };
  productsMemory.unshift(newProduct);
  return newProduct;
};

export const updateProduct = (id, updates) => {
  const index = productsMemory.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return null;
  productsMemory[index] = {
    ...productsMemory[index],
    ...updates,
    technologies: Array.isArray(updates.technologies)
      ? updates.technologies
      : productsMemory[index].technologies || ['React', 'Node.js', 'Express', 'MongoDB'],
    features: Array.isArray(updates.features)
      ? updates.features
      : productsMemory[index].features || [],
  };
  return productsMemory[index];
};

export const deleteProduct = (id) => {
  const index = productsMemory.findIndex((p) => p.id === id || p.slug === id);
  if (index === -1) return false;
  productsMemory.splice(index, 1);
  return true;
};

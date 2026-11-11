import HomeContent from '../models/HomeContent.js';

export const DEFAULT_HOME_CONTENT = {
  key: 'main_home',
  hero: {
    badge: '— OUR ERP SOLUTIONS —',
    titleDark: 'SPESHWAY',
    titleGreen: 'ALL IN ONE ERP',
    subtitle: 'A collection of industry-ready ERP solutions to manage your business, operations, and customers — all in one place.',
    primaryBtnText: 'View All ERPs',
    primaryBtnLink: '#solutions',
    secondaryBtnText: 'Request a Demo',
  },
  stats: {
    stat1Number: '524+',
    stat1Label: 'Happy Businesses',
    stat2Number: '17+',
    stat2Label: 'ERP Solutions',
    stat3Number: '99.9%',
    stat3Label: 'Uptime & Security',
    stat4Number: '24/7',
    stat4Label: 'Customer Support',
  },
  solutions: {
    title: 'Our ERP Solutions',
  },
  navbar: {
    showPricing: false,
    showProducts: false,
  },
  branding: {
    logoUrl: '/logo.png',
    brandTitle: 'SPESHWAY',
    brandSubtitle: 'ALL IN ONE ERP',
  },
  socialLinks: {
    facebook: 'https://facebook.com/speshway',
    twitter: 'https://x.com/speshway',
    linkedin: 'https://linkedin.com/company/speshway',
    instagram: 'https://instagram.com/speshway',
    youtube: 'https://youtube.com/@speshway',
  },
  contact: {
    phone: '+1 (800) 555-SPESH',
    phoneRaw: '+18005557737',
    whatsapp: '+18005557737',
    email: 'support@speshway.com',
  },
};

let memoryHomeContent = { ...DEFAULT_HOME_CONTENT };

export const getHomeContent = async () => {
  try {
    const dbContent = await HomeContent.findOne({ key: 'main_home' }).lean();
    if (dbContent) {
      memoryHomeContent = {
        ...DEFAULT_HOME_CONTENT,
        ...dbContent,
        hero: { ...DEFAULT_HOME_CONTENT.hero, ...(dbContent.hero || {}) },
        stats: { ...DEFAULT_HOME_CONTENT.stats, ...(dbContent.stats || {}) },
        solutions: { ...DEFAULT_HOME_CONTENT.solutions, ...(dbContent.solutions || {}) },
        navbar: {
          showPricing: dbContent.navbar?.showPricing !== undefined ? Boolean(dbContent.navbar.showPricing) : true,
          showProducts: dbContent.navbar?.showProducts !== undefined ? Boolean(dbContent.navbar.showProducts) : true,
        },
        branding: { ...DEFAULT_HOME_CONTENT.branding, ...(dbContent.branding || {}) },
        socialLinks: { ...DEFAULT_HOME_CONTENT.socialLinks, ...(dbContent.socialLinks || {}) },
        contact: { ...DEFAULT_HOME_CONTENT.contact, ...(dbContent.contact || {}) },
      };
      return memoryHomeContent;
    }
  } catch (err) {
    console.warn('[HomeStore] MongoDB read fallback to memory store:', err.message);
  }
  return memoryHomeContent;
};

export const updateHomeContent = async (newData) => {
  const updatePayload = { ...newData };
  delete updatePayload._id;
  delete updatePayload.__v;
  delete updatePayload.createdAt;
  delete updatePayload.updatedAt;
  updatePayload.key = 'main_home';

  const mergedNavbar = {
    showPricing: updatePayload.navbar?.showPricing !== undefined
      ? Boolean(updatePayload.navbar.showPricing)
      : (memoryHomeContent.navbar?.showPricing !== undefined ? Boolean(memoryHomeContent.navbar.showPricing) : true),
    showProducts: updatePayload.navbar?.showProducts !== undefined
      ? Boolean(updatePayload.navbar.showProducts)
      : (memoryHomeContent.navbar?.showProducts !== undefined ? Boolean(memoryHomeContent.navbar.showProducts) : true),
  };

  // Merge with memory
  memoryHomeContent = {
    ...memoryHomeContent,
    ...updatePayload,
    hero: { ...memoryHomeContent.hero, ...(updatePayload.hero || {}) },
    stats: { ...memoryHomeContent.stats, ...(updatePayload.stats || {}) },
    solutions: { ...memoryHomeContent.solutions, ...(updatePayload.solutions || {}) },
    navbar: mergedNavbar,
    branding: { ...memoryHomeContent.branding, ...(updatePayload.branding || {}) },
    socialLinks: { ...memoryHomeContent.socialLinks, ...(updatePayload.socialLinks || {}) },
    contact: { ...memoryHomeContent.contact, ...(updatePayload.contact || {}) },
  };

  // Persist to MongoDB
  const sanitized = { ...memoryHomeContent };
  delete sanitized._id;
  delete sanitized.__v;
  delete sanitized.createdAt;
  delete sanitized.updatedAt;

  try {
    const updated = await HomeContent.findOneAndUpdate(
      { key: 'main_home' },
      { $set: sanitized },
      { new: true, upsert: true, setDefaultsOnInsert: true, lean: true }
    );
    return updated || memoryHomeContent;
  } catch (err) {
    console.warn('[HomeStore] MongoDB update fallback to memory:', err.message);
    return memoryHomeContent;
  }
};

export const seedHomeDatabase = async () => {
  try {
    const count = await HomeContent.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding default home page content into MongoDB Atlas...');
      await HomeContent.create(DEFAULT_HOME_CONTENT);
      console.log('✅ Default home content seeded successfully.');
    } else {
      const existing = await HomeContent.findOne({ key: 'main_home' }).lean();
      if (existing) {
        memoryHomeContent = {
          ...DEFAULT_HOME_CONTENT,
          ...existing,
          hero: { ...DEFAULT_HOME_CONTENT.hero, ...(existing.hero || {}) },
          stats: { ...DEFAULT_HOME_CONTENT.stats, ...(existing.stats || {}) },
          solutions: { ...DEFAULT_HOME_CONTENT.solutions, ...(existing.solutions || {}) },
          navbar: { ...DEFAULT_HOME_CONTENT.navbar, ...(existing.navbar || {}) },
          branding: { ...DEFAULT_HOME_CONTENT.branding, ...(existing.branding || {}) },
          contact: { ...DEFAULT_HOME_CONTENT.contact, ...(existing.contact || {}) },
        };
      }
    }
  } catch (err) {
    console.warn('[HomeStore] Could not seed home content into MongoDB Atlas:', err.message);
  }
};

export default {
  DEFAULT_HOME_CONTENT,
  getHomeContent,
  updateHomeContent,
  seedHomeDatabase,
};

import HomeContent from '../models/HomeContent.js';

export const DEFAULT_HOME_CONTENT = {
  key: 'main_home',
  hero: {
    badge: '— OUR ERP SOLUTIONS —',
    titleDark: 'SPESHWAY',
    titleGreen: 'ALL IN ONE ERP',
    subtitle: 'A collection of industry-ready ERP solutions to manage your business, operations, and customers — all in one place.',
    primaryBtnText: 'View All ERPs',
    primaryBtnLink: '/projects',
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
    showPricing: true,
  },
  branding: {
    logoUrl: '/logo.png',
    brandTitle: 'SPESHWAY',
    brandSubtitle: 'ALL IN ONE ERP',
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
        navbar: { ...DEFAULT_HOME_CONTENT.navbar, ...(dbContent.navbar || {}) },
        branding: { ...DEFAULT_HOME_CONTENT.branding, ...(dbContent.branding || {}) },
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

  // Merge with memory
  memoryHomeContent = {
    ...memoryHomeContent,
    ...updatePayload,
    hero: { ...memoryHomeContent.hero, ...(updatePayload.hero || {}) },
    stats: { ...memoryHomeContent.stats, ...(updatePayload.stats || {}) },
    solutions: { ...memoryHomeContent.solutions, ...(updatePayload.solutions || {}) },
    navbar: { ...memoryHomeContent.navbar, ...(updatePayload.navbar || {}) },
    branding: { ...memoryHomeContent.branding, ...(updatePayload.branding || {}) },
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

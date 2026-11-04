import PricingPlan from '../models/PricingPlan.js';

export const DEFAULT_PRICING_PLANS = [
  {
    slug: 'website',
    name: 'Website',
    price: '₹80,000',
    period: '',
    desc: 'Complete responsive Web ERP application accessible on any browser, desktop, or tablet.',
    features: [
      'Full Web ERP Application',
      'Role-Based Admin & Staff Access',
      'Real-Time Cloud Synchronization',
      'Customer Portal & Lead Inquiries',
      'Reports, Analytics & Data Export',
      'Custom Domain & SSL Security',
    ],
    popular: false,
    btnText: 'Get Started with Website',
    order: 1,
  },
  {
    slug: 'mobile-app',
    name: 'Mobile App',
    price: '₹1,00,000',
    period: '',
    desc: 'Dedicated native Android and iOS mobile applications for your team and customers on the go.',
    features: [
      'Native Android & iOS Applications',
      'Push Notifications & Instant Alerts',
      'Offline Synchronization & Caching',
      'Camera QR & Barcode Scanner',
      'Biometric & Fingerprint Login',
      'Google Play & Apple Store Setup',
    ],
    popular: false,
    btnText: 'Get Started with Mobile App',
    order: 2,
  },
  {
    slug: 'website-mobile-app',
    name: 'Website + Mobile App',
    price: '₹1,30,000',
    period: '',
    desc: 'Complete unified omnichannel solution with synchronized Web ERP and Native Mobile Apps.',
    features: [
      'Complete Web ERP + Android & iOS Apps',
      'Seamless Cross-Platform Real-Time Sync',
      'Unified Admin Control Center',
      'Customer Booking & Ordering Suite',
      'Dedicated Cloud Architecture & API',
      '24/7 Priority Support & Maintenance',
    ],
    popular: true,
    btnText: 'Get Complete Suite',
    order: 3,
  },
];

let memoryPricing = [...DEFAULT_PRICING_PLANS];

export const getPricingPlans = async () => {
  try {
    const dbPlans = await PricingPlan.find({}).sort({ order: 1 }).lean();
    if (dbPlans && dbPlans.length > 0) {
      memoryPricing = dbPlans;
      return dbPlans;
    }
  } catch (err) {
    console.warn('[PricingStore] MongoDB read fallback to memory store:', err.message);
  }
  return memoryPricing;
};

export const updatePricingPlan = async (slug, data) => {
  const cleanSlug = String(slug || '').toLowerCase().trim();
  
  // Update memory
  const idx = memoryPricing.findIndex(p => p.slug === cleanSlug);
  if (idx !== -1) {
    memoryPricing[idx] = { ...memoryPricing[idx], ...data };
  } else {
    memoryPricing.push({ slug: cleanSlug, ...data });
  }

  // Update DB
  try {
    const updated = await PricingPlan.findOneAndUpdate(
      { slug: cleanSlug },
      { $set: data },
      { new: true, upsert: true, setDefaultsOnInsert: true, lean: true }
    );
    return updated || memoryPricing[idx];
  } catch (err) {
    console.warn('[PricingStore] MongoDB update fallback to memory:', err.message);
    return memoryPricing[idx];
  }
};

export const updateAllPricingPlans = async (plans) => {
  if (!Array.isArray(plans)) return memoryPricing;

  const results = [];
  for (let i = 0; i < plans.length; i++) {
    const plan = plans[i];
    const slug = plan.slug || `tier-${i + 1}`;
    const cleanPlan = {
      ...plan,
      slug,
      order: typeof plan.order === 'number' ? plan.order : i + 1,
    };
    const res = await updatePricingPlan(slug, cleanPlan);
    results.push(res);
  }
  memoryPricing = results;
  return results;
};

export const seedPricingDatabase = async () => {
  try {
    const count = await PricingPlan.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding default pricing tiers into MongoDB Atlas...');
      await PricingPlan.insertMany(DEFAULT_PRICING_PLANS);
      console.log('✅ Default pricing tiers seeded successfully.');
    } else {
      // Sync memory with DB
      const existing = await PricingPlan.find({}).sort({ order: 1 }).lean();
      if (existing.length > 0) {
        memoryPricing = existing;
      }
    }
  } catch (err) {
    console.warn('[PricingStore] Could not seed pricing into MongoDB Atlas:', err.message);
  }
};

export default {
  DEFAULT_PRICING_PLANS,
  getPricingPlans,
  updatePricingPlan,
  updateAllPricingPlans,
  seedPricingDatabase,
};


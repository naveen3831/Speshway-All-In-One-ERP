import PricingPlan from '../models/PricingPlan.js';

export const DEFAULT_PRICING_PLANS = [
  {
    slug: 'starter',
    name: 'Starter',
    price: '₹2,499',
    period: '/user /month',
    desc: 'Ideal for small businesses and growing teams needing core HR & Project tools.',
    features: [
      'Up to 25 Active Employees',
      'HRMS & Directory Portal',
      'Leave & Attendance Tracking',
      'Task & Project Boards',
      'Standard Email Support',
      'Continuous Cloud Backups',
    ],
    popular: false,
    btnText: 'Start 14-Day Free Trial',
    order: 1,
  },
  {
    slug: 'professional',
    name: 'Professional',
    price: '₹5,999',
    period: '/user /month',
    desc: 'Complete suite for scaling companies that need unified payroll, finance & CRM.',
    features: [
      'Up to 200 Employees',
      'Full Payroll & Tax Automation',
      'Finance, Invoicing & Expenses',
      'Client CRM & Deal Pipelines',
      'Asset Management & Devices',
      'Priority 24/7 Live Support',
    ],
    popular: true,
    btnText: 'Get Started with Pro',
    order: 2,
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored quote',
    desc: 'For large organizations demanding custom SLAs, dedicated infrastructure & audit.',
    features: [
      'Unlimited Employees & Users',
      'Custom ERP Module Development',
      'Dedicated Cloud Instance / VPC',
      '24/7 Dedicated Account Manager',
      'SSO / SAML / Active Directory',
      'Custom Data Retention SLAs',
    ],
    popular: false,
    btnText: 'Contact Enterprise Sales',
    order: 3,
  },
];

let memoryPricing = [...DEFAULT_PRICING_PLANS];

export const getPricingPlans = async () => {
  try {
    const dbPlans = await PricingPlan.find({}).sort({ order: 1 }).lean();
    if (dbPlans && dbPlans.length > 0) {
      const hasOldPlans = dbPlans.some(
        (p) => p.slug === 'website' || p.slug === 'mobile-app' || p.slug === 'website-mobile-app'
      );
      if (hasOldPlans) {
        await seedPricingDatabase();
        return memoryPricing;
      }
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
  
  // Clone data and strip immutable/meta fields
  const updatePayload = { ...data };
  delete updatePayload._id;
  delete updatePayload.__v;
  delete updatePayload.createdAt;
  delete updatePayload.updatedAt;
  updatePayload.slug = cleanSlug;

  // Update memory
  const idx = memoryPricing.findIndex(p => p.slug === cleanSlug);
  if (idx !== -1) {
    memoryPricing[idx] = { ...memoryPricing[idx], ...updatePayload };
  } else {
    memoryPricing.push(updatePayload);
  }

  // Update DB
  try {
    const updated = await PricingPlan.findOneAndUpdate(
      { slug: cleanSlug },
      { $set: updatePayload },
      { new: true, upsert: true, setDefaultsOnInsert: true, lean: true }
    );
    return updated || (idx !== -1 ? memoryPricing[idx] : updatePayload);
  } catch (err) {
    console.warn('[PricingStore] MongoDB update fallback to memory:', err.message);
    return idx !== -1 ? memoryPricing[idx] : updatePayload;
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

export const deletePricingPlan = async (slug) => {
  const cleanSlug = String(slug || '').toLowerCase().trim();
  memoryPricing = memoryPricing.filter((p) => p.slug !== cleanSlug);
  try {
    await PricingPlan.findOneAndDelete({ slug: cleanSlug });
  } catch (err) {
    console.warn('[PricingStore] MongoDB delete error:', err.message);
  }
  return memoryPricing;
};

export const seedPricingDatabase = async () => {
  try {
    const existing = await PricingPlan.find({}).sort({ order: 1 }).lean();
    const hasOldPlans = existing.some(
      (p) => p.slug === 'website' || p.slug === 'mobile-app' || p.slug === 'website-mobile-app'
    );

    if (existing.length === 0 || hasOldPlans) {
      console.log('🌱 Seeding/migrating SaaS pricing tiers (Starter, Professional, Enterprise) into MongoDB Atlas...');
      if (hasOldPlans) {
        await PricingPlan.deleteMany({ slug: { $in: ['website', 'mobile-app', 'website-mobile-app'] } });
      }
      for (const plan of DEFAULT_PRICING_PLANS) {
        await PricingPlan.findOneAndUpdate(
          { slug: plan.slug },
          { $set: plan },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
      }
      const refreshed = await PricingPlan.find({}).sort({ order: 1 }).lean();
      memoryPricing = refreshed;
      console.log('✅ SaaS pricing tiers synchronized in MongoDB Atlas.');
    } else {
      memoryPricing = existing;
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


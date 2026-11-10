import PricingPlan from '../models/PricingPlan.js';

export const DEFAULT_PRICING_PLANS = [
  {
    slug: 'subscriptions-plan',
    name: 'Subscriptions Plan',
    price: '48,000',
    period: 'Yearly Renewal',
    desc: 'Core ERP software subscription with single domain access and customer mobile app.',
    features: [
      'Permitted for Single domain',
      'Android Customer App',
      'Master Admin Panel',
      'Website',
      '3 Months Support',
      '✕ No Source Code Included',
      '✕ Payment Gateway Integration',
    ],
    popular: false,
    btnText: 'Get Started',
    order: 1,
  },
  {
    slug: 'startup-plan',
    name: 'Startup Plan',
    price: '89,000',
    period: 'One-time payment',
    desc: 'Complete turnkey ecosystem with user, seller, and driver multi-app suite.',
    features: [
      'Permitted for Single domain',
      'Android & iOS Apps for Users',
      'Android & iOS Apps for Sellers',
      'Android & iOS Apps for Drivers',
      'Master Admin Panel',
      '6 Months Support',
      'Complete Web Panel',
      'Payment Gateway Integration',
    ],
    popular: true,
    btnText: 'Choose This Plan',
    order: 2,
  },
  {
    slug: 'enterprise-plan',
    name: 'Enterprise Plan',
    price: '160,000',
    period: 'One-time payment',
    desc: 'Multi-domain enterprise deployment with analytics, custom branding, and SLA support.',
    features: [
      'Permitted for Multiple domain',
      'Everything in Startup Plan',
      'Advanced Analytics Dashboard',
      'Multi-language Support',
      '12 Months Support',
      'Custom Branding',
      'Priority Support',
    ],
    popular: false,
    btnText: 'Contact Sales',
    order: 3,
  },
];

let memoryPricing = [...DEFAULT_PRICING_PLANS];

export const getPricingPlans = async () => {
  try {
    const dbPlans = await PricingPlan.find({}).sort({ order: 1 }).lean();
    if (dbPlans && dbPlans.length > 0) {
      const hasOldPlans = dbPlans.some(
        (p) =>
          p.slug === 'website' ||
          p.slug === 'mobile-app' ||
          p.slug === 'website-mobile-app' ||
          p.slug === 'starter' ||
          p.slug === 'professional' ||
          p.slug === 'enterprise'
      );
      if (hasOldPlans) {
        await seedPricingDatabase();
        return memoryPricing;
      }
      memoryPricing = dbPlans;
      return dbPlans;
    }
    await seedPricingDatabase();
    return memoryPricing;
  } catch (err) {
    console.warn('[PricingStore] MongoDB read fallback to memory store:', err.message);
  }
  return memoryPricing;
};
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
      (p) =>
        p.slug === 'website' ||
        p.slug === 'mobile-app' ||
        p.slug === 'website-mobile-app' ||
        p.slug === 'starter' ||
        p.slug === 'professional' ||
        p.slug === 'enterprise'
    );

    if (existing.length === 0 || hasOldPlans) {
      console.log('🌱 Seeding/migrating SaaS pricing tiers (Subscriptions, Startup, Enterprise) into MongoDB Atlas...');
      if (hasOldPlans) {
        await PricingPlan.deleteMany({
          slug: {
            $in: [
              'website',
              'mobile-app',
              'website-mobile-app',
              'starter',
              'professional',
              'enterprise',
            ],
          },
        });
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


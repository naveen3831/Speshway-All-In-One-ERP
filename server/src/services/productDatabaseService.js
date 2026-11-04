import Product from '../models/Product.js';
import { initialProducts } from './productStore.js';

export const seedProductsDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial ERP products directly to MongoDB Atlas database...');
      const cleanedProducts = initialProducts.map((p) => ({
        name: p.name,
        slug: p.slug || p.id,
        category: p.category,
        description: p.description,
        longDescription: p.longDescription || p.description,
        features: p.features || [],
        technologies: p.technologies || ['React', 'Node.js', 'Express', 'MongoDB'],
        websiteUrl: p.websiteUrl || '',
        adminUrl: p.adminUrl || '/admin/products',
        iconName: p.iconName || 'Layers',
        color: p.color || 'green',
        status: p.status || 'active',
        popularity: p.popularity || 90,
        imageUrl: p.imageUrl || "",
      }));

      await Product.insertMany(cleanedProducts);
      console.log(`✅ Successfully seeded ${cleanedProducts.length} products to MongoDB Atlas database!`);
    } else {
      console.log(`📦 MongoDB database connected: ${count} active products stored in database.`);
      const ensureProductDefaults = async (regex, adminUrl, defaultImageUrl) => {
        await Product.updateMany({ slug: { $regex: regex } }, { $set: { adminUrl } });
        // Only set default imageUrl if product does not already have an imageUrl (preserves user uploaded/updated images)
        await Product.updateMany(
          {
            slug: { $regex: regex },
            $or: [{ imageUrl: { $exists: false } }, { imageUrl: '' }, { imageUrl: null }]
          },
          { $set: { imageUrl: defaultImageUrl } }
        );
      };

      await ensureProductDefaults(/hospital/i, '/product/speshway-hospitals/dashboard', '/images/products/speshway-hospitals.jpg');
      await ensureProductDefaults(/travel/i, '/travel-erp/dashboard', '/images/products/tours-and-travels.jpg');
      await ensureProductDefaults(/dairy|milk/i, '/product/natural-milk-dairy/dashboard', '/images/products/natural-milk-dairy.jpg');
      await ensureProductDefaults(/aneera|silk/i, '/product/aneera-silks/dashboard', '/images/products/aneera-silks.jpg');
      await ensureProductDefaults(/e-commerce|ecommerce|nexora/i, '/product/e-commerce/dashboard', '/images/products/e-commerce.jpg');
      await ensureProductDefaults(/saloon|salon|spy-salon/i, '/product/saloon/dashboard', '/images/products/saloon.jpg');
      await ensureProductDefaults(/fleet/i, '/product/fleet-management/dashboard', '/images/products/fleet-management.jpg');
      await ensureProductDefaults(/fitness|gym/i, '/product/american-fitness-gym/dashboard', '/images/products/american-fitness-gym.jpg');
      await ensureProductDefaults(/flavora|kitchen/i, '/product/flavora-kitchen/dashboard', '/images/products/flavora-kitchen.jpg');
      await ensureProductDefaults(/joy|eventoza/i, '/product/joy-events/dashboard', '/images/products/joy-events.jpg');
      await ensureProductDefaults(/speshway-hrms|hrms/i, '/product/speshway-hrms/dashboard', '/images/products/speshway-hrms.jpg');
      await ensureProductDefaults(/ride-flow|rideflow|bike/i, '/product/ride-flow/dashboard', '/images/products/ride-flow.jpg');
      await ensureProductDefaults(/vexa/i, '/product/vexa-style-hub/dashboard', '/images/products/vexa-style-hub.png');

      const joyExists = await Product.findOne({ slug: { $regex: /joy|eventoza/i } });
      if (!joyExists) {
        await Product.create({
          name: "JOY_EVENT'S",
          slug: 'joy-events',
          category: 'Human Resources',
          description: 'Joy Events is a modern event management platform designed to simplify event planning, bookings, and vendor coordination. From weddings and birthday parties to corporate events and celebrations, manage event requirements through one centralized platform.',
          longDescription: 'Joy Events ERP is an enterprise event management and vendor coordination platform that streamlines event bookings, venue schedules, stage decoration packages, customer leads, caterer management, and financial settlements.',
          features: ['Event Bookings & Scheduling', 'Multi-Category Packages', 'Vendor & Caterer Coordination', 'Real-Time Revenue Analytics', 'Automated Invoices & Payments', 'Role-Based Staff Access'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
          websiteUrl: 'https://joyevents.speshway.site',
          adminUrl: '/product/joy-events/dashboard',
          imageUrl: '/images/products/joy-events.jpg',
          iconName: 'Calendar',
          color: 'emerald',
          status: 'active',
          popularity: 99,
        });
      }

      const hrmsExists = await Product.findOne({ slug: { $regex: /speshway-hrms|hrms/i } });
      if (!hrmsExists) {
        await Product.create({
          name: 'Speshway-HRMS',
          slug: 'speshway-hrms',
          category: 'Human Resources',
          description: 'Speshway HRMS is an all-in-one Human Resource Management System designed to simplify workforce management and automate daily HR operations. Manage employees, attendance, leave requests, payroll, recruitment, and performance through a centralized platform.',
          longDescription: 'Speshway HRMS Enterprise empowers enterprises with end-to-end personnel automation: biometric attendance integration, leave approvals, salary slip generation, statutory tax filings, talent acquisition, and performance reviews.',
          features: ['Biometric Shift Punch Logs', 'Leave & Attendance Engine', 'Automated Payroll & Tax Slips', 'Applicant Tracking (ATS)', 'Employee Self-Service (ESS)', 'Performance Appraisals'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
          websiteUrl: 'https://hrms.speshway.com',
          adminUrl: '/product/speshway-hrms/dashboard',
          imageUrl: '/images/products/speshway-hrms.jpg',
          iconName: 'Users',
          color: 'green',
          status: 'active',
          popularity: 99,
        });
      }

      const flavoraExists = await Product.findOne({ slug: { $regex: /flavora|kitchen/i } });
      if (!flavoraExists) {
        await Product.create({
          name: 'Flavora Kitchen',
          slug: 'flavora-kitchen',
          category: 'Human Resources',
          description: 'Flavora Kitchen is an enterprise cloud kitchen and restaurant management system that streamlines live orders, online deliveries, dining table reservations, recipe costings, kitchen display systems (KDS), and inventory through a centralized digital platform.',
          longDescription: 'Flavora Kitchen Restaurant & Cloud Kitchen ERP centralizes kitchen orders (KDS), dining table bookings, digital POS settlements, thermal KOT dispatching, recipe margins, and guest reviews.',
          features: ['Live Kitchen Display (KDS)', 'Table Reservation Engine', 'Thermal KOT Printing', 'Menu & Recipe Costing', 'Digital POS Settlements', 'Customer Loyalty & Reviews'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
          websiteUrl: 'https://flavorakitchen.speshway.com',
          adminUrl: '/product/flavora-kitchen/dashboard',
          imageUrl: '/images/products/flavora-kitchen.jpg',
          iconName: 'Utensils',
          color: 'orange',
          status: 'active',
          popularity: 99,
        });
      }

      const gymExists = await Product.findOne({ slug: { $regex: /fitness|gym/i } });
      if (!gymExists) {
        await Product.create({
          name: 'American Fitness Gym',
          slug: 'american-fitness-gym',
          category: 'Human Resources',
          description: 'American Fitness Gym is a modern fitness platform designed to help fitness enthusiasts achieve their health and fitness goals. Explore gym services, workout programs, professional trainers, membership plans, and schedules through a user-friendly website.',
          longDescription: 'American Fitness Gym Athletic Club ERP streamlines gym operations with biometric turnstile entry, trainer rostering, class bookings, subscription tiers, locker assignment, and POS supplement sales.',
          features: ['Biometric Turnstile Check-In', 'PT & Class Scheduling', 'Membership Subscription Tiers', 'Attendance Streak Tracking', 'Supplement Bar POS', 'Revenue Analytics'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
          websiteUrl: 'https://americanfitness.speshway.com',
          adminUrl: '/product/american-fitness-gym/dashboard',
          imageUrl: '/images/products/american-fitness-gym.jpg',
          iconName: 'Dumbbell',
          color: 'emerald',
          status: 'active',
          popularity: 99,
        });
      }

      const fleetExists = await Product.findOne({ slug: { $regex: /fleet/i } });
      if (!fleetExists) {
        await Product.create({
          name: 'Fleet Management',
          slug: 'fleet-management',
          category: 'Human Resources',
          description: 'A smart Fleet Management System designed to simplify vehicle operations, monitor fleet activities, manage drivers and trips, and improve operational efficiency. Track fleet performance, organize vehicle records, and manage transportation operations through one centralized platform.',
          longDescription: 'Fleet Management Enterprise is a complete transport logistics ERP offering real-time GPS fleet tracking, driver rostering, automated fuel consumption logs, preventive maintenance scheduling, waybills, and geofence perimeter alerts.',
          features: ['Real-Time GPS Telematics', 'Driver & Vehicle Rostering', 'Fuel Dispensation Audits', 'Waybill & Route Tracking', 'Preventive Maintenance Logs', 'Geofence Perimeter Security'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
          websiteUrl: 'https://fleet.speshway.com',
          adminUrl: '/product/fleet-management/dashboard',
          imageUrl: '/images/products/fleet-management.jpg',
          iconName: 'Truck',
          color: 'emerald',
          status: 'active',
          popularity: 99,
        });
      }

      const dairyExists = await Product.findOne({ slug: { $regex: /natural-milk-dairy|madhur-dairy/i } });
      if (!dairyExists) {
        await Product.create({
          name: 'Natural Milk Dairy',
          slug: 'natural-milk-dairy',
          category: 'Human Resources',
          description: 'Natural Milk Dairy is an all-in-one Dairy Management System that simplifies product management, customer orders, subscriptions, inventory, daily deliveries, and payments through a centralized admin dashboard.',
          longDescription: 'Complete dairy operations ERP providing farm-to-door delivery tracking, automated daily subscriptions, real-time inventory for milk and milk byproducts, temperature-controlled warehouse logging, and seamless payments.',
          features: ['Real-Time Orders', 'Role-Based Access', 'Daily Milk Subscriptions', 'Delivery Route Tracking', 'Inventory & Cold Storage', 'Revenue Analytics'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
          websiteUrl: 'https://speshway.com/natural-milk-dairy',
          adminUrl: '/product/natural-milk-dairy/dashboard',
          imageUrl: '/images/products/natural-milk-dairy.jpg',
          iconName: 'Package',
          color: 'emerald',
          status: 'active',
          popularity: 98,
        });
      }

      const ecomExists = await Product.findOne({ slug: { $regex: /e-commerce|ecommerce|nexora/i } });
      if (!ecomExists) {
        await Product.create({
          name: 'E commerce',
          slug: 'e-commerce',
          category: 'Human Resources',
          description: 'Speshway Ecom is an all-in-one online shopping platform offering multiple product categories, seamless product browsing, wishlist, cart management, secure payments, and convenient order tracking.',
          longDescription: 'Nexora Online Store is an enterprise multi-category retail e-commerce ERP providing centralized catalog synchronization, inventory tracking, coupon marketing, customer loyalty programs, and high-volume order fulfillment.',
          features: ['Multi-Category Catalog', 'Real-Time Order Tracking', 'Role-Based Access', 'Cart & Wishlist Engine', 'Payment Gateway Integration', 'Inventory Stock Alerts'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
          websiteUrl: 'https://nexora.speshway.com',
          adminUrl: '/product/e-commerce/dashboard',
          imageUrl: '/images/products/e-commerce.jpg',
          iconName: 'ShoppingCart',
          color: 'red',
          status: 'active',
          popularity: 99,
        });
      }

      const salonExists = await Product.findOne({ slug: { $regex: /saloon|salon|spy-salon/i } });
      if (!salonExists) {
        await Product.create({
          name: 'Saloon',
          slug: 'saloon',
          category: 'Business Intelligence',
          description: 'SPY Salon is a premium beauty and wellness studio offering professional hair styling, beauty treatments, skincare, grooming, and personalized salon services with convenient online appointment booking.',
          longDescription: 'SPY Salon Jubilee Hills Studio ERP provides end-to-end luxury salon appointment scheduling, stylist chair allocation, beauty packages, client loyalty passes, and till billing.',
          features: ['Real-Time Appointments', 'Stylist & Chair Rostering', 'Service & Package Catalog', 'Loyalty & Membership Passes', 'POS & Split Billing', 'Inventory & Salon Consumables'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
          websiteUrl: 'https://spysalon.speshway.com',
          adminUrl: '/product/saloon/dashboard',
          imageUrl: '/images/products/saloon.jpg',
          iconName: 'Scissors',
          color: 'amber',
          status: 'active',
          popularity: 99,
        });
      }

      const aneeraExists = await Product.findOne({ slug: { $regex: /aneera/i } });
      if (!aneeraExists) {
        await Product.create({
          name: 'Aneera Silks',
          slug: 'aneera-silks',
          category: 'Fashion & Luxury',
          description: 'Aneera Silks is a luxury online saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections, with beautiful product galleries, seamless shopping, secure payments, and convenient order management',
          longDescription: 'Aneera Silks is a luxury online saree shopping destination featuring elegant silk, Banarasi, Kanchipuram, and designer collections, with beautiful product galleries, seamless shopping, secure payments, and convenient order management',
          features: ['Luxury Saree Catalog', 'Silk Mark Certification', 'Real-Time Order Tracking', 'Role-Based Access', 'Bridal Customization', 'Secure Payments'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO'],
          websiteUrl: 'https://aneerasilks.com',
          adminUrl: '/product/aneera-silks/dashboard',
          imageUrl: '/images/products/aneera-silks.jpg',
          iconName: 'Sparkles',
          color: 'rose',
          status: 'active',
          popularity: 99,
        });
      }

      const rideFlowExists = await Product.findOne({ slug: { $regex: /ride-flow|rideflow|bike/i } });
      if (!rideFlowExists) {
        await Product.create({
          name: 'RideFlow',
          slug: 'ride-flow',
          category: 'Human Resources',
          description: 'RideFlow is a modern two-wheeler platform designed to help customers explore bikes, compare models, discover attractive offers, and connect with dealers. It provides a convenient and user-friendly experience for finding the right bike.',
          longDescription: 'RideFlow Two-Wheeler ERP provides digital bike showroom management, dealership networks, online test ride and bike bookings, customer inquiries, maintenance service requests, and sales analytics.',
          features: ['Two-Wheeler Showroom Catalog', 'Dealership Network Management', 'Online Bike Bookings', 'Service Request Workflow', 'Deals & Promotional Offers', 'Revenue & Sales Analytics'],
          technologies: ['React 18', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Socket.IO', 'Tailwind/CSS'],
          websiteUrl: 'https://rideflow.speshway.com',
          adminUrl: '/product/ride-flow/dashboard',
          imageUrl: '/images/products/ride-flow.jpg',
          iconName: 'Bike',
          color: 'emerald',
          status: 'active',
          popularity: 99,
        });
      }
    }
  } catch (err) {
    console.error('Error seeding products to database:', err.message);
  }
};

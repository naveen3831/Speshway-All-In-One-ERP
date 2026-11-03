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
      }));

      await Product.insertMany(cleanedProducts);
      console.log(`✅ Successfully seeded ${cleanedProducts.length} products to MongoDB Atlas database!`);
    } else {
      console.log(`📦 MongoDB database connected: ${count} active products stored in database.`);
      await Product.updateMany(
        { slug: { $regex: /hospital/i }, adminUrl: { $in: [null, '', '/admin/products'] } },
        { $set: { adminUrl: '/product/speshway-hospitals/dashboard' } }
      );
      await Product.updateMany(
        { slug: { $regex: /travel/i }, adminUrl: { $in: [null, '', '/admin/products'] } },
        { $set: { adminUrl: '/travel-erp/dashboard' } }
      );
      await Product.updateMany(
        { slug: { $regex: /dairy|milk/i }, adminUrl: { $in: [null, '', '/admin/products'] } },
        { $set: { adminUrl: '/product/natural-milk-dairy/dashboard' } }
      );
      await Product.updateMany(
        { slug: { $regex: /aneera|silk/i }, adminUrl: { $in: [null, '', '/admin/products'] } },
        { $set: { adminUrl: '/product/aneera-silks/dashboard' } }
      );
      await Product.updateMany(
        { slug: { $regex: /e-commerce|ecommerce|nexora/i } },
        { $set: { adminUrl: '/product/e-commerce/dashboard' } }
      );
      await Product.updateMany(
        { slug: { $regex: /saloon|salon|spy-salon/i } },
        { $set: { adminUrl: '/product/saloon/dashboard' } }
      );
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
          imageUrl: '',
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
          imageUrl: '',
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
          imageUrl: '',
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
          imageUrl: '',
          iconName: 'Sparkles',
          color: 'rose',
          status: 'active',
          popularity: 99,
        });
      }
    }
  } catch (err) {
    console.error('Error seeding products to database:', err.message);
  }
};

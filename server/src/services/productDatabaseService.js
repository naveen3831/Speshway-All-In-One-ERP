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
    }
  } catch (err) {
    console.error('Error seeding products to database:', err.message);
  }
};

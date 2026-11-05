import http from 'http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Configure environment from multiple fallback locations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // CWD
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // server/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // root/.env

import app from './app.js';
import connectDB from './config/db.js';
import { initSocket } from './services/socketService.js';
import { seedAdminUser } from './controllers/authController.js';
import { seedProductsDatabase } from './services/productDatabaseService.js';
import { seedEmployeesDatabase } from './services/employeeDatabaseService.js';
import { seedPricingDatabase } from './services/pricingStore.js';
import { seedHomeDatabase } from './services/homeStore.js';

// Connect to MongoDB
connectDB().then(async (connected) => {
  if (!connected) {
    console.warn('ℹ️ Skipping MongoDB seeding because the database is unavailable.');
    return;
  }

  await seedAdminUser();
  await seedProductsDatabase();
  await seedEmployeesDatabase();
  await seedPricingDatabase();
  await seedHomeDatabase();
});

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Speshway ERP Server running on port ${PORT}`);
  console.log(`📡 WebSocket server active for real-time updates`);
  console.log(`☁️ Cloudinary storage connected: ${process.env.CLOUDINARY_CLOUD_NAME || 'ddgjubbbx'}`);
  console.log(`🔐 Seed Admin ready: admin@gmail.com / admin123`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

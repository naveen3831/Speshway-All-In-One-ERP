import http from 'http';
import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';
import { initSocket } from './services/socketService.js';
import { seedAdminUser } from './controllers/authController.js';
import { seedProductsDatabase } from './services/productDatabaseService.js';
import { seedEmployeesDatabase } from './services/employeeDatabaseService.js';




// Connect to MongoDB
connectDB().then(async (connected) => {
  if (!connected) {
    console.warn('ℹ️ Skipping MongoDB seeding because the database is unavailable.');
    return;
  }

  await seedAdminUser();
  await seedProductsDatabase();
  await seedEmployeesDatabase();
});

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Speshway ERP Server running on port ${PORT}`);
  console.log(`📡 WebSocket server active for real-time updates`);
  console.log(`🔐 Seed Admin ready: admin@gmail.com / admin123`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

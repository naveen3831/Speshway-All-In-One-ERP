import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { initSocket } from './services/socketService.js';
import { seedAdminUser } from './controllers/authController.js';
import { seedProductsDatabase } from './services/productDatabaseService.js';
import { seedEmployeesDatabase } from './services/employeeDatabaseService.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().then(async () => {
  await seedAdminUser();
  await seedProductsDatabase();
  await seedEmployeesDatabase();
});

const PORT = process.env.PORT || 5000;

const httpServer = http.createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Speshway ERP Server running on port ${PORT}`);
  console.log(`📡 WebSocket server active for real-time updates`);
  console.log(`🔐 Seed Admin ready: admin@gmail.com / admin123`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});

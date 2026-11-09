import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

// Parse cookies before routes
app.use(cookieParser());

// Middleware with generous payload limit for product images and uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Dynamic CORS allowing all origins in production and local dev
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin or any domain
      callback(null, true);
    },
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Serve static assets from Vite client build if present
app.use(express.static(clientDistPath));

// API Routes
app.use('/api', routes);

// SPA fallback for all frontend routes (like /admin, /pricing, /projects, /contact, etc.)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      next();
    }
  });
});

// Error Handling Middleware for unhandled /api calls
app.use(notFound);
app.use(errorHandler);

export default app;

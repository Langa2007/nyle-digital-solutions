import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { sequelize } from './models/index.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { createLogger } from './utils/logger.js';

const logger = createLogger('server');
const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- Security Middleware ----------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

const corsOptions = {
  origin: process.env.FRONTEND_URLS?.split(',') || [
    'https://nyle-digital-solutions.onrender.com',
    'https://nyle-digital-solutions.vercel.app',
    'https://nyle-digital-solutions-9t9v.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ---------------- Rate Limiters ----------------
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many authentication attempts, please try again later.' },
});

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

// ---------------- Body Parsing & Compression ----------------
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ---------------- Request Logging ----------------
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
});

// ---------------- Routes ----------------
app.use('/api', routes);

// ---------------- Health Check ----------------
app.get('/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await sequelize.authenticate();
    dbStatus = 'connected';
  } catch {}
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development',
  });
});

// ---------------- 404 Handler ----------------
app.use('*', (req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    path: req.originalUrl,
  });
});

// ---------------- Error Handler ----------------
app.use(errorHandler);

// ---------------- Start Server ----------------
async function startServer() {
  try {
    logger.info(
      `🗄️  Database target: ${
        process.env.DATABASE_URL ? 'Neon (cloud)' : 'Local PostgreSQL'
      }`
    );

    await sequelize.authenticate();
    logger.info('✅ PostgreSQL database connected successfully');

    app.listen(PORT, () => {
      logger.info(` Server running on port ${PORT}`);
      logger.info(` Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(
        ` Health check: ${
          process.env.NODE_ENV === 'production' ? '/health' : `http://localhost:${PORT}/health`
        }`
      );
    });
  } catch (error) {
    logger.error(' Server startup failed', error);
    process.exit(1);
  }
}

// ---------------- Graceful Shutdown ----------------
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down gracefully');
  await sequelize.close();
  process.exit(0);
});

startServer();

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

/* ---------------- Helmet ---------------- */
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
  })
);

/* ---------------- CORS (FIXED) ---------------- */
const allowedOrigins = (process.env.FRONTEND_URLS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, curl, health checks
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ❗ DO NOT THROW — just deny quietly
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Always respond to preflight
app.options('*', cors());

/* ---------------- Rate Limiting ---------------- */
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

app.use(
  '/api/auth',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
  })
);

/* ---------------- Middleware ---------------- */
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ---------------- Logger ---------------- */
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

/* ---------------- Routes ---------------- */
app.use('/api', routes);

/* ---------------- Health ---------------- */
app.get('/health', async (req, res) => {
  let db = 'disconnected';
  try {
    await sequelize.authenticate();
    db = 'connected';
  } catch {}
  res.json({
    status: 'healthy',
    database: db,
    environment: process.env.NODE_ENV || 'development',
  });
});

/* ---------------- Errors ---------------- */
app.use(errorHandler);

/* ---------------- Start ---------------- */
async function start() {
  try {
    logger.info(
      `🗄️ DB: ${process.env.DATABASE_URL ? 'Neon' : 'Local'}`
    );

    await sequelize.authenticate();
    logger.info(' Database connected');

    app.listen(PORT, () => {
      logger.info(` Server running on ${PORT}`);
    });
  } catch (err) {
    logger.error('Startup failed', err);
    process.exit(1);
  }
}

start();

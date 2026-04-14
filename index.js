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

app.set('trust proxy', 1);

const parseOrigins = (...keys) =>
  [...new Set(
    keys.flatMap((key) =>
      (process.env[key] || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
    )
  )];

const allowedOrigins = parseOrigins(
  'FRONTEND_URLS',
  'CORS_ORIGINS',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_ADMIN_URL'
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors());

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

app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api', routes);

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

app.use(errorHandler);

async function start() {
  try {
    logger.info(`DB: ${process.env.DATABASE_URL ? 'Remote' : 'Local'}`);

    await sequelize.authenticate();
    logger.info('Database connected');

    app.listen(PORT, () => {
      logger.info(`Server running on ${PORT}`);
    });
  } catch (err) {
    logger.error('Startup failed', err);
    process.exit(1);
  }
}

start();

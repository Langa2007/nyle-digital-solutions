// routes/index.js
import express from 'express';
import contactRoutes from './contactRoutes.js';
import jobRoutes from './jobs.js';
import blogRoutes from './blog.js';
import portfolioRoutes from './portfolio.js';
import serviceRoutes from './services.js';
import authRoutes from './auth.js';
import admin from './admin.js';

const router = express.Router();

// Health check
router.get('/', (req, res) => {
  res.json({
    message: 'Nyle Digital Solutions API',
    version: '1.0.0',
    documentation: '/api/docs',
    status: 'operational',
  });
});

// API Routes
router.use('/contacts', contactRoutes);
router.use('/jobs', jobRoutes);
router.use('/blog', blogRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/services', serviceRoutes);
router.use('/auth', authRoutes);
router.use('/admin', admin);

export default router;
// backend/routes/services.js
import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  getServiceCategories,
  getServiceStats
} from '../controllers/serviceController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/categories', getServiceCategories);
router.get('/:slug', getServiceBySlug);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize(['admin', 'staff']),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  createService
);

router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'staff']),
  [
    param('id').isUUID().withMessage('Invalid service ID'),
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
  ],
  updateService
);

router.delete(
  '/:id',
  authenticate,
  authorize(['admin', 'staff']),
  [
    param('id').isUUID().withMessage('Invalid service ID'),
  ],
  deleteService
);

router.get(
  '/admin/stats',
  authenticate,
  authorize(['admin', 'staff']),
  getServiceStats
);

export default router;
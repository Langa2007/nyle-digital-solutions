// backend/routes/portfolio.js
import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getAllPortfolioItems,
  getPortfolioItemBySlug,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  getPortfolioCategories,
  getPortfolioStats
} from '../controllers/portfolioController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPortfolioItems);
router.get('/categories', getPortfolioCategories);
router.get('/:slug', getPortfolioItemBySlug);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize(['admin', 'staff']),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('featuredImage').notEmpty().withMessage('Featured image is required'),
  ],
  createPortfolioItem
);

router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'staff']),
  [
    param('id').isUUID().withMessage('Invalid portfolio item ID'),
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
  ],
  updatePortfolioItem
);

router.delete(
  '/:id',
  authenticate,
  authorize(['admin', 'staff']),
  [
    param('id').isUUID().withMessage('Invalid portfolio item ID'),
  ],
  deletePortfolioItem
);

router.get(
  '/admin/stats',
  authenticate,
  authorize(['admin', 'staff']),
  getPortfolioStats
);

export default router;
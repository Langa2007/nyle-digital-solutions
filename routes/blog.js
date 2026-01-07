// backend/routes/blog.js
import express from 'express';
import { body, param, query } from 'express-validator';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogCategories,
  getFeaturedPosts
} from '../controllers/blogController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllBlogPosts);
router.get('/featured', getFeaturedPosts);
router.get('/categories', getBlogCategories);
router.get('/:slug', getBlogPostBySlug);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize(['admin', 'staff']),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').optional().isString(),
    body('tags').optional().isArray(),
    body('featuredImage').optional().isURL(),
  ],
  createBlogPost
);

router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'staff']),
  [
    param('id').isUUID().withMessage('Invalid blog post ID'),
    body('title').optional().notEmpty(),
    body('content').optional().notEmpty(),
  ],
  updateBlogPost
);

router.delete(
  '/:id',
  authenticate,
  authorize(['admin', 'staff']),
  [
    param('id').isUUID().withMessage('Invalid blog post ID'),
  ],
  deleteBlogPost
);

export default router;
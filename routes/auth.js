// backend/routes/auth.js
import express from 'express';
import { body, param } from 'express-validator';
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
  ],
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.post('/forgot-password', forgotPassword);

router.post(
  '/reset-password/:token',
  [
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  resetPassword
);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/update-details', authenticate, updateDetails);
router.put('/update-password', authenticate, updatePassword);
router.post('/logout', authenticate, logout);

export default router;
// backend/routes/jobs.js
import express from 'express';
import { body, param, query } from 'express-validator';
import { 
  createJobApplication, 
  getJobApplications, 
  updateApplicationStatus,
  getOpenPositions,
  getApplicationStats 
} from '../controllers/jobController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/open', getOpenPositions);

router.post(
  '/apply',
  [
    body('jobId').notEmpty().withMessage('Job ID is required'),
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('resume').notEmpty().withMessage('Resume is required'),
    body('coverLetter').notEmpty().withMessage('Cover letter is required'),
    body('experience').isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  ],
  createJobApplication
);

// Admin routes
router.get(
  '/',
  authenticate,
  authorize(['admin', 'staff']),
  getJobApplications
);

router.get(
  '/stats',
  authenticate,
  authorize(['admin', 'staff']),
  getApplicationStats
);

router.patch(
  '/:id/status',
  authenticate,
  authorize(['admin', 'staff']),
  [
    param('id').isUUID().withMessage('Invalid application ID'),
    body('status').isIn(['pending', 'reviewed', 'shortlisted', 'rejected', 'hired']),
    body('notes').optional().isString(),
  ],
  updateApplicationStatus
);

export default router;
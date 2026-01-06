// routes/contacts.js
import express from 'express';
import { body, param } from 'express-validator';
import { 
  createContact, 
  getContacts, 
  updateContactStatus 
} from '../controllers/contactController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public route for contact form submission
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('serviceType').optional().isIn([
      'custom_software',
      'web_apps',
      'mobile_apps',
      'desktop_apps',
      'saas',
      'cloud_infra',
      'digital_transformation',
      'consulting',
      'other'
    ]),
    body('budget').optional().isIn(['1k-5k', '5k-20k', '20k-50k', '50k+', 'undecided']),
    body('timeline').optional().isIn(['urgent', '1-3months', '3-6months', '6months+']),
  ],
  createContact
);

// Admin routes
router.get(
  '/',
  authenticate,
  authorize(['admin', 'staff']),
  getContacts
);

router.patch(
  '/:id/status',
  authenticate,
  authorize(['admin', 'staff']),
  [
    param('id').isUUID().withMessage('Invalid contact ID'),
    body('status').optional().isIn(['new', 'contacted', 'in_progress', 'converted', 'archived']),
    body('notes').optional().isString(),
    body('assignedTo').optional().isUUID(),
  ],
  updateContactStatus
);

export default router;
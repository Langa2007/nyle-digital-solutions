// routes/team.js
import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getTeamMembers,
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController.js';

const router = express.Router();

// Public
router.get('/', getTeamMembers);

// Admin-only
router.get('/all', authenticate, authorize(['admin', 'staff']), getAllTeamMembers);
router.post('/', authenticate, authorize(['admin', 'staff']), createTeamMember);
router.put('/:id', authenticate, authorize(['admin', 'staff']), updateTeamMember);
router.delete('/:id', authenticate, authorize(['admin']), deleteTeamMember);

export default router;
